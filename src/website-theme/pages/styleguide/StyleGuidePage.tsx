import { Accordion } from "@/website-theme/ui/Accordion";
import { Button } from "@/website-theme/ui/Button";
import { Chip } from "@/website-theme/ui/Chip";
import { Container } from "@/website-theme/ui/Container";
import { homeFaqs } from "@/website-theme/data/home";

const swatches = [
  ["page", "var(--tc-page)"],
  ["white", "var(--tc-white)"],
  ["primary", "var(--tc-primary)"],
  ["hover", "var(--tc-primary-hover)"],
  ["active", "var(--tc-primary-active)"],
  ["soft", "var(--tc-primary-soft)"],
  ["text", "var(--tc-text)"],
  ["muted", "var(--tc-text-muted)"],
  ["faint", "var(--tc-text-faint)"],
  ["danger", "var(--tc-danger)"],
  ["footer", "var(--tc-footer)"],
];

export function StyleGuidePage() {
  return (
    <section className="section">
      <Container>
        <h1 className="heading-2">Style guide</h1>
        <p className="body muted mt-3">Dev only. Compare tokens and controls with the reference layout.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {swatches.map(([name, color]) => (
            <div key={name} className="card" style={{ padding: "var(--tc-space-3)" }}>
              <div className="h-12 rounded-[var(--tc-radius-sm)]" style={{ background: color, border: "1px solid var(--tc-border)" }} />
              <p className="caption mt-2">{name}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-3">
          <h1 className="heading-1">Heading 1</h1>
          <h2 className="heading-2">Heading 2</h2>
          <h3 className="heading-3">Heading 3</h3>
          <h4 className="heading-4">Heading 4</h4>
          <p className="body-lg">Body large. The quick brown fox.</p>
          <p className="body">Body. The quick brown fox.</p>
          <p className="body-sm">Body small.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="dark">Dark</Button>
          <Chip pressed>Chip on</Chip>
          <Chip>Chip off</Chip>
        </div>
        <div className="mt-8">
          <Accordion items={homeFaqs.slice(0, 2)} />
        </div>
      </Container>
    </section>
  );
}
