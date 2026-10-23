import fs from "fs";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync(new URL("./seed-data.json", import.meta.url), "utf8"));
const pagesSource = fs.readFileSync(new URL("../src/website-theme/data/pages.ts", import.meta.url), "utf8");

function legalPages() {
  const matches = [...pagesSource.matchAll(/slug: "([^"]+)"[\s\S]*?title: "([^"]+)"[\s\S]*?excerpt: "([^"]+)"[\s\S]*?seoTitle: "([^"]+)"[\s\S]*?seoDescription: "([^"]+)"[\s\S]*?body: `([\s\S]*?)`/g)];
  return matches.map((match) => ({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    seoTitle: match[4],
    seoDescription: match[5],
    body: match[6].trim(),
  }));
}

const hash = bcrypt.hash ?? bcrypt.default?.hash;
if (typeof hash !== "function") {
  throw new Error("bcryptjs hash is unavailable");
}

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "Farolab@2026";
  const passwordHash = await hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name: "Admin" },
    create: {
      email,
      name: "Admin",
      passwordHash,
    },
  });

  for (const post of data.posts) {
    await prisma.content.upsert({
      where: { type_slug_locale: { type: "POST", slug: post.slug, locale: "en" } },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        author: post.author,
        category: post.category,
        tags: post.tags,
        coverImage: post.coverImage,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        status: "PUBLISHED",
        publishedAt: new Date(post.publishedAt),
      },
      create: {
        type: "POST",
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        coverImage: post.coverImage,
        author: post.author,
        category: post.category,
        tags: post.tags,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        status: "PUBLISHED",
        publishedAt: new Date(post.publishedAt),
      },
    });
  }

  for (const page of legalPages()) {
    await prisma.content.upsert({
      where: { type_slug_locale: { type: "PAGE", slug: page.slug, locale: "en" } },
      update: {
        title: page.title,
        excerpt: page.excerpt,
        body: page.body,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-15T00:00:00.000Z"),
      },
      create: {
        type: "PAGE",
        slug: page.slug,
        title: page.title,
        excerpt: page.excerpt,
        body: page.body,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-15T00:00:00.000Z"),
        author: "Farolab Systems",
        category: "Legal",
      },
    });
  }

  const studySlugs = data.caseStudies.map((study) => study.slug);
  await prisma.caseStudy.deleteMany({ where: { slug: { notIn: studySlugs } } });

  for (const study of data.caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: study.slug },
      update: {
        title: study.title,
        summary: study.summary,
        industries: study.industries,
        services: study.services,
        stats: study.stats,
        body: study.body,
        cover: study.cover,
        gallery: study.gallery,
        featured: study.featured,
        sortOrder: study.sortOrder,
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-15T00:00:00.000Z"),
      },
      create: {
        slug: study.slug,
        title: study.title,
        summary: study.summary,
        industries: study.industries,
        services: study.services,
        stats: study.stats,
        body: study.body,
        cover: study.cover,
        gallery: study.gallery,
        featured: study.featured,
        sortOrder: study.sortOrder,
        status: "PUBLISHED",
        publishedAt: new Date("2026-01-15T00:00:00.000Z"),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
