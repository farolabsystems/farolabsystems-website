import type { IndustryRecord } from "@/website-theme/data/types";

export const industries: IndustryRecord[] = [
  {
    slug: "fintech",
    navLabel: "FinTech",
    filter: "FinTech",
    title: "Software for financial products and digital services",
    seoTitle: "FinTech Software Development | Farolab Systems",
    seoDescription:
      "Farolab Systems designs and builds secure, scalable software for financial products, payments and digital financial services.",
    eyebrow: "FinTech",
    summary: "Secure and scalable platforms for financial products, payments and digital services.",
    bullets: [
      "Customer journeys that stay understandable as the product grows",
      "Data models that can support reporting and review",
      "Integrations with the systems finance and operations already use",
      "Release practices that treat reliability as part of the product",
    ],
    faqs: [
      {
        question: "Do you claim financial licences or certifications?",
        answer: "No. We build the software. Regulatory permissions, audits and certifications stay with your business and your advisors.",
      },
      {
        question: "Can you work with an existing financial platform?",
        answer: "Yes. We can extend a current system, replace a strained part of it, or design a new service beside it.",
      },
    ],
  },
  {
    slug: "healthcare",
    navLabel: "Healthcare",
    filter: "Healthcare",
    title: "Digital healthcare tools people can actually use",
    seoTitle: "Healthcare Software Development | Farolab Systems",
    seoDescription:
      "Farolab Systems builds healthcare software focused on access, communication and operations, without claiming certifications we do not hold.",
    eyebrow: "Healthcare",
    summary: "Digital solutions designed around accessibility, security and better user experiences.",
    bullets: [
      "Flows for patients, clinicians or staff that do not assume expert users",
      "Clear boundaries around sensitive information",
      "Operational tools that reduce manual coordination",
      "Interfaces that stay usable on the devices people already have",
    ],
    faqs: [
      {
        question: "Are you a certified medical-device manufacturer?",
        answer: "No. We do not claim regulatory certifications. If your product needs one, we will work inside the process your advisors define.",
      },
      {
        question: "Can you improve an existing care or admin system?",
        answer: "Yes. We start by mapping who uses it, where it fails, and which part is safe to change first.",
      },
    ],
  },
  {
    slug: "logistics",
    navLabel: "Logistics",
    filter: "Logistics",
    title: "Software that connects logistics operations",
    seoTitle: "Logistics Software Development | Farolab Systems",
    seoDescription:
      "Farolab Systems builds logistics software that connects workflows, operational data and real-time visibility for teams on the ground.",
    eyebrow: "Logistics",
    summary: "Technology that connects operations, workflows, data and real-time visibility.",
    bullets: [
      "Status that matches what is happening in the operation",
      "Handoffs between planning, dispatch and customer updates",
      "Admin tools shaped around the real route, not a generic template",
      "Integrations that fail in a way operators can see",
    ],
    faqs: [
      {
        question: "Can you connect software we already pay for?",
        answer: "Yes. A useful first release is often a reliable connection between the tools your team already trusts.",
      },
      {
        question: "Do you replace every operational system at once?",
        answer: "No. We replace or extend the part that is slowing the work, and leave the rest until it needs to change.",
      },
    ],
  },
  {
    slug: "ecommerce",
    navLabel: "E-commerce",
    filter: "E-commerce",
    title: "Commerce platforms that support the whole operation",
    seoTitle: "E-commerce Software Development | Farolab Systems",
    seoDescription:
      "Farolab Systems builds commerce experiences and the operational software behind them, from catalog and checkout to fulfillment workflows.",
    eyebrow: "E-commerce",
    summary: "Scalable commerce experiences designed to improve customer journeys and operational efficiency.",
    bullets: [
      "Storefronts that match how people actually decide",
      "Catalog, pricing and order rules you can change without a rewrite",
      "Operational views for the team fulfilling the order",
      "Room to add channels without duplicating the product data",
    ],
    faqs: [
      {
        question: "Should we stay on a standard commerce platform?",
        answer: "Often yes, for the ordinary parts. We help you see which parts of the business need software of their own.",
      },
      {
        question: "Can you work beside an existing store?",
        answer: "Yes. We can build the operational layer, a custom buying flow, or a replacement for the part that no longer fits.",
      },
    ],
  },
  {
    slug: "education",
    navLabel: "Education",
    filter: "Education",
    title: "Learning platforms that stay simple to run",
    seoTitle: "Education Software Development | Farolab Systems",
    seoDescription:
      "Farolab Systems designs education platforms for learning, administration and engagement, with software your team can keep improving.",
    eyebrow: "Education",
    summary: "Digital platforms that make learning, administration and engagement more accessible.",
    bullets: [
      "Learning paths people can follow without a manual",
      "Authoring and admin tools for the team behind the content",
      "Progress and communication in one place",
      "A content model that can grow past the first course",
    ],
    faqs: [
      {
        question: "Can you start with one course or one campus workflow?",
        answer: "Yes. A narrow first release is usually the fastest way to learn what the platform actually needs.",
      },
      {
        question: "Do you build both the learner experience and the admin tools?",
        answer: "Yes. The admin side is part of the product, because that is where the content and the records live.",
      },
    ],
  },
  {
    slug: "saas",
    navLabel: "SaaS",
    filter: "SaaS",
    title: "Product engineering for growing SaaS products",
    seoTitle: "SaaS Product Engineering | Farolab Systems",
    seoDescription:
      "Farolab Systems partners with SaaS teams on architecture, product engineering and the releases that keep a product reliable as it grows.",
    eyebrow: "SaaS",
    summary: "Product engineering for SaaS companies that need reliable architecture and continuous growth.",
    bullets: [
      "Multi-tenant boundaries decided before they become painful",
      "Onboarding, roles and billing that match the product promise",
      "A release rhythm your team can keep",
      "Observability so problems are visible before customers report them",
    ],
    faqs: [
      {
        question: "Can you join a SaaS team that already has engineers?",
        answer: "Yes. We can take a product area, add capacity, or help with the architecture decisions in front of you.",
      },
      {
        question: "Do you only work on new products?",
        answer: "No. A large part of SaaS work is making the current product safer to change.",
      },
    ],
  },
];
