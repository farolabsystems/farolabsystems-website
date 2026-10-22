export type Stat = { value: string; label: string };

export type FaqItem = { question: string; answer: string };

export type ServiceRecord = {
  slug: string;
  navLabel: string;
  group: "Development" | "Design" | "Maintenance" | "Delivery";
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  summary: string;
  blurb: string;
  outcomes: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  faqs: FaqItem[];
};

export type IndustryRecord = {
  slug: string;
  navLabel: string;
  filter: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  summary: string;
  bullets: string[];
  faqs: FaqItem[];
};

export type CaseStudyRecord = {
  slug: string;
  title: string;
  summary: string;
  industries: string[];
  services: string[];
  stats: Stat[];
  body: string;
  cover: string;
  gallery: string[];
  featured: boolean;
  sortOrder: number;
};

export type PostRecord = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
};
