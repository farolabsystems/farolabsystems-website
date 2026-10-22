import type { Locale } from "@/website-theme/config/site.config";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";

export function ContactPage({ locale = "en" }: { locale?: Locale }) {
  void locale;
  return <LetsTalk />;
}
