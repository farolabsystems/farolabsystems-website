import Image from "next/image";
import Link from "next/link";
import { withLocale, type Locale } from "@/website-theme/config/site.config";

const logoStyle = { height: "var(--tc-logo, var(--tc-space-7))", width: "auto" } as const;

export function Logo({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link href={withLocale(locale, "/")} className="inline-flex items-center" aria-label="Farolab Systems">
      <Image
        src="/assets/brand/logo.png"
        alt=""
        width={2172}
        height={724}
        priority
        className="logo-on-light"
        style={logoStyle}
      />
      <span className="logo-mark">
        <Image
          src="/assets/brand/logo.png"
          alt=""
          width={2172}
          height={724}
          priority
          className="logo-on-dark"
        />
      </span>
    </Link>
  );
}
