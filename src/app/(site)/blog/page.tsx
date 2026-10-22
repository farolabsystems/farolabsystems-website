import type { Metadata } from "next";
import { BlogPage } from "@/website-theme/pages/blog/BlogPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technology Insights & Software Engineering Blog | ELYVANTA",
  description: "Practical writing from ELYVANTA on software development, AI, product engineering, cloud technology and digital products.",
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
