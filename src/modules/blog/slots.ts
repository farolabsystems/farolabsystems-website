export const BLOG_SLOTS = [8, 13, 17, 21] as const;

export type BlogSlot = (typeof BLOG_SLOTS)[number];

export function isBlogSlot(value: number): value is BlogSlot {
  return (BLOG_SLOTS as readonly number[]).includes(value);
}

export function slotTag(day: string, slot: BlogSlot) {
  return `daily:${day}:${String(slot).padStart(2, "0")}`;
}
