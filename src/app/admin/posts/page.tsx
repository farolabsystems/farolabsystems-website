import Link from "next/link";
import { listAdminContent } from "@/modules/content/content.service";

export const dynamic = "force-dynamic";

export default async function PostsAdminPage() {
  const posts = await listAdminContent("POST");
  return (
    <div className="grid gap-4">
      <div className="admin-toolbar">
        <h1 className="heading-4">Posts</h1>
        <Link className="btn" href="/admin/posts/new">
          New post
        </Link>
      </div>
      <ul className="admin-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="admin-item" href={`/admin/posts/${post.id}`}>
              <span className="admin-item-media">
                {post.coverImage ? <img src={post.coverImage} alt="" /> : null}
              </span>
              <span className="admin-item-copy">
                <span className="body">{post.title}</span>
                <span className={post.status === "PUBLISHED" ? "caption admin-status is-live" : "caption admin-status"}>
                  {post.status === "PUBLISHED" ? "Published" : "Draft"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {posts.length === 0 ? <p className="body muted">No posts yet.</p> : null}
    </div>
  );
}
