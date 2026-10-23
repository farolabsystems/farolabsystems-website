import Image from "next/image";
import Link from "next/link";
import { withLocale, type Locale } from "@/website-theme/config/site.config";

const logoStyle = { height: "var(--tc-logo, var(--tc-space-7))", width: "auto" } as const;

export function Logo({ locale = "en" }: { locale?: Locale }) {
  return (
    <Link href={withLocale(locale, "/")} className="inline-flex items-center" aria-label="Farolab Systems">
      <Image
        src="/assets/brand/logo-header.png"
        alt=""
        width={1024}
        height={341}
        priority
        className="logo-on-light"
        style={logoStyle}
      />
      <Image
        src="/assets/brand/logo-wordmark-v2.png"
        alt=""
        width={818}
        height={197}
        className="logo-on-dark"
        style={logoStyle}
      />
    </Link>
  );
}
