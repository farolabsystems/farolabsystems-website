"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/Editor";
import { Button } from "@/website-theme/ui/Button";

export type CaseDraft = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  industries: string;
  services: string;
  statValue: string;
  statLabel: string;
  body: string;
  cover: string;
  gallery: string;
  featured: boolean;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED";
};

export function CaseStudyForm({ initial }: { initial: CaseDraft }) {
  const router = useRouter();
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");

  function set<K extends keyof CaseDraft>(key: K, value: CaseDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setError("");
    const payload = {
      slug: draft.slug,
      title: draft.title,
      summary: draft.summary,
      industries: draft.industries.split(",").map((item) => item.trim()).filter(Boolean),
      services: draft.services.split(",").map((item) => item.trim()).filter(Boolean),
      stats: [{ value: draft.statValue || "+00%", label: draft.statLabel || "Placeholder metric" }],
      body: draft.body,
      cover: draft.cover || undefined,
      gallery: draft.gallery.split(",").map((item) => item.trim()).filter(Boolean),
      featured: draft.featured,
      sortOrder: Number(draft.sortOrder) || 0,
      status: draft.status,
    };
    const response = await fetch(draft.id ? `/api/admin/case-studies/${draft.id}` : "/api/admin/case-studies", {
      method: draft.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "Could not save");
      return;
    }
    router.push("/admin/case-studies");
    router.refresh();
  }

  async function remove() {
    if (!draft.id || !confirm("Delete this case study?")) return;
    await fetch(`/api/admin/case-studies/${draft.id}`, { method: "DELETE" });
    router.push("/admin/case-studies");
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
        Summary
        <textarea className="field" rows={3} value={draft.summary} onChange={(event) => set("summary", event.target.value)} />
      </label>
      <label className="grid gap-2 body-sm">
        Industries (comma separated)
        <input className="field" value={draft.industries} onChange={(event) => set("industries", event.target.value)} />
      </label>
      <label className="grid gap-2 body-sm">
        Services (comma separated)
        <input className="field" value={draft.services} onChange={(event) => set("services", event.target.value)} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 body-sm">
          Stat value
          <input className="field" value={draft.statValue} onChange={(event) => set("statValue", event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          Stat label
          <input className="field" value={draft.statLabel} onChange={(event) => set("statLabel", event.target.value)} />
        </label>
      </div>
      <Editor id="case-body" label="Body (markdown)" value={draft.body} onChange={(value) => set("body", value)} />
      <label className="grid gap-2 body-sm">
        Cover
        <input className="field" value={draft.cover} onChange={(event) => set("cover", event.target.value)} />
      </label>
      <label className="grid gap-2 body-sm">
        Gallery (comma separated)
        <input className="field" value={draft.gallery} onChange={(event) => set("gallery", event.target.value)} />
      </label>
      <label className="flex items-center gap-2 body-sm">
        <input type="checkbox" checked={draft.featured} onChange={(event) => set("featured", event.target.checked)} />
        Featured
      </label>
      <label className="grid gap-2 body-sm">
        Status
        <select className="field" value={draft.status} onChange={(event) => set("status", event.target.value as CaseDraft["status"])}>
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
