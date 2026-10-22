# Assumptions and placeholders

The workspace did not contain a `next-cms` app, so this repository was created here.

## Brand — replace before launch

Every item below is a placeholder. Search for `TODO: replace with our own` and for `COMPANY_NAME`.

- Company name, legal name, email, phone, address, tax number, copyright line
- Founder names and initials (no real portraits are included)
- Directory badges (Clutch, GoodFirms, Upwork) are text links, not official logo artwork
- Client names in the logo strip are invented
- Testimonial quote, name, and role
- Case-study titles keep the public URL slugs so every crawled path resolves. Summaries, stats (`+00%`), and article bodies are placeholders. Do not publish them as facts.
- Blog titles keep the public URL slugs. Bodies are placeholders, not the original articles.
- Legal pages are short placeholders, not a real privacy or cookie policy
- Review score and review count
- Social profile URLs
- Open job listings
- The consultation route accepts any slug and does not describe a real person

## Product choices

- Polish routes exist under `/pl` and reuse the English page templates. Only chrome strings are translated.
- Outstaffing has no URLs in the reference sitemap. Footer links point at offshore development, collaboration, and support.
- There is no third-party calendar on `/schedule-meeting`. The contact form is the booking path.
- Contact email is sent only when `SMTP_HOST` is set. The lead is still stored.
- Rate limiting is in memory, per server process.
- Cookie consent is stored in the `cookie_consent` cookie. No analytics script is loaded.
- `/_styleguide` returns 404 in production.
- Admin login is `admin@example.com` / `ChangeMe123!` unless `ADMIN_EMAIL` and `ADMIN_PASSWORD` are changed before seeding. The password is not updated on later seeds.
- Pages read the database when it is reachable and fall back to the TypeScript catalogs when it is not, so `npm run build` does not need Postgres.
- Headlines and section copy are original placeholder text in the same section order as the reference site. They are not a verbatim copy of that site.

## Crawl

- Inventory date: 2026-10-22
- 153 English URLs, all HTTP 200
- Polish URLs are listed in `docs/site-inventory.md` and served by `src/app/pl/[[...slug]]/page.tsx`
