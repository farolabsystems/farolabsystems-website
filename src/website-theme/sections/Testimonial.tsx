import { testimonial } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function Testimonial() {
  return (
    <Section tone="alt" tight>
      <Container>
        <blockquote>
          <p className="heading-4 max-w-[28ch]">“{testimonial.quote}”</p>
          <footer className="body mt-6">
            {testimonial.name}
            <span className="muted"> · {testimonial.role}</span>
          </footer>
        </blockquote>
      </Container>
    </Section>
  );
}
