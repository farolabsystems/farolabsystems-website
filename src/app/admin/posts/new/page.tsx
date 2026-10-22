import { ContentForm } from "@/components/ContentForm";

export default function NewPostPage() {
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">New post</h1>
      <ContentForm
        initial={{
          type: "POST",
          slug: "",
          title: "",
          excerpt: "",
          body: "## First heading\n\nWrite the article in markdown.",
          coverImage: "/assets/covers/cover-1.png",
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
