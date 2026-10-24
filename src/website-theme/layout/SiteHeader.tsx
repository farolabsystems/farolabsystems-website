"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/website-theme/config/site.config";
import { uiCopy, withLocale } from "@/website-theme/config/site.config";
import { portfolioIndustries } from "@/website-theme/data/navigation";
import { portfolioMenu } from "@/website-theme/data/portfolio-menu";
import { serviceMenu } from "@/website-theme/data/service-menu";
import { services } from "@/website-theme/data/services";
import { caseStudies } from "@/website-theme/data/case-studies";
import { Button } from "@/website-theme/ui/Button";
import { Logo } from "@/website-theme/layout/Logo";
import { MegaMenu } from "@/website-theme/layout/MegaMenu";
import { MobileMenu } from "@/website-theme/layout/MobileMenu";

const groups = ["Development", "Design", "Maintenance", "Delivery"] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = uiCopy[locale];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "portfolio" | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const serviceGroups = groups
    .map((title) => ({
      title,
      items: services
        .filter((service) => service.group === title)
        .map((service) => ({
          href: `/services/${service.slug}`,
          label: service.navLabel,
          description: service.blurb,
        })),
    }))
    .filter((group) => group.items.length > 0);

  const featuredStudies = caseStudies.filter((study) => study.featured).slice(0, 2);

  const mobileGroups = [
    ...serviceGroups,
    {
      title: copy.portfolio,
      items: [
        ...portfolioIndustries,
        ...featuredStudies.map((study) => ({ label: study.title, href: `/case-studies/${study.slug}` })),
        { label: copy.seeAll, href: "/case-studies" },
      ],
    },
  ];

  return (
    <header className={`site-header ${scrolled || openMenu || mobile ? "is-solid" : ""}`}>
      <div className="header-bar">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <MegaMenu
            label={copy.services}
            groups={serviceGroups}
            services={serviceMenu}
            locale={locale}
            open={openMenu === "services"}
            onOpen={() => setOpenMenu("services")}
            onClose={() => setOpenMenu(null)}
          />
          <MegaMenu
            label={copy.portfolio}
            groups={[{ title: "Industries", items: portfolioIndustries }]}
            services={portfolioMenu}
            seeAll={{ href: "/case-studies", label: copy.seeAll }}
            locale={locale}
            open={openMenu === "portfolio"}
            onOpen={() => setOpenMenu("portfolio")}
            onClose={() => setOpenMenu(null)}
          />
          <Link className="nav-link" href={withLocale(locale, "/about-us")}>
            {copy.about}
          </Link>
          <Link className="nav-link" href={withLocale(locale, "/blog")}>
            {copy.blog}
          </Link>
          <Link className="nav-link" href={withLocale(locale, "/career")}>
            {copy.career}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden lg:inline-flex">
            <Button href={withLocale(locale, "/contact")}>{copy.contact}</Button>
          </span>
          <button
            type="button"
            className="menu-toggle lg:hidden"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile((value) => !value)}
          >
            <span className="sr-only">{mobile ? "Close menu" : "Menu"}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              {mobile ? (
                <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7 H20 M4 12 H20 M4 17 H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} locale={locale} groups={mobileGroups} />
    </header>
  );
}
