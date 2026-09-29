# ruvisibility.com

Source code for **[ruvisibility.com](https://ruvisibility.com)**, the website of Ru Visibility, a one-person SEO and AI visibility (GEO) consultancy.

The site sells website audits, so it has to hold up to one. The code is public so you can check how it's built instead of taking my word for it.

Built by [Rushil A. Bajpai](https://ruvisibility.com/about) with Claude Code, which is credited as co-author on most commits.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui on the Base UI registry
- Runs on Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
- The contact and audit-request forms send one email each through Resend, from a server action. Nothing is stored.

## Worth a look

- **Accessibility, measured.** Pages are scanned with axe-core in a real browser against WCAG 2.1 A and AA, in both light and dark mode. The latest result and its date are published on [/accessibility](https://ruvisibility.com/accessibility).
- **Security headers** (HSTS, CSP, `X-Frame-Options`, `nosniff`, referrer policy) are set in both `next.config.ts` and `public/_headers`. Cloudflare serves static files directly and skips Next's own header handling, so the two are kept in sync.
- **Real sitemap dates.** Each page's `lastmod` is its actual last git commit date, worked out at build time by `scripts/gen-page-dates.mjs`. It can't be done inside `sitemap.ts`, because that route runs in the Worker, where git isn't available.
- **Research numbers that don't leak data.** [/research](https://ruvisibility.com/research) is generated from 1,504 audit reports by `scripts/aggregate-findings.mjs`. Only counts and percentages get through: no domain names, and none of the audit tool's scoring internals.
- **Open to AI crawlers.** `robots.txt` explicitly allows GPTBot, ClaudeBot and the other AI crawlers. There's an `llms.txt`, Organization, Person and WebSite structured data (no ratings or reviews), and IndexNow submission via `scripts/submit-indexnow.mjs`.
- **Content rules.** [`CONTENT_RULES.md`](CONTENT_RULES.md) is the standing rule for new pages: no invented testimonials, no filler pages, no city pages without real work behind them.

## Running it

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # production build (also regenerates src/lib/page-dates.json from git history)
npm run preview   # build and run under the real Workers runtime locally
npm run deploy    # build and deploy to ruvisibility.com
```

`deploy` calls `opennextjs-cloudflare build && opennextjs-cloudflare deploy` directly and does **not** go through the `build` script. That's why `gen-page-dates.mjs` is called explicitly in all three scripts instead of relying on an npm `prebuild` hook.

Maintainer notes live outside the repo, one folder up: `../HANDOFF.md` (current state) and `../WEBSITE-DATA.md` (decision log).

### Secrets

- `RESEND_API_KEY` powers both forms. Set it with `npx wrangler secret put RESEND_API_KEY`. For local dev, copy `.dev.vars.example` to `.dev.vars`, which is gitignored.
- `NEXT_PUBLIC_CF_BEACON_TOKEN` (Cloudflare Web Analytics) goes in `.env.local`, **not** a wrangler secret. Next.js bakes `NEXT_PUBLIC_*` variables into the client bundle at build time, so it has to exist before `next build` or `deploy` runs. See `.env.example`.

### Regenerating the /research data

`src/lib/research-findings.json` is generated from the audit reports on the machine that ran the audits. It is never hand-edited.

```bash
node scripts/aggregate-findings.mjs --root <folder containing the audit reports> \
  --out src/lib/research-findings.json \
  --csv ../research-findings.csv \
  --full ../research-findings.full.json   # private, never commit
```

The script enforces three rules:

- **No client data in the committed file.** Counts and percentages only, never a domain. Grep for `\.com` before committing.
- **No scoring internals in the public file.** Component weights, recommendation ids and pitch types go to `--full` only. This matters even for data no page renders, because an imported JSON module is bundled and served whether a component reads it or not.
- **Partial fields keep their own denominator.** Anything missing from some reports is reported separately under `subsetOnly`, never averaged against the full set.

## License

The code is public to read. It isn't licensed for reuse, and the text, design and research data belong to Ru Visibility.
