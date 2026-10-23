import type { FaqItem } from "@/website-theme/data/types";

export const hero = {
  eyebrow: "Software development & digital innovation",
  title: "We build digital products that move businesses forward.",
  body: "Farolab Systems helps startups and businesses turn ideas into reliable digital products through modern software engineering, thoughtful design and intelligent technology.",
  support: "From first idea to long-term product growth, we work as your technology partner.",
  primary: { label: "Start a project", href: "/contact" },
  secondary: { label: "Explore our services", href: "/services/custom-software-development" },
};

export const heroCategories: Record<string, string> = {
  finora: "FinTech Platform",
  logiflow: "Logistics & Operations",
  mediconnect: "Healthcare Technology",
};

export const trustedBy = {
  title: "Technology built for ambitious teams",
  body: "We collaborate with startups, growing businesses and established organizations to turn complex technology challenges into practical digital solutions.",
  items: ["Startups", "Growing businesses", "Enterprises", "Product teams", "Operations teams", "Founders"],
};

export const startingPoint = {
  eyebrow: "Starting point",
  title: "Where are you starting from?",
  intro:
    "Every business starts from a different point. We adapt our technology approach to where you are today and where you want to go next.",
  columns: [
    {
      index: "01",
      title: "I have an idea",
      body: "Turn your concept into a clear product strategy, prototype and scalable MVP.",
      links: [{ label: "Custom software development", href: "/services/custom-software-development" }],
    },
    {
      index: "02",
      title: "I need to modernize",
      body: "Modernize legacy systems, improve performance and create a stronger technology foundation.",
      links: [{ label: "Product engineering", href: "/services/product-engineering" }],
    },
    {
      index: "03",
      title: "I need to scale",
      body: "Scale your product, engineering team and infrastructure without slowing down growth.",
      links: [{ label: "Cloud & DevOps", href: "/services/cloud-devops" }],
    },
    {
      index: "04",
      title: "I need a technology partner",
      body: "Extend your team with experienced engineers, designers and product specialists.",
      links: [{ label: "Dedicated development teams", href: "/services/dedicated-development-teams" }],
    },
  ],
};

export const forStartups = {
  eyebrow: "For startups",
  title: "Built for startups. Ready for scale.",
  intro:
    "We help startups move from idea to product without unnecessary complexity — focusing on speed, product quality and a technology foundation that can grow with the business.",
  cards: [
    {
      question: "What if I only have an idea?",
      answer: "We can help define the product, validate the core functionality and turn the idea into a practical MVP.",
    },
    {
      question: "How quickly can we launch?",
      answer:
        "We focus on the features that matter most first, helping teams reach a usable product without wasting time on unnecessary complexity.",
    },
    {
      question: "Can you work with our existing team?",
      answer: "Yes. We can integrate with your product and engineering team or take ownership of specific technology areas.",
    },
    {
      question: "What happens after launch?",
      answer: "We can continue supporting, improving, scaling and maintaining the product as your business grows.",
    },
  ],
};

export const differentiators = {
  eyebrow: "How we work",
  title: "Technology decisions that make a difference",
  intro:
    "Good software is not only about writing code. It is about understanding the business, solving the right problems and building technology that remains useful as the company grows.",
  items: [
    { title: "Business-first thinking", body: "We understand the business goal before choosing the technology." },
    {
      title: "Engineering quality",
      body: "Clean architecture, maintainable code and scalable foundations are built into the development process.",
    },
    {
      title: "Product mindset",
      body: "We think beyond features and focus on usability, performance and real customer value.",
    },
    {
      title: "AI-enabled development",
      body: "We use modern AI capabilities to automate workflows, improve products and unlock new possibilities.",
    },
    {
      title: "Transparent collaboration",
      body: "Clear communication, predictable progress and shared ownership keep projects moving.",
    },
    {
      title: "Built to evolve",
      body: "Our solutions are designed to adapt as requirements, users and businesses change.",
    },
  ],
};

export const industrySection = {
  eyebrow: "Industries",
  title: "Technology expertise across industries",
  body: "We apply modern engineering practices to solve technology challenges across different business domains.",
};

export const industryTabs = [
  {
    id: "fintech",
    label: "FinTech",
    title: "Secure platforms for financial products and digital services",
    bullets: ["Clear customer workflows", "Audit-friendly data models", "Integrations that can be monitored"],
    href: "/industries/fintech",
    caseSlug: "finora",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Digital tools for access, communication and daily operations",
    bullets: ["Simpler paths for patients and staff", "Careful handling of sensitive information", "Systems teams can actually operate"],
    href: "/industries/healthcare",
    caseSlug: "mediconnect",
  },
  {
    id: "logistics",
    label: "Logistics",
    title: "Connected operations, workflows and real-time information",
    bullets: ["Status the floor can trust", "Fewer handoffs between tools", "Visibility for the people running the day"],
    href: "/industries/logistics",
    caseSlug: "logiflow",
  },
  {
    id: "commerce",
    label: "E-commerce",
    title: "Commerce experiences that support the operation behind the store",
    bullets: ["Journeys customers can finish", "Catalog and order rules you control", "Operations that do not live in a spreadsheet"],
    href: "/industries/ecommerce",
    caseSlug: "storelane",
  },
  {
    id: "education",
    label: "Education",
    title: "Platforms that make learning and administration easier to reach",
    bullets: ["Progress people can follow", "Tools for the people creating content", "Admin work that does not block learners"],
    href: "/industries/education",
    caseSlug: "learnbase",
  },
  {
    id: "saas",
    label: "SaaS",
    title: "Product engineering for software that has to keep growing",
    bullets: ["Architecture that can take the next release", "Onboarding that matches the product promise", "A path for billing, roles and support"],
    href: "/industries/saas",
    caseSlug: "relayboard",
  },
];

export const technology = {
  title: "Built with modern technology",
  body: "We choose technology based on the product requirements, scalability, security and long-term business goals — not trends alone.",
};

export const caseStudiesSection = {
  eyebrow: "Portfolio",
  title: "What we build",
  body: "Explore examples of how technology can solve real business problems, improve experiences and create scalable digital products.",
  slugs: ["finora", "logiflow", "mediconnect"],
};

export const testimonial = {
  eyebrow: "Client stories coming soon",
  title: "Built around collaboration",
  body: "The strongest technology partnerships are built on clear communication, shared ownership and a common focus on outcomes.",
};

export const blogSection = {
  title: "Ideas, insights & technology",
  body: "Practical perspectives on software development, AI, product engineering, cloud technology and digital transformation.",
};

export const workingTogether = {
  eyebrow: "Working together",
  title: "A clear path from first conversation to first release",
  steps: [
    { index: "01", title: "Tell us the problem", body: "A short note is enough. Share the context, the users and anything you have already tried." },
    { index: "02", title: "Shape the work", body: "We agree the first slice, the team and how we will know the work is useful." },
    { index: "03", title: "Build and stay close", body: "Design and engineering move together, with a path to support the product after launch." },
  ],
};

export const homeFaqs: FaqItem[] = [
  {
    question: "What type of projects do you work on?",
    answer:
      "We work on web applications, mobile applications, SaaS products, enterprise software, AI solutions, cloud platforms and custom digital products.",
  },
  {
    question: "Can you work with our existing development team?",
    answer: "Yes. Our engineers can integrate with an existing team or take ownership of specific product areas.",
  },
  {
    question: "Do you work with startups?",
    answer: "Yes. We can support startups from product discovery and MVP development through scaling and long-term engineering.",
  },
  {
    question: "Can you modernize an existing application?",
    answer: "Yes. We can assess existing architecture, identify technical risks and create a practical modernization roadmap.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We can provide maintenance, monitoring, improvements, security updates and ongoing development.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "We work with modern technologies including React, Next.js, Node.js, Python, PostgreSQL, cloud platforms and AI APIs. Technology choices depend on project requirements.",
  },
];

export const contactIntro = {
  eyebrow: "Let's talk",
  title: "Let's build something useful.",
  body: "Have an idea, an existing product or a technology challenge? Tell us what you're working on and we'll explore how we can help.",
};

export const faqSection = {
  title: "Frequently asked questions",
  body: "If you don't see your question, write to us.",
  cta: "Start a project",
};
