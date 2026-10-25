"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { SeoFields } from "@/components/SeoFields";
import { useAdminToast } from "@/components/AdminToast";
import { Button } from "@/website-theme/ui/Button";

export type CatalogKindName = "SERVICE" | "INDUSTRY" | "TECHNOLOGY";

export type CatalogDraft = {
  id?: string;
  kind: CatalogKindName;
  slug: string;
  navLabel: string;
  group: string;
  filter: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  summary: string;
  blurb: string;
  bullets: string;
  outcomes: string;
  steps: string;
  faqs: string;
  iconKind: "simple" | "lucide";
  iconValue: string;
  sortOrder: number;
  status: "DRAFT" | "PUBLISHED";
};

const labels: Record<CatalogKindName, { noun: string; list: string; publicPath: string }> = {
  SERVICE: { noun: "service", list: "/admin/services", publicPath: "/services" },
  INDUSTRY: { noun: "industry", list: "/admin/industries", publicPath: "/industries" },
  TECHNOLOGY: { noun: "technology", list: "/admin/technologies", publicPath: "/technologies" },
};

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function pairs(value: string) {
  return lines(value).flatMap((line) => {
    const [title, ...rest] = line.split("|");
    const body = rest.join("|").trim();
    if (!title.trim() || !body) return [];
    return [{ title: title.trim(), body }];
  });
}

function faqs(value: string) {
  return pairs(value).map((item) => ({ question: item.title, answer: item.body }));
}

export function CatalogForm({ initial }: { initial: CatalogDraft }) {
  const router = useRouter();
  const toast = useAdminToast();
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const copy = labels[draft.kind];

  function set<K extends keyof CatalogDraft>(key: K, value: CatalogDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setError("");
    const lucideNames = ["network", "git-branch", "sparkles", "bot", "cloud", "server"] as const;
    const lucideName = lucideNames.find((name) => name === draft.iconValue) ?? "sparkles";
    const icon =
      draft.kind === "TECHNOLOGY"
        ? draft.iconKind === "lucide"
          ? { kind: "lucide" as const, name: lucideName }
          : { kind: "simple" as const, slug: draft.iconValue || draft.slug || "react" }
        : undefined;
    const payload = {
      kind: draft.kind,
      slug: draft.slug,
      navLabel: draft.navLabel,
      group: draft.group || undefined,
      filter: draft.filter || undefined,
      title: draft.title,
      seoTitle: draft.seoTitle || undefined,
      seoDescription: draft.seoDescription || undefined,
      eyebrow: draft.eyebrow || undefined,
      summary: draft.summary,
      blurb: draft.blurb || undefined,
      bullets: lines(draft.bullets),
      outcomes: pairs(draft.outcomes),
      steps: pairs(draft.steps),
      faqs: faqs(draft.faqs),
      icon,
      sortOrder: Number(draft.sortOrder) || 0,
      status: draft.status,
    };
    const response = await fetch(draft.id ? `/api/admin/catalog/${draft.id}` : "/api/admin/catalog", {
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
    router.push(copy.list);
    router.refresh();
  }

  async function remove() {
    if (!draft.id) return;
    setDeleting(true);
    const response = await fetch(`/api/admin/catalog/${draft.id}`, { method: "DELETE" });
    setDeleting(false);
    if (!response.ok) {
      toast({ tone: "error", title: "Could not delete" });
      return;
    }
    toast({ tone: "success", title: "Deleted", body: draft.title });
    setConfirming(false);
    router.push(copy.list);
    router.refresh();
  }

  return (
    <div className="grid max-w-3xl gap-4">
      <label className="grid gap-2 body-sm">
        Navigation label
        <input className="field" value={draft.navLabel} onChange={(event) => set("navLabel", event.target.value)} />
      </label>
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
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 body-sm">
          Eyebrow
          <input className="field" value={draft.eyebrow} onChange={(event) => set("eyebrow", event.target.value)} />
        </label>
        <label className="grid gap-2 body-sm">
          Sort order
          <input className="field" type="number" value={draft.sortOrder} onChange={(event) => set("sortOrder", Number(event.target.value))} />
        </label>
      </div>
      {draft.kind === "SERVICE" ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 body-sm">
              Group
              <select className="field" value={draft.group} onChange={(event) => set("group", event.target.value)}>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Delivery">Delivery</option>
              </select>
            </label>
            <label className="grid gap-2 body-sm">
              Case study filter
              <input className="field" value={draft.filter} onChange={(event) => set("filter", event.target.value)} />
            </label>
          </div>
          <label className="grid gap-2 body-sm">
            Short menu line
            <input className="field" value={draft.blurb} onChange={(event) => set("blurb", event.target.value)} />
          </label>
          <label className="grid gap-2 body-sm">
            Outcomes, one per line as Title | Description
            <textarea className="field" rows={5} value={draft.outcomes} onChange={(event) => set("outcomes", event.target.value)} />
          </label>
          <label className="grid gap-2 body-sm">
            Steps, one per line as Title | Description
            <textarea className="field" rows={5} value={draft.steps} onChange={(event) => set("steps", event.target.value)} />
          </label>
        </>
      ) : null}
      {draft.kind !== "SERVICE" ? (
        <label className="grid gap-2 body-sm">
          {draft.kind === "INDUSTRY" ? "Filter name used by case studies" : "Icon name"}
          {draft.kind === "INDUSTRY" ? (
            <input className="field" value={draft.filter} onChange={(event) => set("filter", event.target.value)} />
          ) : (
            <div className="grid gap-3 md:grid-cols-[160px_1fr]">
              <select className="field" value={draft.iconKind} onChange={(event) => set("iconKind", event.target.value as CatalogDraft["iconKind"])}>
                <option value="simple">Brand icon</option>
                <option value="lucide">Generic icon</option>
              </select>
              <input className="field" value={draft.iconValue} onChange={(event) => set("iconValue", event.target.value)} />
            </div>
          )}
        </label>
      ) : null}
      {draft.kind !== "SERVICE" ? (
        <label className="grid gap-2 body-sm">
          Points, one per line
          <textarea className="field" rows={5} value={draft.bullets} onChange={(event) => set("bullets", event.target.value)} />
        </label>
      ) : null}
      <label className="grid gap-2 body-sm">
        Questions, one per line as Question | Answer
        <textarea className="field" rows={5} value={draft.faqs} onChange={(event) => set("faqs", event.target.value)} />
      </label>
      <SeoFields
        title={draft.seoTitle}
        description={draft.seoDescription}
        slug={draft.slug}
        path={`${copy.publicPath}/${draft.slug || "slug"}`}
        onTitle={(value) => set("seoTitle", value)}
        onDescription={(value) => set("seoDescription", value)}
      />
      <label className="grid gap-2 body-sm">
        Status
        <select className="field" value={draft.status} onChange={(event) => set("status", event.target.value as CatalogDraft["status"])}>
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
        title={`Delete this ${copy.noun}?`}
        body={`“${draft.title || "This page"}” will be removed from the site. This cannot be undone.`}
        busy={deleting}
        onCancel={() => !deleting && setConfirming(false)}
        onConfirm={() => void remove()}
      />
    </div>
  );
}
