import { notFound } from "next/navigation";
import type { Locale } from "@/website-theme/config/site.config";
import { services } from "@/website-theme/data/services";
import { listCaseStudies } from "@/modules/case-studies/case-study.service";
import { PageHero } from "@/website-theme/sections/PageHero";
import { Faq } from "@/website-theme/sections/Faq";
import { CtaBanner } from "@/website-theme/sections/CtaBanner";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";
import Link from "next/link";
import { withLocale } from "@/website-theme/config/site.config";

export function getService(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}

export async function ServicePage({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const service = getService(slug);
  if (!service) notFound();
  const studies = (await listCaseStudies()).filter((study) => study.services.includes(service.filter));
  return (
    <>
      <PageHero locale={locale} eyebrow={service.eyebrow} title={service.title} body={service.summary} />
      <Section tone="white">
        <Container>
          <h2 className="heading-3">What you leave with</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.outcomes.map((item, index) => (
              <article key={item.title} className="card grid gap-2">
                <p className="caption">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="heading-6">{item.title}</h3>
                <p className="body muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="heading-3">How an engagement runs</h2>
          <ol className="mt-8 grid gap-4">
            {service.steps.map((step, index) => (
              <li key={step.title} className="grid gap-2 md:grid-cols-[80px_1fr]" style={{ borderTop: "1px solid var(--tc-border-strong)", paddingTop: "var(--tc-space-4)" }}>
                <span className="heading-5" style={{ color: "var(--tc-primary-active)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="heading-5">{step.title}</h3>
                  <p className="body muted mt-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="alt" tight>
        <Container>
          <h2 className="heading-4">Related work</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {studies.slice(0, 3).map((study) => (
              <li key={study.slug}>
                <Link href={withLocale(locale, `/case-studies/${study.slug}`)} className="card block">
                  {study.title}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Faq locale={locale} items={service.faqs} />
      <CtaBanner locale={locale} title="Start with the problem." body={service.blurb} />
    </>
  );
}
