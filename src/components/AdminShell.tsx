"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

const links = [
  ["/admin/posts", "Posts"],
  ["/admin/pages", "Pages"],
  ["/admin/case-studies", "Case studies"],
  ["/admin/leads", "Inquiries"],
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
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7 H20 M4 12 H20 M4 17 H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
        <Link href="/admin/posts" className="admin-logo" aria-label="Farolab Systems">
          <Image src="/assets/brand/logo-header.png" alt="" width={942} height={224} priority />
        </Link>
        <p className="caption admin-header-note">Admin</p>
      </header>
      <div className="admin-frame">
        <nav id="admin-menu" className={open ? "admin-nav is-open" : "admin-nav"} aria-label="Admin">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="admin-link" aria-current={pathname.startsWith(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}
          <span className="admin-nav-spacer" />
          <Link className="admin-link" href="/">
            View site
          </Link>
          <LogoutButton className="admin-link" />
        </nav>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
