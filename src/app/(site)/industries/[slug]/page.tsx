import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { industries } from "@/website-theme/data/industries";
import { IndustryPage, getIndustry } from "@/website-theme/pages/industries/IndustryPage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({ title: industry.seoTitle, description: industry.seoDescription, path: `/industries/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getIndustry(slug)) notFound();
  return <IndustryPage slug={slug} />;
}
