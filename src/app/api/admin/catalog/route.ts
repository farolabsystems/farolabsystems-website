import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { catalogSchema } from "@/lib/validators";
import { listAdminCatalog, saveCatalog } from "@/modules/catalog/catalog.service";
import type { CatalogKind } from "@prisma/client";

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
  const kind = new URL(request.url).searchParams.get("kind");
  if (kind !== "SERVICE" && kind !== "INDUSTRY" && kind !== "TECHNOLOGY") return error("Unknown type", 400);
  return json(await listAdminCatalog(kind as CatalogKind));
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const parsed = catalogSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return error(parsed.error.issues[0]?.message ?? "Invalid", 422);
  try {
    return json(await saveCatalog(parsed.data), 201);
  } catch (cause) {
    console.error(cause);
    return error("Could not save. The slug may already exist.", 409);
  }
}
