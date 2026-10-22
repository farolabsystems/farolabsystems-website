import type { Locale } from "@/website-theme/config/site.config";
import { openRoles } from "@/website-theme/data/team";
import { PageHero } from "@/website-theme/sections/PageHero";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";
import { Button } from "@/website-theme/ui/Button";
import { withLocale } from "@/website-theme/config/site.config";

export function CareerPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow="Career"
        title="Grow your craft next to client work"
        body="Placeholder careers page. Replace the roles below with openings you are actually hiring for."
      />
      <Section tone="white">
        <Container>
          <h2 className="heading-3">Open roles</h2>
          <ul className="mt-6 grid gap-4">
            {openRoles.map((role) => (
              <li key={role.title} className="card flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="heading-5">{role.title}</h3>
                  <p className="body-sm muted mt-1">
                    {role.location} · {role.type}
                  </p>
                  <p className="body mt-3 max-w-[68ch]">{role.summary}</p>
                </div>
                <Button href={withLocale(locale, "/contact")} variant="ghost">
                  Apply
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
