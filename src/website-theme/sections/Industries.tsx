"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { industryTabs } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";

export function Industries({ locale, studies }: { locale: Locale; studies: CaseStudyRecord[] }) {
  const [active, setActive] = useState(industryTabs[0]?.id ?? "");
  const tab = industryTabs.find((item) => item.id === active) ?? industryTabs[0];
  const related = studies.find((study) => study.slug === tab.caseSlug);
  return (
    <section className="section surface">
      <Container>
        <Eyebrow>Industries</Eyebrow>
        <h2 className="heading-2 max-w-[16ch]">Industries we know inside out</h2>
        <div className="mt-8 flex gap-2 overflow-x-auto" role="tablist" aria-label="Industries">
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
        </div>
        <div
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          className="mt-8 grid items-center gap-8 lg:grid-cols-2"
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
            <Link href={withLocale(locale, tab.href)} style={{ color: "var(--tc-primary-active)" }}>
              Explore this industry →
            </Link>
            {related ? (
              <Link href={withLocale(locale, `/case-studies/${related.slug}`)} className="body-sm">
                Related work: {related.title}
              </Link>
            ) : null}
          </div>
          <Image
            src={related?.cover ?? "/assets/covers/cover-1.png"}
            alt=""
            width={800}
            height={560}
            className="w-full rounded-[var(--tc-radius-card)] object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
