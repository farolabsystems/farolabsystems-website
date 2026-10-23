import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { caseStudies } from "@/website-theme/data/case-studies";
import { CaseStudyPage } from "@/website-theme/pages/case-studies/CaseStudyPage";
import { buildMetadata } from "@/lib/seo";
import { getCaseStudy } from "@/modules/case-studies/case-study.service";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.seoTitle || `${study.title} | Case Study | Farolab Systems`,
    description: study.seoDescription || study.summary,
    path: `/case-studies/${slug}`,
    image: study.cover,
    imageAlt: study.coverAlt || study.title,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage slug={slug} />;
}
