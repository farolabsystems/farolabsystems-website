import Link from "next/link";
import { Button } from "@/website-theme/ui/Button";
import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, uiCopy, withLocale } from "@/website-theme/config/site.config";
import { footerColumns, localizeHref } from "@/website-theme/data/navigation";
import { Logo } from "@/website-theme/layout/Logo";
import { LanguageSwitcher } from "@/website-theme/layout/LanguageSwitcher";
import { ScrollTop } from "@/website-theme/layout/ScrollTop";

export function SiteFooter({
  locale,
  services,
  industries,
}: {
  locale: Locale;
  services?: { label: string; href: string }[];
  industries?: { label: string; href: string }[];
}) {
  const copy = uiCopy[locale];
  const columns = [
    { title: "Services", links: services ?? [...footerColumns.services] },
    { title: "Solutions", links: [...footerColumns.solutions] },
    { title: "Industries", links: industries ?? [...footerColumns.industries] },
    { title: "Company", links: [...footerColumns.company] },
  ];
  return (
    <footer className="footer">
      <div className="container grid gap-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="heading-4 max-w-[22ch]" style={{ color: "var(--tc-footer-text)" }}>
            {siteConfig.footerHeadline}
          </h2>
          <Button href={withLocale(locale, "/contact")}>{siteConfig.footerCta}</Button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <div className="grid content-start gap-3">
            <div className="[&_span]:text-[var(--tc-footer-text)]">
              <Logo locale={locale} />
            </div>
            <address className="body-sm not-italic" style={{ color: "var(--tc-footer-text)" }}>
              {siteConfig.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {siteConfig.taxNumber ? <span className="mt-2 block">tax no: {siteConfig.taxNumber}</span> : null}
              {siteConfig.phone ? <span className="mt-2 block">{siteConfig.phone}</span> : null}
              <a className="mt-2 block" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </address>
            <Link href={withLocale(locale, "/schedule-meeting")}>{copy.schedule}</Link>
            {siteConfig.directories.length ? (
              <div className="flex flex-wrap gap-2">
                {siteConfig.directories.map((item) => (
                  <a key={item.label} className="badge" href={item.href} rel="noreferrer">
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title} className="grid content-start gap-3">
                <p className="caption" style={{ color: "color-mix(in srgb, var(--tc-footer-text) 68%, transparent)", letterSpacing: "var(--tc-tracking-eyebrow)", textTransform: "uppercase" }}>
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <Link key={link.href + link.label} href={localizeHref(locale, link.href)} className="body-sm">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 border-t border-white/15 pt-6 md:grid-cols-[1fr_auto] md:items-center">
          <p className="body-sm">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={withLocale(locale, "/privacy-policy")} className="body-sm">
              {copy.privacy}
            </Link>
            <Link href={withLocale(locale, "/cookie-policy")} className="body-sm">
              {copy.cookies}
            </Link>
            <LanguageSwitcher />
            {siteConfig.socials.length ? (
              <div className="flex gap-3">
                {siteConfig.socials.map((item) => (
                  <a key={item.label} href={item.href} rel="noreferrer" aria-label={item.label} className="body-sm">
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ScrollTop label={copy.scrollTop} />
    </footer>
  );
}
