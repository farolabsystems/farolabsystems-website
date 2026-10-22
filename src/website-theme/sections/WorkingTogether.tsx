import { workingTogether } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";

export function WorkingTogether() {
  return (
    <Section tone="white" tight>
      <Container>
        <Eyebrow>{workingTogether.eyebrow}</Eyebrow>
        <h2 className="heading-2 max-w-[16ch]">{workingTogether.title}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {workingTogether.steps.map((step) => (
            <li key={step.index} className="card grid gap-2">
              <span className="heading-5" style={{ color: "var(--tc-primary-active)" }}>
                {step.index}
              </span>
              <h3 className="heading-6">{step.title}</h3>
              <p className="body muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
