"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, withLocale } from "@/website-theme/config/site.config";
import { caseStudiesSection } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { Container } from "@/website-theme/ui/Container";
import { CoverImage } from "@/website-theme/ui/CoverImage";
import { StatCounter } from "@/website-theme/ui/StatCounter";

const SLIDE_MS = 5000;

export function CaseStudiesSlider({ locale, studies }: { locale: Locale; studies: CaseStudyRecord[] }) {
  const slides = caseStudiesSection.slugs
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudyRecord => Boolean(study));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const slide = slides[index];

  useEffect(() => {
    if (reduce || paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((value) => (value + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [paused, reduce, slides.length]);

  if (!slide) return null;

  return (
    <section
      className="section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) setPaused(false);
      }}
    >
      <Container>
        <h2 className="heading-2 max-w-[16ch]">{caseStudiesSection.title}</h2>
        <p className="body-lg muted mt-4 max-w-[62ch]">{caseStudiesSection.body}</p>
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Case studies">
          {slides.map((item, itemIndex) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              className="chip"
              onClick={() => setIndex(itemIndex)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.article
            key={slide.slug}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid items-center gap-6 lg:grid-cols-2"
          >
            <div className="media-frame media-frame--lg">
              <CoverImage src={slide.cover} alt={slide.title} sizes="(max-width: 1024px) 100vw, 540px" />
            </div>
            <div className="grid gap-4">
              <p className="caption">{siteConfig.demoCaseStudyLabel}</p>
              <h3 className="heading-3">{slide.title}</h3>
              <p className="body muted">{slide.summary}</p>
              <div className="stat-row">
                {slide.stats.map((stat) => (
                  <StatCounter key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
              <Link href={withLocale(locale, `/case-studies/${slide.slug}`)} className="text-link body-sm w-fit">
                Read case study →
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
      </Container>
    </section>
  );
}
