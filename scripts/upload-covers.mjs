import fs from "fs";
import path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const env = Object.fromEntries(
  fs
    .readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split(/\r?\n/)
    .filter((line) => line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1).replace(/^"|"$/g, "")];
    }),
);

const client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const dir = new URL("../public/assets/covers/", import.meta.url);
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".jpg"));
const map = {};
for (const name of files) {
  const key = `blog/covers/${name}`;
  const body = fs.readFileSync(new URL(name, dir));
  await client.send(
    new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: "image/jpeg",
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  map[`/assets/covers/${name}`] = `/media/${key}`;
  console.log(name, "->", map[`/assets/covers/${name}`]);
}

const seedPath = new URL("../prisma/seed-data.json", import.meta.url);
let seed = fs.readFileSync(seedPath, "utf8");
for (const [from, to] of Object.entries(map)) seed = seed.replaceAll(from, to);
fs.writeFileSync(seedPath, seed);
console.log("seed paths updated", Object.keys(map).length);
