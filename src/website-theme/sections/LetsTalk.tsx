import { contactIntro } from "@/website-theme/data/home";
import { siteConfig } from "@/website-theme/config/site.config";
import { ContactForm } from "@/website-theme/sections/ContactForm";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function LetsTalk() {
  return (
    <Section id="contact" tone="white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>{contactIntro.eyebrow}</Eyebrow>
            <h2 className="heading-3">{contactIntro.title}</h2>
            <p className="body muted mt-4">{contactIntro.body}</p>
            <ul className="mt-8 grid gap-3">
              {siteConfig.founders.map((founder) => (
                <li key={founder.name} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "var(--tc-primary-soft)" }}
                  >
                    {founder.initials}
                  </span>
                  <span>
                    <span className="block body">{founder.name}</span>
                    <span className="block caption">{founder.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
