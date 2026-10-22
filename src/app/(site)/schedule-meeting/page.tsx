import type { Metadata } from "next";
import { SchedulePage } from "@/website-theme/pages/schedule-meeting/SchedulePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Schedule a meeting",
  description: "Request a time to talk.",
  path: "/schedule-meeting",
});

export default function Page() {
  return <SchedulePage />;
}
