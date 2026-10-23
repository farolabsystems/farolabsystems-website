import Link from "next/link";
import { listAdminCaseStudies } from "@/modules/case-studies/case-study.service";
import { listAdminContent } from "@/modules/content/content.service";
import { listLeads } from "@/modules/leads/lead.service";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [posts, pages, studies, leads] = await Promise.all([
    listAdminContent("POST"),
    listAdminContent("PAGE"),
    listAdminCaseStudies(),
    listLeads(),
  ]);
  const cards = [
    { href: "/admin/posts", label: "Posts", count: posts.length, note: `${posts.filter((item) => item.status === "PUBLISHED").length} published` },
    { href: "/admin/pages", label: "Pages", count: pages.length, note: `${pages.filter((item) => item.status === "PUBLISHED").length} published` },
    { href: "/admin/case-studies", label: "Case studies", count: studies.length, note: `${studies.filter((item) => item.featured).length} featured` },
    { href: "/admin/leads", label: "Inquiries", count: leads.length, note: "Contact form" },
    { href: "/admin/settings", label: "SEO", count: "Site", note: "Title and description" },
  ];
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="heading-4">Overview</h1>
        <p className="body muted mt-2">Edit published content, search listings, and inquiries from one place.</p>
      </div>
      <div className="admin-stats">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="admin-stat">
            <p className="caption">{card.label}</p>
            <p className="heading-4">{card.count}</p>
            <p className="body-sm muted">{card.note}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
