"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { localizeHref } from "@/website-theme/data/navigation";

type Item = { href: string; label: string; description?: string };
type Group = { title: string; items: Item[] };
type ServiceItem = {
  href: string;
  label: string;
  title: string;
  summary: string;
  technologies: { href: string; label: string }[];
};

export function MegaMenu({
  label,
  groups,
  featured,
  seeAll,
  services,
  locale,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  groups: Group[];
  featured?: { href: string; title: string; summary: string }[];
  seeAll?: { href: string; label: string };
  services?: ServiceItem[];
  locale: Locale;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeHref, setActiveHref] = useState(services?.[0]?.href ?? "");
  const active = services?.find((item) => item.href === activeHref) ?? services?.[0];

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!open || services?.length) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, services]);

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
    <div
      className={services?.length ? "mega mega-services" : "mega"}
      role="region"
      aria-label={label}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      {services?.length && active ? (
        <div className="mega-services-card">
          <div className="mega-services-list" role="list">
            {services.map((item) => (
              <Link
                key={item.href}
                href={localizeHref(locale, item.href)}
                role="listitem"
                className={item.href === active.href ? "is-active" : undefined}
                onMouseEnter={() => setActiveHref(item.href)}
                onFocus={() => setActiveHref(item.href)}
                onClick={onClose}
              >
                <span>{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3.5 L10.5 8 L6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
          <div key={active.href} className="mega-services-detail">
            <Link href={localizeHref(locale, active.href)} onClick={onClose}>
              <h3 className="heading-6">{active.title}</h3>
            </Link>
            <p className="body muted mt-3 max-w-[52ch]">{active.summary}</p>
            <ul className="mega-services-tech">
              {active.technologies.map((item) => (
                <li key={item.href + item.label}>
                  <Link href={localizeHref(locale, item.href)} onClick={onClose}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {seeAll ? (
              <Link href={localizeHref(locale, seeAll.href)} className="text-link body-sm mt-6 inline-flex" onClick={onClose}>
                {seeAll.label} →
              </Link>
            ) : null}
          </div>
        </div>
      ) : (
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
      )}
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
