"use client";

import { useEffect, useRef, useState } from "react";

const MIN_HEIGHT = 760;
const MAX_HEIGHT = 1200;

function readHeight(data: unknown): number | null {
  if (typeof data === "number" && Number.isFinite(data) && data > 0) return data;
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  for (const key of ["iframeHeight", "height", "documentHeight"]) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  }
  return null;
}

export function CalEmbed({ src, title }: { src: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!frameRef.current || event.source !== frameRef.current.contentWindow) return;
      const payload = event.data;
      if (!payload || typeof payload !== "object") return;
      const type = String((payload as { type?: unknown }).type ?? "");
      if (!type.toLowerCase().includes("dimension")) return;
      const next = readHeight((payload as { data?: unknown }).data ?? payload);
      if (!next) return;
      const nextHeight = Math.ceil(next);
      setHeight((current) => {
        if (nextHeight < MIN_HEIGHT || nextHeight <= current + 24) return current;
        return Math.min(nextHeight, MAX_HEIGHT);
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="cal-embed" style={{ height }}>
      <iframe ref={frameRef} title={title} src={src} loading="lazy" allow="camera; microphone; fullscreen; payment" />
    </div>
  );
}
