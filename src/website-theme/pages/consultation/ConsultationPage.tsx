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
  const title = kind === "technical" ? "A technical consultation" : "Let's talk about the decision in front of you";
  const body =
    kind === "technical"
      ? "Bring an architecture question, a system you need to modernize, or a release that is getting harder to ship. We will help you see the next practical step."
      : "This conversation is with Farolab Systems. It is not a profile of a named advisor. Tell us the product decision you need to make.";
  return (
    <>
      <PageHero locale={locale} eyebrow="Consultation" title={title} body={body} />
      <LetsTalk />
    </>
  );
}
