import type { Locale } from "@/website-theme/config/site.config";
import { aboutPage } from "@/website-theme/data/team";
import { PageHero } from "@/website-theme/sections/PageHero";
import { CtaBanner } from "@/website-theme/sections/CtaBanner";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function AboutPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero locale={locale} eyebrow={aboutPage.eyebrow} title={aboutPage.title} body={aboutPage.body} />
      <Section>
        <Container>
          <h2 className="heading-3">{aboutPage.approachTitle}</h2>
          <p className="body-lg muted mt-4 max-w-[68ch]">{aboutPage.approach}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aboutPage.values.map((value, index) => (
              <article key={value.title} className="grid gap-2">
                <p className="caption">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="heading-5">{value.title}</h3>
                <p className="body muted">{value.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner locale={locale} title="Have a project in mind?" body="Tell us what you are trying to build, modernize, or scale." />
    </>
  );
}
