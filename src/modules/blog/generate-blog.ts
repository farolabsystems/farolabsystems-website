import { prisma } from "@/lib/db";
import { geminiGenerate, geminiImage, geminiText } from "@/lib/gemini";
import { uploadBlogImage } from "@/lib/s3";
import { saveContent } from "@/modules/content/content.service";
import { posts as fallbackPosts } from "@/website-theme/data/posts";

const CATEGORIES = [
  "AI & Automation",
  "Cloud & DevOps",
  "Software Development",
  "Product Engineering",
  "Business & Technology",
] as const;

export type GeneratedPost = {
  id: string;
  slug: string;
  title: string;
  skipped?: boolean;
};

export type GeneratedDraft = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: string;
  coverAlt: string;
  author: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  status: "DRAFT";
};

type Article = {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  tags: string[];
  coverPrompt: string;
  body: string;
};

type Job = {
  id: string;
  status: "running" | "done" | "error";
  message: string;
  draft?: GeneratedDraft;
};

type CatalogItem = { title: string; slug: string };

const state = globalThis as typeof globalThis & {
  __blogJob?: Job;
  __blogWork?: Promise<unknown>;
};

function timeZone() {
  return process.env.BLOG_CRON_TZ?.trim() || "Asia/Kolkata";
}

export function blogDayKey(zone = timeZone()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

function textModel() {
  return process.env.GEMINI_TEXT_MODEL?.trim() || "gemini-2.5-flash";
}

function imageModel() {
  return process.env.GEMINI_IMAGE_MODEL?.trim() || "gemini-2.5-flash-image";
}

function collectStrings(value: unknown, out: string[]) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectStrings(item, out));
}

function parseArticle(payload: unknown): Article | null {
  const texts: string[] = [];
  collectStrings(payload, texts);
  let best: Article | null = null;
  for (const text of texts) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start < 0 || end <= start) continue;
    try {
      const parsed = JSON.parse(text.slice(start, end + 1)) as Partial<Article>;
      if (typeof parsed.title !== "string" || typeof parsed.body !== "string" || parsed.body.trim().length < 400) continue;
      const article: Article = {
        title: parsed.title,
        slug: typeof parsed.slug === "string" ? parsed.slug : parsed.title,
        excerpt: typeof parsed.excerpt === "string" ? parsed.excerpt : "",
        seoTitle: typeof parsed.seoTitle === "string" ? parsed.seoTitle : parsed.title,
        seoDescription: typeof parsed.seoDescription === "string" ? parsed.seoDescription : "",
        category: typeof parsed.category === "string" ? parsed.category : "Software Development",
        tags: Array.isArray(parsed.tags) ? parsed.tags.filter((tag): tag is string => typeof tag === "string") : [],
        coverPrompt: typeof parsed.coverPrompt === "string" ? parsed.coverPrompt : parsed.title,
        body: parsed.body,
      };
      if (!best || article.body.length > best.body.length) best = article;
    } catch {
      /* the surrounding text was not the article */
    }
  }
  return best;
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function significantWords(value: string) {
  return new Set(normalize(value).split(" ").filter((word) => word.length > 3));
}

function tooClose(title: string, slug: string, items: CatalogItem[]) {
  const words = significantWords(title);
  const normalized = normalize(title);
  return items.some((item) => {
    if (item.slug === slug || normalize(item.title) === normalized) return true;
    const other = significantWords(item.title);
    const base = Math.min(words.size, other.size);
    if (base < 2) return false;
    let overlap = 0;
    for (const word of words) if (other.has(word)) overlap += 1;
    return overlap / base >= 0.6;
  });
}

async function catalog(): Promise<CatalogItem[]> {
  const items = new Map<string, CatalogItem>();
  for (const post of fallbackPosts) items.set(normalize(post.title), { title: post.title, slug: post.slug });
  try {
    const rows = await prisma.content.findMany({
      where: { type: "POST" },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { title: true, slug: true },
    });
    for (const row of rows) items.set(normalize(row.title), { title: row.title, slug: row.slug });
  } catch {
    /* The shipped articles still count as already used. */
  }
  return [...items.values()];
}

async function marketNotes() {
  const prompt =
    "What is trending this month in software engineering, practical AI products, cloud platforms, and how companies build digital products? Summarize the concrete themes in plain prose. Do not invent statistics, client names, or quotes.";
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    tools: [{ google_search: {} }],
  };
  let payload;
  try {
    payload = await geminiGenerate(textModel(), body, 90_000);
  } catch {
    payload = await geminiGenerate(textModel(), { contents: body.contents }, 90_000);
  }
  const text = geminiText(payload).replace(/\s+/g, " ").trim().slice(0, 5000);
  if (text.length < 80) throw new Error("Could not read current market trends.");
  return text;
}

async function uniqueSlug(base: string) {
  const root = slugify(base) || "note";
  let slug = root;
  for (let attempt = 2; attempt < 30; attempt += 1) {
    const existing = await prisma.content.findUnique({
      where: { type_slug_locale: { type: "POST", slug, locale: "en" } },
    });
    if (!existing) return slug;
    const suffix = `-${attempt}`;
    slug = `${root.slice(0, 80 - suffix.length)}${suffix}`;
  }
  return `${root.slice(0, 64)}-${Date.now().toString(36)}`;
}

async function writeArticle(items: CatalogItem[], brief: string) {
  const published = items.map((item) => `- ${item.title}`).join("\n");
  const instructions = [
    "You write the Farolab Systems blog. Farolab Systems helps startups and businesses design, build, and scale reliable digital products through software engineering, design, and practical AI.",
    "Voice: practical, calm, and specific. Short sections with markdown ## headings. No hype. No invented client names, revenue, percentages, or case-study outcomes. Do not say the post was generated. English only. 700 to 900 words.",
    "Return ONLY a JSON object, with no markdown fence, using these keys: title, slug, excerpt, seoTitle, seoDescription, category, tags, coverPrompt, body.",
    "slug is lowercase words separated by hyphens. excerpt is one sentence under 180 characters. seoTitle is under 60 characters. seoDescription is 120 to 160 characters.",
    `category is exactly one of: ${CATEGORIES.join(" | ")}. tags is an array of 3 short lowercase tags.`,
    "body is markdown, starts with a ## heading, and has no H1. coverPrompt is one English sentence for a single editorial photograph: natural light, off-white and black, real materials, no text, no logos, no watermark.",
    "Do not copy an existing article. When the editor named a subject, follow that subject.",
  ].join("\n");
  const query = `${brief}\n\nAlready published, do not repeat these:\n${published}`;
  const payload = await geminiGenerate(
    textModel(),
    {
      systemInstruction: { parts: [{ text: instructions }] },
      contents: [{ role: "user", parts: [{ text: query }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    },
    120_000,
  );
  const article = parseArticle(geminiText(payload)) || parseArticle(payload);
  if (!article) throw new Error("Gemini did not return an article.");
  return article;
}

async function freshArticle(items: CatalogItem[], brief: string) {
  let article = await writeArticle(items, brief);
  if (!tooClose(article.title, slugify(article.slug || article.title), items)) return article;
  article = await writeArticle(
    items,
    `${brief}\n\nThe previous draft "${article.title}" was already on the blog. Choose a different trend and a different title.`,
  );
  if (tooClose(article.title, slugify(article.slug || article.title), items)) {
    throw new Error("The draft matched an existing post, so it was not published.");
  }
  return article;
}

async function createCover(prompt: string, slug: string) {
  const query = `Editorial photograph, 16:9, natural light, quiet and specific, off-white paper, black metal, and warm wood. No text, no letters, no logos, no watermark, no collage. ${prompt}`;
  const payload = await geminiGenerate(
    imageModel(),
    {
      contents: [{ role: "user", parts: [{ text: query }] }],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: { aspectRatio: "16:9" },
      },
    },
    180_000,
    true,
  );
  const uploaded = await uploadBlogImage("cover.png", slug, geminiImage(payload));
  return uploaded.url;
}

async function publish(article: Article, daily: boolean): Promise<GeneratedPost> {
  const category = CATEGORIES.includes(article.category as (typeof CATEGORIES)[number])
    ? article.category
    : "Software Development";
  const slug = await uniqueSlug(article.slug || article.title);
  const tags = [
    ...article.tags.map((tag) => clip(tag, 40)).filter(Boolean).slice(0, 6),
    "generated",
    ...(daily ? [`daily:${blogDayKey()}`] : []),
  ];
  const title = clip(article.title, 180);
  const coverImage = await createCover(article.coverPrompt || title, slug);
  const row = await saveContent({
    type: "POST",
    slug,
    title,
    excerpt: clip(article.excerpt || title, 400),
    body: article.body.trim(),
    coverImage,
    coverAlt: clip(title, 180),
    author: "Farolab Systems",
    category,
    tags,
    seoTitle: clip(article.seoTitle || title, 180),
    seoDescription: clip(article.seoDescription || article.excerpt || title, 300),
    status: "PUBLISHED",
  });
  return { id: row.id, slug: row.slug, title: row.title };
}

async function publishedToday() {
  const tag = `daily:${blogDayKey()}`;
  return prisma.content.findFirst({
    where: { type: "POST", tags: { has: tag } },
    select: { id: true, slug: true, title: true },
  });
}

async function draftFromArticle(article: Article): Promise<GeneratedDraft> {
  const category = CATEGORIES.includes(article.category as (typeof CATEGORIES)[number])
    ? article.category
    : "Software Development";
  const slug = await uniqueSlug(article.slug || article.title);
  const title = clip(article.title, 180);
  const coverImage = await createCover(article.coverPrompt || title, slug);
  return {
    title,
    slug,
    excerpt: clip(article.excerpt || title, 400),
    body: article.body.trim(),
    coverImage,
    coverAlt: clip(title, 180),
    author: "Farolab Systems",
    category,
    tags: article.tags.map((tag) => clip(tag, 40)).filter(Boolean).slice(0, 6).join(", "),
    seoTitle: clip(article.seoTitle || title, 180),
    seoDescription: clip(article.seoDescription || article.excerpt || title, 300),
    status: "DRAFT",
  };
}

function track<T>(work: () => Promise<T>) {
  let resolveWork: (value: T) => void = () => undefined;
  let rejectWork: (error: unknown) => void = () => undefined;
  const promise = new Promise<T>((resolve, reject) => {
    resolveWork = resolve;
    rejectWork = reject;
  });
  state.__blogWork = promise;
  void (async () => {
    try {
      resolveWork(await work());
    } catch (error) {
      rejectWork(error);
    } finally {
      if (state.__blogWork === promise) state.__blogWork = undefined;
    }
  })();
  return promise;
}

export function startManualGeneration(prompt: string) {
  const subject = prompt.trim();
  if (subject.length < 8) throw new Error("Enter a prompt first.");
  if (state.__blogWork) throw new Error("A post is already being generated.");
  const job: Job = { id: Date.now().toString(36), status: "running", message: "Writing from your prompt." };
  state.__blogJob = job;
  void track(async () => {
    const items = await catalog();
    const article = await writeArticle(
      items,
      `Write the article the editor asked for. Follow this prompt and do not change the subject: ${subject}`,
    );
    return draftFromArticle(article);
  })
    .then((draft) => {
      job.status = "done";
      job.draft = draft;
      job.message = "Draft is in the form. Set the status to Published and save when you want it live.";
    })
    .catch((error: unknown) => {
      job.status = "error";
      job.message = error instanceof Error ? error.message : "Could not generate the post.";
    });
  return job;
}

export function getGenerationJob(id: string) {
  if (state.__blogJob?.id !== id) return null;
  return state.__blogJob;
}

export async function runDailyBlog(): Promise<GeneratedPost> {
  if (state.__blogWork) await state.__blogWork.catch(() => undefined);
  const existing = await publishedToday();
  if (existing) {
    console.log("[blog] daily post already published");
    return { ...existing, skipped: true };
  }
  if (state.__blogWork) return runDailyBlog();
  const post = await track(async () => {
    const items = await catalog();
    const trends = await marketNotes();
    const article = await freshArticle(
      items,
      `Read these current market notes and choose one trend that is not already a published title. Analyze what it changes for a team building software, then write the article from that analysis.\n\nMarket notes:\n${trends}`,
    );
    return publish(article, true);
  });
  console.log(`[blog] published ${post.slug}`);
  return post;
}
