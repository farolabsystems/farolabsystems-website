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
  /** Override the canonical path. Defaults to the English form of `path`. */
  canonicalPath?: string;
  /** When false, search engines should not index this URL. */
  index?: boolean;
};

function englishPath(path: string) {
  const bare = path.split("?")[0] || "/";
  if (bare === "/pl") return "/";
  if (bare.startsWith("/pl/")) return bare.slice(3) || "/";
  return bare || "/";
}

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
  canonicalPath,
  index,
}: SeoInput): Metadata {
  const canonical = absoluteUrl(canonicalPath ?? englishPath(path));
  const isPolishShell = path === "/pl" || path.startsWith("/pl/") || path.startsWith("/pl?");
  const shouldIndex = index ?? !isPolishShell;
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
    title: path === "/" || path === "/pl" ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
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
  const filtered = Boolean(category) || page > 1;
  return buildMetadata({
    title,
    description,
    path,
    type: "website",
    canonicalPath: "/blog",
    index: !filtered && !(path === "/pl/blog" || path.startsWith("/pl/blog")),
  });
}
