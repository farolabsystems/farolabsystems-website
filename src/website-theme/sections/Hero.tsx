import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { hero } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { HeroCards } from "@/website-theme/sections/HeroCards";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";

export function Hero({ locale, cards }: { locale: Locale; cards: CaseStudyRecord[] }) {
  return (
    <section className="section" style={{ paddingTop: "var(--tc-space-7)" }}>
      <Container>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="heading-1 max-w-[14em]">{hero.title}</h1>
        <p className="body-lg muted mt-5 max-w-[62ch]">{hero.body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href={withLocale(locale, hero.primary.href)}>{hero.primary.label}</Button>
          <Button href={withLocale(locale, hero.secondary.href)} variant="ghost">
            {hero.secondary.label}
          </Button>
        </div>
        <p className="caption mt-5">{hero.support}</p>
      </Container>
      <HeroCards locale={locale} cards={cards} />
    </section>
  );
}
