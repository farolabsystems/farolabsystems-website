import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig } from "@/website-theme/config/site.config";
import { PageHero } from "@/website-theme/sections/PageHero";
import { CtaBanner } from "@/website-theme/sections/CtaBanner";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

const values = [
  { title: "Ask before you estimate", body: "The brief is a hypothesis. We test it against the people who will use the system." },
  { title: "Small slices", body: "A release you can try beats a plan you can only read." },
  { title: "Stay after launch", body: "The second month is part of the job, not a new contract surprise." },
];

export function AboutPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow="About"
        title="A product team you can put next to your own"
        body={`${siteConfig.name} is a placeholder company. Replace this page with your story, your year, and the size of the team you actually have.`}
      />
      <Section tone="white">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["00", "People"],
              ["0000", "Founded"],
              ["0.0", "Public rating"],
            ].map(([value, label]) => (
              <article key={label} className="card">
                <p className="heading-3">{value}</p>
                <p className="body-sm muted">{label}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="heading-3">How we like to work</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value, index) => (
              <article key={value.title} className="grid gap-2">
                <p className="caption">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="heading-5">{value.title}</h3>
                <p className="body muted">{value.body}</p>
              </article>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-4">
            {siteConfig.founders.map((founder) => (
              <li key={founder.name} className="card flex items-center gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--tc-primary-soft)" }}>
                  {founder.initials}
                </span>
                <span>
                  <span className="block body">{founder.name}</span>
                  <span className="caption">{founder.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaBanner locale={locale} title="Meet the people who would do the work." body="Write with the problem, not a feature list." />
    </>
  );
}
