"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { uiCopy, withLocale } from "@/website-theme/config/site.config";
import { localizeHref } from "@/website-theme/data/navigation";
import { Button } from "@/website-theme/ui/Button";

type Item = { href: string; label: string };
type Group = { title: string; items: Item[] };

export function MobileMenu({
  open,
  onClose,
  locale,
  groups,
}: {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  groups: Group[];
}) {
  const copy = uiCopy[locale];
  const [opened, setOpened] = useState<string | null>(groups[0]?.title ?? null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;
  return (
    <div id="mobile-menu" className="mobile-menu lg:hidden">
      <div className="container grid gap-2 py-6">
        {groups.map((group) => (
          <div key={group.title} style={{ borderBottom: "1px solid var(--tc-border-strong)" }}>
            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left"
              aria-expanded={opened === group.title}
              onClick={() => setOpened(opened === group.title ? null : group.title)}
            >
              <span className="body">{group.title}</span>
              <span aria-hidden="true">{opened === group.title ? "–" : "+"}</span>
            </button>
            {opened === group.title ? (
              <div className="grid gap-3 pb-4">
                {group.items.map((item) => (
                  <Link key={item.href + item.label} href={localizeHref(locale, item.href)} onClick={onClose} className="body-sm">
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <Link href={withLocale(locale, "/about-us")} onClick={onClose} className="py-3">
          {copy.about}
        </Link>
        <Link href={withLocale(locale, "/blog")} onClick={onClose} className="py-3">
          {copy.blog}
        </Link>
        <Link href={withLocale(locale, "/career")} onClick={onClose} className="py-3">
          {copy.career}
        </Link>
        <Button href={withLocale(locale, "/contact")}>{copy.contact}</Button>
      </div>
    </div>
  );
}
