import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, withLocale } from "@/website-theme/config/site.config";
import { getPost, relatedPosts } from "@/modules/content/content.service";
import { extractToc, readingTime } from "@/lib/slug";
import { absoluteUrl } from "@/lib/seo";
import { CoverImage } from "@/website-theme/ui/CoverImage";
import { Markdown } from "@/website-theme/ui/Markdown";
import { Container } from "@/website-theme/ui/Container";
import { JsonLd } from "@/website-theme/ui/JsonLd";

export async function BlogPostPage({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const post = await getPost(slug);
  if (!post) notFound();
  const toc = extractToc(post.body);
  const related = await relatedPosts(post.slug, post.category);
  const url = absoluteUrl(withLocale(locale, `/blog/${post.slug}`));
  return (
    <article className="section" style={{ paddingTop: "var(--tc-space-9)" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.seoTitle || post.title,
          description: post.seoDescription || post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          inLanguage: "en",
          author: { "@type": "Person", name: post.author },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: { "@type": "ImageObject", url: absoluteUrl("/assets/brand/mark.png") },
          },
          image: {
            "@type": "ImageObject",
            url: absoluteUrl(post.coverImage),
            caption: post.coverAlt || post.title,
          },
          keywords: post.tags.join(", "),
          mainEntityOfPage: url,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(withLocale(locale, "/")) },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl(withLocale(locale, "/blog")) },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
      <Container>
        <div className="blog-hero">
          <CoverImage
            src={post.coverImage}
            alt={post.coverAlt || post.title}
            priority
            className="blog-hero-media"
            sizes="(max-width: 1200px) 100vw, 1088px"
          />
          <div className="blog-hero-copy">
            <p className="caption">
              {post.category} · {new Date(post.publishedAt).toLocaleDateString("en-GB")} · {readingTime(post.body)} min read
            </p>
            <h1 className="heading-3 mt-3 max-w-[18ch] max-sm:max-w-none">{post.title}</h1>
            <p className="body-lg mt-4 max-w-[46ch]">{post.excerpt}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
          {toc.length ? (
            <nav aria-label="On this page" className="grid content-start gap-2">
              <p className="caption">On this page</p>
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="body-sm" style={{ paddingLeft: item.level === 3 ? "var(--tc-space-3)" : 0 }}>
                  {item.text}
                </a>
              ))}
            </nav>
          ) : (
            <div />
          )}
          <div>
            <Markdown source={post.body} />
            <aside className="card mt-10">
              <p className="caption">Author</p>
              <p className="heading-6 mt-2">{post.author}</p>
              <p className="body-sm muted mt-2">Writing for {siteConfig.name}. Replace this block with a real byline.</p>
            </aside>
          </div>
        </div>
        <h2 className="heading-4 mt-12">Related</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={withLocale(locale, `/blog/${item.slug}`)} className="card grid gap-3">
                <div className="blog-cover">
                  <CoverImage src={item.coverImage} alt={item.coverAlt || item.title} className="h-full w-full object-cover" />
                </div>
                <span className="heading-6">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
