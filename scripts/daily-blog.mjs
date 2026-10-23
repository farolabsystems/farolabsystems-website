import { readFileSync } from "node:fs";

function loadEnv() {
  try {
    const text = readFileSync(".env", "utf8");
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      let value = match[2];
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[match[1]] = value;
    }
  } catch {
    /* The process may already have the variables. */
  }
}

loadEnv();

const secret = process.env.CRON_SECRET?.trim();
const url = process.env.BLOG_CRON_URL?.trim() || "http://127.0.0.1:3000/api/cron/daily-blog";
if (!secret) {
  console.error("CRON_SECRET is not set");
  process.exit(1);
}

const response = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${secret}` },
});
const body = await response.text();
console.log(response.status, body.slice(0, 500));
if (!response.ok) process.exit(1);
