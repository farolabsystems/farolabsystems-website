"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { industrySection, industryTabs } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { ChipRail } from "@/website-theme/ui/ChipRail";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";

export function Industries({ locale, studies }: { locale: Locale; studies: CaseStudyRecord[] }) {
  const [active, setActive] = useState(industryTabs[0]?.id ?? "");
  const reduce = useReducedMotion();
  const tab = industryTabs.find((item) => item.id === active) ?? industryTabs[0];
  const related = studies.find((study) => study.slug === tab.caseSlug);
  return (
    <section className="section surface">
      <Container>
        <Eyebrow>{industrySection.eyebrow}</Eyebrow>
        <h2 className="heading-2 max-w-[18ch]">{industrySection.title}</h2>
        <p className="body-lg muted mt-4 max-w-[62ch]">{industrySection.body}</p>
        <ChipRail className="mt-8" trackRole="tablist" label="Industries">
          {industryTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={item.id === tab.id}
              aria-controls={`panel-${item.id}`}
              className="chip"
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          ))}
        </ChipRail>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            className="mt-8 grid items-center gap-6 lg:grid-cols-2"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-4">
              <h3 className="heading-4">{tab.title}</h3>
              <ul className="grid gap-2">
                {tab.bullets.map((bullet) => (
                  <li key={bullet} className="body">
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link href={withLocale(locale, tab.href)} className="text-link body-sm w-fit">
                Explore this industry →
              </Link>
              {related ? (
                <Link href={withLocale(locale, `/case-studies/${related.slug}`)} className="text-link body-sm w-fit">
                  Related work: {related.title}
                </Link>
              ) : null}
            </div>
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={related?.cover ?? "/assets/covers/cover-1.jpg"}
                alt=""
                width={800}
                height={560}
                className="w-full rounded-[var(--tc-radius-card)] object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
