import type { Metadata } from "next";
import { CmsPage } from "@/website-theme/pages/cms/CmsPage";
import { getPage } from "@/modules/content/content.service";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return buildMetadata({ title: page.seoTitle, description: page.seoDescription, path: `/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CmsPage slug={slug} />;
}
