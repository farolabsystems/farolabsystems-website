import type { ReactNode } from "react";

export function Section({
  children,
  id,
  tone = "default",
  tight = false,
}: {
  children: ReactNode;
  id?: string;
  tone?: "default" | "white" | "alt" | "soft";
  tight?: boolean;
}) {
  const toneClass = tone === "white" ? "surface" : tone === "alt" ? "surface-alt" : tone === "soft" ? "surface-primary" : "";
  return (
    <section id={id} className={`${tight ? "section-tight" : "section"} ${toneClass}`.trim()}>
      {children}
    </section>
  );
}
