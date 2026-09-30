@AGENTS.md

## Access control

The site has no logins and no database. Everything a visitor can do is read
pages or submit one of two forms, and each form sends one email. Update this
table in the same change as any new form, endpoint, secret, or stored data.

### Roles

| Role | Description |
|---|---|
| Anonymous | Any visitor or crawler. The only role the site itself serves. |
| Owner | Rushil. Acts through git + `npm run deploy`, Cloudflare, and Resend dashboards, never through the site. |
| Service | The Cloudflare Worker running server actions (`"use server"` files). |

### Resource × Role matrix

| Resource | Anonymous | Owner | Service | Enforced by |
|---|---|---|---|---|
| Pages, blog, `llms.txt`, sitemap | R | CRUD (git + deploy) | R | Prerendered static output; no write endpoint exists |
| Contact / audit-request submission | C (one email per submit, ~5 per minute per IP per form) | R (inbox) | C (sends via Resend) | `src/lib/send-contact-email.ts`, `src/lib/send-audit-request.ts`: honeypot, then `formAllowed()` (`src/lib/rate-limit.ts`, Workers rate-limit binding `FORM_LIMITER` in `wrangler.jsonc`, fails open), then field length caps, required fields, email/host regex. Nothing is stored |
| `RESEND_API_KEY` | — | Create / Revoke (`wrangler secret put`, Resend dashboard) | R | Cloudflare secret, read only inside `"use server"` files; not `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_CF_BEACON_TOKEN` | R (public by design) | CRUD (`.env.local`) | — | Inlined into client JS at build time; not a secret |
| Private research internals (`research-findings.full.json`, `research-findings.csv`) | — | CRUD (local only) | — | `.gitignore`, and never imported under `src/` (anything imported is bundled and served) |

### Known gaps

- None open. Both earlier gaps were closed on 2026-09-30 and verified live:
  field lengths are capped on both forms, and the rate limiter paused the 7th
  rapid submission (the limiter is approximate by design, so "about 5").
- The limiter fails open on purpose — if Cloudflare's limiter errors, the
  message still goes through. A lost lead costs more than one extra email.
