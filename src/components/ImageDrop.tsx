"use client";

import { useState, type DragEvent } from "react";
import { ImageCropper } from "@/components/ImageCropper";
import { COVER_ASPECT, readFileAsDataUrl } from "@/lib/image-process";

const accept = "image/png,image/jpeg,image/webp,image/gif,image/avif";

export async function uploadAdminImage(file: File, alt: string, slug: string) {
  const data = new FormData();
  data.set("file", file);
  data.set("alt", alt);
  data.set("slug", slug);
  const response = await fetch("/api/admin/uploads", { method: "POST", body: data });
  const body = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
  if (!response.ok || !body?.url) throw new Error(body?.error ?? "Could not upload the image");
  return body.url;
}

export function ImageDrop({
  label,
  hint,
  preview,
  previewAlt,
  busy,
  aspect = COVER_ASPECT,
  maxWidth = 1600,
  cropTitle = "Crop image",
  onFile,
}: {
  label: string;
  hint: string;
  preview?: string;
  previewAlt: string;
  busy?: boolean;
  aspect?: number;
  maxWidth?: number;
  cropTitle?: string;
  onFile: (file: File) => void;
}) {
  const [over, setOver] = useState(false);
  const [draft, setDraft] = useState<{ src: string; name: string } | null>(null);

  async function take(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    const src = await readFileAsDataUrl(file);
    setDraft({ src, name: file.name || "image.webp" });
  }

  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setOver(true);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setOver(false);
    void take(event.dataTransfer.files[0]);
  }

  return (
    <>
      <div
        className={over ? "dropzone is-over" : "dropzone"}
        onDragEnter={onDragOver}
        onDragOver={onDragOver}
        onDragLeave={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node)) return;
          setOver(false);
        }}
        onDrop={onDrop}
      >
        {preview ? (
          <div className="dropzone-frame">
            <img className="dropzone-preview" src={preview} alt={previewAlt} />
          </div>
        ) : null}
        <p className="body-sm">{busy ? "Uploading…" : label}</p>
        <p className="caption">{hint}</p>
        <label className="btn">
          Browse
          <input
            className="sr-only-input"
            type="file"
            accept={accept}
            disabled={busy}
            onChange={(event) => {
              void take(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </label>
      </div>
      {draft ? (
        <ImageCropper
          image={draft.src}
          fileName={draft.name}
          aspect={aspect}
          maxWidth={maxWidth}
          title={cropTitle}
          onCancel={() => setDraft(null)}
          onDone={(file) => {
            setDraft(null);
            onFile(file);
          }}
        />
      ) : null}
    </>
  );
}
