import Link from "next/link";
import { AdminTable, type AdminRow } from "@/components/AdminTable";
import { listAdminCaseStudies } from "@/modules/case-studies/case-study.service";

export const dynamic = "force-dynamic";

export default async function CaseStudiesAdminPage() {
  const studies = await listAdminCaseStudies();
  const rows: AdminRow[] = studies.map((study) => ({
    id: study.id,
    href: `/admin/case-studies/${study.id}`,
    viewHref: study.status === "PUBLISHED" ? `/case-studies/${study.slug}` : undefined,
    deleteUrl: `/api/admin/case-studies/${study.id}`,
    search: `${study.title} ${study.slug} ${study.industries.join(" ")}`,
    status: study.status,
    cells: {
      title: study.title,
      slug: study.slug,
      industry: study.industries[0] || "—",
      featured: study.featured ? "Yes" : "No",
      status: study.status === "PUBLISHED" ? "Published" : "Draft",
    },
  }));
  return (
    <div className="grid gap-4">
      <div className="admin-toolbar">
        <div>
          <h1 className="heading-4">Case studies</h1>
          <p className="body-sm muted mt-1">Project stories, covers, and search listings.</p>
        </div>
        <Link className="btn" href="/admin/case-studies/new">
          New case study
        </Link>
      </div>
      <AdminTable
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "industry", label: "Industry" },
          { key: "featured", label: "Featured" },
          { key: "status", label: "Status" },
        ]}
        rows={rows}
        empty="No case studies match this view."
      />
    </div>
  );
}
