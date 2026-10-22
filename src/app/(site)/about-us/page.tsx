import type { Metadata } from "next";
import { AboutPage } from "@/website-theme/pages/about/AboutPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Farolab Systems | Technology & Software Development",
  description: "Farolab Systems is a software company helping businesses turn ideas into scalable digital products through engineering and design.",
  path: "/about-us",
});

export default function Page() {
  return <AboutPage />;
}
