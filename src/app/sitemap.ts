import type { MetadataRoute } from "next";
import { siteConfig } from "@/website-theme/config/site.config";
import { listIndustries, listServices, listTechnologies } from "@/modules/catalog/catalog.service";
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
        coverImage: row.coverImage || "/assets/covers/cover-1.jpg",
        coverAlt: row.coverAlt || row.title,
        author: row.author || "Editorial team",
        category: row.category || "Notes",
        tags: row.tags.filter((tag) => tag !== "generated" && !tag.startsWith("daily:") && !tag.startsWith("source:")),
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
  const [articles, services, industries, technologies] = await Promise.all([
    publishedPosts(),
    listServices(),
    listIndustries(),
    listTechnologies(),
  ]);
  // English URLs only. Polish shells reuse English copy, so listing /pl creates
  // duplicate-canonical conflicts in Search Console.
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
    ...technologies.map((item) => `/technologies/${item.slug}`),
    ...caseStudies.map((item) => `/case-studies/${item.slug}`),
  ];
  const pages: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.6,
  }));
  const postEntries: MetadataRoute.Sitemap = articles.map((post) => {
    const lastModified = post.updatedAt ?? post.publishedAt;
    return {
      url: `${base}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [absoluteUrl(post.coverImage)],
    };
  });
  return [...pages, ...postEntries];
}
