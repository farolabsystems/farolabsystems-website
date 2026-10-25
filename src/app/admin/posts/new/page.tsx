import { ContentForm } from "@/components/ContentForm";

export default function NewPostPage() {
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="heading-4">New blog</h1>
        <p className="body-sm muted mt-1">Start with a prompt, or write the fields yourself. Save it as published when it should go live.</p>
      </div>
      <ContentForm
        initial={{
          type: "POST",
          slug: "",
          title: "",
          excerpt: "",
          body: "## First heading\n\nWrite the article in markdown.",
          coverImage: "/assets/covers/cover-1.jpg",
          coverAlt: "",
          author: "Editorial team",
          category: "Notes",
          tags: "",
          seoTitle: "",
          seoDescription: "",
          status: "DRAFT",
        }}
      />
    </div>
  );
}
