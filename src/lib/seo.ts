import type { Metadata } from "next";
import { siteConfig } from "@/website-theme/config/site.config";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

export function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const canonical = url;
  const ogImage = absoluteUrl(image ?? "/assets/og.png");
  const alt = imageAlt || title;
  const article =
    type === "article"
      ? {
          publishedTime,
          modifiedTime,
          authors,
          tags,
        }
      : {};
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt }],
      ...article,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function articleMetadata(
  post: {
    seoTitle: string;
    seoDescription: string;
    coverImage: string;
    coverAlt?: string;
    title: string;
    publishedAt: string;
    updatedAt?: string;
    author: string;
    tags: string[];
  },
  path: string,
) {
  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path,
    image: post.coverImage,
    imageAlt: post.coverAlt || post.title,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: [post.author],
    tags: post.tags,
  });
}

export function blogIndexMetadata(path: string, page = 1, category?: string) {
  const subject = category ? `${category} articles` : "Technology Insights & Software Engineering Blog";
  const title = page > 1 ? `${subject}, page ${page} | Farolab Systems` : `${subject} | Farolab Systems`;
  const description = category
    ? `Articles from Farolab Systems on ${category}: practical notes on software, product engineering, and technology.`
    : "Practical writing from Farolab Systems on software development, AI, product engineering, cloud technology and digital products.";
  return buildMetadata({ title, description, path, type: "website" });
}
