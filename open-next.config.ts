import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// This was the stock generated config — no cache of any kind — and it was the
// single biggest thing slowing the site down. Measured on the live site before
// this change: every response carried `x-nextjs-cache: MISS` even though it
// also carried `x-nextjs-prerender: 1`. So each visit re-ran the full Next.js
// server inside the Worker to rebuild a page that had already been built at
// deploy time. Time to first byte was 0.81s-1.10s across three runs, against
// ~0.3s of connect and TLS, i.e. roughly half a second of pure server work per
// request. That half second sits in front of every other metric.
//
// Two changes, both of which are free and need no extra Cloudflare resources:
//
// 1. staticAssetsIncrementalCache — reads prerendered pages back out of the
//    Workers static assets already uploaded on deploy, instead of regenerating
//    them. Its own docs say it suits apps that "do NOT want revalidation and
//    ONLY want to serve prerendered data", which is exactly this site: the
//    build has 50 prerendered routes and zero with a revalidate window, and
//    there is no `export const revalidate` or `dynamic` anywhere in src/.
//    The tradeoff is that content only changes on deploy — true here already,
//    since posts are MDX compiled at build time.
//
// 2. enableCacheInterception — serves a cached route without booting the full
//    Next.js request handler. Safe on both counts that matter: PPR is off (no
//    experimental flags in next.config.ts), and the interceptor returns early
//    on any request carrying a `next-action` header, so the contact form's
//    server action still runs normally rather than being served from cache.
//    On a cache miss it falls through to the normal handler, so the failure
//    mode is today's behaviour, not an error.
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});
