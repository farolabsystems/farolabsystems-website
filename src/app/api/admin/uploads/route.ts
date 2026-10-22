import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { uploadBlogImage } from "@/lib/s3";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return error("Unauthorized", 401);
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const alt = String(form?.get("alt") ?? "").trim();
  const slug = String(form?.get("slug") ?? "");
  if (!(file instanceof File)) return error("Choose an image", 422);
  if (alt.length < 2 || alt.length > 180) {
    return error("Describe the image in a short sentence so search engines can read it.", 422);
  }

  try {
    const stored = await uploadBlogImage(file.name || "image", slug, Buffer.from(await file.arrayBuffer()));
    return json({ url: stored.url, alt });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Could not store the image";
    if (message === "S3 is not configured" || message.startsWith("Use ")) return error(message, 422);
    console.error(cause);
    return error("Could not store the image. Check the S3 bucket and credentials.", 502);
  }
}
