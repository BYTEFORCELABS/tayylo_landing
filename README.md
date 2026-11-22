# Tayylo marketing site

The public landing page for Tayylo, the modern tailor's notebook.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Motion. Every
page is statically prerendered.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, see Configuration
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck |

## Configuration

All outward links live in [`src/config/site.ts`](src/config/site.ts) and come from
environment variables (see [`.env.example`](.env.example)):

- `NEXT_PUBLIC_APP_STORE_URL`, `NEXT_PUBLIC_PLAY_STORE_URL`: while empty, the
  store buttons show "Coming soon" and don't link anywhere.
- `NEXT_PUBLIC_WEB_APP_URL`: where "Log in", "Sign up" and "Get started" go.
  Defaults to `https://app.tayylo.com`.
- `NEXT_PUBLIC_SITE_URL`: canonical origin for metadata, sitemap and Open Graph.
  Falls back to the Vercel production URL, then to `https://tayylo.com` in
  production builds.
- `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`: shown on the
  contact page, in the footer and on the legal pages when set.
- `NEXT_PUBLIC_INSTAGRAM_URL`, `_TIKTOK_URL`, `_X_URL`, `_FACEBOOK_URL`,
  `_LINKEDIN_URL`: social links. Each defaults to the `@tayylo` handle.

### Contact form

`/contact` posts to `src/app/api/contact/route.ts`, which sends mail through
[Resend](https://resend.com). Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and
`CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend). Until they are
set, the form tells visitors the inbox isn't connected and offers a pre-filled
email or WhatsApp message instead.

## Structure

```
src/
  app/              routes, metadata, sitemap, robots, manifest, OG image, legal pages
  config/site.ts    links, navigation, site metadata
  content/          copy and sample data (FAQ, templates, phone demo data)
  sections/         one file per page section (hero, showcase, features, ...)
  components/
    brand/          Tayylo logo, garment icons, tape-rule motif
    phone/          device frame, app UI primitives, and the six scripted demo scenes
    layout/         header, footer, legal page shell, motion provider
    contact/        contact form
    ui/             buttons, store badges, reveal animations, section headings
  hooks/            useTimeline (scripted phone demos), useActiveSection (nav highlight)
  lib/              helpers and motion constants
public/
  brand/            official logo files (from the Tayylo web app)
  art/              measurement body maps and garment icons (Tayylo icon sets)
  images/           garment, Explore and fabric photography (from the Tayylo app)
```

## Phone demonstrations

The demos in `src/components/phone/scenes/` are faithful web recreations of the
real Tayylo mobile screens (Today, measurement capture, client history, new
order, production tracker, invoice). They use the app's own design tokens,
labels and flows. Each scene is a pure function of a `step` number; `useTimeline`
advances the steps, and with reduced motion each scene shows its final state.

The app's design tokens are mirrored in `src/app/globals.css`. If the app's
tokens change, update them there as well.

## Asset notes

- The fabric swatches used here are CC0 or Unsplash-licensed (see
  `tayylo/public/fabrics/CREDITS.md`), so they need no attribution.
- The store buttons are drawn in code. If you prefer, swap them for Apple's and
  Google's official badge artwork at launch.
