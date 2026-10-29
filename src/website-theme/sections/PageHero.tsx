import type { Locale } from "@/website-theme/config/site.config";
import { uiCopy, withLocale } from "@/website-theme/config/site.config";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";

export function PageHero({
  locale,
  eyebrow,
  title,
  body,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="section hero-compose" style={{ paddingTop: "var(--tc-space-8)" }}>
      <Container>
        <div className="hero-compose__inner">
          <p className="hero-compose__badge">
            <span className="hero-compose__pulse" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="heading-2 hero-compose__title">{title}</h1>
          <p className="body-lg muted hero-compose__body">{body}</p>
          <div className="hero-compose__actions">
            <Button href={withLocale(locale, "/contact")}>{uiCopy[locale].startProject}</Button>
            <Button href={withLocale(locale, "/case-studies")} variant="ghost">
              Explore our work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
