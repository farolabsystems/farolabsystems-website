import type { Metadata } from "next";
import { AboutPage } from "@/website-theme/pages/about/AboutPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Who we are and how an engagement starts.",
  path: "/about-us",
});

export default function Page() {
  return <AboutPage />;
}
