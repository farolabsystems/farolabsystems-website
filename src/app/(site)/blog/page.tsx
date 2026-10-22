import type { Metadata } from "next";
import { BlogPage } from "@/website-theme/pages/blog/BlogPage";
import { blogIndexMetadata } from "@/lib/seo";

function blogPath(page: number, category?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}): Promise<Metadata> {
  const search = await searchParams;
  const page = Math.max(1, Number(search.page || 1) || 1);
  return blogIndexMetadata(blogPath(page, search.category), page, search.category);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const search = await searchParams;
  return <BlogPage page={Number(search.page || 1)} category={search.category} />;
}
