import { notFound } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { CaseStudyForm } from "@/components/CaseStudyForm";
import { getAdminCaseStudy } from "@/modules/case-studies/case-study.service";

export const dynamic = "force-dynamic";

function firstStat(value: Prisma.JsonValue) {
  if (!Array.isArray(value) || !value[0] || typeof value[0] !== "object" || Array.isArray(value[0])) {
    return { value: "", label: "" };
  }
  const record = value[0] as Record<string, unknown>;
  return {
    value: typeof record.value === "string" ? record.value : "",
    label: typeof record.label === "string" ? record.label : "",
  };
}

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const study = await getAdminCaseStudy(id);
  if (!study) notFound();
  const stat = firstStat(study.stats);
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">Edit case study</h1>
      <CaseStudyForm
        initial={{
          id: study.id,
          slug: study.slug,
          title: study.title,
          summary: study.summary,
          industries: study.industries.join(", "),
          services: study.services.join(", "),
          statValue: stat.value,
          statLabel: stat.label,
          body: study.body,
          cover: study.cover ?? "",
          gallery: study.gallery.join(", "),
          featured: study.featured,
          sortOrder: study.sortOrder,
          status: study.status,
        }}
      />
    </div>
  );
}
