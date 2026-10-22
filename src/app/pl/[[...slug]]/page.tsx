import type { Metadata } from "next";
import { RoutedPage } from "@/website-theme/pages/router/RoutedPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/website-theme/config/site.config";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.length ? `/pl/${slug.join("/")}` : "/pl";
  return buildMetadata({
    title: `${siteConfig.name} | Software Development & Technology Solutions`,
    description: siteConfig.description,
    path,
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  return <RoutedPage locale="pl" slug={slug} search={search} />;
}
