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
      <Link
        href={rest}
        hrefLang="en"
        aria-current={!isPl ? "page" : undefined}
        className="body-sm"
        style={{ color, fontWeight: isPl ? 400 : 600, opacity: isPl ? 0.72 : 1, transition: "opacity var(--tc-duration) var(--tc-ease)" }}
      >
        English
      </Link>
      <Link
        href={polish}
        hrefLang="pl"
        aria-current={isPl ? "page" : undefined}
        className="body-sm"
        style={{ color, fontWeight: isPl ? 600 : 400, opacity: isPl ? 1 : 0.72, transition: "opacity var(--tc-duration) var(--tc-ease)" }}
      >
        Polski
      </Link>
    </div>
  );
}
