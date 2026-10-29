import type { MetadataRoute } from "next";
import { siteConfig } from "@/website-theme/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/_styleguide", "/pl", "/pl/"],
    },
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
