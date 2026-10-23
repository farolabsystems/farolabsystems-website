"use client";

import { useState } from "react";
import { SeoFields } from "@/components/SeoFields";
import { Button } from "@/website-theme/ui/Button";

export function SettingsForm({ initial }: { initial: { seoTitle: string; seoDescription: string } }) {
  const [seoTitle, setSeoTitle] = useState(initial.seoTitle);
  const [seoDescription, setSeoDescription] = useState(initial.seoDescription);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function save() {
    setError("");
    setSaved(false);
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seoTitle, seoDescription }),
    });
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "Could not save");
      return;
    }
    setSaved(true);
  }

  return (
    <div className="grid max-w-3xl gap-4">
      <SeoFields
        title={seoTitle}
        description={seoDescription}
        slug="home"
        path="/"
        onTitle={setSeoTitle}
        onDescription={setSeoDescription}
      />
      {error ? <p style={{ color: "var(--tc-danger)" }}>{error}</p> : null}
      {saved ? <p className="body-sm">Saved. The public site title and description now use these values.</p> : null}
      <div>
        <Button type="button" onClick={() => void save()}>
          Save SEO
        </Button>
      </div>
    </div>
  );
}
