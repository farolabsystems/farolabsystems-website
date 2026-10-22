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
    <Section tight>
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="heading-3">{faqSection.title}</h2>
            <p className="body muted mt-4">{faqSection.body}</p>
            <div className="mt-5">
              <Button href={withLocale(locale, "/contact")} variant="ghost">
                {faqSection.cta}
              </Button>
            </div>
          </div>
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}
