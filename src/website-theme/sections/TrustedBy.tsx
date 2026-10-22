import { trustedBy } from "@/website-theme/data/home";
import { Marquee } from "@/website-theme/ui/Marquee";
import { Section } from "@/website-theme/ui/Section";

export function TrustedBy() {
  return (
    <Section tight tone="white">
      <p className="caption container mb-6" style={{ letterSpacing: "var(--tc-tracking-eyebrow)", textTransform: "uppercase" }}>
        Trusted by teams like
      </p>
      <Marquee items={trustedBy} />
    </Section>
  );
}
