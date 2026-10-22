import Link from "next/link";
import { listAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function PagesAdminPage() {
  const pages = await listAdminContent("PAGE");
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-4">Pages</h1>
        <Link className="btn" href="/admin/pages/new">
          New page
        </Link>
      </div>
      <ul className="grid gap-2">
        {pages.map((page) => (
          <li key={page.id}>
            <Link className="card block" href={`/admin/pages/${page.id}`}>
              <span className="body">{page.title}</span>
              <span className="caption ml-3">/{page.slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
