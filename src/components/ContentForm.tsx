"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/Editor";
import { Button } from "@/website-theme/ui/Button";

export type ContentDraft = {
  id?: string;
  type: "POST" | "PAGE";
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  status: "DRAFT" | "PUBLISHED";
};

export function ContentForm({ initial }: { initial: ContentDraft }) {
  const router = useRouter();
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");

  function set<K extends keyof ContentDraft>(key: K, value: ContentDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setError("");
    const payload = {
      ...draft,
      tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      coverImage: draft.coverImage || undefined,
      author: draft.author || undefined,
      category: draft.category || undefined,
      seoTitle: draft.seoTitle || undefined,
      seoDescription: draft.seoDescription || undefined,
    };
    const response = await fetch(draft.id ? `/api/admin/content/${draft.id}` : "/api/admin/content", {
      method: draft.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "Could not save");
      return;
    }
    router.push(draft.type === "POST" ? "/admin/posts" : "/admin/pages");
    router.refresh();
  }

  async function remove() {
    if (!draft.id || !confirm("Delete this item?")) return;
    await fetch(`/api/admin/content/${draft.id}`, { method: "DELETE" });
    router.push(draft.type === "POST" ? "/admin/posts" : "/admin/pages");
    router.refresh();
  }

  return (
    <div className="grid max-w-3xl gap-4">
      <label className="grid gap-2 body-sm">
        Title
        <input className="field" value={draft.title} onChange={(event) => set("title", event.target.value)} />
      </label>
      <label className="grid gap-2 body-sm">
        Slug
        <input className="field" value={draft.slug} onChange={(event) => set("slug", event.target.value)} />
      </label>
      <label className="grid gap-2 body-sm">
        Excerpt
        <input className="field" value={draft.excerpt} onChange={(event) => set("excerpt", event.target.value)} />
      </label>
      <Editor id="body" label="Body (markdown)" value={draft.body} onChange={(value) => set("body", value)} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 body-sm">
          Cover image
          <input className="field" value={draft.coverImage} onChange={(event) => set("coverImage", event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          Author
          <input className="field" value={draft.author} onChange={(event) => set("author", event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          Category
          <input className="field" value={draft.category} onChange={(event) => set("category", event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          Tags
          <input className="field" value={draft.tags} onChange={(event) => set("tags", event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          SEO title
          <input className="field" value={draft.seoTitle} onChange={(event) => set("seoTitle", event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          SEO description
          <input className="field" value={draft.seoDescription} onChange={(event) => set("seoDescription", event.target.value)} />
        </label>
      </div>
      <label className="grid gap-2 body-sm">
        Status
        <select className="field" value={draft.status} onChange={(event) => set("status", event.target.value as ContentDraft["status"])}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </label>
      {error ? <p style={{ color: "var(--tc-danger)" }}>{error}</p> : null}
      <div className="flex gap-3">
        <Button type="button" onClick={() => void save()}>
          Save
        </Button>
        {draft.id ? (
          <Button type="button" variant="ghost" onClick={() => void remove()}>
            Delete
          </Button>
        ) : null}
      </div>
    </div>
  );
}
