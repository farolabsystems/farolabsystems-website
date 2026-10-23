import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { getGenerationJob, startManualGeneration } from "@/modules/blog/generate-blog";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function guard() {
  try {
    await requireAdmin();
    return null;
  } catch {
    return error("Unauthorized", 401);
  }
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const body = (await request.json().catch(() => null)) as { prompt?: unknown } | null;
  const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
  if (prompt.length < 8) return error("Enter a prompt first.", 422);
  if (prompt.length > 1000) return error("Use a shorter prompt.", 422);
  try {
    const job = startManualGeneration(prompt);
    return json({ id: job.id, status: job.status, message: job.message }, 202);
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Could not start generation";
    return error(message, 409);
  }
}

export async function GET(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const id = new URL(request.url).searchParams.get("id") || "";
  const job = getGenerationJob(id);
  if (!job) return error("That generation is no longer running.", 404);
  return json({
    id: job.id,
    status: job.status,
    message: job.message,
    draft: job.draft ?? null,
  });
}
