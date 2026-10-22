import fs from "fs";

const xml = fs.readFileSync(new URL("../.crawl/sitemap.xml", import.meta.url), "utf8");
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const en = locs.filter((u) => !new URL(u).pathname.startsWith("/pl"));
fs.writeFileSync(new URL("../.crawl/urls-en.json", import.meta.url), JSON.stringify(en, null, 2));

function clean(s) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function meta(html, key) {
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${key}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${key}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return clean(m[1]);
  }
  return "";
}

async function one(url) {
  const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 site-inventory" } });
  const html = await res.text();
  const title = clean((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "");
  const h1 = clean((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || "").slice(0, 220);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => clean(m[1]))
    .filter(Boolean)
    .slice(0, 14);
  const classes = [...html.matchAll(/class="([^"]+)"/g)]
    .flatMap((m) => m[1].split(/\s+/))
    .filter((c) => /section|hero|faq|slider|footer|navbar|form|card|tab/i.test(c));
  const componentSet = [...new Set(classes)].slice(0, 40);
  return {
    url,
    path: new URL(url).pathname,
    status: res.status,
    title,
    description: meta(html, "description"),
    ogTitle: meta(html, "og:title"),
    ogDescription: meta(html, "og:description"),
    ogImage: meta(html, "og:image"),
    h1,
    h2s,
    components: componentSet,
  };
}

const queue = [...en];
const out = [];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const url = queue.shift();
    try {
      const row = await one(url);
      out.push(row);
      console.error(`ok ${out.length}/${en.length} ${url}`);
    } catch (error) {
      out.push({ url, path: new URL(url).pathname, error: String(error) });
      console.error(`fail ${url}`);
    }
  }
});

await Promise.all(workers);
out.sort((a, b) => a.path.localeCompare(b.path));
fs.writeFileSync(new URL("../.crawl/inventory.json", import.meta.url), JSON.stringify(out, null, 2));
console.log("done", out.length);
