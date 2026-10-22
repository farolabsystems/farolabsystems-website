"use client";

export function ScrollTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="btn"
      style={{ position: "fixed", right: "var(--tc-space-4)", bottom: "var(--tc-space-4)", zIndex: 30 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {label}
    </button>
  );
}
