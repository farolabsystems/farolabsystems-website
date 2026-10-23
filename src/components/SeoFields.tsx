"use client";

type Props = {
  title: string;
  description: string;
  slug: string;
  path: string;
  onTitle: (value: string) => void;
  onDescription: (value: string) => void;
};

function tone(length: number, min: number, max: number) {
  if (length === 0) return "is-empty";
  if (length < min || length > max) return "is-warn";
  return "is-good";
}

export function SeoFields({ title, description, slug, path, onTitle, onDescription }: Props) {
  const titleTone = tone(title.length, 30, 60);
  const descriptionTone = tone(description.length, 70, 160);
  const slugOk = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  const checks = [
    { ok: titleTone === "is-good", label: "Title is 30–60 characters" },
    { ok: descriptionTone === "is-good", label: "Description is 70–160 characters" },
    { ok: slugOk, label: "Slug is lowercase and hyphenated" },
  ];
  const score = checks.filter((item) => item.ok).length;

  return (
    <section className="seo-card">
      <div className="seo-card-head">
        <h2 className="heading-6">Search listing</h2>
        <p className="caption">{score}/3 checks ready</p>
      </div>
      <label className="grid gap-2 body-sm">
        SEO title
        <input className="field" value={title} maxLength={180} onChange={(event) => onTitle(event.target.value)} />
        <span className={`seo-count ${titleTone}`}>{title.length} / 60</span>
      </label>
      <label className="grid gap-2 body-sm">
        SEO description
        <textarea className="field" rows={3} value={description} maxLength={300} onChange={(event) => onDescription(event.target.value)} />
        <span className={`seo-count ${descriptionTone}`}>{description.length} / 160</span>
      </label>
      <div className="seo-preview" aria-label="Search result preview">
        <p className="seo-preview-url">{path || "/"}</p>
        <p className="seo-preview-title">{title || "Add an SEO title"}</p>
        <p className="seo-preview-desc">{description || "Add a description that says what this page is about."}</p>
      </div>
      <ul className="seo-checks">
        {checks.map((item) => (
          <li key={item.label} className={item.ok ? "is-good" : ""}>
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
