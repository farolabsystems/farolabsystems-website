"use client";

import { ArrowUp } from "lucide-react";

export function ScrollTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="btn scroll-top"
      aria-label={label}
      title={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={20} strokeWidth={2.25} aria-hidden="true" />
    </button>
  );
}
