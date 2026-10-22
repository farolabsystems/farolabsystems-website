import { notFound } from "next/navigation";
import { ContentForm } from "@/components/ContentForm";
import { getAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function EditPageAdmin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getAdminContent(id);
  if (!page || page.type !== "PAGE") notFound();
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">Edit page</h1>
      <ContentForm
        initial={{
          id: page.id,
          type: "PAGE",
          slug: page.slug,
          title: page.title,
          excerpt: page.excerpt,
          body: page.body,
          coverImage: page.coverImage ?? "",
          author: page.author ?? "",
          category: page.category ?? "",
          tags: page.tags.join(", "),
          seoTitle: page.seoTitle ?? "",
          seoDescription: page.seoDescription ?? "",
          status: page.status,
        }}
      />
    </div>
  );
}
