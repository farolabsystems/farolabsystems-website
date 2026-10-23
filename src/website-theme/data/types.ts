export type Stat = { value: string; label: string };

export type FaqItem = { question: string; answer: string };

export type ServiceRecord = {
  slug: string;
  navLabel: string;
  group: "Development" | "Design" | "Maintenance" | "Delivery";
  filter: string;
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

/** Brand icon slug from `simple-icons`, or a Lucide fallback for generic labels. */
export type TechnologyIcon =
  | { kind: "simple"; slug: string }
  | { kind: "lucide"; name: "network" | "git-branch" | "sparkles" | "bot" | "cloud" | "server" };

export type TechnologyRecord = {
  slug: string;
  navLabel: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  summary: string;
  bullets: string[];
  faqs: FaqItem[];
  icon: TechnologyIcon;
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
  coverAlt?: string;
  gallery: string[];
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  sortOrder: number;
};

export type PostRecord = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  coverAlt?: string;
  author: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
};
