import type { Metadata } from "next";
import { RoutedPage } from "@/website-theme/pages/router/RoutedPage";
import { articleMetadata, blogIndexMetadata, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/website-theme/config/site.config";
import { getPost } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.length ? `/pl/${slug.join("/")}` : "/pl";
  if (slug[0] === "blog" && slug[1]) {
    const post = await getPost(slug[1]);
    if (post) return articleMetadata(post, path);
    return { title: "Article not found", robots: { index: false, follow: false } };
  }
  if (slug[0] === "blog" && !slug[1]) return blogIndexMetadata(path);
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
