import type { NextConfig } from "next";

// Kept in sync with public/_headers — that file covers static assets
// served directly by Cloudflare, which bypass Next's header handling
// entirely (this was why a Screaming Frog crawl found 16 URLs missing
// these headers even though they were configured here).
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // 'unsafe-inline' on script-src is required by Next's hydration
    // scripts, the JSON-LD blocks, and next-themes' FOUC-prevention
    // script. It weakens XSS protection, but this site renders no
    // user-supplied content, so the practical exposure is minimal — the
    // other directives (frame-ancestors, base-uri, form-action, img-src)
    // still carry real weight.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' cloudflareinsights.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // The stylesheet goes inside each page instead of a separate request.
  // Measured A/B on a throttled phone profile, three interleaved runs each:
  // first paint 3.1s -> 2.7s, and PageSpeed-method LCP 5.9s -> 3.9s (score
  // 46 -> 70). With the CSS as its own file, the phone downloaded it in
  // parallel with the JavaScript and ran all of that before painting anything;
  // inline, the page paints as soon as the HTML arrives.
  // The cost: about 4 KB more on a first visit (brotli removes most of Next's
  // second copy in the RSC payload) and ~18 KB on each further page, which no
  // longer reuses a cached stylesheet. Most visits here are one landing page,
  // so that trade favours first visits. Next documents it as experimental.
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [{ source: "/pricing", destination: "/services", permanent: true }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Next excludes /_next/* from the wildcard above, so the image
      // optimiser endpoint was serving real image bytes with no nosniff.
      { source: "/_next/image", headers: SECURITY_HEADERS },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
