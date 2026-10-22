import type { PostRecord } from "@/website-theme/data/types";

const author = "Farolab Systems";

export const posts: PostRecord[] = [
  {
    slug: "how-ai-is-changing-modern-software-development",
    title: "How AI Is Changing Modern Software Development",
    excerpt: "AI is useful in specific parts of the software lifecycle. The teams getting value from it are choosy about where it sits.",
    seoTitle: "How AI Is Changing Modern Software Development | Farolab Systems",
    seoDescription:
      "Where AI helps software teams today, where it still needs a person, and how to introduce it without turning the product into a demo.",
    author,
    category: "AI & Automation",
    tags: ["AI", "engineering"],
    coverImage: "/assets/covers/banner-1.png",
    publishedAt: "2026-10-14T00:00:00.000Z",
    body: `## Start with a job, not a model

AI has changed how software gets written and what software can do. It has not removed the need to know which problem you are solving. A useful starting point is a repeated task: drafting a first version, summarising a long record, classifying incoming requests, or answering a question from documents you already trust.

If you cannot name the person who checks the result, the feature is not ready.

## Where teams are seeing real help

Inside the engineering team, AI assistants are good at first drafts. They speed up tests, migrations, and the boring translation of a ticket into a starting point. They are weaker when the codebase has no clear boundaries, because the assistant then copies the confusion.

Inside the product, the useful features are usually narrow. A support tool that proposes a reply from the last ten similar tickets. A back office that extracts fields from a document and asks a person to confirm them. A search box that can tolerate the way customers actually phrase a question.

These are integrations. They need logs, a limit on what the system is allowed to do, and a path that still works when the model is wrong.

## Where the claims run ahead of the work

AI does not repair an unclear product. If two departments disagree about the workflow, a model will not settle it. It also does not remove responsibility for customer data. Sending a record to an API is a product decision, not a prompt detail.

Training your own model is rarely the first step. Most products should start with an existing AI API, a small evaluation set of real examples, and a human review step. Fine-tuning or a private model is justified when that simpler version has already proved the workflow.

## A practical way to introduce it

Pick one workflow. Write down what a good answer looks like. Run the current process and the AI-assisted process on the same examples. Keep the change if people are faster and the error rate is acceptable. Leave it out if the team spends the saved time checking the model.

That is a slower story than a launch announcement. It is also how AI becomes part of the product instead of a tab nobody opens twice.
`,
  },
  {
    slug: "building-scalable-web-applications",
    title: "Building Scalable Web Applications: What to Consider Early",
    excerpt: "Scale is not a server size. It is the set of decisions that let the next release happen without a rewrite.",
    seoTitle: "Building Scalable Web Applications | Farolab Systems",
    seoDescription:
      "What to decide early in a web application so it can grow: boundaries, data, access, background work and a way to see production.",
    author,
    category: "Cloud & DevOps",
    tags: ["web", "architecture"],
    coverImage: "/assets/covers/banner-2.png",
    publishedAt: "2026-10-02T00:00:00.000Z",
    body: `## Scale is a direction, not a number

A web application does not need the architecture of a global platform on day one. It does need a shape that will not punish you for the second customer, the second team, or the second year. The expensive mistakes are usually structural: data that cannot be queried, permissions painted on at the end, and a deploy that only one person understands.

## Draw the boundaries before the folders multiply

Decide what the application is responsible for, and what it should ask another system to do. A billing provider, an identity provider, and a search index are ordinary neighbours. Copying their jobs into your database is how a small app becomes a private platform nobody wanted.

Inside your own code, keep the user-facing application and the rules of the business distinguishable. When every screen reaches into every table, the next feature has to understand the whole system.

## Treat data and access as product decisions

The data model is the product. Names, statuses and ownership should match the words the business already uses. Add the fields you know you will filter and audit. Leave speculative columns out.

Access belongs in the same conversation. Who can see a record, who can change it, and what happens when someone leaves the company. Retrofitting roles onto a finished app is slower than agreeing them while the first screens are still movable.

## Leave room for work that is not a click

Exports, emails, image processing and integrations should not live inside the request that rendered the page. A simple queue or background job is enough. What matters is that a slow partner does not freeze the interface, and that a failure can be retried without a developer at a keyboard.

## Make production visible

You cannot scale what you cannot see. Logs, a health check, and an alert when the main job fails are part of the first release, not a later hardening project. So is a repeatable deploy. If shipping requires a checklist in someone's head, the application is already harder to grow than its traffic suggests.

None of this requires a large platform team. It requires choosing the few decisions that are costly to reverse, and leaving the rest until the product has earned them.
`,
  },
  {
    slug: "when-to-modernize-legacy-software",
    title: "When Should a Business Modernize Its Legacy Software?",
    excerpt: "Modernization is justified when change has become the bottleneck. A rewrite is not the only way to start.",
    seoTitle: "When to Modernize Legacy Software | Farolab Systems",
    seoDescription:
      "Signals that legacy software is holding a business back, and a practical way to modernize it without stopping the operation.",
    author,
    category: "Software Development",
    tags: ["modernization", "architecture"],
    coverImage: "/assets/covers/banner-3.png",
    publishedAt: "2026-09-18T00:00:00.000Z",
    body: `## The useful question is not "how old is it?"

Age is a weak signal. Plenty of older systems are clear, owned, and cheap to change. The systems that need attention are the ones where a small business change takes a release cycle, or where only one person knows how to ship it safely.

## Signs the software is now the constraint

Look for these, not for a technology fashion:

- A change that the business considers small requires a project.
- Integrations fail quietly and someone reconciles them by hand.
- You avoid touching a module because the last change caused an outage.
- New hires take months to become useful in the codebase.
- Reporting is a separate, fragile copy of the data.

If none of those are true, modernization can wait. Spend the effort on the product instead.

## Do not start with a rewrite

A full rewrite feels clean and usually arrives late, because the old system contains rules nobody wrote down. Those rules surface as bugs in the new one. The safer pattern is to put a boundary around one capability, build the replacement beside the old path, and move traffic when the new path is boring.

That might be one integration, one customer workflow, or the deploy pipeline itself. The first modernization project is often the thing that makes the next project possible: a test suite around the risky module, a documented deploy, or an API in front of a database that every screen queries differently.

## Decide what "done" means before you fund it

A modernization roadmap should name the risk being removed. Faster changes. Fewer manual reconciliations. A system a new engineer can run. If the goal is only "a modern stack", the project has no finish line.

Write the sequence. Say what stays. Say what is deliberately left in the old system for now. Then staff the first slice, not the imagined end state.

The businesses that modernize well treat it as a series of replacements they can survive, not as a single leap they have to hope for.
`,
  },
  {
    slug: "mvp-development-what-to-build-first",
    title: "MVP Development: What to Build First",
    excerpt: "An MVP is the smallest product that lets a real user finish a real job. Everything else can wait.",
    seoTitle: "MVP Development: What to Build First | Farolab Systems",
    seoDescription:
      "How to choose the first version of a product: one user, one job, and a clear way to know the release taught you something.",
    author,
    category: "Product Engineering",
    tags: ["MVP", "startups"],
    coverImage: "/assets/covers/banner-4.png",
    publishedAt: "2026-09-04T00:00:00.000Z",
    body: `## An MVP is a learning tool that has to work

The point of a first release is not to look finished. It is to put a real workflow in front of the people who have the problem, and to learn whether your guess about that problem was right. A slide deck can test interest. It cannot test whether someone will complete the job when the data is messy and they are in a hurry.

## Choose one user and one job

Write a single sentence: this person can finish this task without help. If the sentence needs three users and a platform, it is not the first release. Secondary roles, admin elegance, and the settings page can wait until someone has used the core.

List what you will not build. That list is as useful as the backlog. It is how the team says no to work that feels productive and does not answer the question.

## Build the path, including the unhappy parts

The first version still needs the pieces that make the job real. Sign-in if the data is private. A way to correct a mistake. An empty state that tells the truth. A record of what happened, so you can see whether people returned.

It does not need every channel, every integration, or a design for an audience you do not have. If a step can be done manually behind the scenes for the first ten customers, do that, and be honest that it is manual.

## Know what you are trying to learn

Before you fund the build, agree the signal. Do people finish the task? Do they come back without being asked? Does the workflow replace the spreadsheet, or sit beside it? A launch without a question is just a release.

## After the MVP

If the signal is weak, change the product or stop. If it is strong, the next release should make the manual parts reliable and give the team a foundation they can keep. That is the moment for the architecture you postponed, not the moment to invent a second product.

Teams that ship a tight first version learn faster than teams that spend the same months making a wide one feel complete.
`,
  },
  {
    slug: "how-to-choose-a-technology-stack",
    title: "How to Choose the Right Technology Stack for Your Product",
    excerpt: "The right stack is the one your team can run, hire for, and change. Novelty is not a requirement.",
    seoTitle: "How to Choose a Technology Stack | Farolab Systems",
    seoDescription:
      "A practical way to choose a product stack: team skill, operational cost, the shape of the problem, and what you can change later.",
    author,
    category: "Software Development",
    tags: ["architecture", "stack"],
    coverImage: "/assets/covers/banner-5.png",
    publishedAt: "2026-08-20T00:00:00.000Z",
    body: `## Choose for the next three years, not for a talk

A technology stack is a set of bets about hiring, operations and change. The safest bet for most business software is a boring one: a typed web frontend, a small API, a relational database, and a cloud a new engineer can learn from the documentation.

At Farolab Systems that often means React or Next.js, TypeScript, Node.js or Python, and PostgreSQL. It is a default, not a rule. The reason to leave it should be the product, not taste.

## Ask four questions

**Who will maintain it?** A stack your team already knows will beat a fashionable one that only the original authors can operate. If you are hiring, prefer technologies with a deep hiring pool over a language you would have to teach from scratch.

**What does the product actually do?** Heavy document workflows, real-time collaboration, mobile device features, and data analysis pull the stack in different directions. Name the hard part. Choose for that, and keep the rest ordinary.

**What does it cost to run?** Managed databases, simple deploys and fewer services are usually cheaper to operate than a diagram with twelve boxes. Add a piece of infrastructure when a measured problem asks for it.

**What is expensive to reverse?** Language and database choices linger. A UI library does not. Spend the debate on the decisions you will still be living with after the first rewrite of the interface.

## When to leave the default

Use Python and FastAPI or Django when the product is close to data work, automation, or a team that already thinks in Python. Use a document database when the data is genuinely document-shaped, not because a tutorial started there. Reach for a specialised mobile stack when the device is the product. Add an AI API when a workflow has earned it, and keep the rest of the system unaware of which vendor you chose, so you can change it.

## Write the choice down

A short architecture note is enough: what you picked, what you rejected, and what would make you revisit it. Future you, and the next engineer, should not have to infer the strategy from the package file.

The right stack is the one that lets the team ship the next change with confidence. Everything else is optional.
`,
  },
  {
    slug: "from-idea-to-product-roadmap",
    title: "From Idea to Product: A Practical Software Development Roadmap",
    excerpt: "A roadmap is a sequence of decisions. Each stage should leave something you can read, try, or ship.",
    seoTitle: "From Idea to Product: A Software Roadmap | Farolab Systems",
    seoDescription:
      "A practical roadmap from idea to a maintained product: discover the problem, shape a slice, build it, release it, and learn.",
    author,
    category: "Business & Technology",
    tags: ["roadmap", "product"],
    coverImage: "/assets/covers/banner-6.png",
    publishedAt: "2026-08-06T00:00:00.000Z",
    body: `## A roadmap should produce evidence

Software projects stall when the plan is a list of features and a date. A more useful roadmap is a sequence of stages, each with an artefact someone can react to. You do not need a heavy process. You need to know what "finished" means before the next stage starts.

## Discover

The goal is a shared description of the problem. Who has it, what they do today, and what would be different if the software existed. Talk to the people who do the work. Read the spreadsheet they actually use. Write the constraints: regulation, integrations, deadlines, and the things you will not solve.

The output is a short brief, not a specification of every screen.

## Shape

Turn the brief into one release. Name the user, the job, and the pieces you are postponing. Sketch the main flow, including failure. Estimate the slice in language a non-engineer can compare with another option. If two stakeholders cannot agree this release, more design will not save the project. The disagreement is the work.

## Build

Design and engineering should move on the same slice. Show working software often enough that a wrong turn is still cheap. Keep a staging environment the business can touch. Do not hide integration work in a final month. The connections to other systems are usually the project.

## Release

A release includes access, monitoring, a way to undo a bad deploy, and a person who owns the first week. Write down what you hoped to learn. Then watch whether users do the job you designed, or route around it.

## Learn, then continue

The next slice should come from what the release taught you. Sometimes that is reliability. Sometimes it is the manual step you hid behind the interface. Sometimes it is a decision to stop.

Teams that treat this as a partnership, rather than a handoff at the end of a contract, keep the context that makes the second release faster than the first. That continuity is the part most roadmaps forget to draw.
`,
  },
];
