"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Building2, Cpu, ExternalLink, FileText, Inbox, LayoutDashboard, LogOut, Menu, Scale, Search, Wrench, X } from "lucide-react";
import { AdminToastProvider } from "@/components/AdminToast";
import { LogoutButton } from "@/components/LogoutButton";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blogs", icon: FileText },
  { href: "/admin/pages", label: "Terms & privacy", icon: Scale },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/industries", label: "Industries", icon: Building2 },
  { href: "/admin/technologies", label: "Technologies", icon: Cpu },
  { href: "/admin/case-studies", label: "Case studies", icon: Briefcase },
  { href: "/admin/leads", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "SEO", icon: Search },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="admin-app">
      <header className="admin-header">
        <button
          type="button"
          className="admin-burger"
          aria-expanded={open}
          aria-controls="admin-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
          {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
        <Link href="/admin/posts" className="admin-logo" aria-label="Farolab Systems">
          <span className="admin-logo-mark">
            <Image src="/assets/brand/logo.png" alt="" width={2172} height={724} priority />
          </span>
        </Link>
        <p className="caption admin-header-note">Admin</p>
      </header>
      <div className="admin-frame">
        <nav id="admin-menu" className={open ? "admin-nav is-open" : "admin-nav"} aria-label="Admin">
          {links.map(({ href, label, icon: Icon }) => {
            const current = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className="admin-link" aria-current={current ? "page" : undefined}>
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
          <span className="admin-nav-spacer" />
          <Link className="admin-link" href="/">
            <ExternalLink size={18} strokeWidth={1.75} aria-hidden="true" />
            View site
          </Link>
          <LogoutButton className="admin-link">
            <LogOut size={18} strokeWidth={1.75} aria-hidden="true" />
            Log out
          </LogoutButton>
        </nav>
        <main className="admin-main">
          <AdminToastProvider>{children}</AdminToastProvider>
        </main>
      </div>
    </div>
  );
}
