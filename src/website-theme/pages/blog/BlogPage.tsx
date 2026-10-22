import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { listPosts } from "@/modules/content/content.service";
import { Container } from "@/website-theme/ui/Container";
import { readingTime } from "@/lib/slug";

const PAGE_SIZE = 9;

export async function BlogPage({
  locale = "en",
  page = 1,
  category,
}: {
  locale?: Locale;
  page?: number;
  category?: string;
}) {
  const all = await listPosts();
  const categories = [...new Set(all.map((post) => post.category))];
  const filtered = category ? all.filter((post) => post.category === category) : all;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(Math.max(page, 1), totalPages);
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const base = withLocale(locale, "/blog");

  function hrefFor(nextPage: number, nextCategory?: string) {
    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `${base}?${query}` : base;
  }

  return (
    <section className="section" style={{ paddingTop: "var(--tc-space-9)" }}>
      <Container>
        <h1 className="heading-2 max-w-[18ch]">Notes on building software that has to last</h1>
        <p className="body-lg muted mt-4 max-w-[62ch]">
          Placeholder articles. Replace them from the admin before you publish this site.
        </p>
        <div className="mt-8 flex flex-wrap gap-2" aria-label="Categories">
          <Link href={hrefFor(1)} className="chip" aria-current={!category ? "page" : undefined}>
            All
          </Link>
          {categories.map((item) => (
            <Link key={item} href={hrefFor(1, item)} className="chip" aria-current={item === category ? "page" : undefined}>
              {item}
            </Link>
          ))}
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {slice.map((post) => (
            <li key={post.slug}>
              <Link href={withLocale(locale, `/blog/${post.slug}`)} className="card grid gap-3">
                <Image src={post.coverImage} alt="" width={640} height={400} className="h-40 w-full rounded-[var(--tc-radius-sm)] object-cover" />
                <p className="caption">
                  {post.category} · {readingTime(post.body)} min
                </p>
                <h2 className="heading-6">{post.title}</h2>
                <p className="body-sm muted">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
        <nav className="mt-8 flex gap-3" aria-label="Pagination">
          {current > 1 ? <Link href={hrefFor(current - 1, category)}>Previous</Link> : null}
          <span className="body-sm muted">
            Page {current} of {totalPages}
          </span>
          {current < totalPages ? <Link href={hrefFor(current + 1, category)}>Next</Link> : null}
        </nav>
      </Container>
    </section>
  );
}
