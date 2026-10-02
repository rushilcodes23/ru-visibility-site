/**
 * The questions behind /answers: one page per question, grouped under the
 * search each group came from.
 *
 * Where the questions came from: Google autocomplete, queried on 2 October
 * 2026 with question openers ("what is", "how do I", "should I"...) in front
 * of each topic. Autocomplete only lists searches people actually type — it
 * proves a question is asked, never how often — so nothing here is a guessed
 * keyword. Google's People Also Ask box would have been the first choice, but
 * it refused automated reads from the connection used (CAPTCHA), so it was
 * not used rather than half-used.
 *
 * Questions that are the same thing in different words share one page — four
 * phrasings of "how do I get ChatGPT to recommend my business" are one page,
 * not four near-identical ones (CONTENT_RULES.md).
 *
 * Each page's body lives in src/app/answers/<slug>/page.tsx, so a page's
 * sitemap date moves only when that page changes.
 */

export type TopicKey =
  | "ai-visibility"
  | "chatgpt"
  | "geo"
  | "ai-overviews"
  | "seo-audit"
  | "chatgpt-seo"
  | "ai-crawlers"
  | "not-on-google"
  | "accessibility"
  | "local";

export const TOPICS: { key: TopicKey; title: string; search: string }[] = [
  { key: "ai-visibility", title: "AI visibility audits", search: "AI visibility audit for small business" },
  { key: "chatgpt", title: "Getting recommended by ChatGPT", search: "how to get my business recommended by ChatGPT" },
  { key: "geo", title: "Generative engine optimization", search: "generative engine optimization for small business" },
  { key: "ai-overviews", title: "Google AI Overviews", search: "how to get my business in Google AI Overviews" },
  { key: "seo-audit", title: "SEO audits", search: "how much does an SEO audit cost for a small business" },
  { key: "chatgpt-seo", title: "ChatGPT and SEO", search: "can ChatGPT do an SEO audit of my website" },
  { key: "ai-crawlers", title: "AI crawlers", search: "how to check if AI crawlers can access my website" },
  { key: "not-on-google", title: "Not showing up on Google", search: "why is my business website not showing up on Google" },
  { key: "accessibility", title: "Website accessibility (ADA)", search: "ADA website accessibility audit for small business" },
  { key: "local", title: "Google Business Profile without an office", search: "Google Business Profile for a service-area business without an office" },
];

export type Answer = {
  slug: string;
  question: string;
  /** Meta description: the answer itself, under ~155 characters. */
  description: string;
  topic: TopicKey;
  /** Slugs of other answers worth reading next. */
  related: string[];
  /** ISO date the answer was first published. */
  published: string;
  /** ISO date of the last real change to the answer — only set it when the
   *  content changed, never to look fresh (CONTENT_RULES.md). */
  updated?: string;
};

const P = "2026-10-02";

export const ANSWERS: Answer[] = [
  // AI visibility audits
  {
    slug: "what-is-an-ai-visibility-audit",
    question: "What is an AI visibility audit?",
    description: "A check of whether ChatGPT, Gemini, Perplexity and Google's AI answers can reach your website, understand it, and have reason to mention your business.",
    topic: "ai-visibility",
    related: ["how-to-check-your-websites-ai-visibility", "check-if-ai-crawlers-can-access-your-website", "what-does-an-seo-audit-include"],
    published: P,
  },
  {
    slug: "how-to-check-your-websites-ai-visibility",
    question: "How do I check my website's AI visibility?",
    description: "Ask the AI tools your customers use the questions they ask you, more than once, then check whether those tools are even allowed to read your site.",
    topic: "ai-visibility",
    related: ["what-is-an-ai-visibility-audit", "how-to-increase-ai-visibility", "check-if-ai-crawlers-can-access-your-website"],
    published: P,
  },
  {
    slug: "how-to-increase-ai-visibility",
    question: "How do I increase my website's AI visibility?",
    description: "Let AI crawlers in, answer real customer questions in plain sentences, keep your details consistent everywhere, and give other sites reasons to mention you.",
    topic: "ai-visibility",
    related: ["how-to-get-chatgpt-to-recommend-your-business", "how-to-appear-in-google-ai-overviews", "should-you-block-ai-crawlers"],
    published: P,
  },
  {
    slug: "why-ai-visibility-matters-for-small-business",
    question: "Why is AI visibility important for a small business?",
    description: "AI answers name a handful of businesses instead of listing ten. If an AI tool can't read or trust your site, you aren't in the running for that answer.",
    topic: "ai-visibility",
    related: ["what-is-an-ai-visibility-audit", "is-geo-replacing-seo", "how-chatgpt-chooses-businesses-to-recommend"],
    published: P,
  },

  // ChatGPT
  {
    slug: "how-to-get-chatgpt-to-recommend-your-business",
    question: "How do I get ChatGPT to recommend my business?",
    description: "Nobody can make ChatGPT recommend you. You can make sure it can read your site, understands exactly what you do and where, and finds others vouching for you.",
    topic: "chatgpt",
    related: ["how-chatgpt-chooses-businesses-to-recommend", "how-long-to-show-up-in-chatgpt", "what-is-gptbot"],
    published: P,
  },
  {
    slug: "how-chatgpt-chooses-businesses-to-recommend",
    question: "How does ChatGPT decide which businesses to recommend?",
    description: "OpenAI doesn't publish how ChatGPT picks businesses. What is known: it works from what it learned in training and from pages its search can reach.",
    topic: "chatgpt",
    related: ["how-to-get-chatgpt-to-recommend-your-business", "how-does-generative-engine-optimization-work", "what-is-gptbot"],
    published: P,
  },
  {
    slug: "how-long-to-show-up-in-chatgpt",
    question: "How long does it take to show up in ChatGPT?",
    description: "Answers that search the web can reflect a change once ChatGPT's crawler has read it. What ChatGPT knows from training only changes with a new model.",
    topic: "chatgpt",
    related: ["how-to-get-chatgpt-to-recommend-your-business", "what-is-gptbot", "how-long-for-a-new-website-to-show-up-on-google"],
    published: P,
  },

  // GEO
  {
    slug: "what-is-generative-engine-optimization",
    question: "What is generative engine optimization (GEO)?",
    description: "GEO is the work of making your business easy for AI answer tools to find, understand and cite. The term comes from a 2023 research paper.",
    topic: "geo",
    related: ["how-does-generative-engine-optimization-work", "is-generative-engine-optimization-real", "is-geo-replacing-seo"],
    published: P,
  },
  {
    slug: "how-does-generative-engine-optimization-work",
    question: "How does generative engine optimization work?",
    description: "AI tools gather sources, then write an answer from them. GEO makes your pages easy to retrieve and easy to quote, so you are among the sources used.",
    topic: "geo",
    related: ["what-is-generative-engine-optimization", "how-chatgpt-chooses-businesses-to-recommend", "where-google-ai-overviews-get-information"],
    published: P,
  },
  {
    slug: "is-generative-engine-optimization-real",
    question: "Is generative engine optimization real?",
    description: "Yes, with caveats. It was measured in a peer-reviewed paper, but results varied by subject, and no one can guarantee what an AI tool will say.",
    topic: "geo",
    related: ["what-is-generative-engine-optimization", "is-geo-replacing-seo", "how-does-generative-engine-optimization-work"],
    published: P,
  },
  {
    slug: "is-geo-replacing-seo",
    question: "Is GEO replacing SEO?",
    description: "No. Google says SEO best practices still apply to its AI features. GEO builds on SEO, and in our audits sites lag much further behind on GEO.",
    topic: "geo",
    related: ["is-generative-engine-optimization-real", "is-seo-worth-it-for-small-business", "how-to-appear-in-google-ai-overviews"],
    published: P,
  },

  // Google AI Overviews
  {
    slug: "how-to-appear-in-google-ai-overviews",
    question: "How do I get my business into Google AI Overviews?",
    description: "Google says there is no special trick: a page must be indexed and eligible for a snippet. Then answer the question clearly enough to be worth linking.",
    topic: "ai-overviews",
    related: ["where-google-ai-overviews-get-information", "are-google-ai-overviews-accurate", "how-to-check-if-your-website-is-indexed"],
    published: P,
  },
  {
    slug: "where-google-ai-overviews-get-information",
    question: "How does Google AI Overview get its information?",
    description: "Google says AI Overviews may run several related searches across subtopics and data sources, then link indexed pages that support the answer.",
    topic: "ai-overviews",
    related: ["how-to-appear-in-google-ai-overviews", "are-google-ai-overviews-accurate", "how-does-generative-engine-optimization-work"],
    published: P,
  },
  {
    slug: "are-google-ai-overviews-accurate",
    question: "Are Google AI Overviews accurate?",
    description: "Not always. Google says AI Overviews \"can and will make mistakes\". If one gets your business wrong, fix the sources it draws on and report it.",
    topic: "ai-overviews",
    related: ["where-google-ai-overviews-get-information", "how-to-appear-in-google-ai-overviews", "why-is-my-business-not-on-google-maps"],
    published: P,
  },

  // SEO audits
  {
    slug: "how-much-does-an-seo-audit-cost",
    question: "How much does an SEO audit cost?",
    description: "In Ahrefs' survey of 439 SEO providers, the most common fee for a one-off project was $2,501 to $5,000. Free automated checks exist too.",
    topic: "seo-audit",
    related: ["what-does-an-seo-audit-include", "how-long-does-an-seo-audit-take", "can-chatgpt-do-an-seo-audit"],
    published: P,
  },
  {
    slug: "how-long-does-an-seo-audit-take",
    question: "How long does an SEO audit take?",
    description: "The automated crawl of a small site takes minutes. Checking what it found and turning it into a fix list is what takes the time.",
    topic: "seo-audit",
    related: ["how-much-does-an-seo-audit-cost", "what-does-an-seo-audit-include", "how-long-for-a-new-website-to-show-up-on-google"],
    published: P,
  },
  {
    slug: "what-does-an-seo-audit-include",
    question: "What does an SEO audit include?",
    description: "Whether Google can reach and index your pages, how each page is labelled, speed and mobile use, links, structured data, and now whether AI tools can read you.",
    topic: "seo-audit",
    related: ["how-much-does-an-seo-audit-cost", "what-is-an-ai-visibility-audit", "why-is-my-website-not-showing-up-on-google"],
    published: P,
  },
  {
    slug: "is-seo-worth-it-for-small-business",
    question: "Is SEO worth it for a small business?",
    description: "Usually, if people search for what you sell where you sell it. It is slow, nobody can guarantee rankings, and the basics are mostly one-off fixes.",
    topic: "seo-audit",
    related: ["how-much-does-an-seo-audit-cost", "is-geo-replacing-seo", "why-is-my-website-not-showing-up-on-google"],
    published: P,
  },

  // ChatGPT and SEO
  {
    slug: "can-chatgpt-do-an-seo-audit",
    question: "Can ChatGPT do an SEO audit?",
    description: "It can review a page you show it and suggest fixes. It can't crawl your whole site, see your Search Console data, or test speed like an audit tool.",
    topic: "chatgpt-seo",
    related: ["what-does-an-seo-audit-include", "how-to-use-chatgpt-for-seo", "how-much-does-an-seo-audit-cost"],
    published: P,
  },
  {
    slug: "is-chatgpt-content-bad-for-seo",
    question: "Is ChatGPT content bad for SEO?",
    description: "Not by itself. Google's warning is about mass-producing pages that add nothing, and about publishing AI text without checking it for mistakes.",
    topic: "chatgpt-seo",
    related: ["how-to-use-chatgpt-for-seo", "can-chatgpt-do-an-seo-audit", "is-seo-worth-it-for-small-business"],
    published: P,
  },
  {
    slug: "how-to-use-chatgpt-for-seo",
    question: "How do I use ChatGPT for SEO?",
    description: "As a fast assistant, not an author: drafting from your own facts, tightening titles, first drafts of structured data. Then check every word.",
    topic: "chatgpt-seo",
    related: ["is-chatgpt-content-bad-for-seo", "can-chatgpt-do-an-seo-audit", "how-to-increase-ai-visibility"],
    published: P,
  },

  // AI crawlers
  {
    slug: "check-if-ai-crawlers-can-access-your-website",
    question: "How do I check if AI crawlers can access my website?",
    description: "Read your robots.txt for the AI crawler names, then check your security or CDN settings, because that is where most blocks we find come from.",
    topic: "ai-crawlers",
    related: ["should-you-block-ai-crawlers", "does-cloudflare-block-ai-crawlers", "what-is-gptbot"],
    published: P,
  },
  {
    slug: "should-you-block-ai-crawlers",
    question: "Should I block AI crawlers?",
    description: "Block the ones that only collect training data if you want to. Blocking the ones that fetch pages for live answers keeps you out of those answers.",
    topic: "ai-crawlers",
    related: ["check-if-ai-crawlers-can-access-your-website", "what-is-gptbot", "does-cloudflare-block-ai-crawlers"],
    published: P,
  },
  {
    slug: "what-is-gptbot",
    question: "What is GPTBot?",
    description: "OpenAI's crawler for collecting training data. It is separate from OAI-SearchBot, the one that decides whether your site can appear in ChatGPT search.",
    topic: "ai-crawlers",
    related: ["should-you-block-ai-crawlers", "how-long-to-show-up-in-chatgpt", "check-if-ai-crawlers-can-access-your-website"],
    published: P,
  },
  {
    slug: "does-cloudflare-block-ai-crawlers",
    question: "Does Cloudflare block AI crawlers?",
    description: "It can, and on some settings it does by default. Check Security Settings in your Cloudflare dashboard to see which kinds of AI bot are allowed.",
    topic: "ai-crawlers",
    related: ["check-if-ai-crawlers-can-access-your-website", "should-you-block-ai-crawlers", "do-ai-crawlers-render-javascript"],
    published: P,
  },
  {
    slug: "do-ai-crawlers-render-javascript",
    question: "Do AI crawlers render JavaScript?",
    description: "The major ones don't, according to Vercel's analysis. Anything your site only shows after JavaScript runs may be invisible to them.",
    topic: "ai-crawlers",
    related: ["check-if-ai-crawlers-can-access-your-website", "does-cloudflare-block-ai-crawlers", "why-is-my-website-not-showing-up-on-google"],
    published: P,
  },

  // Not showing up on Google
  {
    slug: "why-is-my-website-not-showing-up-on-google",
    question: "Why is my website not showing up on Google?",
    description: "Usually one of four things: Google hasn't found it yet, it is told not to index it, it can't reach it, or other pages answer the search better.",
    topic: "not-on-google",
    related: ["how-to-check-if-your-website-is-indexed", "how-long-for-a-new-website-to-show-up-on-google", "why-is-my-business-not-on-google-maps"],
    published: P,
  },
  {
    slug: "how-long-for-a-new-website-to-show-up-on-google",
    question: "How long does it take for a new website to show up on Google?",
    description: "Google says crawling can take anywhere from a few days to a few weeks. Ranking well for competitive searches usually takes far longer.",
    topic: "not-on-google",
    related: ["how-to-check-if-your-website-is-indexed", "why-is-my-website-not-showing-up-on-google", "how-long-to-show-up-in-chatgpt"],
    published: P,
  },
  {
    slug: "how-to-check-if-your-website-is-indexed",
    question: "How do I check if my website is indexed by Google?",
    description: "Use the URL Inspection tool in Google Search Console. A site: search gives a rough idea, but Google says it doesn't show every indexed page.",
    topic: "not-on-google",
    related: ["why-is-my-website-not-showing-up-on-google", "how-long-for-a-new-website-to-show-up-on-google", "how-to-appear-in-google-ai-overviews"],
    published: P,
  },
  {
    slug: "why-is-my-business-not-on-google-maps",
    question: "Why is my business not showing up on Google Maps?",
    description: "Often it is unverified, incomplete, or simply further away than other businesses. Google ranks local results on relevance, distance and prominence.",
    topic: "not-on-google",
    related: ["google-business-profile-without-an-address", "what-is-a-service-area-business", "why-is-my-website-not-showing-up-on-google"],
    published: P,
  },

  // Accessibility
  {
    slug: "do-small-business-websites-need-to-be-ada-compliant",
    question: "Do small business websites have to be ADA compliant?",
    description: "The US Department of Justice says the ADA applies to the websites of businesses open to the public. It has no detailed technical rule for them.",
    topic: "accessibility",
    related: ["how-to-know-if-your-website-is-ada-compliant", "what-is-a-website-accessibility-audit", "what-does-an-seo-audit-include"],
    published: P,
  },
  {
    slug: "how-to-know-if-your-website-is-ada-compliant",
    question: "How do I know if my website is ADA compliant?",
    description: "Test it against WCAG: run an automated scanner, then use the site with only a keyboard and a screen reader. Scanners alone can't tell you.",
    topic: "accessibility",
    related: ["what-is-a-website-accessibility-audit", "do-small-business-websites-need-to-be-ada-compliant", "do-ai-crawlers-render-javascript"],
    published: P,
  },
  {
    slug: "what-is-a-website-accessibility-audit",
    question: "What is a website accessibility audit?",
    description: "A test of whether people with disabilities can use your site, measured against WCAG, with automated scans plus checks only a person can do.",
    topic: "accessibility",
    related: ["how-to-know-if-your-website-is-ada-compliant", "do-small-business-websites-need-to-be-ada-compliant", "what-is-an-ai-visibility-audit"],
    published: P,
  },

  // Google Business Profile without an office
  {
    slug: "google-business-profile-without-an-address",
    question: "Can I have a Google Business Profile without an address?",
    description: "Yes, if you travel to your customers. Google calls that a service-area business and tells you to hide your address. A virtual office doesn't qualify.",
    topic: "local",
    related: ["what-is-a-service-area-business", "home-address-on-google-business-profile", "why-is-my-business-not-on-google-maps"],
    published: P,
  },
  {
    slug: "what-is-a-service-area-business",
    question: "What is a service-area business on Google?",
    description: "Google's term for a business that visits or delivers to customers but doesn't serve them at its own address. A plumber, for example.",
    topic: "local",
    related: ["google-business-profile-without-an-address", "home-address-on-google-business-profile", "why-is-my-business-not-on-google-maps"],
    published: P,
  },
  {
    slug: "home-address-on-google-business-profile",
    question: "Should I use my home address for my Google Business Profile?",
    description: "Only if customers come to you there. If they don't, Google says to remove the address from your profile and list your service area instead.",
    topic: "local",
    related: ["google-business-profile-without-an-address", "what-is-a-service-area-business", "why-is-my-business-not-on-google-maps"],
    published: P,
  },
];

export const answerBySlug = (slug: string) => ANSWERS.find((a) => a.slug === slug);
export const topicByKey = (key: TopicKey) => TOPICS.find((t) => t.key === key)!;
