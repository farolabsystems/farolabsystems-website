"use client";

import { useEffect, useRef, type ReactNode } from "react";

const SPEED = 28;

export function ChipRail({
  children,
  className = "",
  label,
  trackRole,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  trackRole?: string;
  as?: "div" | "ul";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let holding = false;
    let resumeAt = 0;
    let dir = 1;
    let hold = 1.6;
    let last = performance.now();
    let expected = el.scrollLeft;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const pauseFor = (ms: number) => {
      paused = true;
      resumeAt = performance.now() + ms;
    };
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - expected) < 2) return;
      expected = el.scrollLeft;
      pauseFor(4000);
    };
    const onDown = () => {
      holding = true;
      paused = true;
    };
    const onUp = () => {
      holding = false;
      pauseFor(2500);
    };
    const onWheel = () => pauseFor(4000);
    const onEnter = () => {
      paused = true;
      resumeAt = Number.POSITIVE_INFINITY;
    };
    const onLeave = () => {
      paused = false;
      resumeAt = 0;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);
    if (fine) {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    }

    let frame = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (document.hidden || holding) return;
      if (resumeAt && now < resumeAt) return;
      if (resumeAt) {
        paused = false;
        resumeAt = 0;
      }
      if (paused) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 8) return;
      if (hold > 0) {
        hold -= dt;
        return;
      }
      expected = el.scrollLeft + dir * SPEED * dt;
      el.scrollLeft = expected;
      if (el.scrollLeft >= max - 1) {
        el.scrollLeft = max;
        dir = -1;
        hold = 1.6;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft = 0;
        dir = 1;
        hold = 1.6;
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
      if (fine) {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className ? `chip-rail ${className}` : "chip-rail"}>
      <Tag className="chip-rail-track" role={trackRole} aria-label={label}>
        {children}
      </Tag>
    </div>
  );
}
