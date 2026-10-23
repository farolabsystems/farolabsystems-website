import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { siteSettingsSchema } from "@/lib/validators";
import { getSiteSettings, saveSiteSettings } from "@/modules/settings/site-settings.service";

async function guard() {
  try {
    await requireAdmin();
    return null;
  } catch {
    return error("Unauthorized", 401);
  }
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return json(await getSiteSettings());
}

export async function PUT(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const parsed = siteSettingsSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return error(parsed.error.issues[0]?.message ?? "Invalid", 422);
  const row = await saveSiteSettings(parsed.data);
  return json({ seoTitle: row.seoTitle, seoDescription: row.seoDescription });
}
