"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/website-theme/config/site.config";
import { uiCopy } from "@/website-theme/config/site.config";
import { SiteHeader } from "@/website-theme/layout/SiteHeader";
import { SiteFooter } from "@/website-theme/layout/SiteFooter";
import { CookieBanner } from "@/website-theme/layout/CookieBanner";
import type { SiteNav } from "@/website-theme/layout/site-nav";

export function SiteChrome({ children, nav }: { children: ReactNode; nav?: SiteNav }) {
  const pathname = usePathname() || "/";
  const locale: Locale = pathname === "/pl" || pathname.startsWith("/pl/") ? "pl" : "en";
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader locale={locale} nav={nav} />
      {locale === "pl" && uiCopy.pl.localeNote ? (
        <p className="body-sm container py-3" style={{ background: "var(--tc-primary-soft)" }}>
          {uiCopy.pl.localeNote}
        </p>
      ) : null}
      <main id="content">{children}</main>
      <SiteFooter
        locale={locale}
        services={nav?.services.map((item) => ({ label: item.navLabel, href: `/services/${item.slug}` }))}
        industries={nav?.industries.map((item) => ({ label: item.navLabel, href: `/industries/${item.slug}` }))}
      />
      <CookieBanner locale={locale} />
    </>
  );
}
