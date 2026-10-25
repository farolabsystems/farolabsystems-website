import type { CatalogKind, CatalogPage, Prisma } from "@prisma/client";
import { connection } from "next/server";
import { industries as fallbackIndustries } from "@/website-theme/data/industries";
import { services as fallbackServices } from "@/website-theme/data/services";
import { technologies as fallbackTechnologies } from "@/website-theme/data/technologies";
import type { FaqItem, IndustryRecord, ServiceRecord, TechnologyIcon, TechnologyRecord } from "@/website-theme/data/types";
import { prisma } from "@/lib/db";
import type { CatalogInput } from "@/lib/validators";

type Pair = { title: string; body: string };

const groups = ["Development", "Design", "Maintenance", "Delivery"] as const;

function asPairs(value: Prisma.JsonValue): Pair[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    if (typeof record.title === "string" && typeof record.body === "string") {
      return [{ title: record.title, body: record.body }];
    }
    return [];
  });
}

function asFaqs(value: Prisma.JsonValue): FaqItem[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const record = item as Record<string, unknown>;
    if (typeof record.question === "string" && typeof record.answer === "string") {
      return [{ question: record.question, answer: record.answer }];
    }
    return [];
  });
}

function asIcon(value: Prisma.JsonValue, slug: string): TechnologyIcon {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    if (record.kind === "lucide" && typeof record.name === "string") {
      const name = record.name;
      if (name === "network" || name === "git-branch" || name === "sparkles" || name === "bot" || name === "cloud" || name === "server") {
        return { kind: "lucide", name };
      }
    }
    if (record.kind === "simple" && typeof record.slug === "string" && record.slug) {
      return { kind: "simple", slug: record.slug };
    }
  }
  return { kind: "simple", slug };
}

function asGroup(value: string): ServiceRecord["group"] {
  return groups.find((group) => group === value) ?? "Development";
}

function toService(row: CatalogPage): ServiceRecord {
  return {
    slug: row.slug,
    navLabel: row.navLabel,
    group: asGroup(row.group),
    filter: row.filter || row.navLabel,
    title: row.title,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.summary,
    eyebrow: row.eyebrow || row.group || "Services",
    summary: row.summary,
    blurb: row.blurb || row.summary,
    outcomes: asPairs(row.outcomes),
    steps: asPairs(row.steps),
    faqs: asFaqs(row.faqs),
  };
}

function toIndustry(row: CatalogPage): IndustryRecord {
  return {
    slug: row.slug,
    navLabel: row.navLabel,
    filter: row.filter || row.navLabel,
    title: row.title,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.summary,
    eyebrow: row.eyebrow || row.navLabel,
    summary: row.summary,
    bullets: row.bullets,
    faqs: asFaqs(row.faqs),
  };
}

function toTechnology(row: CatalogPage): TechnologyRecord {
  return {
    slug: row.slug,
    navLabel: row.navLabel,
    title: row.title,
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.summary,
    eyebrow: row.eyebrow || "Technology",
    summary: row.summary,
    bullets: row.bullets,
    faqs: asFaqs(row.faqs),
    icon: asIcon(row.icon, row.slug),
  };
}

function seedRows(): Prisma.CatalogPageCreateManyInput[] {
  const serviceRows = fallbackServices.map((item, index) => ({
    kind: "SERVICE" as const,
    slug: item.slug,
    navLabel: item.navLabel,
    group: item.group,
    filter: item.filter,
    title: item.title,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    eyebrow: item.eyebrow,
    summary: item.summary,
    blurb: item.blurb,
    bullets: [],
    outcomes: item.outcomes,
    steps: item.steps,
    faqs: item.faqs,
    sortOrder: index,
    status: "PUBLISHED" as const,
  }));
  const industryRows = fallbackIndustries.map((item, index) => ({
    kind: "INDUSTRY" as const,
    slug: item.slug,
    navLabel: item.navLabel,
    group: "",
    filter: item.filter,
    title: item.title,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    eyebrow: item.eyebrow,
    summary: item.summary,
    blurb: "",
    bullets: item.bullets,
    outcomes: [],
    steps: [],
    faqs: item.faqs,
    sortOrder: index,
    status: "PUBLISHED" as const,
  }));
  const technologyRows = fallbackTechnologies.map((item, index) => ({
    kind: "TECHNOLOGY" as const,
    slug: item.slug,
    navLabel: item.navLabel,
    group: "",
    filter: "",
    title: item.title,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    eyebrow: item.eyebrow,
    summary: item.summary,
    blurb: "",
    bullets: item.bullets,
    outcomes: [],
    steps: [],
    faqs: item.faqs,
    icon: item.icon,
    sortOrder: index,
    status: "PUBLISHED" as const,
  }));
  return [...serviceRows, ...industryRows, ...technologyRows];
}

async function seedIfEmpty() {
  const count = await prisma.catalogPage.count();
  if (count > 0) return;
  await prisma.catalogPage.createMany({ data: seedRows(), skipDuplicates: true });
}

async function published(kind: CatalogKind) {
  await connection();
  try {
    await seedIfEmpty();
    const rows = await prisma.catalogPage.findMany({
      where: { kind, status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    });
    if (rows.length > 0) return rows;
  } catch {
    /* The public pages stay on the file catalog until the database is reachable. */
  }
  return null;
}

export async function listServices() {
  const rows = await published("SERVICE");
  return rows ? rows.map(toService) : fallbackServices;
}

export async function listIndustries() {
  const rows = await published("INDUSTRY");
  return rows ? rows.map(toIndustry) : fallbackIndustries;
}

export async function listTechnologies() {
  const rows = await published("TECHNOLOGY");
  return rows ? rows.map(toTechnology) : fallbackTechnologies;
}

async function one(kind: CatalogKind, slug: string) {
  await connection();
  try {
    await seedIfEmpty();
    const row = await prisma.catalogPage.findUnique({ where: { kind_slug: { kind, slug } } });
    if (row?.status === "PUBLISHED") return row;
    const count = await prisma.catalogPage.count({ where: { kind } });
    if (count > 0) return null;
  } catch {
    /* fall through */
  }
  return undefined;
}

export async function getService(slug: string) {
  const row = await one("SERVICE", slug);
  if (row === undefined) return fallbackServices.find((item) => item.slug === slug) ?? null;
  return row ? toService(row) : null;
}

export async function getIndustry(slug: string) {
  const row = await one("INDUSTRY", slug);
  if (row === undefined) return fallbackIndustries.find((item) => item.slug === slug) ?? null;
  return row ? toIndustry(row) : null;
}

export async function getTechnology(slug: string) {
  const row = await one("TECHNOLOGY", slug);
  if (row === undefined) return fallbackTechnologies.find((item) => item.slug === slug) ?? null;
  return row ? toTechnology(row) : null;
}

export async function listAdminCatalog(kind: CatalogKind) {
  await seedIfEmpty();
  return prisma.catalogPage.findMany({ where: { kind }, orderBy: [{ sortOrder: "asc" }, { title: "asc" }] });
}

export async function getAdminCatalog(id: string) {
  return prisma.catalogPage.findUnique({ where: { id } });
}

export async function saveCatalog(input: CatalogInput, id?: string) {
  const data = {
    kind: input.kind,
    slug: input.slug,
    navLabel: input.navLabel,
    group: input.group ?? "",
    filter: input.filter ?? "",
    title: input.title,
    seoTitle: input.seoTitle ?? "",
    seoDescription: input.seoDescription ?? "",
    eyebrow: input.eyebrow ?? "",
    summary: input.summary,
    blurb: input.blurb ?? "",
    bullets: input.bullets ?? [],
    outcomes: input.outcomes ?? [],
    steps: input.steps ?? [],
    faqs: input.faqs ?? [],
    icon: input.icon ?? undefined,
    sortOrder: input.sortOrder ?? 0,
    status: input.status,
  };
  if (id) return prisma.catalogPage.update({ where: { id }, data });
  return prisma.catalogPage.create({ data });
}

export async function deleteCatalog(id: string) {
  return prisma.catalogPage.delete({ where: { id } });
}
