"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { localizeHref } from "@/website-theme/data/navigation";

type Item = { href: string; label: string; description?: string };
type Group = { title: string; items: Item[] };

export function MegaMenu({
  label,
  groups,
  featured,
  seeAll,
  locale,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  groups: Group[];
  featured?: { href: string; title: string; summary: string }[];
  seeAll?: { href: string; label: string };
  locale: Locale;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function openMenu() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    onOpen();
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      onClose();
    }, 160);
  }

  const panel = open ? (
    <div className="mega" role="region" aria-label={label} onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
          <div className="container grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <div key={group.title} className="grid content-start gap-3">
                  <p className="caption" style={{ letterSpacing: "var(--tc-tracking-eyebrow)", textTransform: "uppercase" }}>
                    {group.title}
                  </p>
                  {group.items.map((item) => (
                    <Link key={item.href + item.label} href={localizeHref(locale, item.href)} className="grid gap-1" onClick={onClose}>
                      <span className="body" style={{ fontWeight: 600 }}>
                        {item.label}
                      </span>
                      {item.description ? <span className="body-sm muted">{item.description}</span> : null}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            {featured?.length ? (
              <div className="grid gap-3">
                {featured.map((item) => (
                  <Link key={item.href} href={localizeHref(locale, item.href)} className="card" onClick={onClose}>
                    <p className="body" style={{ fontWeight: 600 }}>
                      {item.title}
                    </p>
                    <p className="body-sm muted mt-2">{item.summary}</p>
                  </Link>
                ))}
                {seeAll ? (
                  <Link href={localizeHref(locale, seeAll.href)} className="text-link body-sm w-fit" onClick={onClose}>
                    {seeAll.label} →
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
    </div>
  ) : null;

  return (
    <div className="mega-item relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <button type="button" className="nav-link" aria-expanded={open} aria-haspopup="true" onClick={() => (open ? onClose() : openMenu())}>
        {label} <span aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>
      {mounted && panel ? createPortal(panel, document.body) : null}
    </div>
  );
}
