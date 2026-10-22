import { forStartups } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function ForStartups() {
  return (
    <Section tone="soft">
      <Container>
        <Eyebrow>{forStartups.eyebrow}</Eyebrow>
        <h2 className="heading-2 max-w-[18ch]">{forStartups.title}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {forStartups.cards.map((card) => (
            <article key={card.question} className="card grid gap-3">
              <h3 className="heading-6">{card.question}</h3>
              <p className="body muted">{card.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
