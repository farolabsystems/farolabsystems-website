import { notFound } from "next/navigation";
import { ContentForm } from "@/components/ContentForm";
import { getAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getAdminContent(id);
  if (!post || post.type !== "POST") notFound();
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">Edit post</h1>
      <ContentForm
        initial={{
          id: post.id,
          type: "POST",
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          body: post.body,
          coverImage: post.coverImage ?? "",
          author: post.author ?? "",
          category: post.category ?? "",
          tags: post.tags.join(", "),
          seoTitle: post.seoTitle ?? "",
          seoDescription: post.seoDescription ?? "",
          status: post.status,
        }}
      />
    </div>
  );
}
