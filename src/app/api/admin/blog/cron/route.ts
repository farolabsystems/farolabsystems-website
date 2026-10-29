import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { getBlogCronEnabled, setBlogCronEnabled } from "@/modules/settings/site-settings.service";

const bodySchema = z.object({
  enabled: z.boolean(),
});

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
  return json({ enabled: await getBlogCronEnabled() });
}

export async function PUT(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return error("Choose whether the blog cron is on or off", 422);
  try {
    const row = await setBlogCronEnabled(parsed.data.enabled);
    return json({ enabled: row.blogCronEnabled });
  } catch (cause) {
    console.error(cause);
    return error("Could not update the blog cron setting", 500);
  }
}
