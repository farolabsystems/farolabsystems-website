import type { Metadata } from "next";
import { SchedulePage } from "@/website-theme/pages/schedule-meeting/SchedulePage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Schedule a Meeting | Farolab Systems",
  description: "Talk with Farolab Systems about your product, technology requirements and the next step. Send times that work if no calendar is set.",
  path: "/schedule-meeting",
});

export default function Page() {
  return <SchedulePage />;
}
