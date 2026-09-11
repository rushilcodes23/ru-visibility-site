import type { MetadataRoute } from "next";

// Every AI crawler is named explicitly rather than left to the wildcard.
// The wildcard already allows them, so this changes no behaviour — it states
// the intent unambiguously, which matters when the whole business is being
// recommended by these systems. Blocking them would work directly against
// the thing this site sells.
//
// Google-Extended is the one worth calling out: it is a separate token that
// governs whether Google may use the content to ground Gemini and AI
// Overviews answers, independently of normal Search indexing. Disallowing it
// would keep us in Search but drop us out of AI answers.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI index
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "Applebot",
  "Applebot-Extended",
  "Bingbot", // also feeds Copilot
  "CCBot", // Common Crawl, upstream of many models
  "Meta-ExternalAgent",
  "Amazonbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://ruvisibility.com/sitemap.xml",
    host: "https://ruvisibility.com",
  };
}
