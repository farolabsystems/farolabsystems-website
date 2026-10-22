import type { Metadata } from "next";
import { siteConfig } from "@/website-theme/config/site.config";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({ title, description, path, image, type = "website" }: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image ?? "/assets/og.png");
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
