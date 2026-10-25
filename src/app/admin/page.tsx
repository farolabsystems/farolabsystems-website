import Link from "next/link";
import { AdminAnalytics } from "@/components/AdminAnalytics";
import { AdminChart } from "@/components/AdminChart";
import { getSiteAnalytics } from "@/lib/analytics";
import { listAdminCaseStudies } from "@/modules/case-studies/case-study.service";
import { listAdminContent } from "@/modules/content/content.service";
import { listLeads } from "@/modules/leads/lead.service";

export const dynamic = "force-dynamic";

const ZONE = "Asia/Kolkata";
const DAYS = 14;

function istDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value || 0);
  return { year: read("year"), month: read("month"), day: read("day") };
}

function shift(date: { year: number; month: number; day: number }, days: number) {
  const next = new Date(Date.UTC(date.year, date.month - 1, date.day + days));
  return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

function dayKey(date: { year: number; month: number; day: number }) {
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

function dayLabel(date: { month: number; day: number }) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(2024, date.month - 1, date.day)),
  );
}

function recentDays() {
  const today = istDate(new Date());
  return Array.from({ length: DAYS }, (_, index) => {
    const date = shift(today, index - (DAYS - 1));
    return { key: dayKey(date), label: dayLabel(date), axis: String(date.day) };
  });
}

function counts(dates: Date[], days: { key: string; label: string; axis: string }[]) {
  const totals = new Map(days.map((day) => [day.key, 0]));
  for (const date of dates) {
    const key = dayKey(istDate(date));
    if (totals.has(key)) totals.set(key, (totals.get(key) ?? 0) + 1);
  }
  return days.map((day) => ({ label: day.label, axis: day.axis, value: totals.get(day.key) ?? 0 }));
}

export default async function AdminHome() {
  const [posts, pages, studies, leads, analytics] = await Promise.all([
    listAdminContent("POST"),
    listAdminContent("PAGE"),
    listAdminCaseStudies(),
    listLeads(),
    getSiteAnalytics(),
  ]);
  const days = recentDays();
  const published = counts(
    posts.filter((post) => post.status === "PUBLISHED" && post.publishedAt).map((post) => post.publishedAt as Date),
    days,
  );
  const activity = counts(
    [...leads.map((lead) => lead.createdAt), ...pages.map((page) => page.createdAt), ...studies.map((study) => study.createdAt)],
    days,
  );
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
      <AdminAnalytics data={analytics} />
      <div className="admin-charts">
        <AdminChart title="Daily posted blogs" note="Published posts over the last 14 days, IST." points={published} />
        <AdminChart title="Daily activity" note="Inquiries, new pages, and new case studies over the last 14 days, IST." points={activity} />
      </div>
    </div>
  );
}
