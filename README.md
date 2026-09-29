# ruvisibility.com

The website for **Ru Visibility**, live at **[ruvisibility.com](https://ruvisibility.com)**.

## What it is

Ru Visibility is a one-person SEO and AI visibility (GEO) consultancy run by [Rushil A. Bajpai](https://ruvisibility.com/about). It works on getting businesses found on Google and recommended by AI tools like ChatGPT, Gemini and Perplexity.

This repository is the complete code for its website.

## What the site does

- **Explains the services** in plain English: [what we do](https://ruvisibility.com/services) and [how we work](https://ruvisibility.com/how-we-work).
- **Publishes real research.** [What we found auditing 1,504 websites](https://ruvisibility.com/research) shares results from auditing real business sites, with no site named.
- **Offers a free check.** Any business can [send its web address](https://ruvisibility.com/#audit) and get its Google and AI scores, plus a list of fixes.
- **Takes messages** through a simple [contact form](https://ruvisibility.com/contact).

## Why it matters

The site sells website audits, so it has to pass one itself:

- **Accessible.** Pages are scanned for accessibility problems in both light and dark mode, and the latest result is published with its date on the [accessibility page](https://ruvisibility.com/accessibility).
- **Secure.** It sends strict browser security headers on every page.
- **Easy for Google and AI tools to read.** It has structured data, a sitemap with real update dates, an `llms.txt` file, and AI crawlers are explicitly allowed in.
- **Honest.** No invented testimonials, reviews or filler pages. The rules for new content are in [`CONTENT_RULES.md`](CONTENT_RULES.md).

---

## Technical details

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and shadcn/ui (Base UI registry), running on Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). The forms send email through Resend from server actions; nothing is stored.

- **Accessibility:** axe-core in a real browser, against WCAG 2.1 A and AA.
- **Security headers:** HSTS, CSP, `X-Frame-Options`, `nosniff` and a referrer policy, set in both `next.config.ts` and `public/_headers`. Cloudflare serves static files directly and skips Next's header handling, so the two are kept in sync.
- **Sitemap dates:** each page's `lastmod` is its real last git commit date, generated at build time by `scripts/gen-page-dates.mjs`.
- **Research data:** `scripts/aggregate-findings.mjs` builds the `/research` numbers from the audit reports. Only counts and percentages reach the public file: no domain names, and none of the audit tool's scoring internals.
- **Structured data:** Organization, Person and WebSite (JSON-LD), with no ratings or reviews.
- **Indexing:** `scripts/submit-indexnow.mjs` submits pages to IndexNow.

## Running it locally

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run preview   # run under the real Cloudflare Workers runtime
```

The forms need a Resend API key, and analytics need a Cloudflare Web Analytics token. See `.dev.vars.example` and `.env.example` for where each one goes.

## License

The code is public to read. It isn't licensed for reuse, and the text, design and research data belong to Ru Visibility.
