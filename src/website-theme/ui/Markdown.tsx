import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import { slugify } from "@/lib/slug";
import { CoverImage } from "@/website-theme/ui/CoverImage";

function headingText(children: ReactNode) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map((child) => (typeof child === "string" ? child : "")).join("");
  return "";
}

const components: Components = {
  h2: ({ children }) => {
    const text = headingText(children);
    return (
      <h2 id={slugify(text)} className="heading-5">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = headingText(children);
    return (
      <h3 id={slugify(text)} className="heading-6">
        {children}
      </h3>
    );
  },
  a: ({ href, children }) => (
    <a href={href} rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}>
      {children}
    </a>
  ),
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="media-frame media-frame--inline">
        <CoverImage src={src} alt={alt ?? ""} sizes="(max-width: 768px) 100vw, 720px" />
      </span>
    );
  },
};

export function Markdown({ source }: { source: string }) {
  return (
    <div className="prose grid gap-4">
      <ReactMarkdown components={components}>{source}</ReactMarkdown>
    </div>
  );
}
