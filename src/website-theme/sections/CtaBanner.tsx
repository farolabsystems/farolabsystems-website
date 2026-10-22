import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function CtaBanner({ locale, title, body }: { locale: Locale; title: string; body: string }) {
  return (
    <Section tone="soft" tight>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40ch]">
            <h2 className="heading-3">{title}</h2>
            <p className="body muted mt-3">{body}</p>
          </div>
          <Button href={withLocale(locale, "/contact")}>Talk to a co-founder</Button>
        </div>
      </Container>
    </Section>
  );
}
