import fs from "fs";

function decode(s = "") {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const pages = JSON.parse(fs.readFileSync(new URL("../.crawl/inventory.json", import.meta.url), "utf8")).map((p) => ({
  ...p,
  title: decode(p.title),
  description: decode(p.description),
  ogTitle: decode(p.ogTitle),
  ogDescription: decode(p.ogDescription),
  h1: decode(p.h1),
  h2s: (p.h2s || []).map(decode),
}));

const xml = fs.readFileSync(new URL("../.crawl/sitemap.xml", import.meta.url), "utf8");
const pl = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .filter((p) => p === "/pl" || p.startsWith("/pl/"))
  .sort();

function groupOf(path) {
  if (path === "/") return "Home";
  const seg = path.split("/")[1];
  const map = {
    services: "Services",
    industries: "Industries",
    "case-studies": "Case studies",
    blog: "Blog",
    "about-us": "Company",
    career: "Company",
    contact: "Company",
    "schedule-meeting": "Company",
    collaboration: "Company",
    "technical-consultation": "Company",
    consultation: "Company",
    "privacy-policy": "Legal",
    "cookie-policy": "Legal",
  };
  return map[seg] || "Other";
}

const order = ["Home", "Services", "Industries", "Case studies", "Company", "Blog", "Legal", "Other"];
const grouped = Object.fromEntries(order.map((g) => [g, []]));
for (const page of pages) grouped[groupOf(page.path)].push(page);

const templateNotes = {
  Home: "Hero, trusted-by marquee, starting-point columns, startup Q&A cards, differentiator, industry tabs, built-in tags, case-study slider, testimonial, blog teaser, working-together, FAQ accordion, contact form, cookie banner.",
  Services: "Service template: hero, outcome blocks, process/numbered steps, related work, FAQ, contact CTA. Driven by slug.",
  Industries: "Industry template: hero, challenge bullets, related case studies, CTA. Driven by slug.",
  "Case studies": "Index: filterable grid (`industries_equal`, `services_equal`). Detail: hero, summary, stats, markdown body, gallery.",
  Company: "About, career, contact, schedule-meeting, collaboration, technical consultation, founder consultation.",
  Blog: "Index with category browse. Article: cover, author, date, reading time, markdown, TOC, related posts.",
  Legal: "Long-form page from CMS (`type=PAGE`) at a fixed route and via `/[slug]`.",
  Other: "Catch-all CMS page.",
};

let md = `# Site inventory

Crawled **2026-10-22** from [https://www.teacode.io/sitemap.xml](https://www.teacode.io/sitemap.xml) and each English HTML document.

- English URLs: **${pages.length}** (all HTTP 200)
- Polish locale URLs: **${pl.length}** (mirrors; i18n routes exist, copy stays English until translated)
- Source styles: Webflow shared CSS \`style-guide-82d41b.webflow.shared.062a8d311.min.css\`
- Assets are **not** hot-linked. Brand photography, client logos, and the original wordmark are placeholders under \`public/assets/\` (see \`docs/assumptions.md\`).

Outstaffing (Dedicated team, Team augmentation, Staff augmentation) does **not** have its own sitemap URLs. The live footer groups Services, Industries, and Case studies. Outstaffing links in this build point at offshore development, support & maintenance, and the freelancer collaboration page.

## Route map

| Group | Count | Template |
|---|---:|---|
${order.map((g) => `| ${g} | ${grouped[g].length} | ${templateNotes[g]} |`).join("\n")}

`;

for (const group of order) {
  md += `\n## ${group}\n\n`;
  for (const page of grouped[group]) {
    md += `### \`${page.path}\`\n\n`;
    md += `- **Title:** ${page.title}\n`;
    md += `- **Meta description:** ${page.description || "—"}\n`;
    md += `- **OG title:** ${page.ogTitle || "—"}\n`;
    md += `- **OG description:** ${page.ogDescription || "—"}\n`;
    md += `- **OG image (original, not used):** ${page.ogImage || "—"}\n`;
    md += `- **H1:** ${page.h1 || "—"}\n`;
    md += `- **Section order (H2):** ${page.h2s.length ? page.h2s.map((h) => h).join(" → ") : "—"}\n`;
    md += `- **Local route:** \`${page.path}\`\n\n`;
  }
}

md += `\n## Polish locale paths\n\nThese are served by \`src/app/pl/[[...slug]]/page.tsx\` with the same templates.\n\n`;
for (const path of pl) md += `- \`${path}\`\n`;

md += `\n## Homepage section order (verified in browser)\n\n1. Cookie banner (Customize / Reject all / Accept all → \`/cookie-policy\`)
2. Header: logo, Services, Portfolio, About, Blog, Career, Contact us
3. Hero — eyebrow, headline, subtext, primary + secondary CTA, review badge, featured case cards
4. Trusted-by logo strip
5. Where are you starting from? (two numbered columns)
6. For startups (Q&A cards) — heading on the live site: "Prove the idea first. Then build it to last"
7. What makes us different — heading: "The most expensive questions in an IT project are the ones nobody asked"
8. Industries we know inside out (tabs)
9. What we built (case-study slider with stats)
10. Testimonial
11. From our blog (3 latest)
12. Working together — heading: "Don't wait for changes. Make them with us"
13. FAQ accordion
14. Let's talk — form heading: "Tell us what you're trying to solve"
15. Footer
`;

fs.mkdirSync(new URL("../docs", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../docs/site-inventory.md", import.meta.url), md);
console.log("wrote docs/site-inventory.md", md.length);
