import type { PostRecord } from "@/website-theme/data/types";

const cover = "/assets/covers/cover-1.png";

export const legalPages: PostRecord[] = [
  {
    slug: "privacy-policy",
    title: "Privacy policy",
    excerpt: "How this placeholder company handles personal data sent through the site.",
    seoTitle: "Privacy policy",
    seoDescription: "Placeholder privacy policy. Replace it with a policy reviewed for your company.",
    author: "COMPANY_NAME",
    category: "Legal",
    tags: ["legal"],
    coverImage: cover,
    publishedAt: "2026-01-15T00:00:00.000Z",
    body: `## Who this policy is for

This is a placeholder privacy policy for COMPANY_NAME. Replace it with text your counsel has approved before you collect real enquiries.

## What we collect

When you write to us we store your name, email address, the options you select, and your message. If you opt in, we also store that you want occasional updates.

## Why we use it

We use the message to reply. We use technical logs to keep the form reliable and to limit abuse.

## How long we keep it

Enquiry records stay until the conversation is finished and for as long as we need them for our own records. Replace this period with your real retention rule.

## Cookies

The cookie banner stores your choice in a cookie named cookie_consent. See the cookie policy for the categories.

## Contact

Write to inquiry@example.com about a privacy request.
`,
  },
  {
    slug: "cookie-policy",
    title: "Cookie policy",
    excerpt: "Which cookies this placeholder site sets, and how to change your choice.",
    seoTitle: "Cookie policy",
    seoDescription: "Placeholder cookie policy. Replace it before launch.",
    author: "COMPANY_NAME",
    category: "Legal",
    tags: ["legal"],
    coverImage: cover,
    publishedAt: "2026-01-15T00:00:00.000Z",
    body: `## What a cookie is

A cookie is a small file the browser stores so the site can remember a choice.

## Cookies we set

- cookie_consent stores whether you accepted, rejected, or customized cookies.
- admin_token is set only after an administrator signs in. It is not used for visitors.

## Categories

Necessary cookies keep the site and the admin session working. Optional analytics cookies stay off unless you accept them. This demo does not load a third-party analytics script.

## How to change your mind

Clear the cookie_consent cookie in your browser and reload. The banner will ask again.
`,
  },
];
