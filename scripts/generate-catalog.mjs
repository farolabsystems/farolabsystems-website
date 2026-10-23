import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const inventory = JSON.parse(fs.readFileSync(path.join(root, ".crawl", "inventory.json"), "utf8"));

function decode(value = "") {
  return value
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const industryFilters = [
  "eCommerce",
  "Travel & Hospitality",
  "Artificial Intelligence",
  "EdTech",
  "Startups",
  "Real Estate",
  "Logistics",
  "Fintech",
  "Medtech",
  "Marketing",
];

const serviceFilters = [
  "Custom Software",
  "Web Apps",
  "Mobile Apps",
  "AI",
  "UX/UI",
  "Enterprise",
  "Maintenance",
  "Offshore",
];

const serviceMeta = {
  "custom-software-development": ["Development", "Custom Software Development", "Custom Software"],
  "web-app-development": ["Development", "Web App Development", "Web Apps"],
  "cross-platform-mobile-app-development": ["Development", "Mobile App Development", "Mobile Apps"],
  "business-app-development": ["Development", "Enterprise App Development", "Enterprise"],
  "ai-development": ["Development", "AI Development", "AI"],
  "ux-ui-product-design": ["Design", "Custom UX/UI Design", "UX/UI"],
  "support-and-maintenance": ["Maintenance", "Maintenance Services", "Maintenance"],
  "offshore-software-development": ["Delivery", "Offshore software development", "Offshore"],
  "digital-product-development": ["Development", "Digital product development", "Custom Software"],
  "vibe-coding-security-audit": ["Maintenance", "Security audit", "Maintenance"],
};

function industriesFor(slug, title) {
  const hay = `${slug} ${title}`.toLowerCase();
  const found = [];
  const rules = [
    [/commerce|shop|retail|hocomo|paymi/, "eCommerce"],
    [/travel|trip|hotel|trava|booking|exotic/, "Travel & Hospitality"],
    [/ai|gpt|machine|plannin-ai|acumen|invu/, "Artificial Intelligence"],
    [/edu|learn|course|school|sans|nugget/, "EdTech"],
    [/estate|property|real-estate|utah/, "Real Estate"],
    [/logistic|deliver|fleet|warehouse/, "Logistics"],
    [/fintech|pay|bank|tax|invoice|billing/, "Fintech"],
    [/med|health|clinic|pharma/, "Medtech"],
    [/market|brand|campaign/, "Marketing"],
    [/startup|mvp/, "Startups"],
  ];
  for (const [re, label] of rules) if (re.test(hay)) found.push(label);
  if (!found.length) found.push("Startups");
  return [...new Set(found)].slice(0, 3);
}

function servicesFor(slug, title) {
  const hay = `${slug} ${title}`.toLowerCase();
  const found = ["Custom Software"];
  if (/mobile|ios|android|app/.test(hay)) found.push("Mobile Apps");
  if (/web|portal|admin/.test(hay)) found.push("Web Apps");
  if (/ai|gpt|model/.test(hay)) found.push("AI");
  if (/design|ux|ui/.test(hay)) found.push("UX/UI");
  if (/enterprise|b2b|admin|panel/.test(hay)) found.push("Enterprise");
  return [...new Set(found)].slice(0, 3);
}

function tsString(value) {
  return JSON.stringify(value, null, 2);
}

const services = inventory
  .filter((item) => item.path.startsWith("/services/"))
  .map((item) => {
    const slug = item.path.split("/")[2];
    const meta = serviceMeta[slug] ?? ["Development", decode(item.h1) || slug, "Custom Software"];
    const title = decode(item.h1) || meta[1];
    return {
      slug,
      navLabel: meta[1],
      group: meta[0],
      title,
      seoTitle: decode(item.title) || title,
      seoDescription: decode(item.description) || `Placeholder overview for ${meta[1]}.`,
      eyebrow: meta[0],
      summary: `Placeholder overview for ${meta[1]}. Replace this paragraph with your own description of the offer, who it is for, and what a first engagement includes.`,
      blurb: "Placeholder blurb. Replace with one sentence.",
      outcomes: [
        { title: "A smaller first release", body: "We name the workflow that has to work, and we leave the rest for a later slice." },
        { title: "A design you can react to", body: "Screens and flows land before a large build, so the argument happens while change is cheap." },
        { title: "Software your team can run", body: "Access, docs, and a support path are part of the delivery, not a follow-up project." },
      ],
      steps: [
        { title: "Listen", body: `We map how ${meta[1].toLowerCase()} has to fit the way your team already works.` },
        { title: "Shape", body: "You get a written slice: what is in, what is out, and how we will know it worked." },
        { title: "Build", body: "Design and engineering stay in one thread, with a demo you can use at the end of each slice." },
        { title: "Stay", body: "After launch we fix, measure, and plan the next slice with the same people." },
      ],
      faqs: [
        {
          question: `When is ${meta[1].toLowerCase()} the right engagement?`,
          answer: "When a rented tool or a slide deck cannot carry the operation you need. Replace this answer with your own positioning.",
        },
        {
          question: "What do we need to start?",
          answer: "A description of the problem, the people involved, and any prototype or system that already exists.",
        },
      ],
    };
  });

const industryNav = {
  ecommerce: ["eCommerce", "eCommerce"],
  "travel-software-development": ["Travel & Hospitality", "Travel & Hospitality"],
  "logistics-digital-solutions-development": ["Logistics", "Logistics"],
  "real-estate-digital-solutions-development": ["Real Estate", "Real Estate"],
  fintech: ["Fintech", "Fintech"],
  "medtech-digial-solutions-development": ["Medtech", "Medtech"],
  marketing: ["Marketing", "Marketing"],
  "digital-solutions-for-startups": ["Startups", "Startups"],
};

const industries = inventory
  .filter((item) => item.path.startsWith("/industries/"))
  .map((item) => {
    const slug = item.path.split("/")[2];
    const meta = industryNav[slug] ?? [decode(item.h1) || slug, "Startups"];
    const title = decode(item.h1) || meta[0];
    return {
      slug,
      navLabel: meta[0],
      filter: meta[1],
      title,
      seoTitle: decode(item.title) || title,
      seoDescription: decode(item.description) || `Placeholder industry page for ${meta[0]}.`,
      eyebrow: "Industry",
      summary: `Placeholder page for ${meta[0]}. Replace it with the problems you actually solve in this industry and the kind of systems you build.`,
      bullets: [
        "The customer-facing flow",
        "The operator tools behind it",
        "The integrations that keep the data honest",
        "A release plan that does not bet the company on one launch",
      ],
      faqs: [
        {
          question: "Do you only build new products in this industry?",
          answer: "No. We also extend or replace systems that already run, when the rented stack is the constraint.",
        },
      ],
    };
  });

const featured = new Set(["plannin", "sans", "buzzin", "trava"]);
const caseStudies = inventory
  .filter((item) => /^\/case-studies\/[^/]+$/.test(item.path))
  .map((item, index) => {
    const slug = item.path.split("/")[2];
    const title = decode(item.h1) || slug;
    const cover = `/assets/covers/cover-${(index % 6) + 1}.jpg`;
    return {
      slug,
      title,
      summary: `Placeholder summary for ${title}. Replace it with the problem, what you shipped, and what changed. Do not reuse a client's private numbers.`,
      industries: industriesFor(slug, title),
      services: servicesFor(slug, title),
      stats: [
        { value: "+00%", label: "Placeholder metric" },
        { value: "00", label: "Placeholder count" },
        { value: "0 wks", label: "Placeholder time" },
      ],
      body: `## The problem\n\nPlaceholder narrative for ${title}. Describe the constraint the client felt before any software was discussed.\n\n## What we shipped\n\nPlaceholder description of the product slice. Name the users, the main workflow, and what you deliberately left out.\n\n## What changed\n\nReplace these lines with outcomes you can stand behind. The figures in the header are placeholders and must not be published as facts.\n`,
      cover,
      gallery: [cover, `/assets/covers/cover-${((index + 1) % 6) + 1}.jpg`],
      featured: featured.has(slug),
      sortOrder: featured.has(slug) ? index : 100 + index,
    };
  });

const categories = ["Software Development", "Product", "Outsourcing", "Design", "AI"];
const pinnedDates = {
  "most-expensive-part-of-it-project": "2026-10-14T08:00:00.000Z",
  "building-edunugget": "2026-10-13T08:00:00.000Z",
  "in-house-vs-outsourcing-software-development": "2026-09-02T08:00:00.000Z",
};
const posts = inventory
  .filter((item) => /^\/blog\/[^/]+$/.test(item.path))
  .map((item, index) => {
    const slug = item.path.split("/")[2];
    const title = decode(item.h1) || decode(item.title) || slug;
    const category = categories[index % categories.length];
    return {
      slug,
      title,
      excerpt: "Placeholder excerpt. Replace it with your own introduction. This is not the original article.",
      body: `## Why this matters\n\nPlaceholder article for “${title}”. Write your own argument here. This text exists so the route, table of contents, and related posts have something to render.\n\n## What to decide first\n\nName the constraint, the people involved, and the smallest release that would teach you something.\n\n## A practical next step\n\nClose with the decision a reader can make this week. Replace every paragraph before launch.\n`,
      coverImage: `/assets/covers/cover-${(index % 6) + 1}.jpg`,
      author: "Editorial team",
      category,
      tags: [category.toLowerCase()],
      seoTitle: title,
      seoDescription: "Placeholder article. Replace before launch.",
      publishedAt: pinnedDates[slug] ?? new Date(Date.UTC(2026, 6, 28 - (index % 27), 8, 0, 0)).toISOString(),
    };
  });

function writeTs(file, constName, typeName, data) {
  const contents = `import type { ${typeName} } from "@/website-theme/data/types";\n\nexport const ${constName}: ${typeName}[] = ${tsString(data)};\n`;
  fs.writeFileSync(path.join(root, "src/website-theme/data", file), contents);
}

writeTs("services.ts", "services", "ServiceRecord", services);
writeTs("industries.ts", "industries", "IndustryRecord", industries);
writeTs("case-studies.ts", "caseStudies", "CaseStudyRecord", caseStudies);
writeTs("posts.ts", "posts", "PostRecord", posts);

fs.writeFileSync(
  path.join(root, "src/website-theme/data/taxonomy.ts"),
  `export const industryFilters = ${tsString(industryFilters)} as const;\nexport const serviceFilters = ${tsString(serviceFilters)} as const;\n`,
);

fs.writeFileSync(
  path.join(root, "prisma/seed-data.json"),
  JSON.stringify({ services: services.length, caseStudies, posts, legalNote: "legal pages live in src/website-theme/data/pages.ts" }, null, 2),
);

console.log({ services: services.length, industries: industries.length, caseStudies: caseStudies.length, posts: posts.length });
