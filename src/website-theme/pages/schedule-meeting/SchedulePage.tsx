import type { Locale } from "@/website-theme/config/site.config";
import { PageHero } from "@/website-theme/sections/PageHero";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";

export function SchedulePage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow="Schedule"
        title="Pick a conversation, not a pitch"
        body="A calendar embed is not wired up. Use the form and name two times that work. Replace this with your real scheduler when you have one."
      />
      <LetsTalk />
    </>
  );
}
