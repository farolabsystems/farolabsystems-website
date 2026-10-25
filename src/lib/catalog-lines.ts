type Pair = { title?: string; body?: string };
type Faq = { question?: string; answer?: string };

export function pairLines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const pair = item as Pair;
      if (!pair.title || !pair.body) return [];
      return [`${pair.title} | ${pair.body}`];
    })
    .join("\n");
}

export function faqLines(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const faq = item as Faq;
      if (!faq.question || !faq.answer) return [];
      return [`${faq.question} | ${faq.answer}`];
    })
    .join("\n");
}

export function bulletLines(value: string[]) {
  return value.join("\n");
}
