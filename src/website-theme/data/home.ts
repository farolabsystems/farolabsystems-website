// TODO: replace with our own. Section order matches the reference layout.
// Supporting copy is original placeholder text, not the reference site's wording.

import type { FaqItem } from "@/website-theme/data/types";

export const hero = {
  eyebrow: "Custom software | Web & mobile",
  title: "Ship the product.\nClear the thing that slows it down.",
  body: "We design and build new products, and we take over systems that already run the business. Your team stays on the work only you can do.",
  primary: { label: "Talk to a co-founder", href: "/contact" },
  secondary: { label: "Explore our work", href: "/case-studies" },
};

export const trustedBy = ["NORTHWIND", "HARBOR", "LUMEN", "FIELDNOTE", "KINDLING", "ORBIT", "PAPERMILL", "SABLE"];

export const startingPoint = {
  eyebrow: "Engagement",
  title: "Where are you starting from?",
  columns: [
    {
      index: "01",
      title: "It does not exist yet",
      body: "You have a sharp problem and a rough shape of the product. We help you decide the first release, design it, and build it so it can grow.",
      links: [
        { label: "Turn an idea into a working product", href: "/services/custom-software-development" },
        { label: "Put AI to work in the product", href: "/services/ai-development" },
        { label: "Launch a customer-facing app", href: "/services/web-app-development" },
      ],
    },
    {
      index: "02",
      title: "It works, until it does not",
      body: "The tools, the spreadsheet, or the old codebase are now the bottleneck. We connect, replace, or take over what is already there.",
      links: [
        { label: "The rented tool will not bend", href: "/services/custom-software-development" },
        { label: "A team needs to take it over", href: "/services/support-and-maintenance" },
        { label: "The manual process has to stop", href: "/services/business-app-development" },
      ],
    },
  ],
};

export const forStartups = {
  eyebrow: "For startups",
  title: "Prove the idea, then build it so it lasts",
  cards: [
    {
      question: "Can you turn a prototype into a product people can rely on?",
      answer: "Yes. We keep what is already proving the idea and replace the parts that will not survive real users.",
    },
    {
      question: "Can you help decide what belongs in the first version?",
      answer: "We cut the list to the workflow that has to be true on day one, and we write down what waits.",
    },
    {
      question: "Can you help explain the product to investors?",
      answer: "You leave with a working slice, a clear scope, and a story that matches what was actually built.",
    },
    {
      question: "Can you take an early release to the next stage?",
      answer: "We stay for the second and third release: reliability, admin tools, and the integrations the business needs.",
    },
  ],
};

export const differentiators = {
  eyebrow: "How we work",
  title: "What makes us different",
  intro: "The expensive surprises in a software project are usually the questions nobody asked before the estimate.",
  items: [
    { title: "We start from the operation", body: "Who uses it, what happens when it fails, and what the business does the morning after launch." },
    { title: "Scope you can compare", body: "After a short discovery you get a written slice of work, not a feature dump with a single number." },
    { title: "The same people stay", body: "Discovery, design, and build sit with one team, so the plan does not get translated three times." },
    { title: "Handover is part of the job", body: "Docs, access, and a support path are in the plan before the first sprint ends." },
  ],
};

export const industryTabs = [
  {
    id: "commerce",
    label: "eCommerce",
    title: "Stores that have outgrown a standard platform",
    bullets: ["Custom checkout and catalog rules", "Operations behind the storefront", "Integrations with the tools you already pay for"],
    href: "/industries/ecommerce",
    caseSlug: "hocomo",
  },
  {
    id: "travel",
    label: "Travel",
    title: "Booking flows where inspiration becomes a reservation",
    bullets: ["Search and itinerary tools", "Supplier and content integrations", "Guest accounts that are not an afterthought"],
    href: "/industries/travel-software-development",
    caseSlug: "trava",
  },
  {
    id: "learning",
    label: "Learning",
    title: "Learning products people come back to",
    bullets: ["Course and progress models", "Authoring tools for your team", "Mobile and web on one content system"],
    href: "/industries/marketing",
    caseSlug: "sans",
  },
  {
    id: "logistics",
    label: "Logistics",
    title: "Ordering and delivery you do not want to rent",
    bullets: ["Dispatch and status your operators trust", "Customer tracking without a patchwork of chats", "Admin tools that match the real route"],
    href: "/industries/logistics-digital-solutions-development",
    caseSlug: "buzzin",
  },
  {
    id: "property",
    label: "Property",
    title: "Search, offers, and the back office behind them",
    bullets: ["Listing data you control", "Agent workflows", "Search that matches how people actually choose"],
    href: "/industries/real-estate-digital-solutions-development",
    caseSlug: "best-utah-real-estate",
  },
  {
    id: "systems",
    label: "Operations",
    title: "Systems that replace the spreadsheet",
    bullets: ["One place for the process", "Permissions that match the org chart", "Exports and audits when finance asks"],
    href: "/industries/digital-solutions-for-startups",
    caseSlug: "deutsche-bildung",
  },
];

export const builtTags = ["Discovery", "Product design", "Web", "Mobile", "AI features", "Care after launch"];

export const testimonial = {
  quote: "Placeholder quote. Replace this with a real client sentence you have permission to publish.",
  name: "CLIENT_NAME",
  role: "ROLE, COMPANY",
};

export const workingTogether = {
  eyebrow: "Working together",
  title: "Do not wait for the change. Make it with us.",
  steps: [
    { index: "01", title: "Write to us", body: "A short note about the problem is enough. A prototype link helps." },
    { index: "02", title: "A working session", body: "We meet the people who feel the problem, not only the people who wrote the brief." },
    { index: "03", title: "A clear next slice", body: "You get a scope, a team shape, and a price you can compare." },
  ],
};

export const homeFaqs: FaqItem[] = [
  {
    question: "We already have a detailed spec. Why start with the problem?",
    answer:
      "A spec describes one possible solution. We still need to know who uses the system, what the business does today, and what has to be true after launch. That is how the spec gets smaller and safer.",
  },
  {
    question: "How much does a custom project cost?",
    answer:
      "It depends on the operation the software has to support. We do not quote from a feature list alone. After a short discovery you get a scope and an estimate you can put next to other options.",
  },
  {
    question: "Should we buy a tool or build our own?",
    answer:
      "Buy where the process is ordinary. Build where you meet customers, or where the process is the reason you win. We will say which is which.",
  },
  {
    question: "Can you take over a codebase you did not write?",
    answer:
      "Yes. We start by reading it, running it, and listing the risks. Then we stabilize the path your users are already on.",
  },
  {
    question: "Where does the team sit?",
    answer:
      "The team is distributed and overlaps with EU and US hours. Replace this sentence with your real locations before launch.",
  },
  {
    question: "What happens after the first release?",
    answer:
      "Support and the next slice are planned before launch. You are not handed a repository and a goodbye.",
  },
];

export const contactIntro = {
  eyebrow: "Let's talk",
  title: "Tell us what you are trying to solve",
  body: "A founder reads every note. If a call is easier, book a time instead.",
};
