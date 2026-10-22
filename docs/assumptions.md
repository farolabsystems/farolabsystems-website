# Assumptions and placeholders

The public site is written for **Farolab Systems**. Unknown business details are not invented.

## TODO: Replace with actual company information

Search for that phrase and for `hello@example.com`.

- Street address, phone number, tax number and legal entity details
- The public email address (`hello@example.com` until a real one exists)
- Social profile URLs (hidden until configured in `site.config.ts`)
- A real scheduling link (`meetingUrl` in `site.config.ts`). The schedule page uses the contact form until then
- Team members and portraits (none are shown)
- Client logos (none are shown)
- Testimonials (the homepage states that client stories are coming; no person is quoted)
- Case studies are **demo / concept projects**, labeled on the site. Do not publish them as client work
- Case-study outcomes are qualitative on purpose. Do not add figures you cannot source
- Awards, ratings, review counts and directory badges are omitted
- Open jobs are empty until you add real roles in `src/website-theme/data/team.ts`
- The privacy and cookie pages are drafts for counsel to replace
- Admin login remains `admin@example.com` / `ChangeMe123!` unless the environment variables are changed before seeding

## Product choices

- Polish routes under `/pl` reuse the English page templates. Only chrome strings are translated.
- Blog posts and case studies fall back to the TypeScript catalogs when Postgres is unavailable. Re-seed after deploy so the database matches this content.
- Contact email is sent only when `SMTP_HOST` is set. The lead is still stored.
- Rate limiting is in memory, per server process.
- Cookie consent is stored in the `cookie_consent` cookie. No analytics script is loaded.
- `/_styleguide` returns 404 in production.
- `docs/site-inventory.md` is the crawl record of the reference layout. It is not site copy.
