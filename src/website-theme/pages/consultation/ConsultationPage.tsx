import type { Locale } from "@/website-theme/config/site.config";
import { PageHero } from "@/website-theme/sections/PageHero";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";

export function ConsultationPage({
  locale = "en",
  kind,
}: {
  locale?: Locale;
  kind: "technical" | "advisor";
}) {
  const title = kind === "technical" ? "A technical consultation" : "Book a consultation";
  const body =
    kind === "technical"
      ? "Bring the architecture question, the failing release, or the estimate you do not trust. This page is a placeholder."
      : "Placeholder consultation page. It does not describe a real person. Replace it with your own advisors.";
  return (
    <>
      <PageHero locale={locale} eyebrow="Consultation" title={title} body={body} />
      <LetsTalk />
    </>
  );
}
