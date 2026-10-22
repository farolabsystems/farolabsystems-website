import { testimonial } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function Testimonial() {
  return (
    <Section tone="alt" tight>
      <Container>
        <p className="caption" style={{ letterSpacing: "var(--tc-tracking-eyebrow)", textTransform: "uppercase" }}>
          {testimonial.eyebrow}
        </p>
        <h2 className="heading-4 mt-4 max-w-[28ch]">{testimonial.title}</h2>
        <p className="body-lg mt-4 max-w-[62ch]">{testimonial.body}</p>
      </Container>
    </Section>
  );
}
