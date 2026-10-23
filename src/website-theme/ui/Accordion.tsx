"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FaqItem } from "@/website-theme/data/types";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <div className="grid">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question} style={{ borderTop: "1px solid var(--tc-border-strong)" }}>
            <h3 className="m-0">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 bg-transparent py-4 text-left transition-opacity duration-200 hover:opacity-70"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : index)}
              >
                <span className="heading-6">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="body inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{
                    border: "1px solid var(--tc-border-strong)",
                    transition: "transform var(--tc-duration) var(--tc-ease)",
                    transform: expanded ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="body muted" style={{ paddingBottom: "var(--tc-space-5)", maxWidth: "70ch" }}>
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
