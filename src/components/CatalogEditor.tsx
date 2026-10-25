import { notFound } from "next/navigation";
import type { CatalogKind, Prisma } from "@prisma/client";
import { CatalogForm, type CatalogDraft, type CatalogKindName } from "@/components/CatalogForm";
import { bulletLines, faqLines, pairLines } from "@/lib/catalog-lines";
import { getAdminCatalog } from "@/modules/catalog/catalog.service";

const titles: Record<CatalogKindName, string> = {
  SERVICE: "service",
  INDUSTRY: "industry",
  TECHNOLOGY: "technology",
};

function iconDraft(value: Prisma.JsonValue | null) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    if (record.kind === "lucide" && typeof record.name === "string") return { iconKind: "lucide" as const, iconValue: record.name };
    if (record.kind === "simple" && typeof record.slug === "string") return { iconKind: "simple" as const, iconValue: record.slug };
  }
  return { iconKind: "simple" as const, iconValue: "" };
}

export function emptyCatalogDraft(kind: CatalogKindName): CatalogDraft {
  return {
    kind,
    slug: "",
    navLabel: "",
    group: kind === "SERVICE" ? "Development" : "",
    filter: "",
    title: "",
    seoTitle: "",
    seoDescription: "",
    eyebrow: "",
    summary: "",
    blurb: "",
    bullets: "",
    outcomes: "",
    steps: "",
    faqs: "",
    iconKind: "simple",
    iconValue: "",
    sortOrder: 0,
    status: "DRAFT",
  };
}

export async function CatalogEditor({ kind, id }: { kind: CatalogKind; id?: string }) {
  const noun = titles[kind];
  if (!id) {
    return (
      <div className="grid gap-4">
        <h1 className="heading-4">New {noun}</h1>
        <CatalogForm initial={emptyCatalogDraft(kind)} />
      </div>
    );
  }
  const row = await getAdminCatalog(id);
  if (!row || row.kind !== kind) notFound();
  const icon = iconDraft(row.icon);
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">Edit {noun}</h1>
      <CatalogForm
        initial={{
          id: row.id,
          kind,
          slug: row.slug,
          navLabel: row.navLabel,
          group: row.group,
          filter: row.filter,
          title: row.title,
          seoTitle: row.seoTitle,
          seoDescription: row.seoDescription,
          eyebrow: row.eyebrow,
          summary: row.summary,
          blurb: row.blurb,
          bullets: bulletLines(row.bullets),
          outcomes: pairLines(row.outcomes),
          steps: pairLines(row.steps),
          faqs: faqLines(row.faqs),
          iconKind: icon.iconKind,
          iconValue: icon.iconValue,
          sortOrder: row.sortOrder,
          status: row.status,
        }}
      />
    </div>
  );
}
