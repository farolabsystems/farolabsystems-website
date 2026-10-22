# Design tokens

Extracted on **2026-10-22** from the live site’s computed styles and the Webflow shared stylesheet (`style-guide-82d41b.webflow.shared.062a8d311.min.css`). Values below are the ones implemented in `src/website-theme/styles/tokens.css`.

## Color

| Token | Hex | Use |
|---|---|---|
| `--color-page` | `#f3f1eb` | Page / surface background (TC surface) |
| `--color-page-alt` | `#ede9e2` | Alternate sections, pressed surfaces |
| `--color-background` | `#f2f2f2` | Neutral background |
| `--color-white` | `#ffffff` | Cards, header, form fields |
| `--color-text` | `#333333` | Headings and body |
| `--color-text-muted` | `#5b5953` | Secondary body |
| `--color-text-faint` | `#949494` | Captions, placeholders |
| `--color-primary` | `#00d286` | Brand green, primary buttons, links |
| `--color-primary-hover` | `#03bf7b` | Button hover |
| `--color-primary-active` | `#009c63` | Button active / pressed |
| `--color-primary-soft` | `#ccffec` | Soft hover wash |
| `--color-primary-softer` | `#80f4ca` | Pressed wash |
| `--color-border` | `#d7d7d7` | Inputs, hairlines |
| `--color-border-strong` | `#e4e4de` | Cards on cream |
| `--color-danger` | `#ea384c` | Errors |
| `--color-danger-bg` | `#ffdede` | Error surfaces |
| `--color-success` | `#009c63` | Success text |
| `--color-footer` | `#333333` | Footer background |
| `--color-footer-text` | `#f3f1eb` | Footer text |
| `--color-focus` | `#00d286` | Focus ring |

Primary button text stays `#333333` on green (matches the live control). Links use primary green.

## Typography

Font: **Work Sans** (variable), self-hosted with `next/font`. Headings are weight **400**. Line-height for headings is **1.2**. Body line-height is **1.6** (28.8px at 16px). Body letter-spacing **0.04px**.

| Style | Desktop | Tablet (≤991px) | Mobile (≤767px) | Letter-spacing |
|---|---|---|---|---|
| H1 | 80px | 52px | 32px | -0.4px / -0.26px / -0.21px |
| H2 | 64px | 42px | 32px | -0.32px |
| H3 | 52px | 32px | 32px | -0.26px |
| H4 | 42px | 24px | 24px | -0.21px |
| H5 | 32px | 20px | 20px | -0.16px |
| H6 | 24px | 18px | 18px | -0.12px |
| Body large | 18px | 18px | 16px | 0.04px |
| Body | 16px | 16px | 16px | 0.04px |
| Body small | 14px | 14px | 14px | 0.035px |
| Caption | 12px | 12px | 12px | 0 |
| Button | 16px / lh 1.6 / weight 400 | same | same | 0.04px |
| Nav link | 16px weight 400 | same | 16px | 0.04px |
| Eyebrow | 12px uppercase, weight 600, tracking 0.08em | same | same | 0.08em |

## Spacing and layout

8px base scale: 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 128, 160.

| Token | Value |
|---|---|
| Container width | `min(85vw, 1088px)` (live “1280” container caps at 1088) |
| Wide container | `min(82vw, 1184px)` |
| Section padding desktop | 128px |
| Section padding tablet | 96px |
| Section padding mobile | 64px |
| Grid gap | 24px |
| Breakpoints | 479, 767, 991, 1280, 1440, 1920 (Webflow). App also checks 360, 768, 1024, 1280, 1536. |

## Shape and motion

| Token | Value |
|---|---|
| Button radius | 125px (pill) |
| Input radius | 8px |
| Card radius | 32px (small) / 48px (large) |
| Card radius mobile | 24px |
| Border | 1px solid border color |
| Shadow card | `0 12px 40px rgba(51, 51, 51, 0.06)` |
| Transition | 200ms `cubic-bezier(0.4, 0, 0.2, 1)` |
| Marquee | 40s linear infinite |
| Reveal | fade + 16px rise, 500ms, only where the live page reveals sections |

Header is sticky. Over the hero it is transparent; after scroll (or when a menu is open) it is solid white with a hairline border.

## Components captured

- Header with Services mega menu (Development / Design / Maintenance) and Portfolio mega menu (industry links + two featured case cards)
- Mobile menu: hamburger, full-screen panel, accordion groups
- Pill buttons: filled, empty, transparent
- Eyebrow with a short green rule
- Numbered cards (`01`, `02`)
- Logo marquee
- Stat counters
- Case-study slider
- Industry tabs
- Testimonial
- Blog cards
- FAQ accordion
- Contact form with starting-point radios and option chips
- Founder avatar row (placeholder initials)
- Footer: address, schedule link, directory badges, link columns, freelancer line, “coded with care” line, legal, language switcher, social, scroll-to-top
- Cookie banner: Customize, Reject all, Accept all
