import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { blogSection } from "@/website-theme/data/home";
import type { PostRecord } from "@/website-theme/data/types";
import { Container } from "@/website-theme/ui/Container";
import { CoverImage } from "@/website-theme/ui/CoverImage";
import { Section } from "@/website-theme/ui/Section";

export function BlogTeaser({ locale, posts }: { locale: Locale; posts: PostRecord[] }) {
  return (
    <Section>
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="heading-2 max-w-[16ch]">{blogSection.title}</h2>
            <p className="body muted mt-3 max-w-[52ch]">{blogSection.body}</p>
          </div>
          <Link href={withLocale(locale, "/blog")} className="text-link body-sm shrink-0">
            All articles
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={withLocale(locale, `/blog/${post.slug}`)} className="card grid gap-3">
              <div className="blog-cover">
                <CoverImage src={post.coverImage} alt={post.coverAlt || post.title} className="h-full w-full object-cover" />
              </div>
              <p className="caption">
                {post.category} · {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <h3 className="heading-6">{post.title}</h3>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
