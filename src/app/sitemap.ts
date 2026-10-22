import type { MetadataRoute } from "next";
import { siteConfig } from "@/website-theme/config/site.config";
import { services } from "@/website-theme/data/services";
import { industries } from "@/website-theme/data/industries";
import { caseStudies } from "@/website-theme/data/case-studies";
import { posts } from "@/website-theme/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
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
    ...posts.map((item) => `/blog/${item.slug}`),
  ];
  const localized = paths.flatMap((path) => [path, path === "/" ? "/pl" : `/pl${path}`]);
  return localized.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
