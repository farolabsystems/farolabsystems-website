import Link from "next/link";
import { siteConfig, withLocale, type Locale } from "@/website-theme/config/site.config";

export function Logo({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link href={withLocale(locale, "/")} className="inline-flex items-center gap-3" aria-label={siteConfig.name}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="10" fill="var(--tc-primary)" />
        <path d="M10 22V10h7.2a4.6 4.6 0 0 1 0 9.2H14" fill="none" stroke="var(--tc-text)" strokeWidth="2" />
      </svg>
      <span className="body" style={{ fontWeight: 600, letterSpacing: "0.04em" }}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
