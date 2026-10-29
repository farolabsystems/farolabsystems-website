import { forStartups } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function ForStartups() {
  return (
    <Section id="engagement-models" tone="white">
      <Container>
        <div className="section-head">
          <Eyebrow>{forStartups.eyebrow}</Eyebrow>
          <h2 className="heading-2">{forStartups.title}</h2>
          <p className="body-lg muted mt-3">{forStartups.intro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {forStartups.cards.map((card) => (
            <article key={card.question} className="card grid gap-3">
              <h3 className="heading-6">{card.question}</h3>
              <p className="body-sm muted">{card.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
