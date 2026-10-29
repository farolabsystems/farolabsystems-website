import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { listTechnologies } from "@/modules/catalog/catalog.service";
import { technology } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";
import { TechIcon } from "@/website-theme/ui/TechIcon";

export async function BuiltTags({ locale = "en" }: { locale?: Locale }) {
  const technologies = await listTechnologies();

  return (
    <Section tight id="technology">
      <Container>
        <h2 className="heading-4">{technology.title}</h2>
        <p className="body muted mt-3 max-w-[68ch]">{technology.body}</p>
        <ul className="tech-wrap mt-6">
          {technologies.map((item) => (
            <li key={item.slug}>
              <Link href={withLocale(locale, `/technologies/${item.slug}`)} className="chip tech-chip">
                <span className="tech-chip__icon" aria-hidden="true">
                  <TechIcon icon={item.icon} size={18} />
                </span>
                <span>{item.navLabel}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
