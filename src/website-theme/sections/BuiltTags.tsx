import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { technology } from "@/website-theme/data/home";
import { technologies } from "@/website-theme/data/technologies";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";
import { TechIcon } from "@/website-theme/ui/TechIcon";

export function BuiltTags({ locale = "en" }: { locale?: Locale }) {
  return (
    <Section tight>
      <Container>
        <h2 className="heading-4">{technology.title}</h2>
        <p className="body muted mt-3 max-w-[68ch]">{technology.body}</p>
        <ul className="tech-wrap mt-6">
          {technologies.map((item) => (
            <li key={item.slug}>
              <Link href={withLocale(locale, `/technologies/${item.slug}`)} className="chip tech-chip">
                <TechIcon icon={item.icon} size={22} />
                <span>{item.navLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
