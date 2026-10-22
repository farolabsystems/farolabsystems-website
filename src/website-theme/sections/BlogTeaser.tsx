import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import type { PostRecord } from "@/website-theme/data/types";
import { Container } from "@/website-theme/ui/Container";
import { Section } from "@/website-theme/ui/Section";

export function BlogTeaser({ locale, posts }: { locale: Locale; posts: PostRecord[] }) {
  return (
    <Section>
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="heading-2">From our blog</h2>
          <Link href={withLocale(locale, "/blog")} style={{ color: "var(--tc-primary-active)" }}>
            All articles
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={withLocale(locale, `/blog/${post.slug}`)} className="card grid gap-3">
              <Image src={post.coverImage} alt="" width={640} height={400} className="h-40 w-full rounded-[var(--tc-radius-sm)] object-cover" />
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
