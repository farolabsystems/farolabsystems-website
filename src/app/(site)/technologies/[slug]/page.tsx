import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { technologies } from "@/website-theme/data/technologies";
import { getTechnology } from "@/modules/catalog/catalog.service";
import { TechnologyPage } from "@/website-theme/pages/technologies/TechnologyPage";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return technologies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const technology = await getTechnology(slug);
  if (!technology) return {};
  return buildMetadata({
    title: technology.seoTitle,
    description: technology.seoDescription,
    path: `/technologies/${slug}`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const technology = await getTechnology(slug);
  if (!technology) notFound();
  return <TechnologyPage technology={technology} />;
}
