import type { Locale } from "@/website-theme/config/site.config";
import { collaborationPage } from "@/website-theme/data/team";
import { workingTogether } from "@/website-theme/data/home";
import { PageHero } from "@/website-theme/sections/PageHero";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function CollaborationPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero locale={locale} eyebrow={collaborationPage.eyebrow} title={collaborationPage.title} body={collaborationPage.body} />
      <Section id="capabilities" tone="alt">
        <Container>
          <div className="mt-0 grid gap-5 md:grid-cols-2">
            {collaborationPage.models.map((model, index) => (
              <article key={model.title} className="card grid gap-3">
                <p className="caption" style={{ color: "var(--tc-accent)" }}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="heading-5">{model.title}</h2>
                <p className="body muted">{model.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section id="blueprint" tone="white">
        <Container>
          <div className="section-head">
            <Eyebrow>{workingTogether.eyebrow}</Eyebrow>
            <h2 className="heading-2">{workingTogether.title}</h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {workingTogether.steps.map((step) => (
              <li key={step.index} className="card grid gap-3">
                <span className="step-badge">STEP {step.index}</span>
                <h3 className="heading-6">{step.title}</h3>
                <p className="body-sm muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <LetsTalk />
    </>
  );
}
