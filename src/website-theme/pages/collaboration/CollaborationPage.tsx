import type { Locale } from "@/website-theme/config/site.config";
import { collaborationPage } from "@/website-theme/data/team";
import { PageHero } from "@/website-theme/sections/PageHero";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function CollaborationPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero locale={locale} eyebrow={collaborationPage.eyebrow} title={collaborationPage.title} body={collaborationPage.body} />
      <Section tone="white">
        <Container>
          <ol className="grid gap-4 md:grid-cols-2">
            {collaborationPage.models.map((model, index) => (
              <li key={model.title} className="card">
                <p className="caption">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="heading-5 mt-2">{model.title}</h2>
                <p className="body muted mt-2">{model.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <LetsTalk />
    </>
  );
}
