import type { MetadataRoute } from "next";

// Deliberately no crawler blocks — including AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot, etc.). Blocking them would work against the exact thing
// this business audits other sites for.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ruvisibility.com/sitemap.xml",
  };
}
