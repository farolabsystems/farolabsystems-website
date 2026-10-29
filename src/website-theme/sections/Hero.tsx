import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { hero, trustedBy } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { HeroCards } from "@/website-theme/sections/HeroCards";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";

export function Hero({ locale, cards }: { locale: Locale; cards: CaseStudyRecord[] }) {
  return (
    <section className="section hero-compose" style={{ paddingTop: "var(--tc-space-8)" }}>
      <Container>
        <div className="hero-compose__inner">
          <p className="hero-compose__badge">
            <span className="hero-compose__pulse" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="heading-1 hero-compose__title">{hero.title}</h1>
          <p className="body-lg muted hero-compose__body">{hero.body}</p>
          <div className="hero-compose__actions">
            <Button href={withLocale(locale, hero.primary.href)}>{hero.primary.label}</Button>
            <Button href={withLocale(locale, hero.secondary.href)} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
          <p className="caption hero-compose__support">{hero.support}</p>
        </div>
      </Container>
      {cards.length > 0 ? (
        <div className="hero-compose__visual">
          <HeroCards locale={locale} cards={cards} />
        </div>
      ) : null}
      <Container>
        <div className="hero-compose__trust">
          <ul className="hero-compose__trust-list">
            {trustedBy.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
