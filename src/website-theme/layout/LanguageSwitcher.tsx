"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const pathname = usePathname() || "/";
  const isPl = pathname === "/pl" || pathname.startsWith("/pl/");
  const rest = isPl ? pathname.replace(/^\/pl/, "") || "/" : pathname;
  const polish = rest === "/" ? "/pl" : `/pl${rest}`;
  const color = tone === "dark" ? "var(--tc-footer-text)" : "var(--tc-text)";
  return (
    <div className="flex gap-3" aria-label="Site language">
      <Link href={rest} hrefLang="en" aria-current={!isPl ? "page" : undefined} style={{ color, fontWeight: isPl ? 400 : 600 }}>
        English
      </Link>
      <Link href={polish} hrefLang="pl" aria-current={isPl ? "page" : undefined} style={{ color, fontWeight: isPl ? 600 : 400 }}>
        Polski
      </Link>
    </div>
  );
}
