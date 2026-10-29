import type { FaqItem } from "@/website-theme/data/types";
import { Accordion } from "@/website-theme/ui/Accordion";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";
import { Button } from "@/website-theme/ui/Button";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { faqSection } from "@/website-theme/data/home";

export function Faq({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  return (
    <Section tight tone="alt">
      <Container>
        <div className="section-head">
          <h2 className="heading-3">{faqSection.title}</h2>
          <p className="body muted mt-3">{faqSection.body}</p>
        </div>
        <div className="mx-auto mt-8 max-w-3xl">
          <Accordion items={items} />
          <div className="mt-6 flex justify-center">
            <Button href={withLocale(locale, "/contact")} variant="ghost">
              {faqSection.cta}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
