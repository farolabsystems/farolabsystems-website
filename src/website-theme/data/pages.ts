import type { PostRecord } from "@/website-theme/data/types";

const cover = "/assets/covers/cover-1.jpg";

export const legalPages: PostRecord[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    excerpt: "How Farolab Systems handles personal data sent through this website.",
    seoTitle: "Privacy Policy | Farolab Systems",
    seoDescription: "How Farolab Systems collects, uses and stores personal data submitted through this website contact form.",
    author: "Farolab Systems",
    category: "Legal",
    tags: ["legal"],
    coverImage: cover,
    publishedAt: "2026-01-15T00:00:00.000Z",
    body: `## Status of this policy

TODO: Replace with actual company information. This is a draft privacy notice for the Farolab Systems website. Have it reviewed by counsel before you collect real enquiries.

## Who we are

Farolab Systems operates this website. The contact details published in the site configuration are the details to use for privacy requests once they are confirmed.

## What we collect

If you send a message through the contact form, we store your name, business email, company, phone number if you provide one, the kind of help you are looking for, project details, budget, timeline and whether you asked for occasional notes.

We also store a technical log of the request, including an IP address, so we can limit abuse of the form.

## Why we use it

We use the message to reply and to understand the work you are asking about. We use the technical log to keep the form reliable. We send occasional notes only if you opt in.

## How long we keep it

We keep enquiry records for as long as we need them to respond and to keep a record of the conversation, then delete or anonymise them. Replace this sentence with your real retention period.

## Your choices

You can ask what we hold about you, ask us to correct it, or ask us to delete it, using the email published on this site once that address is confirmed.
`,
  },
  {
    slug: "cookie-policy",
    title: "Cookie policy",
    excerpt: "The cookies this website uses and how to change your choice.",
    seoTitle: "Cookie Policy | Farolab Systems",
    seoDescription: "Which cookies the Farolab Systems website uses, why they are set, and how you can accept or reject them.",
    author: "Farolab Systems",
    category: "Legal",
    tags: ["legal"],
    coverImage: cover,
    publishedAt: "2026-01-15T00:00:00.000Z",
    body: `## What this covers

This site stores a cookie so we can remember whether you accepted or rejected cookies. TODO: Replace with actual company information before you add analytics or advertising cookies.

## Cookies we set

The consent cookie records your choice: accept all, reject all, or a custom selection. It is used only to remember that choice on this browser.

## What we do not set today

This website does not load a third-party analytics or advertising script. If that changes, this policy should name the provider, the purpose and how long the cookie lasts.

## How to change your choice

Clear the site cookies in your browser and reload the page. The banner will ask again.
`,
  },
];
