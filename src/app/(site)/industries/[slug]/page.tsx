import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries } from "@/website-theme/data/industries";
import { getIndustry } from "@/modules/catalog/catalog.service";
import { IndustryPage } from "@/website-theme/pages/industries/IndustryPage";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({ title: industry.seoTitle, description: industry.seoDescription, path: `/industries/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await getIndustry(slug);
  if (!industry) notFound();
  return <IndustryPage industry={industry} />;
}
