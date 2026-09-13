# Content rules for ruvisibility.com

Written 13 September 2026. These exist because this site sells SEO and GEO
services — getting hit by a scaled-content-abuse action here costs the
business twice: the traffic, and the credibility of selling the fix.

Google's enforcement target is **scaled content abuse**: publishing many
low-differentiation pages primarily to catch rankings. The policy judges the
*page*, not the tool. AI-assisted content that is edited, accurate and
genuinely useful is inside policy. AI-generated filler published at volume is
not — and so is human-written filler published at volume.

---

## AI is fine for

- Page architecture and section ordering
- H1s, title tags, meta descriptions
- Internal linking maps and anchor text
- Turning rough notes from real work into clean prose
- Editing, tightening, and fixing structure in something already written
- Technical work: schema, sitemaps, metadata, accessibility fixes

## AI is not for

- Generating a page body from a prompt with no source material
- Producing variations of an existing page for a new keyword or city
- Writing about work that has not been done
- Inventing numbers, results, timelines, client names, or examples

The distinction is not "did a model touch this." It is **"did this page start
from something real."**

---

## The one hard rule for every new page

> Every published page must contain at least one thing that could not have
> been produced by prompting a model.

Acceptable forms of that one thing:

- A real number from real work (a crawl result, a scan score, a measured
  before/after)
- A screenshot of an actual tool output
- A named, real example
- A process detail specific to how *this* business works, not how the
  industry works generally
- An outcome, including a negative one — "we tried this and it did nothing"
  is more defensible than any amount of generic advice

If the page has none of these, it is not ready. Add the specific, or do not
publish it.

---

## The replicability test

Before publishing, answer honestly:

> **Could a competitor publish a near-identical version of this page tomorrow
> from a single AI prompt?**

**Yes** → the page is a liability, not an asset. Pick one:

| Option | When |
|---|---|
| **Merge** into a stronger related page | The topic matters but can't carry a page alone |
| **Rewrite** with first-hand specifics | The topic matters and you have real material |
| **Delete + 301** to the closest page | The topic doesn't matter |
| **Noindex** | Real user value, no search value (contact, thanks, legal) |

**No** → write down *what* makes it unique. If you can't name the thing in one
sentence, the answer was actually yes.

---

## Location pages

The highest-risk page type on any site, and the easiest to get wrong.

Current state: 24 city pages, ~427 words each, roughly 70% vocabulary overlap
between any two, and an identical paragraph count across all of them. They
carry real per-market content (what that economy runs on, a different argument
per city) on top of a shared template.

Rules going forward:

1. **Do not add a city page speculatively.** A city gets a page after there is
   real work or real outreach in that market, not before.
2. **Every new city page needs its own argument**, not the same argument with
   the city name swapped. If the reasoning would read identically for another
   city, it is a template, and Google can see that as clearly as this repo's
   own similarity checker can.
3. **Never claim a physical presence** that doesn't exist. No address, no "our
   Dallas office," no LocalBusiness schema. Organization schema with
   `areaServed` is the honest structure and it's what the site uses.
4. If the count grows much past its current size without the per-page content
   growing with it, consolidate instead of adding.

---

## Structured data

- Never publish `Review`, `AggregateRating`, or `ratingValue` markup for
  reviews that don't exist. This is a direct manual-action trigger, not a grey
  area. The site currently has none — keep it that way.
- Never publish `LocalBusiness` or its subtypes (including
  `ProfessionalService`) without a real address. This site deliberately uses
  plain `Organization`.
- `FAQPage` schema only on questions someone actually asks. Filler questions
  marked up as an FAQ are worse than no schema.
- Don't add schema for the sake of having more schema. Each block should
  describe something that is actually on the page.

---

## Claims

- No client names, logos, or results without written permission and a real
  engagement behind them.
- Illustrative examples must be labelled as illustrative, in visible text, not
  a footnote. The `/work` page does this correctly — copy that pattern.
- No guaranteed rankings, guaranteed AI citations, or guaranteed traffic. The
  site says plainly that nobody can promise these. Don't contradict it.

---

## Freshness

- Never bump a date without a real content change. `lastmod` is generated from
  actual git commit times (`scripts/gen-page-dates.mjs`) precisely so it can't
  drift into fiction.
- Never set every page's date to the build time. Google discards `lastmod` it
  can tell is unreliable, which wastes the signal for the pages that did
  genuinely change.
