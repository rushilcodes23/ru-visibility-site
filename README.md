# Ru Visibility — ruvisibility.com

Marketing site for Ru Visibility (SEO/GEO agency). Next.js App Router +
Tailwind v4 + shadcn (Base UI registry), deployed to Cloudflare Workers via
`@opennextjs/cloudflare`.

**Start here:** `../HANDOFF.md` and `../WEBSITE-DATA.md` (one folder up from
this one) — current state and the full decision log across 11 rounds.
`CONTENT_RULES.md` in this folder governs any new page content.

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

```bash
npm run build     # local production build (also regenerates src/lib/page-dates.json from git history)
npm run preview   # build + run under an actual Workers runtime locally
npm run deploy    # build + deploy to ruvisibility.com
```

`deploy` calls `opennextjs-cloudflare build && opennextjs-cloudflare deploy`
directly — it does **not** go through the `build` script, which is why
`gen-page-dates.mjs` is invoked explicitly in all three scripts rather than
relying on an npm `prebuild` hook.

### Secrets

- `RESEND_API_KEY` — set via `npx wrangler secret put RESEND_API_KEY` (run
  it yourself; never paste the value into a chat session). Powers the
  contact form.
- `NEXT_PUBLIC_CF_BEACON_TOKEN` (Cloudflare Web Analytics) — goes in
  `.env.local`, **not** a wrangler secret. This is a build-time-inlined
  variable (Next.js bakes `NEXT_PUBLIC_*` vars into the client bundle at
  build time), so it must exist before `next build`/`deploy` runs. See
  `.env.example`.

## Stack notes

- **shadcn here uses the Base UI registry**, not classic Radix — e.g.
  `Button` takes a `render` prop, not `asChild`.
- Theme default is **dark** (`next-themes`, `enableSystem={false}`) — toggle
  bottom-right.
- Security headers live in both `next.config.ts` (`headers()`) and
  `public/_headers` — Cloudflare serves static assets directly, bypassing
  Next's own header handling, so the two must be kept in sync.
