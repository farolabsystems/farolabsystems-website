"use client";

import { useEffect, useState } from "react";

export function StatCounter({ value, label }: { value: string; label: string }) {
  const match = /^(\D*)(\d+)(.*)$/.exec(value.trim());
  const target = match ? Number(match[2]) : null;
  const [current, setCurrent] = useState(target ?? 0);

  useEffect(() => {
    if (target === null) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 700);
      setCurrent(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  const shown = match ? `${match[1]}${current}${match[3]}` : value;
  return (
    <div>
      <p className="heading-3" style={{ color: "var(--tc-primary-active)" }}>
        {shown}
      </p>
      <p className="body-sm muted">{label}</p>
    </div>
  );
}
