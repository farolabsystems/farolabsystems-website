import { Suspense } from "react";
import type { Locale } from "@/website-theme/config/site.config";
import { listCaseStudies } from "@/modules/case-studies/case-study.service";
import { CaseStudiesExplorer } from "@/website-theme/pages/case-studies/CaseStudiesExplorer";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";

export async function CaseStudiesPage({ locale = "en" }: { locale?: Locale }) {
  const studies = await listCaseStudies();
  return (
    <section className="section" style={{ paddingTop: "var(--tc-space-9)" }}>
      <Container>
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="heading-2 max-w-[16ch]">Work we can talk about</h1>
        <p className="body-lg muted mt-4 max-w-[62ch]">
          Filter by industry or service. The address bar keeps the same query shape the reference site uses.
        </p>
        <div className="mt-10">
          <Suspense fallback={<p className="body">Loading projects…</p>}>
            <CaseStudiesExplorer locale={locale} studies={studies} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
