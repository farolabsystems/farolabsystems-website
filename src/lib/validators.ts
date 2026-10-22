import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  email: z.string().trim().email("Enter a business email").max(160),
  startingFrom: z.enum(["new", "continuation", ""]).optional(),
  options: z.array(z.string().trim().min(1).max(80)).max(12).optional(),
  message: z.string().trim().min(1, "Tell us what this should solve").max(5000),
  newsletter: z.boolean().optional(),
  company_website: z.string().max(200).optional(),
});

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
  coverImage: z.string().trim().max(300).optional(),
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
  gallery: z.array(z.string().trim().max(300)).max(8).optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(999).optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContentInput = z.infer<typeof contentSchema>;
export type CaseStudyInput = z.infer<typeof caseStudySchema>;
