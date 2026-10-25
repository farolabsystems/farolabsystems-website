import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import type { IndustryRecord } from "@/website-theme/data/types";
import { listCaseStudies } from "@/modules/case-studies/case-study.service";
import { PageHero } from "@/website-theme/sections/PageHero";
import { Faq } from "@/website-theme/sections/Faq";
import { CtaBanner } from "@/website-theme/sections/CtaBanner";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export async function IndustryPage({ industry, locale = "en" }: { industry: IndustryRecord; locale?: Locale }) {
  const studies = (await listCaseStudies()).filter((study) => study.industries.includes(industry.filter));
  return (
    <>
      <PageHero locale={locale} eyebrow={industry.eyebrow} title={industry.title} body={industry.summary} />
      <Section tone="white">
        <Container>
          <h2 className="heading-3">Where the work usually sits</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {industry.bullets.map((bullet, index) => (
              <li key={bullet} className="card">
                <span className="caption">{String(index + 1).padStart(2, "0")}</span>
                <p className="heading-6 mt-2">{bullet}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="heading-4">Related work</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {studies.slice(0, 6).map((study) => (
              <li key={study.slug}>
                <Link href={withLocale(locale, `/case-studies/${study.slug}`)} className="card block">
                  {study.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Faq locale={locale} items={industry.faqs} />
      <CtaBanner locale={locale} title={`Building for ${industry.navLabel}?`} body="Tell us what the product needs to do, and we will help you shape the next step." />
    </>
  );
}
