import { CaseStudyForm } from "@/components/CaseStudyForm";

export default function NewCaseStudyPage() {
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">New case study</h1>
      <CaseStudyForm
        initial={{
          slug: "",
          title: "",
          summary: "",
          industries: "Startups",
          services: "Custom Software",
          statValue: "+00%",
          statLabel: "Placeholder metric",
          body: "## The problem\n\nDescribe it here.",
          cover: "/assets/covers/cover-1.jpg",
          gallery: "/assets/covers/cover-1.jpg",
          featured: false,
          sortOrder: 200,
          status: "DRAFT",
        }}
      />
    </div>
  );
}
