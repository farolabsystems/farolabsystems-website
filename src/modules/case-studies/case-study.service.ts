import type { CaseStudy, Prisma } from "@prisma/client";
import { connection } from "next/server";
import { caseStudies as fallbackStudies } from "@/website-theme/data/case-studies";
import type { CaseStudyRecord, Stat } from "@/website-theme/data/types";
import { prisma } from "@/lib/db";
import type { CaseStudyInput } from "@/lib/validators";

function asStats(value: Prisma.JsonValue): Stat[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    if (typeof record.value === "string" && typeof record.label === "string") {
      return [{ value: record.value, label: record.label }];
    }
    return [];
  });
}

function toRecord(row: CaseStudy): CaseStudyRecord {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    industries: row.industries,
    services: row.services,
    stats: asStats(row.stats),
    body: row.body,
    cover: row.cover || "/assets/covers/cover-1.jpg",
    gallery: row.gallery.length ? row.gallery : [row.cover || "/assets/covers/cover-1.jpg"],
    featured: row.featured,
    sortOrder: row.sortOrder,
  };
}

export async function listCaseStudies() {
  await connection();
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    });
    if (rows.length > 0) return rows.map(toRecord);
  } catch {
    /* fall through */
  }
  return [...fallbackStudies].sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
}

export async function getCaseStudy(slug: string) {
  await connection();
  try {
    const row = await prisma.caseStudy.findUnique({ where: { slug } });
    if (row?.status === "PUBLISHED") return toRecord(row);
    const count = await prisma.caseStudy.count();
    if (count > 0) return null;
  } catch {
    /* fall through */
  }
  return fallbackStudies.find((study) => study.slug === slug) ?? null;
}

export async function listAdminCaseStudies() {
  return prisma.caseStudy.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getAdminCaseStudy(id: string) {
  return prisma.caseStudy.findUnique({ where: { id } });
}

export async function saveCaseStudy(input: CaseStudyInput, id?: string) {
  const data = {
    slug: input.slug,
    title: input.title,
    summary: input.summary,
    industries: input.industries,
    services: input.services,
    stats: input.stats,
    body: input.body,
    cover: input.cover || null,
    gallery: input.gallery ?? [],
    featured: input.featured ?? false,
    sortOrder: input.sortOrder ?? 0,
    status: input.status,
    publishedAt: input.status === "PUBLISHED" ? new Date() : null,
  };
  if (id) {
    const current = await prisma.caseStudy.findUnique({ where: { id } });
    return prisma.caseStudy.update({
      where: { id },
      data: {
        ...data,
        publishedAt: input.status === "PUBLISHED" ? current?.publishedAt ?? new Date() : null,
      },
    });
  }
  return prisma.caseStudy.create({ data });
}

export async function deleteCaseStudy(id: string) {
  return prisma.caseStudy.delete({ where: { id } });
}
