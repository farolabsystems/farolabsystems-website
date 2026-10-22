import {
  CreateBucketCommand,
  GetObjectCommand,
  NoSuchBucket,
  NoSuchKey,
  PutObjectCommand,
  S3Client,
  type BucketLocationConstraint,
} from "@aws-sdk/client-s3";

const MAX_BYTES = 8 * 1024 * 1024;

type ImageKind = { ext: string; mime: string };

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error("S3 is not configured");
  return value;
}

function client() {
  return new S3Client({
    region: required("AWS_REGION"),
    credentials: {
      accessKeyId: required("AWS_ACCESS_KEY_ID"),
      secretAccessKey: required("AWS_SECRET_ACCESS_KEY"),
    },
  });
}

export function sniffImage(bytes: Buffer): ImageKind | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", mime: "image/jpeg" };
  }
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { ext: "png", mime: "image/png" };
  }
  if (bytes.length >= 6) {
    const gif = bytes.subarray(0, 6).toString("ascii");
    if (gif === "GIF87a" || gif === "GIF89a") return { ext: "gif", mime: "image/gif" };
  }
  if (
    bytes.length >= 12 &&
    bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
    bytes.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { ext: "webp", mime: "image/webp" };
  }
  if (bytes.length >= 12 && bytes.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = bytes.subarray(8, 12).toString("ascii");
    if (brand === "avif" || brand === "avis") return { ext: "avif", mime: "image/avif" };
  }
  return null;
}

function slugPart(value: string) {
  const clean = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return clean.slice(0, 80) || "post";
}

function fileStem(name: string) {
  const base = name.replace(/\.[a-z0-9]+$/i, "");
  return slugPart(base).slice(0, 60);
}

export function mediaKey(parts: string[]) {
  if (parts.some((part) => !part || part === "." || part === "..")) return null;
  const key = parts.join("/");
  if (!/^blog\/[a-z0-9][a-z0-9./_-]{0,220}$/.test(key)) return null;
  return key;
}

export async function uploadBlogImage(fileName: string, slug: string, bytes: Buffer) {
  if (bytes.length === 0 || bytes.length > MAX_BYTES) {
    throw new Error("Use an image smaller than 8 MB");
  }
  const kind = sniffImage(bytes);
  if (!kind) throw new Error("Use a JPG, PNG, WEBP, GIF, or AVIF image");
  const key = `blog/${slugPart(slug)}/${fileStem(fileName)}-${Date.now()}.${kind.ext}`;
  const s3 = client();
  const bucket = required("AWS_S3_BUCKET");
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: bytes,
    ContentType: kind.mime,
    CacheControl: "public, max-age=31536000, immutable",
  });
  try {
    await s3.send(command);
  } catch (cause) {
    if (!(cause instanceof NoSuchBucket)) throw cause;
    await s3.send(
      new CreateBucketCommand({
        Bucket: bucket,
        CreateBucketConfiguration: { LocationConstraint: required("AWS_REGION") as BucketLocationConstraint },
      }),
    );
    await s3.send(command);
  }
  return { key, url: `/media/${key}`, mime: kind.mime };
}

export async function readBlogImage(key: string) {
  const safe = mediaKey(key.split("/"));
  if (!safe) return null;
  try {
    const result = await client().send(new GetObjectCommand({ Bucket: required("AWS_S3_BUCKET"), Key: safe }));
    if (!result.Body) return null;
    const bytes = Buffer.from(await result.Body.transformToByteArray());
    return { bytes, mime: result.ContentType || "application/octet-stream" };
  } catch (cause) {
    if (cause instanceof NoSuchKey) return null;
    throw cause;
  }
}
