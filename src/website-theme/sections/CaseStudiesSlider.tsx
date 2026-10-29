import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { caseStudiesSection } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";
import { StatCounter } from "@/website-theme/ui/StatCounter";

export function CaseStudiesSlider({ locale, studies }: { locale: Locale; studies: CaseStudyRecord[] }) {
  const cards = caseStudiesSection.slugs
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudyRecord => Boolean(study))
    .slice(0, 3);

  if (!cards.length) return null;

  return (
    <Section id="case-studies" tone="white">
      <Container>
        <div className="section-head">
          <Eyebrow>{caseStudiesSection.eyebrow}</Eyebrow>
          <h2 className="heading-2">{caseStudiesSection.title}</h2>
          <p className="body-lg muted mt-3">{caseStudiesSection.body}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((study) => (
            <article key={study.slug} className="card grid gap-4">
              <p className="caption">{study.industries[0] || study.services[0] || "Case study"}</p>
              <h3 className="heading-5">{study.title}</h3>
              <p className="body-sm muted">{study.summary}</p>
              <div className="stat-row" style={{ borderTop: "1px solid var(--tc-border-strong)", paddingTop: "var(--tc-space-4)" }}>
                {study.stats.slice(0, 2).map((stat) => (
                  <StatCounter key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
              <Link href={withLocale(locale, `/case-studies/${study.slug}`)} className="text-link body-sm w-fit">
                Read case study →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
