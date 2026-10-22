import type { ServiceRecord } from "@/website-theme/data/types";

export const services: ServiceRecord[] = [
  {
    slug: "custom-software-development",
    navLabel: "Custom Software Development",
    group: "Development",
    filter: "Custom Software",
    title: "Custom software shaped around the way you work",
    seoTitle: "Software Development Services | Farolab Systems",
    seoDescription:
      "Farolab Systems designs and builds custom software for business processes, customer products and the systems that have to keep working.",
    eyebrow: "Development",
    summary: "Build reliable software tailored to your business processes, users and long-term goals.",
    blurb: "Software designed around your operation, not a rented template.",
    outcomes: [
      { title: "A problem worth building for", body: "We name the workflow that has to change before we add features around it." },
      { title: "A first release you can use", body: "The first version covers one real job well, with a written list of what waits." },
      { title: "A system your team can run", body: "Access, documentation and a support path are part of delivery." },
    ],
    steps: [
      { title: "Understand the operation", body: "We learn who uses the system, what happens when it fails, and what the business needs next." },
      { title: "Shape the slice", body: "You get a scope you can compare: what is in, what is out, and how we will judge it." },
      { title: "Design and build", body: "Product design and engineering stay in one thread, with working software at the end of each slice." },
      { title: "Hand over cleanly", body: "We leave the product in a state your team can operate, or we stay to run the next release." },
    ],
    faqs: [
      {
        question: "When is custom software the right choice?",
        answer: "When a standard tool cannot carry the process that makes your business different, or when stitching tools together has become the work.",
      },
      {
        question: "Can you start from an existing system?",
        answer: "Yes. We can extend what you have, replace the part that is failing, or plan a move that does not stop the business.",
      },
    ],
  },
  {
    slug: "web-application-development",
    navLabel: "Web Application Development",
    group: "Development",
    filter: "Web Applications",
    title: "Web applications people can rely on",
    seoTitle: "Web Application Development | Farolab Systems",
    seoDescription:
      "Farolab Systems builds fast, secure web applications with modern engineering practices, clear interfaces and room to grow.",
    eyebrow: "Development",
    summary: "Create fast, secure and scalable web applications using modern technologies and engineering practices.",
    blurb: "Web products with a clear interface and a backend you can extend.",
    outcomes: [
      { title: "A product, not a pile of pages", body: "Navigation, roles and the main job are designed before the interface spreads." },
      { title: "A backend that matches the work", body: "APIs, data and permissions follow the operation, not the other way around." },
      { title: "A release you can observe", body: "Logging, errors and a simple deploy path are in place before the audience grows." },
    ],
    steps: [
      { title: "Map the jobs", body: "We list the tasks the web app has to finish, and who is allowed to do them." },
      { title: "Prove the interface", body: "Key flows are designed so the team can react before the build gets wide." },
      { title: "Build the system", body: "Frontend, API and data move together, with a staging environment you can try." },
      { title: "Harden the path to production", body: "We cover the boring parts: access, backups, monitoring and a rollback." },
    ],
    faqs: [
      {
        question: "Which technologies do you use for web apps?",
        answer: "Often React, Next.js, TypeScript and Node.js or Python, with PostgreSQL. We change that when the problem asks for something else.",
      },
      {
        question: "Can you take over a web app we already have?",
        answer: "Yes. We read it, run it, and agree which risks to fix before adding new features.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    navLabel: "Mobile App Development",
    group: "Development",
    filter: "Mobile Apps",
    title: "Mobile products with a backend that can keep up",
    seoTitle: "Mobile App Development | Farolab Systems",
    seoDescription:
      "Farolab Systems builds iOS and Android experiences with scalable backends, practical interfaces and a plan for what happens after launch.",
    eyebrow: "Development",
    summary: "Build intuitive mobile experiences for iOS and Android with scalable backend systems.",
    blurb: "Mobile apps designed with the API, accounts and operations behind them.",
    outcomes: [
      { title: "One job, done clearly", body: "The first version focuses on the task people open the app to finish." },
      { title: "A shared backend", body: "Mobile, web and admin tools can share accounts, data and rules." },
      { title: "A release process", body: "Store submission, crash reporting and a way to ship fixes are part of the plan." },
    ],
    steps: [
      { title: "Decide the device job", body: "We separate what belongs on a phone from what belongs on the web or with an operator." },
      { title: "Design the core flows", body: "The main path is prototyped before we invest in every edge case." },
      { title: "Build app and API together", body: "The client and the backend are tested as one product, not two projects." },
      { title: "Prepare the launch", body: "We cover accounts, notifications you actually need, and a support path after release." },
    ],
    faqs: [
      {
        question: "Do you build native apps or cross-platform apps?",
        answer: "We choose based on the product. Cross-platform is often enough. Native is the right call when the device itself is the product.",
      },
      {
        question: "Can the same team build the backend?",
        answer: "Yes. A mobile app without a reliable API is only half a product.",
      },
    ],
  },
  {
    slug: "ai-development",
    navLabel: "AI Development & Integration",
    group: "Development",
    filter: "AI",
    title: "AI that earns a place in the product",
    seoTitle: "AI Development & AI Integration Services | Farolab Systems",
    seoDescription:
      "Farolab Systems integrates AI into products and workflows to automate work, support decisions and create useful new experiences.",
    eyebrow: "Development",
    summary:
      "Integrate AI into products and business workflows to automate processes, improve decisions and create new experiences.",
    blurb: "Practical AI features, grounded in a workflow you can explain.",
    outcomes: [
      { title: "A use case with a human owner", body: "We pick a task where AI saves time and a person can still check the result." },
      { title: "An integration, not a demo", body: "The model sits inside your product, with logs, limits and a fallback." },
      { title: "A way to judge it", body: "We agree what good looks like before we tune prompts or workflows." },
    ],
    steps: [
      { title: "Find the workflow", body: "We look for repeated work, slow decisions, or a product moment where assistance would help." },
      { title: "Test with real examples", body: "A small evaluation set tells us whether the idea is useful before we build around it." },
      { title: "Integrate it", body: "We connect the model to your data and interface, with clear limits on what it is allowed to do." },
      { title: "Watch it in use", body: "After launch we review failures, cost and whether people still trust the result." },
    ],
    faqs: [
      {
        question: "Do you train a private model for every project?",
        answer: "Usually no. Many products are better served by a well-bounded integration with an existing AI API. We train or fine-tune only when the problem needs it.",
      },
      {
        question: "Can you add AI to software we already run?",
        answer: "Yes. The useful question is which workflow should change, not which model is popular this month.",
      },
    ],
  },
  {
    slug: "ui-ux-product-design",
    navLabel: "UI/UX & Product Design",
    group: "Design",
    filter: "Product Design",
    title: "Product design for software people have to use",
    seoTitle: "UI/UX & Product Design | Farolab Systems",
    seoDescription:
      "Farolab Systems designs digital products that are clear, accessible and tied to the job users and the business need done.",
    eyebrow: "Design",
    summary: "Design digital products that are intuitive, accessible and aligned with real user needs.",
    blurb: "Interfaces and product decisions grounded in the job to be done.",
    outcomes: [
      { title: "A shared picture of the product", body: "Flows, states and content are visible before engineering commits to them." },
      { title: "An interface that can be built", body: "Designs account for empty states, errors, permissions and the data you actually have." },
      { title: "A trail of decisions", body: "You can see why a flow was cut, kept, or postponed." },
    ],
    steps: [
      { title: "Learn the job", body: "We talk to the people who feel the problem, not only the people who wrote the brief." },
      { title: "Sketch the path", body: "The core journey is drawn end to end, including the unhappy paths." },
      { title: "Detail the interface", body: "Screens are specified closely enough for engineering to build without inventing the product." },
      { title: "Stay through the build", body: "Design remains available while the software is being made, so trade-offs stay intentional." },
    ],
    faqs: [
      {
        question: "Can design start before engineering?",
        answer: "Yes. It can also run beside an engineering team you already have. The handoff is the part we try not to drop.",
      },
      {
        question: "Do you design for accessibility?",
        answer: "Yes. Contrast, focus, labels and a sensible reading order are part of the work, not a later pass.",
      },
    ],
  },
  {
    slug: "cloud-devops",
    navLabel: "Cloud & DevOps",
    group: "Delivery",
    filter: "Cloud & DevOps",
    title: "Cloud foundations your product can live on",
    seoTitle: "Cloud & DevOps Services | Farolab Systems",
    seoDescription:
      "Farolab Systems sets up cloud infrastructure, automated deployments, monitoring and production environments that a team can operate.",
    eyebrow: "Delivery",
    summary: "Build reliable cloud infrastructure, automated deployments, monitoring and scalable production environments.",
    blurb: "Environments, pipelines and monitoring that match the product.",
    outcomes: [
      { title: "A path to production", body: "Code can be built, reviewed and deployed without a private ritual." },
      { title: "Environments that match", body: "Development, staging and production are close enough that surprises get smaller." },
      { title: "Signals when something breaks", body: "Logs, health checks and alerts point at the system, not only at a user complaint." },
    ],
    steps: [
      { title: "Look at how you ship today", body: "We find the manual steps, the single points of failure and the access nobody wants to touch." },
      { title: "Choose a small platform", body: "We pick the cloud services the product needs now, and leave the rest out." },
      { title: "Automate the repeatable parts", body: "Builds, deploys and infrastructure changes become something the team can rerun." },
      { title: "Leave it operable", body: "Documentation and access mean you are not dependent on one person to restart the system." },
    ],
    faqs: [
      {
        question: "Which clouds do you work with?",
        answer: "AWS and Microsoft Azure are the usual choices, with Docker and CI/CD around them. We pick based on what you already run and what the product needs.",
      },
      {
        question: "Can you improve a setup that already exists?",
        answer: "Yes. Most of this work starts with a pipeline or an environment that has grown past the person who created it.",
      },
    ],
  },
  {
    slug: "product-engineering",
    navLabel: "Product Engineering",
    group: "Development",
    filter: "Product Engineering",
    title: "From product intent to production software",
    seoTitle: "Product Engineering Services | Farolab Systems",
    seoDescription:
      "Farolab Systems takes products from concept to production, combining product thinking, design and engineering in one team.",
    eyebrow: "Development",
    summary: "Take products from concept to production with a combination of product thinking, design and engineering.",
    blurb: "Discovery, design and engineering kept in one delivery team.",
    outcomes: [
      { title: "A product slice, not a feature list", body: "We agree the smallest release that teaches you something true." },
      { title: "Design and code in one plan", body: "The people shaping the product and the people building it share the same backlog." },
      { title: "A base for the next release", body: "The first version is structured so the second one does not start from zero." },
    ],
    steps: [
      { title: "Frame the outcome", body: "We write down who the product is for and what has to be true after the first release." },
      { title: "Design the slice", body: "Interface, data and scope are decided together." },
      { title: "Ship in the open", body: "You see working software often enough to change direction while it is still cheap." },
      { title: "Plan the next step", body: "Launch includes what we learned and what should happen in the following release." },
    ],
    faqs: [
      {
        question: "How is this different from a staffed project?",
        answer: "Product engineering includes the decisions about what to build. A staffed seat usually implements a plan you already have.",
      },
      {
        question: "Can you work from a prototype?",
        answer: "Yes. We keep what is already proving the idea and replace the parts that will not survive real use.",
      },
    ],
  },
  {
    slug: "dedicated-development-teams",
    navLabel: "Dedicated Development Teams",
    group: "Delivery",
    filter: "Dedicated Teams",
    title: "A team that works as part of yours",
    seoTitle: "Dedicated Development Teams | Farolab Systems",
    seoDescription:
      "Farolab Systems provides dedicated engineers and specialists who join your product team and stay with the work over time.",
    eyebrow: "Delivery",
    summary: "Extend your engineering capacity with dedicated developers and technology specialists who integrate with your team.",
    blurb: "Engineers and designers who stay with your product, not a rotating bench.",
    outcomes: [
      { title: "People who learn the product", body: "The same team stays long enough to understand the domain and the codebase." },
      { title: "A shape that matches the work", body: "We staff the skills the product needs, and change that mix when the work changes." },
      { title: "Shared routines", body: "Planning, review and delivery follow a rhythm both sides can see." },
    ],
    steps: [
      { title: "Define the seat of the work", body: "We agree which product area the team owns and how it connects to your people." },
      { title: "Start with a real slice", body: "The first weeks are spent on work you can review, not on a long setup theatre." },
      { title: "Join your tools", body: "The team works in your tracker, repository and conversations." },
      { title: "Review the fit", body: "We look at pace, quality and communication, and adjust the team if the product needs it." },
    ],
    faqs: [
      {
        question: "Is this the same as hiring freelancers one by one?",
        answer: "No. A dedicated team has a shared responsibility for an area of the product, with Farolab Systems accountable for how that team works.",
      },
      {
        question: "Can the team work with engineers we already employ?",
        answer: "Yes. That is the usual arrangement.",
      },
    ],
  },
  {
    slug: "support-and-maintenance",
    navLabel: "Support & Maintenance",
    group: "Maintenance",
    filter: "Support",
    title: "Care for software after it ships",
    seoTitle: "Software Support & Maintenance | Farolab Systems",
    seoDescription:
      "Farolab Systems keeps applications secure, stable and improving after launch, with maintenance, monitoring and ongoing development.",
    eyebrow: "Maintenance",
    summary: "Keep your applications secure, stable and continuously improving after launch.",
    blurb: "Maintenance, fixes and the small improvements that keep a product healthy.",
    outcomes: [
      { title: "A known owner", body: "Someone is responsible for incidents, updates and the queue of small fixes." },
      { title: "Fewer surprises", body: "Dependencies, backups and access are reviewed before they become an outage." },
      { title: "Room for improvement", body: "Support time can include the next small product change, not only repairs." },
    ],
    steps: [
      { title: "Learn the system", body: "We map how it is deployed, who has access, and which failures matter." },
      { title: "Stabilise the obvious risks", body: "The first month is often monitoring, upgrades and the bugs your users already know." },
      { title: "Agree a rhythm", body: "You get a regular view of what broke, what changed, and what is waiting." },
      { title: "Keep a path to new work", body: "When a fix reveals a product gap, we can scope it instead of slipping it in unnamed." },
    ],
    faqs: [
      {
        question: "Do you only support software you built?",
        answer: "No. We can take on a system another team built, after we have read it and agreed the risks.",
      },
      {
        question: "Is support a substitute for a product team?",
        answer: "It covers health and small change. Larger product work should be planned as its own slice.",
      },
    ],
  },
];
