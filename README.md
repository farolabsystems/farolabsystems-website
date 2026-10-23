# Company website

A Next.js site with the public marketing pages, a small admin, and a Postgres database. Brand strings live in one file so they can be swapped.

**Brand:** Farolab Systems  
**Stack:** Next.js 15 (App Router), React 19, Prisma, Postgres, Docker

## Run with Docker

```bash
copy .env.example .env
docker compose up --build
```

Open http://localhost:3000. The database migrates and seeds before the app starts.

Admin: http://localhost:3000/admin/login

- Email: `admin@example.com`
- Password: `Farolab@2026`

`NEXT_PUBLIC_*` values are baked in at **image build** time. After changing `NEXT_PUBLIC_SITE_URL` or `NEXT_PUBLIC_CAL_URL` in `.env`, rebuild:

```bash
docker compose up -d --build app
```

## Run locally

```bash
npm install
copy .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

Postgres must be running and `DATABASE_URL` must point at it. Without a database the public site still renders from the files in `src/website-theme/data`.

## Environment variables

Copy `.env.example` to `.env` and fill in what you need.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `AUTH_SECRET` | Signs the admin session cookie (must match at runtime for login + middleware) |
| `COOKIE_SECURE` | Optional. Force cookie Secure (`true`/`false`). Default follows `NEXT_PUBLIC_SITE_URL` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap, robots, SEO). Use `https://` in production so the admin cookie is Secure |
| `NEXT_PUBLIC_CAL_URL` | Cal.com / cal.id booking URL for `/schedule-meeting` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin login |
| `AWS_*` | Private S3 bucket for blog / case study images |
| `SMTP_*` | Optional email for contact inquiries (leads still save without SMTP) |

## Schedule a meeting (Cal.com / cal.id)

`/schedule-meeting` embeds your public Cal booking page in an iframe.

1. In [cal.id](https://cal.id) (or Cal.com), open the left sidebar and use **Copy public page link**, or copy a specific link from **Event Types**.
2. Set it in `.env`:

```env
NEXT_PUBLIC_CAL_URL="https://cal.id/your-username"
```

3. Rebuild / restart the app (Docker needs `--build` for `NEXT_PUBLIC_*`).

If the variable is empty, the page shows a short placeholder instead of the calendar. There is no contact form on this page; use `/contact` for inquiries.

The embed always requests Cal’s **light** theme (`?theme=light`) so it matches the marketing site. The “Powered by Cal ID” footer is clipped in the page CSS; to remove it officially, turn on **Disable branding** under Cal.id → Settings → Appearance (plan-dependent).

## Contact form and admin

- Public form: `/contact` (and other pages that include Let’s Talk).
- Submissions are stored as leads and listed under **Admin → Inquiries**.
- Phone fields use country calling codes (`libphonenumber-js`).
- SMTP is optional; without it, leads are still saved in the database.

## SEO

- Sitemap: `{NEXT_PUBLIC_SITE_URL}/sitemap.xml` (e.g. http://localhost:3000/sitemap.xml)
- Robots: `{NEXT_PUBLIC_SITE_URL}/robots.txt` — disallows `/admin`, `/api`, and `/_styleguide`
- Set `NEXT_PUBLIC_SITE_URL` to the real production domain before deploy so sitemap and canonical URLs are correct.

## Media uploads

Admin image uploads go to a private S3 bucket. The app serves them through `/media/...` so the bucket does not need to be public. Cover images are cropped to 16:9 and compressed to WebP in the browser before upload.

## Change the brand

Edit `src/website-theme/config/site.config.ts`. Addresses, the company name, social links, and founder placeholders are all there. See `docs/assumptions.md` for everything that must be replaced.

## Add a page

- A service or industry: add a record under `src/website-theme/data` (or re-run `node scripts/generate-catalog.mjs` after a crawl).
- A case study, blog post, or generic page: create it in `/admin`. Generic pages are served at `/{slug}`.
- A new homepage section: add a component in `src/website-theme/sections` and render it from `src/website-theme/pages/home/HomePage.tsx`.

## Folder map

- `src/app` — thin routes, route handlers, admin screens
- `src/website-theme` — layout, sections, page templates, tokens, copy
- `src/modules` — Prisma-backed services
- `src/lib` — auth, validation, SEO helpers
- `prisma` — schema, migration, seed
- `docs` — inventory, tokens, assumptions

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Prisma client and production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run db:seed` | Seed admin, posts, pages, case studies |
| `npm run crawl` | Refresh `docs/site-inventory.md` from the reference sitemap |
