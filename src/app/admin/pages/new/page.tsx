import { ContentForm } from "@/components/ContentForm";

export default function NewPageAdmin() {
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">New page</h1>
      <ContentForm
        initial={{
          type: "PAGE",
          slug: "",
          title: "",
          excerpt: "",
          body: "## Section\n\nPage body in markdown.",
          coverImage: "",
          coverAlt: "",
          author: "",
          category: "",
          tags: "",
          seoTitle: "",
          seoDescription: "",
          status: "PUBLISHED",
        }}
      />
    </div>
  );
}
