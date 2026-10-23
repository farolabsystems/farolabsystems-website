import Link from "next/link";
import { AdminTable, type AdminRow } from "@/components/AdminTable";
import { listAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function PagesAdminPage() {
  const pages = await listAdminContent("PAGE");
  const rows: AdminRow[] = pages.map((page) => ({
    id: page.id,
    href: `/admin/pages/${page.id}`,
    deleteUrl: `/api/admin/content/${page.id}`,
    search: `${page.title} ${page.slug}`,
    status: page.status,
    cells: {
      title: page.title,
      slug: `/${page.slug}`,
      status: page.status === "PUBLISHED" ? "Published" : "Draft",
      updated: page.updatedAt.toISOString().slice(0, 10),
    },
  }));
  return (
    <div className="grid gap-4">
      <div className="admin-toolbar">
        <div>
          <h1 className="heading-4">Pages</h1>
          <p className="body-sm muted mt-1">Legal pages and other static content.</p>
        </div>
        <Link className="btn" href="/admin/pages/new">
          New page
        </Link>
      </div>
      <AdminTable
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Path" },
          { key: "status", label: "Status" },
          { key: "updated", label: "Updated" },
        ]}
        rows={rows}
        empty="No pages match this view."
      />
    </div>
  );
}
