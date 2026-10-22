import { readBlogImage } from "@/lib/s3";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  try {
    const image = await readBlogImage(key.join("/"));
    if (!image) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(image.bytes), {
      headers: {
        "Content-Type": image.mime,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (cause) {
    console.error(cause);
    return new Response("Image unavailable", { status: 502 });
  }
}
