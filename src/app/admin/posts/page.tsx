import Link from "next/link";
import { AdminTable, type AdminRow } from "@/components/AdminTable";
import { listAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function PostsAdminPage() {
  const posts = await listAdminContent("POST");
  const rows: AdminRow[] = posts.map((post) => ({
    id: post.id,
    href: `/admin/posts/${post.id}`,
    deleteUrl: `/api/admin/content/${post.id}`,
    search: `${post.title} ${post.slug} ${post.category ?? ""}`,
    status: post.status,
    cells: {
      title: post.title,
      slug: post.slug,
      category: post.category || "—",
      status: post.status === "PUBLISHED" ? "Published" : "Draft",
      updated: post.updatedAt.toISOString().slice(0, 10),
    },
  }));
  return (
    <div className="grid gap-4">
      <div className="admin-toolbar">
        <div>
          <h1 className="heading-4">Posts</h1>
          <p className="body-sm muted mt-1">Articles, covers, and search listings.</p>
        </div>
        <Link className="btn" href="/admin/posts/new">
          New post
        </Link>
      </div>
      <AdminTable
        columns={[
          { key: "title", label: "Title" },
          { key: "slug", label: "Slug" },
          { key: "category", label: "Category" },
          { key: "status", label: "Status" },
          { key: "updated", label: "Updated" },
        ]}
        rows={rows}
        empty="No posts match this view."
      />
    </div>
  );
}
