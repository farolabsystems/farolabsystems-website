import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { contentSchema } from "@/lib/validators";
import { listAdminContent, saveContent } from "@/modules/content/content.service";
import type { ContentType } from "@prisma/client";

async function guard() {
  try {
    await requireAdmin();
    return null;
  } catch {
    return error("Unauthorized", 401);
  }
}

export async function GET(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const type = new URL(request.url).searchParams.get("type");
  if (type !== "POST" && type !== "PAGE") return error("Unknown type", 400);
  const rows = await listAdminContent(type as ContentType);
  return json(rows);
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const parsed = contentSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return error(parsed.error.issues[0]?.message ?? "Invalid", 422);
  try {
    const row = await saveContent(parsed.data);
    return json(row, 201);
  } catch (cause) {
    console.error(cause);
    return error("Could not save. The slug may already exist.", 409);
  }
}
