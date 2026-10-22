import fs from "fs";
import path from "path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const crawlDir = path.join(root, ".crawl");
fs.mkdirSync(crawlDir, { recursive: true });

const response = await fetch("https://www.teacode.io/sitemap.xml");
if (!response.ok) {
  console.error(`Sitemap request failed: ${response.status}`);
  process.exit(1);
}
fs.writeFileSync(path.join(crawlDir, "sitemap.xml"), await response.text());

for (const file of ["fetch-pages.mjs", "write-inventory.mjs"]) {
  const result = spawnSync(process.execPath, [path.join(root, "scripts", file)], { stdio: "inherit" });
  if (result.status) process.exit(result.status ?? 1);
}

console.log("Inventory refreshed in docs/site-inventory.md");
