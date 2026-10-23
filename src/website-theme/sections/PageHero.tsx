import type { Locale } from "@/website-theme/config/site.config";
import { uiCopy, withLocale } from "@/website-theme/config/site.config";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";

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
    <section className="section" style={{ paddingTop: "var(--tc-space-8)" }}>
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="heading-2 max-w-[18em]">{title}</h1>
        <p className="body-lg muted mt-4 max-w-[62ch]">{body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={withLocale(locale, "/contact")}>{uiCopy[locale].startProject}</Button>
          <Button href={withLocale(locale, "/case-studies")} variant="ghost">
            Explore our work
          </Button>
        </div>
      </Container>
    </section>
  );
}
