import Link from "next/link";
import type { CatalogKind } from "@prisma/client";
import { AdminTable, type AdminRow } from "@/components/AdminTable";
import { listAdminCatalog } from "@/modules/catalog/catalog.service";

const copy: Record<CatalogKind, { title: string; note: string; noun: string; href: string; view: string }> = {
  SERVICE: {
    title: "Services",
    note: "Each service is a public page under /services. Add, edit, or remove them here.",
    noun: "service",
    href: "/admin/services",
    view: "/services",
  },
  INDUSTRY: {
    title: "Industries",
    note: "Each industry is a public page under /industries. Add, edit, or remove them here.",
    noun: "industry",
    href: "/admin/industries",
    view: "/industries",
  },
  TECHNOLOGY: {
    title: "Technologies",
    note: "Each technology is a public page under /technologies. Add, edit, or remove them here.",
    noun: "technology",
    href: "/admin/technologies",
    view: "/technologies",
  },
};

export async function CatalogAdminList({ kind }: { kind: CatalogKind }) {
  const items = await listAdminCatalog(kind);
  const meta = copy[kind];
  const rows: AdminRow[] = items.map((item) => ({
    id: item.id,
    href: `${meta.href}/${item.id}`,
    viewHref: item.status === "PUBLISHED" ? `${meta.view}/${item.slug}` : undefined,
    deleteUrl: `/api/admin/catalog/${item.id}`,
    search: `${item.title} ${item.navLabel} ${item.slug}`,
    status: item.status,
    cells: {
      title: item.navLabel,
      slug: item.slug,
      group: item.group || item.filter || item.eyebrow || "—",
      status: item.status === "PUBLISHED" ? "Published" : "Draft",
    },
  }));
  return (
    <div className="grid gap-4">
      <div className="admin-toolbar">
        <div>
          <h1 className="heading-4">{meta.title}</h1>
          <p className="body-sm muted mt-1">{meta.note}</p>
        </div>
        <Link className="btn" href={`${meta.href}/new`}>
          New {meta.noun}
        </Link>
      </div>
      <AdminTable
        columns={[
          { key: "title", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "group", label: kind === "SERVICE" ? "Group" : "Label" },
          { key: "status", label: "Status" },
        ]}
        rows={rows}
        empty={`No ${meta.title.toLowerCase()} match this view.`}
      />
    </div>
  );
}
