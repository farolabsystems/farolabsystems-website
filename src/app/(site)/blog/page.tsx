import type { Metadata } from "next";
import { BlogPage } from "@/website-theme/pages/blog/BlogPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Notes on product discovery, design, and software delivery.",
  path: "/blog",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const search = await searchParams;
  return <BlogPage page={Number(search.page || 1)} category={search.category} />;
}
