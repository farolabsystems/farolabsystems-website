import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig } from "@/website-theme/config/site.config";
import { schedulePage } from "@/website-theme/data/contact";
import { PageHero } from "@/website-theme/sections/PageHero";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";

export function SchedulePage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero locale={locale} eyebrow={schedulePage.eyebrow} title={schedulePage.title} body={schedulePage.body} />
      {siteConfig.meetingUrl ? (
        <Container>
          <Button href={siteConfig.meetingUrl}>Schedule a meeting</Button>
        </Container>
      ) : null}
      <LetsTalk />
    </>
  );
}
