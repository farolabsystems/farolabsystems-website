import { trustedBy } from "@/website-theme/data/home";
import { Marquee } from "@/website-theme/ui/Marquee";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function TrustedBy() {
  return (
    <Section tight tone="white">
      <Container>
        <h2 className="heading-4 max-w-[24ch]">{trustedBy.title}</h2>
        <p className="body muted mt-3 max-w-[68ch]">{trustedBy.body}</p>
      </Container>
      <div className="mt-8">
        <Marquee items={trustedBy.items} />
      </div>
    </Section>
  );
}
