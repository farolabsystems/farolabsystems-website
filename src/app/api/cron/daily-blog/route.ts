import { timingSafeEqual } from "node:crypto";
import { error, json } from "@/lib/http";
import { runDailyBlog } from "@/modules/blog/generate-blog";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function authorized(request: Request) {
  const expected = process.env.CRON_SECRET?.trim();
  if (!expected) return false;
  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : request.headers.get("x-cron-secret")?.trim() || "";
  const left = Buffer.from(token);
  const right = Buffer.from(expected);
  if (left.length !== right.length || left.length === 0) return false;
  return timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  if (!authorized(request)) return error("Unauthorized", 401);
  let slot = Number.NaN;
  try {
    const body = (await request.json()) as { slot?: unknown };
    slot = Number(body?.slot);
  } catch {
    slot = Number.NaN;
  }
  try {
    const post = await runDailyBlog(slot);
    return json({ ok: true, ...post });
  } catch (cause) {
    console.error(cause);
    const message = cause instanceof Error ? cause.message : "Could not generate the daily post";
    return error(message, 500);
  }
}
