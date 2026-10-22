import Link from "next/link";
import { listAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function PagesAdminPage() {
  const pages = await listAdminContent("PAGE");
  return (
    <div className="grid gap-4">
      <div className="admin-toolbar">
        <h1 className="heading-4">Pages</h1>
        <Link className="btn" href="/admin/pages/new">
          New page
        </Link>
      </div>
      <ul className="admin-list">
        {pages.map((page) => (
          <li key={page.id}>
            <Link className="admin-item" href={`/admin/pages/${page.id}`}>
              <span className="admin-item-media" />
              <span className="admin-item-copy">
                <span className="body">{page.title}</span>
                <span className="caption">/{page.slug}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {pages.length === 0 ? <p className="body muted">No pages yet.</p> : null}
    </div>
  );
}
