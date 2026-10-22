"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

const links = [
  ["/admin/posts", "Posts"],
  ["/admin/pages", "Pages"],
  ["/admin/case-studies", "Case studies"],
  ["/admin/leads", "Leads"],
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-page text-ink">{children}</div>;
  }
  return (
    <div className="min-h-screen bg-page text-ink lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="surface grid content-start gap-2 p-6" style={{ borderRight: "1px solid var(--tc-border)" }}>
        <p className="heading-6">Admin</p>
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="nav-link" aria-current={pathname.startsWith(href) ? "page" : undefined}>
            {label}
          </Link>
        ))}
        <Link className="nav-link" href="/">
          View site
        </Link>
        <LogoutButton />
      </aside>
      <div className="p-6 md:p-10">{children}</div>
    </div>
  );
}
