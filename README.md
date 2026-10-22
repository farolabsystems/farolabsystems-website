# Company website

A Next.js site with the public marketing pages, a small admin, and a Postgres database. Brand strings live in one file so they can be swapped.

## Run with Docker

```bash
docker compose up --build
```

Open http://localhost:3000. The database migrates and seeds before the app starts.

Admin: http://localhost:3000/admin/login

- Email: `admin@example.com`
- Password: `ChangeMe123!`

## Run locally

```bash
npm install
copy .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

Postgres must be running and `DATABASE_URL` must point at it. Without a database the public site still renders from the files in `src/website-theme/data`.

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
