import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { careerPage, openRoles } from "@/website-theme/data/team";
import { PageHero } from "@/website-theme/sections/PageHero";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";
import { Button } from "@/website-theme/ui/Button";

export function CareerPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero locale={locale} eyebrow={careerPage.eyebrow} title={careerPage.title} body={careerPage.body} />
      <Section tone="white">
        <Container>
          <h2 className="heading-3">{careerPage.whyTitle}</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {careerPage.reasons.map((reason) => (
              <li key={reason} className="card">
                <p className="body">{reason}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="heading-3">{careerPage.rolesTitle}</h2>
          {openRoles.length === 0 ? (
            <p className="body muted mt-4 max-w-[62ch]">{careerPage.empty}</p>
          ) : (
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
          )}
          <div className="mt-8">
            <Button href={withLocale(locale, "/contact")}>{careerPage.cta}</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
