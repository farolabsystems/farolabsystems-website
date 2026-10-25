import type { Locale } from "@/website-theme/config/site.config";
import type { TechnologyRecord } from "@/website-theme/data/types";
import { PageHero } from "@/website-theme/sections/PageHero";
import { Faq } from "@/website-theme/sections/Faq";
import { CtaBanner } from "@/website-theme/sections/CtaBanner";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";
import { TechIcon } from "@/website-theme/ui/TechIcon";

export function TechnologyPage({ technology, locale = "en" }: { technology: TechnologyRecord; locale?: Locale }) {

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={technology.eyebrow}
        title={technology.title}
        body={technology.summary}
      />
      <Section tone="white">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip" style={{ cursor: "default" }}>
              <TechIcon icon={technology.icon} size={18} />
              {technology.navLabel}
            </span>
          </div>
          <h2 className="heading-3 mt-8">How we use it</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {technology.bullets.map((bullet, index) => (
              <li key={bullet} className="card">
                <span className="caption">{String(index + 1).padStart(2, "0")}</span>
                <p className="heading-6 mt-2">{bullet}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Faq locale={locale} items={technology.faqs} />
      <CtaBanner
        locale={locale}
        title={`Planning something with ${technology.navLabel}?`}
        body="Tell us what the product needs to do, and we will help you choose the right next step — with or without this technology."
      />
    </>
  );
}
