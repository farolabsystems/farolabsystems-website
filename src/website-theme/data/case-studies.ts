import type { CaseStudyRecord } from "@/website-theme/data/types";

const note =
  "This is a concept project. It shows the kind of product Farolab Systems designs and builds. It is not a client engagement, and the figures you might expect in a case study are intentionally omitted.";

function study(input: Omit<CaseStudyRecord, "gallery"> & { gallery?: string[] }): CaseStudyRecord {
  return { ...input, gallery: input.gallery ?? [input.cover] };
}

export const caseStudies: CaseStudyRecord[] = [
  study({
    slug: "finora",
    title: "Finora",
    summary: "A scalable financial platform designed to simplify digital financial operations and customer experiences.",
    industries: ["FinTech"],
    services: ["Custom Software", "Web Applications", "AI"],
    stats: [
      { value: "Modular", label: "Platform shape" },
      { value: "API-led", label: "Service design" },
      { value: "Extensible", label: "Next release" },
    ],
    cover: "/assets/covers/cover-1.jpg",
    featured: true,
    sortOrder: 1,
    body: `## Challenge

The business needed a simpler way to manage digital financial workflows and customer interactions. The work was split across tools that did not share a clear model of the customer.

## Approach

We designed a modular platform focused on usability, security and an architecture that can accept new products without a rewrite. Regulatory approvals were treated as the client's responsibility, not as something the software vendor can claim.

## Solution

A modern web platform with API-driven backend services, a clear separation between customer activity and back-office review, and an extensible place for later automation.

## Technology

Next.js, Node.js, PostgreSQL, Docker.

## Outcome

A scalable foundation designed for future product expansion. ${note}`,
  }),
  study({
    slug: "logiflow",
    title: "LogiFlow",
    summary: "A connected logistics platform helping teams manage operations, workflows and real-time information.",
    industries: ["Logistics"],
    services: ["Custom Software", "Web Applications", "Cloud & DevOps", "Support"],
    stats: [
      { value: "Connected", label: "Operations view" },
      { value: "Visible", label: "Work status" },
      { value: "Operable", label: "After launch" },
    ],
    cover: "/assets/covers/cover-2.jpg",
    featured: true,
    sortOrder: 2,
    body: `## Challenge

Operations teams were coordinating work through messages and spreadsheets. Status existed, but not in one place the floor and the office could both trust.

## Approach

We mapped the handoffs that actually happen in a day, then designed a system around those states instead of a generic tracking template.

## Solution

A web platform for planning, status and exceptions, with an API for the tools that should stay in place and a cloud setup the team can deploy repeatedly.

## Technology

Next.js, Node.js, PostgreSQL, Docker, CI/CD.

## Outcome

A single operational picture the team can extend as routes, partners and volumes change. ${note}`,
  }),
  study({
    slug: "mediconnect",
    title: "MediConnect",
    summary: "A digital healthcare platform focused on better access, communication and operational efficiency.",
    industries: ["Healthcare"],
    services: ["Custom Software", "Web Applications", "Mobile Apps", "Product Design"],
    stats: [
      { value: "Clear", label: "User paths" },
      { value: "Careful", label: "Data boundaries" },
      { value: "Shared", label: "Web and mobile" },
    ],
    cover: "/assets/covers/cover-3.jpg",
    featured: true,
    sortOrder: 3,
    body: `## Challenge

Patients and staff were using different channels to do a simple job: find information, ask a question, and know what happens next. The operational side of that work was manual.

## Approach

We designed the product around access and communication first, with explicit boundaries around sensitive information. No medical certification is claimed for this concept.

## Solution

A web and mobile experience on one API, with roles for staff, a record of the conversation, and an interface that does not assume a trained operator.

## Technology

React, Next.js, Node.js, PostgreSQL.

## Outcome

A foundation for a healthcare product that can add workflows without mixing patient communication and internal tools. ${note}`,
  }),
  study({
    slug: "storelane",
    title: "Storelane",
    summary: "A commerce concept for catalog, checkout and the operational work that follows an order.",
    industries: ["E-commerce"],
    services: ["Custom Software", "Web Applications", "Product Engineering"],
    stats: [
      { value: "Directed", label: "Buying flow" },
      { value: "Owned", label: "Catalog data" },
      { value: "Linked", label: "Fulfillment" },
    ],
    cover: "/assets/covers/cover-4.jpg",
    featured: false,
    sortOrder: 4,
    body: `## Challenge

The storefront and the team fulfilling orders were looking at different versions of the truth. Standard commerce tools covered the ordinary case and strained on the rules that made the business different.

## Approach

We kept the customer journey short and designed the catalog and order model so operations could see the same order the customer placed.

## Solution

A web commerce experience with a clear checkout, an API for catalog and orders, and an operational view for the people who ship.

## Technology

Next.js, Node.js, PostgreSQL, Redis.

## Outcome

A commerce foundation that can grow into more channels without copying product data into another tool. ${note}`,
  }),
  study({
    slug: "learnbase",
    title: "Learnbase",
    summary: "An education concept for learning paths, content authoring and the admin work around them.",
    industries: ["Education"],
    services: ["Web Applications", "Mobile Apps", "Product Design"],
    stats: [
      { value: "Guided", label: "Learning path" },
      { value: "Editable", label: "Content tools" },
      { value: "Shared", label: "Learner and admin" },
    ],
    cover: "/assets/covers/cover-5.jpg",
    featured: false,
    sortOrder: 5,
    body: `## Challenge

Learners and the people running the programme did not share a simple view of progress. Content lived in files, and administration lived in a separate tool.

## Approach

We designed one content model for the lesson, the learner and the administrator, and kept the first release to a single programme.

## Solution

A web and mobile learning experience with authoring tools, progress that a person can explain, and an admin area that does not require a separate system.

## Technology

Next.js, TypeScript, PostgreSQL.

## Outcome

A learning product that can add the next programme without redesigning the record of progress. ${note}`,
  }),
  study({
    slug: "relayboard",
    title: "Relayboard",
    summary: "A SaaS concept for onboarding, roles and the operational console behind a growing product.",
    industries: ["SaaS"],
    services: ["Product Engineering", "Cloud & DevOps", "Dedicated Teams"],
    stats: [
      { value: "Bounded", label: "Tenancy" },
      { value: "Repeatable", label: "Deploys" },
      { value: "Staffed", label: "Product area" },
    ],
    cover: "/assets/covers/cover-6.jpg",
    featured: false,
    sortOrder: 6,
    body: `## Challenge

The product had early customers and a codebase that made every new account a special case. Shipping depended on a few people who knew the deploy by heart.

## Approach

We treated tenancy, roles and the path to production as product decisions, then staffed a small team to own that area with the client's engineers.

## Solution

A console for accounts and roles, a clearer separation between tenants, and a deployment pipeline the team can run without a private checklist.

## Technology

Next.js, Node.js, PostgreSQL, Docker, AWS.

## Outcome

A SaaS foundation that can take the next customer without inventing a new setup for each one. ${note}`,
  }),
];
