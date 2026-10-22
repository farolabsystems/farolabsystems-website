import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

function write(rel, contents) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

write(
  "src/app/layout.tsx",
  `import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { siteConfig } from "@/website-theme/config/site.config";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: \`%s | \${siteConfig.name}\` },
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={\`\${workSans.variable} antialiased\`}>{children}</body>
    </html>
  );
}
`,
);

write(
  "src/app/(site)/layout.tsx",
  `import type { ReactNode } from "react";
import { SiteChrome } from "@/website-theme/layout/SiteChrome";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
`,
);

write(
  "src/app/(site)/page.tsx",
  `import type { Metadata } from "next";
import { HomePage } from "@/website-theme/pages/home/HomePage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/website-theme/config/site.config";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
`,
);

const simple = [
  ["about-us", "AboutPage", "@/website-theme/pages/about/AboutPage", "About", "Who we are and how an engagement starts."],
  ["career", "CareerPage", "@/website-theme/pages/career/CareerPage", "Career", "Open roles and how to apply."],
  ["contact", "ContactPage", "@/website-theme/pages/contact/ContactPage", "Contact", "Tell us what you are trying to solve."],
  ["schedule-meeting", "SchedulePage", "@/website-theme/pages/schedule-meeting/SchedulePage", "Schedule a meeting", "Request a time to talk."],
  ["collaboration", "CollaborationPage", "@/website-theme/pages/collaboration/CollaborationPage", "Freelance collaboration", "Join a client project as a freelancer."],
];

for (const [segment, comp, from, title, description] of simple) {
  write(
    `src/app/(site)/${segment}/page.tsx`,
    `import type { Metadata } from "next";
import { ${comp} } from "${from}";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  path: ${JSON.stringify("/" + segment)},
});

export default function Page() {
  return <${comp} />;
}
`,
  );
}

write(
  "src/app/(site)/services/[slug]/page.tsx",
  `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/website-theme/data/services";
import { ServicePage, getService } from "@/website-theme/pages/services/ServicePage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({ title: service.seoTitle, description: service.seoDescription, path: \`/services/\${slug}\` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getService(slug)) notFound();
  return <ServicePage slug={slug} />;
}
`,
);

write(
  "src/app/(site)/industries/[slug]/page.tsx",
  `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries } from "@/website-theme/data/industries";
import { IndustryPage, getIndustry } from "@/website-theme/pages/industries/IndustryPage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({ title: industry.seoTitle, description: industry.seoDescription, path: \`/industries/\${slug}\` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getIndustry(slug)) notFound();
  return <IndustryPage slug={slug} />;
}
`,
);

write(
  "src/app/(site)/case-studies/page.tsx",
  `import type { Metadata } from "next";
import { CaseStudiesPage } from "@/website-theme/pages/case-studies/CaseStudiesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case studies",
  description: "Selected product work across industries and services.",
  path: "/case-studies",
});

export default function Page() {
  return <CaseStudiesPage />;
}
`,
);

write(
  "src/app/(site)/case-studies/[slug]/page.tsx",
  `import type { Metadata } from "next";
import { caseStudies } from "@/website-theme/data/case-studies";
import { CaseStudyPage } from "@/website-theme/pages/case-studies/CaseStudyPage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return {};
  return buildMetadata({ title: study.title, description: study.summary, path: \`/case-studies/\${slug}\` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage slug={slug} />;
}
`,
);

write(
  "src/app/(site)/blog/page.tsx",
  `import type { Metadata } from "next";
import { BlogPage } from "@/website-theme/pages/blog/BlogPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Notes on product discovery, design, and software delivery.",
  path: "/blog",
});

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const search = await searchParams;
  return <BlogPage page={Number(search.page || 1)} category={search.category} />;
}
`,
);

write(
  "src/app/(site)/blog/[slug]/page.tsx",
  `import type { Metadata } from "next";
import { posts } from "@/website-theme/data/posts";
import { BlogPostPage } from "@/website-theme/pages/blog/BlogPostPage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: \`/blog/\${slug}\`,
    type: "article",
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} />;
}
`,
);

write(
  "src/app/(site)/privacy-policy/page.tsx",
  `import type { Metadata } from "next";
import { LegalPage } from "@/website-theme/pages/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How we handle personal data sent through this site.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
`,
);

write(
  "src/app/(site)/cookie-policy/page.tsx",
  `import type { Metadata } from "next";
import { LegalPage } from "@/website-theme/pages/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie policy",
  description: "Cookies this site sets and how to change your choice.",
  path: "/cookie-policy",
});

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
`,
);

write(
  "src/app/(site)/technical-consultation/page.tsx",
  `import type { Metadata } from "next";
import { ConsultationPage } from "@/website-theme/pages/consultation/ConsultationPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technical consultation",
  description: "Bring an architecture question or an estimate you want a second look at.",
  path: "/technical-consultation",
});

export default function Page() {
  return <ConsultationPage kind="technical" />;
}
`,
);

write(
  "src/app/(site)/consultation/[slug]/page.tsx",
  `import type { Metadata } from "next";
import { ConsultationPage } from "@/website-theme/pages/consultation/ConsultationPage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return [{ slug: "advisor" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata({
    title: "Book a consultation",
    description: "Placeholder consultation page.",
    path: \`/consultation/\${slug}\`,
  });
}

export default function Page() {
  return <ConsultationPage kind="advisor" />;
}
`,
);

write(
  "src/app/(site)/[slug]/page.tsx",
  `import type { Metadata } from "next";
import { CmsPage } from "@/website-theme/pages/cms/CmsPage";
import { getPage } from "@/modules/content/content.service";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return buildMetadata({ title: page.seoTitle, description: page.seoDescription, path: \`/\${slug}\` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CmsPage slug={slug} />;
}
`,
);

write(
  "src/app/(site)/_styleguide/page.tsx",
  `import { notFound } from "next/navigation";
import { StyleGuidePage } from "@/website-theme/pages/styleguide/StyleGuidePage";

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <StyleGuidePage />;
}
`,
);

write(
  "src/app/(site)/not-found.tsx",
  `import { NotFoundPage } from "@/website-theme/pages/not-found/NotFoundPage";

export default function NotFound() {
  return <NotFoundPage />;
}
`,
);

write(
  "src/app/not-found.tsx",
  `import { SiteChrome } from "@/website-theme/layout/SiteChrome";
import { NotFoundPage } from "@/website-theme/pages/not-found/NotFoundPage";

export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundPage />
    </SiteChrome>
  );
}
`,
);

write(
  "src/app/pl/[[...slug]]/page.tsx",
  `import type { Metadata } from "next";
import { RoutedPage } from "@/website-theme/pages/router/RoutedPage";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/website-theme/config/site.config";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.length ? \`/pl/\${slug.join("/")}\` : "/pl";
  return buildMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path,
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  return <RoutedPage locale="pl" slug={slug} search={search} />;
}
`,
);

write(
  "src/app/sitemap.ts",
  `import type { MetadataRoute } from "next";
import { siteConfig } from "@/website-theme/config/site.config";
import { services } from "@/website-theme/data/services";
import { industries } from "@/website-theme/data/industries";
import { caseStudies } from "@/website-theme/data/case-studies";
import { posts } from "@/website-theme/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\\/$/, "");
  const paths = [
    "/",
    "/about-us",
    "/career",
    "/contact",
    "/schedule-meeting",
    "/collaboration",
    "/technical-consultation",
    "/consultation/advisor",
    "/privacy-policy",
    "/cookie-policy",
    "/case-studies",
    "/blog",
    ...services.map((item) => \`/services/\${item.slug}\`),
    ...industries.map((item) => \`/industries/\${item.slug}\`),
    ...caseStudies.map((item) => \`/case-studies/\${item.slug}\`),
    ...posts.map((item) => \`/blog/\${item.slug}\`),
  ];
  const localized = paths.flatMap((path) => [path, path === "/" ? "/pl" : \`/pl\${path}\`]);
  return localized.map((path) => ({ url: \`\${base}\${path}\`, lastModified: new Date() }));
}
`,
);

write(
  "src/app/robots.ts",
  `import type { MetadataRoute } from "next";
import { siteConfig } from "@/website-theme/config/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/_styleguide"] },
    sitemap: \`\${siteConfig.url.replace(/\\/$/, "")}/sitemap.xml\`,
  };
}
`,
);

write(
  "src/middleware.ts",
  `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }
  const token = request.cookies.get("admin_token")?.value;
  const secret = process.env.AUTH_SECRET ?? "dev-only-secret-change-me";
  if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = { matcher: ["/admin/:path*"] };
`,
);

write(
  "src/app/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#00d286"/>
  <path d="M10 22V10h7.2a4.6 4.6 0 0 1 0 9.2H14" fill="none" stroke="#333" stroke-width="2"/>
</svg>
`,
);

console.log("routes written");
