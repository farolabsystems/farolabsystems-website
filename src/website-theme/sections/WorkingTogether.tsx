import { workingTogether } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function WorkingTogether() {
  return (
    <Section id="blueprint" tone="alt">
      <Container>
        <div className="section-head">
          <Eyebrow>{workingTogether.eyebrow}</Eyebrow>
          <h2 className="heading-2">{workingTogether.title}</h2>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {workingTogether.steps.map((step) => (
            <li key={step.index} className="card grid gap-3">
              <span className="step-badge">STEP {step.index}</span>
              <h3 className="heading-6">{step.title}</h3>
              <p className="body-sm muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
