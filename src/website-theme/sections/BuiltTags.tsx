import { technology } from "@/website-theme/data/home";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function BuiltTags() {
  return (
    <Section tight>
      <Container>
        <h2 className="heading-4">{technology.title}</h2>
        <p className="body muted mt-3 max-w-[68ch]">{technology.body}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {technology.items.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
