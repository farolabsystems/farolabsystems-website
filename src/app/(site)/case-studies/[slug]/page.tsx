import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { caseStudies } from "@/website-theme/data/case-studies";
import { CaseStudyPage } from "@/website-theme/pages/case-studies/CaseStudyPage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.title} | Demo Case Study | ELYVANTA`,
    description: study.summary,
    path: `/case-studies/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage slug={slug} />;
}
