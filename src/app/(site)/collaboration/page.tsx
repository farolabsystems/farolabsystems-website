import type { Metadata } from "next";
import { CollaborationPage } from "@/website-theme/pages/collaboration/CollaborationPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technology Partnership Models | Farolab Systems",
  description: "Dedicated teams, team augmentation, full product development and technology consulting from Farolab Systems.",
  path: "/collaboration",
});

export default function Page() {
  return <CollaborationPage />;
}
