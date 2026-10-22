export const projectIntents = [
  "Build a new product",
  "Improve an existing product",
  "AI integration",
  "Hire a development team",
  "UI/UX design",
  "Cloud & DevOps",
  "Support & maintenance",
  "Something else",
] as const;

export const budgetRanges = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000 – $250,000",
  "$250,000+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "1–2 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
  "Flexible / not sure yet",
] as const;

export const contactPage = {
  eyebrow: "Contact",
  title: "Let's build something useful.",
  body: "Have an idea, an existing product or a technology challenge? Tell us what you're working on and we'll explore how we can help.",
};

export const schedulePage = {
  eyebrow: "Schedule",
  title: "Let's talk about your project.",
  body: "Choose a convenient time to discuss your product, technology requirements and next steps. Booking will use Cal.com (cal.id). Until that calendar is connected, send a note with times that work for you.",
};
