import { z } from "zod";
import { formatStoredPhone, phoneIssue } from "@/lib/phone";
import { budgetRanges, timelineOptions } from "@/website-theme/data/contact";

const optionalBudget = z
  .string()
  .trim()
  .max(80)
  .refine((value) => !value || (budgetRanges as readonly string[]).includes(value), "Select a budget range");
const optionalTimeline = z
  .string()
  .trim()
  .max(80)
  .refine((value) => !value || (timelineOptions as readonly string[]).includes(value), "Select a timeline");

export const contactSchema = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name").max(80),
    lastName: z.string().trim().min(1, "Enter your last name").max(80),
    email: z.string().trim().email("Enter a business email").max(160),
    company: z.string().trim().max(120).optional(),
    country: z.string().trim().max(2).optional(),
    phone: z.string().trim().max(40).optional(),
    startingFrom: z.string().trim().min(1, "Tell us what you are looking for").max(80),
    budget: optionalBudget.optional(),
    timeline: optionalTimeline.optional(),
    message: z.string().trim().min(1, "Tell us about the project").max(5000),
    newsletter: z.boolean().optional(),
    company_website: z.string().max(200).optional(),
  })
  .superRefine((value, ctx) => {
    const message = phoneIssue(value.country, value.phone);
    if (message) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message });
  })
  .transform((value) => ({
    ...value,
    phone: formatStoredPhone(value.country, value.phone),
  }));

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const contentSchema = z.object({
  type: z.enum(["POST", "PAGE"]),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase slug"),
  title: z.string().trim().min(1).max(180),
  excerpt: z.string().trim().max(400).optional(),
  body: z.string().trim().min(1),
  coverImage: z.string().trim().max(500).optional(),
  coverAlt: z.string().trim().max(180).optional(),
  author: z.string().trim().max(120).optional(),
  category: z.string().trim().max(80).optional(),
  tags: z.array(z.string().trim().min(1).max(40)).max(12).optional(),
  seoTitle: z.string().trim().max(180).optional(),
  seoDescription: z.string().trim().max(300).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const caseStudySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(180),
  summary: z.string().trim().min(1).max(400),
  industries: z.array(z.string().trim().min(1).max(80)).min(1).max(8),
  services: z.array(z.string().trim().min(1).max(80)).min(1).max(8),
  stats: z
    .array(z.object({ value: z.string().trim().min(1).max(24), label: z.string().trim().min(1).max(80) }))
    .max(6),
  body: z.string().trim().min(1),
  cover: z.string().trim().max(300).optional(),
  coverAlt: z.string().trim().max(180).optional(),
  gallery: z.array(z.string().trim().max(300)).max(8).optional(),
  seoTitle: z.string().trim().max(180).optional(),
  seoDescription: z.string().trim().max(300).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(999).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const siteSettingsSchema = z.object({
  seoTitle: z.string().trim().min(10, "Add a site title").max(70, "Keep the site title under 70 characters"),
  seoDescription: z.string().trim().min(50, "Add a fuller site description").max(170, "Keep the site description under 170 characters"),
});

const catalogPair = z.object({
  title: z.string().trim().min(1).max(120),
  body: z.string().trim().min(1).max(500),
});

export const catalogSchema = z.object({
  kind: z.enum(["SERVICE", "INDUSTRY", "TECHNOLOGY"]),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase slug"),
  navLabel: z.string().trim().min(1).max(120),
  group: z.string().trim().max(40).optional(),
  filter: z.string().trim().max(80).optional(),
  title: z.string().trim().min(1).max(180),
  seoTitle: z.string().trim().max(180).optional(),
  seoDescription: z.string().trim().max(300).optional(),
  eyebrow: z.string().trim().max(80).optional(),
  summary: z.string().trim().min(1).max(500),
  blurb: z.string().trim().max(240).optional(),
  bullets: z.array(z.string().trim().min(1).max(240)).max(12).optional(),
  outcomes: z.array(catalogPair).max(8).optional(),
  steps: z.array(catalogPair).max(8).optional(),
  faqs: z
    .array(z.object({ question: z.string().trim().min(1).max(180), answer: z.string().trim().min(1).max(600) }))
    .max(8)
    .optional(),
  icon: z
    .union([
      z.object({ kind: z.literal("simple"), slug: z.string().trim().min(1).max(80) }),
      z.object({
        kind: z.literal("lucide"),
        name: z.enum(["network", "git-branch", "sparkles", "bot", "cloud", "server"]),
      }),
    ])
    .optional(),
  sortOrder: z.number().int().min(0).max(999).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContentInput = z.infer<typeof contentSchema>;
export type CaseStudyInput = z.infer<typeof caseStudySchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;
export type CatalogInput = z.infer<typeof catalogSchema>;
