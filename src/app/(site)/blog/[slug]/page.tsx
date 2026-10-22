import type { Metadata } from "next";
import { BlogPostPage } from "@/website-theme/pages/blog/BlogPostPage";
import { articleMetadata } from "@/lib/seo";
import { getPost } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false, follow: false } };
  return articleMetadata(post, `/blog/${slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
