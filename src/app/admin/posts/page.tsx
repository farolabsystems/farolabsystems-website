import Link from "next/link";
import { listAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function PostsAdminPage() {
  const posts = await listAdminContent("POST");
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-4">Posts</h1>
        <Link className="btn" href="/admin/posts/new">
          New post
        </Link>
      </div>
      <ul className="grid gap-2">
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="card block" href={`/admin/posts/${post.id}`}>
              <span className="body">{post.title}</span>
              <span className="caption ml-3">{post.status}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
