import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { startingPoint } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function StartingPoint({ locale }: { locale: Locale }) {
  return (
    <Section>
      <Container>
        <Eyebrow>{startingPoint.eyebrow}</Eyebrow>
        <h2 className="heading-2 max-w-[16ch]">{startingPoint.title}</h2>
        <p className="body-lg muted mt-4 max-w-[62ch]">{startingPoint.intro}</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {startingPoint.columns.map((column) => (
            <article key={column.index} className="card grid gap-3">
              <p className="heading-4" style={{ color: "var(--tc-primary-active)" }}>
                {column.index}
              </p>
              <h3 className="heading-4">{column.title}</h3>
              <p className="body muted">{column.body}</p>
              <ul className="grid gap-2">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={withLocale(locale, link.href)} className="text-link body-sm">
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
