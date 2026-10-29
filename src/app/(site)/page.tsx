import type { Metadata } from "next";
import { HomePage } from "@/website-theme/pages/home/HomePage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/website-theme/config/site.config";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | Custom Software Development & AI Engineering`,
  description: siteConfig.description,
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
