import { builtTags } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function BuiltTags() {
  return (
    <Section tight>
      <Container>
        <h2 className="heading-4">Built where it matters</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {builtTags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
