"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, withLocale } from "@/website-theme/config/site.config";
import { heroCategories } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { CoverImage } from "@/website-theme/ui/CoverImage";

const SCROLL_MS = 2500;

export function HeroCards({ locale, cards }: { locale: Locale; cards: CaseStudyRecord[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scroller.current;
    if (!node || cards.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };
    node.addEventListener("mouseenter", pause);
    node.addEventListener("mouseleave", resume);
    node.addEventListener("focusin", pause);
    node.addEventListener("focusout", resume);

    const timer = window.setInterval(() => {
      if (paused || document.hidden) return;
      const el = scroller.current;
      const card = el?.firstElementChild;
      if (!el || !(card instanceof HTMLElement)) return;
      const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
      const step = card.getBoundingClientRect().width + gap;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 8) return;
      const atEnd = el.scrollLeft >= max - 8;
      el.scrollTo({ left: atEnd ? 0 : Math.min(el.scrollLeft + step, max), behavior: "smooth" });
    }, SCROLL_MS);

    return () => {
      window.clearInterval(timer);
      node.removeEventListener("mouseenter", pause);
      node.removeEventListener("mouseleave", resume);
      node.removeEventListener("focusin", pause);
      node.removeEventListener("focusout", resume);
    };
  }, [cards.length]);

  return (
    <div ref={scroller} className="scroll-x-hide mt-10 flex gap-4 px-[7.5vw] pb-2">
      {cards.map((card, index) => (
        <Link
          key={card.slug}
          href={withLocale(locale, `/case-studies/${card.slug}`)}
          className="card card-lg grid min-w-[260px] flex-1 gap-3"
        >
          <div className="media-frame">
            <CoverImage src={card.cover} alt={card.title} sizes="280px" />
          </div>
          <p className="caption">{siteConfig.demoCaseStudyLabel}</p>
          <div className="flex items-end justify-between gap-3">
            <span className="heading-6">{card.title}</span>
            <span className="caption">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <p className="caption">{heroCategories[card.slug] ?? card.industries[0]}</p>
          <p className="body-sm muted">{card.summary}</p>
        </Link>
      ))}
    </div>
  );
}
