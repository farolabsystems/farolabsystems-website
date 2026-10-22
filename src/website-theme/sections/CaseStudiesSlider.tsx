"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, withLocale } from "@/website-theme/config/site.config";
import { caseStudiesSection } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { Container } from "@/website-theme/ui/Container";
import { StatCounter } from "@/website-theme/ui/StatCounter";

export function CaseStudiesSlider({ locale, studies }: { locale: Locale; studies: CaseStudyRecord[] }) {
  const slides = caseStudiesSection.slugs
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudyRecord => Boolean(study));
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const slide = slides[index];
  if (!slide) return null;

  return (
    <section className="section">
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
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8 grid items-center gap-8 lg:grid-cols-2"
          >
            <Image src={slide.cover} alt="" width={900} height={640} className="w-full rounded-[var(--tc-radius-card-lg)] object-cover" />
            <div className="grid gap-4">
              <p className="caption">{siteConfig.demoCaseStudyLabel}</p>
              <h3 className="heading-3">{slide.title}</h3>
              <p className="body muted">{slide.summary}</p>
              <div className="grid grid-cols-3 gap-3">
                {slide.stats.map((stat) => (
                  <StatCounter key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
              <Link href={withLocale(locale, `/case-studies/${slide.slug}`)} style={{ color: "var(--tc-primary-active)" }}>
                Read case study →
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="mt-6 flex gap-2">
          <button type="button" className="btn btn-ghost" onClick={() => setIndex((value) => (value - 1 + slides.length) % slides.length)}>
            Previous
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setIndex((value) => (value + 1) % slides.length)}>
            Next
          </button>
        </div>
      </Container>
    </section>
  );
}
