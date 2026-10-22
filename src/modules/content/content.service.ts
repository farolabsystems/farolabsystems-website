import type { Content, ContentType, PublishStatus } from "@prisma/client";
import { connection } from "next/server";
import { legalPages } from "@/website-theme/data/pages";
import { posts as fallbackPosts } from "@/website-theme/data/posts";
import type { PostRecord } from "@/website-theme/data/types";
import { prisma } from "@/lib/db";
import type { ContentInput } from "@/lib/validators";

function toRecord(row: Content): PostRecord {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    coverImage: row.coverImage || "/assets/covers/cover-1.png",
    coverAlt: row.coverAlt || row.title,
    author: row.author || "Editorial team",
    category: row.category || "Notes",
    tags: row.tags,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.excerpt,
    publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function listPosts() {
  await connection();
  try {
    const rows = await prisma.content.findMany({
      where: { type: "POST", status: "PUBLISHED", locale: "en" },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length > 0) return rows.map(toRecord);
  } catch {
    /* Database is optional until Docker or a local Postgres is running. */
  }
  return [...fallbackPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string) {
  await connection();
  try {
    const row = await prisma.content.findUnique({
      where: { type_slug_locale: { type: "POST", slug, locale: "en" } },
    });
    if (row?.status === "PUBLISHED") return toRecord(row);
    const count = await prisma.content.count({ where: { type: "POST" } });
    if (count > 0) return null;
  } catch {
    /* fall through */
  }
  return fallbackPosts.find((post) => post.slug === slug) ?? null;
}

export async function getPage(slug: string) {
  await connection();
  try {
    const row = await prisma.content.findUnique({
      where: { type_slug_locale: { type: "PAGE", slug, locale: "en" } },
    });
    if (row?.status === "PUBLISHED") return toRecord(row);
    const count = await prisma.content.count({ where: { type: "PAGE" } });
    if (count > 0) return null;
  } catch {
    /* fall through */
  }
  return legalPages.find((page) => page.slug === slug) ?? null;
}

export async function relatedPosts(slug: string, category: string) {
  const all = await listPosts();
  const same = all.filter((post) => post.slug !== slug && post.category === category);
  const rest = all.filter((post) => post.slug !== slug && post.category !== category);
  return [...same, ...rest].slice(0, 3);
}

export async function listAdminContent(type: ContentType) {
  return prisma.content.findMany({ where: { type }, orderBy: { updatedAt: "desc" } });
}

export async function getAdminContent(id: string) {
  return prisma.content.findUnique({ where: { id } });
}

export async function saveContent(input: ContentInput, id?: string) {
  const data = {
    type: input.type,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt ?? "",
    body: input.body,
    coverImage: input.coverImage || null,
    coverAlt: input.coverAlt ?? "",
    author: input.author || null,
    category: input.category || null,
    tags: input.tags ?? [],
    seoTitle: input.seoTitle || null,
    seoDescription: input.seoDescription || null,
    status: input.status as PublishStatus,
    publishedAt: input.status === "PUBLISHED" ? new Date() : null,
  };
  if (id) {
    const current = await prisma.content.findUnique({ where: { id } });
    return prisma.content.update({
      where: { id },
      data: {
        ...data,
        publishedAt: input.status === "PUBLISHED" ? current?.publishedAt ?? new Date() : null,
      },
    });
  }
  return prisma.content.create({ data });
}

export async function deleteContent(id: string) {
  return prisma.content.delete({ where: { id } });
}
