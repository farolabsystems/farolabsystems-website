import type { Locale } from "@/website-theme/config/site.config";
import { PageHero } from "@/website-theme/sections/PageHero";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

const steps = [
  { title: "Tell us the craft", body: "Design, engineering, or a specialty we do not keep in house." },
  { title: "A paid trial slice", body: "One small piece of a live project, with a clear definition of done." },
  { title: "Stay while it fits", body: "Longer work is possible when the trial is calm on both sides." },
];

export function CollaborationPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow="Freelancers"
        title="Work with us on a slice of a client project"
        body="Placeholder freelancer page. Replace the terms, rates, and process with yours."
      />
      <Section tone="white">
        <Container>
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="card">
                <p className="caption">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="heading-5 mt-2">{step.title}</h2>
                <p className="body muted mt-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <LetsTalk />
    </>
  );
}
