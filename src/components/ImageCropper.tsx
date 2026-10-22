"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";
import { COVER_ASPECT, cropAndCompressImage, type CropArea } from "@/lib/image-process";

type Props = {
  image: string;
  fileName: string;
  aspect?: number;
  maxWidth?: number;
  title?: string;
  onCancel: () => void;
  onDone: (file: File) => void;
};

export function ImageCropper({
  image,
  fileName,
  aspect = COVER_ASPECT,
  maxWidth = 1600,
  title = "Crop image",
  onCancel,
  onDone,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<CropArea | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setArea(pixels);
  }, []);

  async function confirm() {
    if (!area) return;
    setBusy(true);
    setError("");
    try {
      const file = await cropAndCompressImage(image, area, { maxWidth, quality: 0.82, fileName });
      onDone(file);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not crop the image");
      setBusy(false);
    }
  }

  return (
    <div className="cropper-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="cropper-card">
        <div className="cropper-head">
          <h2 className="heading-6">{title}</h2>
          <p className="body-sm muted">Fit the image to the site layout. It is compressed before upload.</p>
        </div>
        <div className="cropper-stage">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
          />
        </div>
        <label className="cropper-zoom body-sm">
          Zoom
          <input type="range" min={1} max={3} step={0.05} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
        </label>
        {error ? (
          <p className="body-sm" style={{ color: "var(--tc-danger)" }}>
            {error}
          </p>
        ) : null}
        <div className="cropper-actions">
          <button type="button" className="btn btn-ghost" style={{ border: "1px solid var(--tc-text)" }} onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn" onClick={() => void confirm()} disabled={busy || !area}>
            {busy ? "Compressing…" : "Use image"}
          </button>
        </div>
      </div>
    </div>
  );
}
