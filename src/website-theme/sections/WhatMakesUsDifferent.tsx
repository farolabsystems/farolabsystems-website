import { differentiators } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function WhatMakesUsDifferent() {
  return (
    <Section>
      <Container>
        <Eyebrow>{differentiators.eyebrow}</Eyebrow>
        <h2 className="heading-2 max-w-[18ch]">{differentiators.title}</h2>
        <p className="body-lg muted mt-4 max-w-[62ch]">{differentiators.intro}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {differentiators.items.map((item, index) => (
            <article key={item.title} className="grid gap-2" style={{ paddingTop: "var(--tc-space-5)", borderTop: "1px solid var(--tc-border-strong)" }}>
              <p className="caption">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="heading-5">{item.title}</h3>
              <p className="body muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
