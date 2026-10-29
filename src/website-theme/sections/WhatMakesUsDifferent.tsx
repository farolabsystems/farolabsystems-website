import { differentiators } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function WhatMakesUsDifferent() {
  return (
    <Section tone="white">
      <Container>
        <div className="section-head">
          <Eyebrow>{differentiators.eyebrow}</Eyebrow>
          <h2 className="heading-2">{differentiators.title}</h2>
          <p className="body-lg muted mt-3">{differentiators.intro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.items.map((item, index) => (
            <article key={item.title} className="card grid gap-2">
              <p className="caption">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="heading-6">{item.title}</h3>
              <p className="body-sm muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
