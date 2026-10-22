import type { MetadataRoute } from "next";
import { siteConfig } from "@/website-theme/config/site.config";
import { services } from "@/website-theme/data/services";
import { industries } from "@/website-theme/data/industries";
import { caseStudies } from "@/website-theme/data/case-studies";
import { posts as fallbackPosts } from "@/website-theme/data/posts";
import { absoluteUrl } from "@/lib/seo";
import { prisma } from "@/lib/db";
import type { PostRecord } from "@/website-theme/data/types";

export const dynamic = "force-dynamic";

async function publishedPosts(): Promise<PostRecord[]> {
  try {
    const rows = await prisma.content.findMany({
      where: { type: "POST", status: "PUBLISHED", locale: "en" },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length > 0) {
      return rows.map((row) => ({
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        body: row.body,
        coverImage: row.coverImage || "/assets/covers/cover-1.png",
        coverAlt: row.coverAlt || row.title,
        author: row.author || "Editorial team",
        category: row.category || "Notes",
        tags: row.tags,
        seoTitle: row.seoTitle || row.title,
        seoDescription: row.seoDescription || row.excerpt,
        publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      }));
    }
  } catch {
    /* The public catalog is used until the database is reachable. */
  }
  return fallbackPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const articles = await publishedPosts();
  const paths = [
    "/",
    "/about-us",
    "/career",
    "/contact",
    "/schedule-meeting",
    "/collaboration",
    "/technical-consultation",
    "/consultation/advisor",
    "/privacy-policy",
    "/cookie-policy",
    "/case-studies",
    "/blog",
    ...services.map((item) => `/services/${item.slug}`),
    ...industries.map((item) => `/industries/${item.slug}`),
    ...caseStudies.map((item) => `/case-studies/${item.slug}`),
  ];
  const pages: MetadataRoute.Sitemap = paths.flatMap((path) => [
    { url: `${base}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "/" ? 1 : 0.6 },
    { url: path === "/" ? `${base}/pl` : `${base}/pl${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.4 },
  ]);
  const postEntries: MetadataRoute.Sitemap = articles.flatMap((post) => {
    const lastModified = post.updatedAt ?? post.publishedAt;
    const images = [absoluteUrl(post.coverImage)];
    return [
      { url: `${base}/blog/${post.slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.7, images },
      { url: `${base}/pl/blog/${post.slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.5, images },
    ];
  });
  const categories = [...new Set(articles.map((post) => post.category))];
  const categoryEntries: MetadataRoute.Sitemap = categories.flatMap((category) => {
    const query = `?category=${encodeURIComponent(category)}`;
    return [
      { url: `${base}/blog${query}`, changeFrequency: "weekly" as const, priority: 0.5 },
      { url: `${base}/pl/blog${query}`, changeFrequency: "weekly" as const, priority: 0.4 },
    ];
  });
  return [...pages, ...postEntries, ...categoryEntries];
}
