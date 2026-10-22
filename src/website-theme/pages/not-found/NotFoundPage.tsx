import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";

export function NotFoundPage() {
  return (
    <section className="section">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="heading-2">That page is not here</h1>
        <p className="body muted mt-4">The link may be old, or the page was never published.</p>
        <div className="mt-6">
          <Button href="/">Back home</Button>
        </div>
      </Container>
    </section>
  );
}
