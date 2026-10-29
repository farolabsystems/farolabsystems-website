import type { Locale } from "@/website-theme/config/site.config";
import { uiCopy, withLocale } from "@/website-theme/config/site.config";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function CtaBanner({ locale, title, body }: { locale: Locale; title: string; body: string }) {
  return (
    <Section tone="white" tight>
      <Container>
        <div className="cta-panel">
          <div className="section-head" style={{ maxWidth: "36rem" }}>
            <h2 className="heading-3">{title}</h2>
            <p className="body muted mt-3">{body}</p>
          </div>
          <div className="hero-compose__actions" style={{ marginTop: "var(--tc-space-6)" }}>
            <Button href={withLocale(locale, "/contact")}>{uiCopy[locale].startProject}</Button>
            <Button href={withLocale(locale, "/schedule-meeting")} variant="ghost">
              {uiCopy[locale].schedule}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
