import { notFound } from "next/navigation";
import { getPage } from "@/modules/content/content.service";
import { Markdown } from "@/website-theme/ui/Markdown";
import { Container } from "@/website-theme/ui/Container";

const reserved = new Set([
  "admin",
  "api",
  "blog",
  "services",
  "industries",
  "case-studies",
  "about-us",
  "career",
  "contact",
  "schedule-meeting",
  "collaboration",
  "privacy-policy",
  "cookie-policy",
  "pl",
  "_styleguide",
]);

export async function CmsPage({ slug }: { slug: string }) {
  if (reserved.has(slug)) notFound();
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <article className="section" style={{ paddingTop: "var(--tc-space-9)" }}>
      <Container>
        <h1 className="heading-2">{page.title}</h1>
        <div className="mt-8 max-w-[72ch]">
          <Markdown source={page.body} />
        </div>
      </Container>
    </article>
  );
}
