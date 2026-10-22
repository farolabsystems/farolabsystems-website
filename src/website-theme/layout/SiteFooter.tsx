import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, uiCopy, withLocale } from "@/website-theme/config/site.config";
import { footerColumns, localizeHref } from "@/website-theme/data/navigation";
import { Logo } from "@/website-theme/layout/Logo";
import { LanguageSwitcher } from "@/website-theme/layout/LanguageSwitcher";
import { ScrollTop } from "@/website-theme/layout/ScrollTop";

const columns = [
  { title: "Services", links: footerColumns.services },
  { title: "Outstaffing", links: footerColumns.outstaffing },
  { title: "Industries", links: footerColumns.industries },
  { title: "Case studies", links: footerColumns.caseStudies },
] as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = uiCopy[locale];
  return (
    <footer className="footer">
      <div className="container grid gap-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <div className="grid content-start gap-4">
            <div className="[&_span]:text-[var(--tc-footer-text)]">
              <Logo locale={locale} />
            </div>
            <address className="body-sm not-italic" style={{ color: "var(--tc-footer-text)" }}>
              {siteConfig.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-2 block">tax no: {siteConfig.taxNumber}</span>
              <a className="mt-2 block" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </address>
            <Link href={withLocale(locale, "/schedule-meeting")}>{copy.schedule}</Link>
            <div className="flex flex-wrap gap-2">
              {siteConfig.directories.map((item) => (
                <a key={item.label} className="badge" href={item.href} rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title} className="grid content-start gap-3">
                <p className="caption" style={{ color: "var(--tc-primary)", letterSpacing: "var(--tc-tracking-eyebrow)", textTransform: "uppercase" }}>
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
          <div className="grid gap-2">
            <Link href={withLocale(locale, "/collaboration")} className="body">
              {copy.freelancer}
            </Link>
            <p className="body-sm">
              {siteConfig.copyright} © {siteConfig.codedWith}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={withLocale(locale, "/privacy-policy")} className="body-sm">
              {copy.privacy}
            </Link>
            <Link href={withLocale(locale, "/cookie-policy")} className="body-sm">
              {copy.cookies}
            </Link>
            <LanguageSwitcher />
            <div className="flex gap-3">
              {siteConfig.socials.map((item) => (
                <a key={item.label} href={item.href} rel="noreferrer" aria-label={item.label} className="body-sm">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ScrollTop label={copy.scrollTop} />
    </footer>
  );
}
