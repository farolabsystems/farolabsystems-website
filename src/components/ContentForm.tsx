"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/Editor";
import { ImageDrop, uploadAdminImage } from "@/components/ImageDrop";
import { SeoFields } from "@/components/SeoFields";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useAdminToast } from "@/components/AdminToast";
import { Button } from "@/website-theme/ui/Button";
import { Sparkles, Trash2 } from "lucide-react";

export type ContentDraft = {
  id?: string;
  type: "POST" | "PAGE";
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  coverAlt: string;
  author: string;
  category: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  status: "DRAFT" | "PUBLISHED";
};

export function ContentForm({ initial }: { initial: ContentDraft }) {
  const router = useRouter();
  const toast = useAdminToast();
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploading, setUploading] = useState<"" | "cover" | "body">("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function set<K extends keyof ContentDraft>(key: K, value: ContentDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setError("");
    const payload = {
      ...draft,
      tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      coverImage: draft.coverImage || undefined,
      coverAlt: draft.coverAlt || undefined,
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
      const message = body?.error ?? "Could not save";
      setError(message);
      toast({ tone: "error", title: "Could not save", body: message });
      return;
    }
    toast({ tone: "success", title: draft.status === "PUBLISHED" ? "Published" : "Saved" });
    router.push(draft.type === "POST" ? "/admin/posts" : "/admin/pages");
    router.refresh();
  }

  async function generateFromPrompt() {
    const subject = prompt.trim();
    if (subject.length < 8) {
      setError("Enter a prompt first.");
      return;
    }
    setError("");
    setNotice("");
    setGenerating(true);
    try {
      const started = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: subject }),
      });
      const startBody = (await started.json()) as { id?: string; error?: string };
      if (!started.ok || !startBody.id) throw new Error(startBody.error || "Could not start generation");
      const deadline = Date.now() + 12 * 60 * 1000;
      while (Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await fetch(`/api/admin/blog/generate?id=${encodeURIComponent(startBody.id)}`);
        const job = (await response.json()) as {
          status?: string;
          message?: string;
          error?: string;
          draft?: ContentDraft | null;
        };
        if (!response.ok) throw new Error(job.error || "Lost track of the generation");
        if (job.status === "running") continue;
        if (job.status === "error") throw new Error(job.message || "Could not generate the post.");
        if (!job.draft) throw new Error("The draft did not come back.");
        const next = job.draft;
        setDraft((current) => ({
          ...current,
          title: next.title,
          slug: next.slug,
          excerpt: next.excerpt,
          body: next.body,
          coverImage: next.coverImage,
          coverAlt: next.coverAlt,
          author: next.author,
          category: next.category,
          tags: next.tags,
          seoTitle: next.seoTitle,
          seoDescription: next.seoDescription,
          status: "DRAFT",
        }));
        const message = job.message || "Draft is in the form. Set the status to Published and save when you want it live.";
        setNotice(message);
        toast({ tone: "success", title: "Draft ready", body: message });
        return;
      }
      throw new Error("Generation is still running. Try again in a minute.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not generate the post.");
      toast({ tone: "error", title: "Could not generate", body: cause instanceof Error ? cause.message : "Try again in a moment." });
    } finally {
      setGenerating(false);
    }
  }

  async function uploadImage(file: File, alt: string, kind: "cover" | "body") {
    const description = alt.trim();
    if (description.length < 2) {
      setError("Describe the image before uploading so search engines can read it.");
      return;
    }
    setError("");
    setUploading(kind);
    try {
      const url = await uploadAdminImage(file, description, draft.slug || draft.title || "post");
      if (kind === "cover") {
        setDraft((current) => ({ ...current, coverImage: url, coverAlt: description }));
        return;
      }
      const safeAlt = description.replaceAll("[", "").replaceAll("]", "");
      setDraft((current) => ({ ...current, body: `${current.body.trimEnd()}\n\n![${safeAlt}](${url})\n` }));
      setImageAlt("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not upload the image");
    } finally {
      setUploading("");
    }
  }

  async function remove() {
    if (!draft.id) return;
    setDeleting(true);
    const response = await fetch(`/api/admin/content/${draft.id}`, { method: "DELETE" });
    setDeleting(false);
    if (!response.ok) {
      toast({ tone: "error", title: "Could not delete" });
      return;
    }
    toast({ tone: "success", title: "Deleted", body: draft.title });
    setConfirming(false);
    router.push(draft.type === "POST" ? "/admin/posts" : "/admin/pages");
    router.refresh();
  }

  return (
    <div className="grid max-w-3xl gap-4">
      {draft.type === "POST" ? (
        <section className="generate-card" aria-labelledby="generate-heading">
          <div className="generate-card-copy">
            <span className="generate-mark" aria-hidden="true">
              <Sparkles size={16} strokeWidth={1.75} />
            </span>
            <div>
              <h2 id="generate-heading" className="heading-6">Start from a prompt</h2>
              <p className="body-sm muted">Describe the article. Generate fills the fields below. The post stays a draft until you save it.</p>
            </div>
          </div>
          <label className="grid gap-2 body-sm">
            Prompt
            <textarea
              className="field"
              rows={4}
              value={prompt}
              spellCheck={false}
              disabled={generating}
              placeholder="A practical note on how a small team should introduce warehouse robots."
              onChange={(event) => setPrompt(event.target.value)}
            />
          </label>
          <div className="generate-card-actions">
            <button type="button" className="btn" onClick={() => void generateFromPrompt()} disabled={generating}>
              <Sparkles size={16} strokeWidth={1.75} aria-hidden="true" />
              {generating ? "Writing the draft…" : "Generate draft"}
            </button>
            <p className="body-sm muted">{generating ? "This usually takes about a minute." : "Nothing is published until you save."}</p>
          </div>
          {notice ? <p className="generate-note">{notice}</p> : null}
        </section>
      ) : null}
      {draft.type === "POST" ? <p className="caption">Article</p> : null}
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
      <label className="grid gap-2 body-sm">
        Cover description
        <input className="field" value={draft.coverAlt} onChange={(event) => set("coverAlt", event.target.value)} />
      </label>
      <ImageDrop
        label="Drag a cover image here"
        hint="16:9 crop, then compressed WebP upload. Add a description first so the image stays searchable."
        cropTitle="Crop cover image"
        preview={draft.coverImage}
        previewAlt={draft.coverAlt || draft.title || "Cover preview"}
        busy={uploading === "cover"}
        onFile={(file) => void uploadImage(file, draft.coverAlt || draft.title, "cover")}
      />
      <Editor id="body" label="Body (markdown)" value={draft.body} onChange={(value) => set("body", value)} />
      <label className="grid gap-2 body-sm">
        Image description
        <input
          className="field"
          value={imageAlt}
          placeholder="What the photo shows"
          onChange={(event) => setImageAlt(event.target.value)}
        />
      </label>
      <ImageDrop
        label="Drag an image into the article"
        hint="16:9 crop and compressed WebP. Inserted with the description above as alt text."
        cropTitle="Crop article image"
        maxWidth={1400}
        busy={uploading === "body"}
        previewAlt={imageAlt || "Article image"}
        onFile={(file) => void uploadImage(file, imageAlt, "body")}
      />
      <div className="grid gap-4 md:grid-cols-2">
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
      </div>
      <SeoFields
        title={draft.seoTitle}
        description={draft.seoDescription}
        slug={draft.slug}
        path={draft.type === "POST" ? `/blog/${draft.slug || "slug"}` : `/${draft.slug || "slug"}`}
        onTitle={(value) => set("seoTitle", value)}
        onDescription={(value) => set("seoDescription", value)}
      />
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
          <Button type="button" variant="ghost" onClick={() => setConfirming(true)}>
            <Trash2 size={16} strokeWidth={1.75} aria-hidden="true" />
            Delete
          </Button>
        ) : null}
      </div>
      <ConfirmModal
        open={confirming}
        title="Delete this item?"
        body={`“${draft.title || "This item"}” will be removed. This cannot be undone.`}
        busy={deleting}
        onCancel={() => !deleting && setConfirming(false)}
        onConfirm={() => void remove()}
      />
    </div>
  );
}
