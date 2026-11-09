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
  | "local"
  | "technical"
  | "on-page"
  | "local-seo"
  | "seo-basics";

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
  { key: "technical", title: "Technical SEO basics", search: "what is a sitemap for a website" },
  { key: "on-page", title: "Titles, content and links", search: "what is a meta description in seo" },
  { key: "local-seo", title: "Google Maps and reviews", search: "how to rank higher on google maps" },
  { key: "seo-basics", title: "How SEO works", search: "how long does seo take to see results" },
];

export type Answer = {
  slug: string;
  question: string;
  /** Meta description: the answer itself, under ~155 characters. Also the
   *  line shown under the question on /answers. */
  description: string;
  /** Search-result title when the question plus brand would be cut off.
   *  Phrased the way people search ("How to…"), so it adds a second wording
   *  rather than repeating the H1. Keep under 60 characters. */
  seoTitle?: string;
  /** Search-result description when `description` runs past 155 characters;
   *  the /answers list keeps the full line. */
  metaDescription?: string;
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
/** Second batch, also from Google autocomplete, checked 2026-11-10. */
const N = "2026-11-10";

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
    seoTitle: "How to Increase Your Website's AI Visibility",
    metaDescription: "Let AI crawlers in, answer real customer questions in plain sentences, keep your details consistent, and give other sites reasons to mention you.",
    question: "How do I increase my website's AI visibility?",
    description: "Let AI crawlers in, answer real customer questions in plain sentences, keep your details consistent everywhere, and give other sites reasons to mention you.",
    topic: "ai-visibility",
    related: ["how-to-get-chatgpt-to-recommend-your-business", "how-to-appear-in-google-ai-overviews", "should-you-block-ai-crawlers"],
    published: P,
  },
  {
    slug: "why-ai-visibility-matters-for-small-business",
    seoTitle: "Why AI Visibility Matters for a Small Business",
    question: "Why is AI visibility important for a small business?",
    description: "AI answers name a handful of businesses instead of listing ten. If an AI tool can't read or trust your site, you aren't in the running for that answer.",
    topic: "ai-visibility",
    related: ["what-is-an-ai-visibility-audit", "is-geo-replacing-seo", "how-chatgpt-chooses-businesses-to-recommend"],
    published: P,
  },

  // ChatGPT
  {
    slug: "how-to-get-chatgpt-to-recommend-your-business",
    seoTitle: "How to Get ChatGPT to Recommend Your Business",
    metaDescription: "Nobody can make ChatGPT recommend you. You can make sure it can read your site, knows what you do and where, and sees others vouch for you.",
    question: "How do I get ChatGPT to recommend my business?",
    description: "Nobody can make ChatGPT recommend you. You can make sure it can read your site, understands exactly what you do and where, and finds others vouching for you.",
    topic: "chatgpt",
    related: ["how-chatgpt-chooses-businesses-to-recommend", "how-long-to-show-up-in-chatgpt", "what-is-gptbot"],
    published: P,
  },
  {
    slug: "how-chatgpt-chooses-businesses-to-recommend",
    seoTitle: "How ChatGPT Decides Which Businesses to Recommend",
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
    seoTitle: "What Is GEO (Generative Engine Optimization)?",
    question: "What is generative engine optimization (GEO)?",
    description: "GEO is the work of making your business easy for AI answer tools to find, understand and cite. The term comes from a 2023 research paper.",
    topic: "geo",
    related: ["how-does-generative-engine-optimization-work", "is-generative-engine-optimization-real", "is-geo-replacing-seo"],
    published: P,
  },
  {
    slug: "how-does-generative-engine-optimization-work",
    seoTitle: "How Generative Engine Optimization Works",
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
  {
    slug: "seo-vs-geo-vs-aeo",
    seoTitle: "SEO vs GEO vs AEO: What's the Difference?",
    question: "What is the difference between SEO, GEO and AEO?",
    description: "SEO gets pages found and ranked. GEO gets a business named in AI answers. AEO shapes a page so an answer can be lifted from it.",
    topic: "geo",
    related: ["is-geo-replacing-seo", "what-is-generative-engine-optimization", "how-to-appear-in-google-ai-overviews"],
    published: "2026-10-19",
  },

  // Google AI Overviews
  {
    slug: "how-to-appear-in-google-ai-overviews",
    seoTitle: "How to Get Your Business Into Google AI Overviews",
    question: "How do I get my business into Google AI Overviews?",
    description: "Google says there is no special trick: a page must be indexed and eligible for a snippet. Then answer the question clearly enough to be worth linking.",
    topic: "ai-overviews",
    related: ["where-google-ai-overviews-get-information", "are-google-ai-overviews-accurate", "how-to-check-if-your-website-is-indexed"],
    published: P,
  },
  {
    slug: "where-google-ai-overviews-get-information",
    seoTitle: "Where Google AI Overviews Get Their Information",
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
    metaDescription: "Whether Google can index your pages, how each page is labelled, speed and mobile use, links, structured data, and whether AI tools can read you.",
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
    seoTitle: "How to Check If AI Crawlers Can Access Your Site",
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
    seoTitle: "How Long a New Website Takes to Show Up on Google",
    question: "How long does it take for a new website to show up on Google?",
    description: "Google says crawling can take anywhere from a few days to a few weeks. Ranking well for competitive searches usually takes far longer.",
    topic: "not-on-google",
    related: ["how-to-check-if-your-website-is-indexed", "why-is-my-website-not-showing-up-on-google", "how-long-to-show-up-in-chatgpt"],
    published: P,
  },
  {
    slug: "how-to-check-if-your-website-is-indexed",
    seoTitle: "How to Check If Your Website Is Indexed by Google",
    question: "How do I check if my website is indexed by Google?",
    description: "Use the URL Inspection tool in Google Search Console. A site: search gives a rough idea, but Google says it doesn't show every indexed page.",
    topic: "not-on-google",
    related: ["why-is-my-website-not-showing-up-on-google", "how-long-for-a-new-website-to-show-up-on-google", "how-to-appear-in-google-ai-overviews"],
    published: P,
  },
  {
    slug: "why-is-my-business-not-on-google-maps",
    seoTitle: "Why Your Business Isn't Showing on Google Maps",
    question: "Why is my business not showing up on Google Maps?",
    description: "Often it is unverified, incomplete, or simply further away than other businesses. Google ranks local results on relevance, distance and prominence.",
    topic: "not-on-google",
    related: ["google-business-profile-without-an-address", "what-is-a-service-area-business", "why-is-my-website-not-showing-up-on-google"],
    published: P,
  },

  // Accessibility
  {
    slug: "do-small-business-websites-need-to-be-ada-compliant",
    seoTitle: "Do Small Business Websites Need ADA Compliance?",
    // Answer first. Search Console: position 2.6 and no clicks from five
    // impressions with the old snippet, which never said yes or no.
    metaDescription: "Usually, yes. The US Justice Department says the ADA covers websites of businesses open to the public, but sets no technical rule for them.",
    question: "Do small business websites have to be ADA compliant?",
    description: "The US Department of Justice says the ADA applies to the websites of businesses open to the public. It has no detailed technical rule for them.",
    topic: "accessibility",
    related: ["how-to-know-if-your-website-is-ada-compliant", "what-is-a-website-accessibility-audit", "what-does-an-seo-audit-include"],
    published: P,
  },
  {
    slug: "how-to-know-if-your-website-is-ada-compliant",
    seoTitle: "How to Tell If Your Website Is ADA Compliant",
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
    seoTitle: "Google Business Profile With No Address: The Rules",
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
    seoTitle: "Home Address on Google Business Profile: Show or Hide?",
    question: "Should I use my home address for my Google Business Profile?",
    description: "Only if customers come to you there. If they don't, Google says to remove the address from your profile and list your service area instead.",
    topic: "local",
    related: ["google-business-profile-without-an-address", "what-is-a-service-area-business", "why-is-my-business-not-on-google-maps"],
    published: P,
  },
  // Batch 2 (10 Nov 2026): technical SEO, page basics, local, how SEO works.
  {
    slug: "what-is-a-sitemap",
    question: "What is a sitemap?",
    description: "A file that lists the pages on your website you want search engines to find, with the date each one last changed. It helps Google find pages, not rank them.",
    topic: "technical",
    related: ["how-to-submit-a-sitemap-to-google", "what-is-robots-txt", "how-to-check-if-your-website-is-indexed"],
    published: N,
  },
  {
    slug: "how-to-submit-a-sitemap-to-google",
    seoTitle: "How to Submit a Sitemap to Google (Search Console)",
    question: "How do I submit a sitemap to Google?",
    description: "Add your site to Google Search Console, open Sitemaps, paste your sitemap address and press Submit. Also list it in your robots.txt file.",
    topic: "technical",
    related: ["what-is-a-sitemap", "what-is-google-search-console", "how-to-check-if-your-website-is-indexed"],
    published: N,
  },
  {
    slug: "what-is-robots-txt",
    question: "What is robots.txt?",
    description: "A text file at your site's root that tells search and AI crawlers what they may crawl. It controls crawling, not whether a page shows in Google.",
    topic: "technical",
    related: ["should-you-block-ai-crawlers", "check-if-ai-crawlers-can-access-your-website", "what-is-a-sitemap"],
    published: N,
  },
  {
    slug: "what-is-schema-markup",
    question: "What is schema markup?",
    description: "Code that labels the facts on a page, like your business name, address, hours or prices, so search engines read them without guessing. It can earn rich results.",
    topic: "technical",
    related: ["what-is-a-title-tag", "how-to-appear-in-google-ai-overviews", "what-is-local-seo"],
    published: N,
  },
  {
    slug: "what-are-core-web-vitals",
    question: "What are Core Web Vitals?",
    description: "Three Google measures of how a page feels to use: how fast the main content loads (LCP), how fast it reacts (INP) and how much it jumps around (CLS).",
    topic: "technical",
    related: ["does-page-speed-affect-seo", "what-is-mobile-first-indexing", "what-does-an-seo-audit-include"],
    published: N,
  },
  {
    slug: "does-page-speed-affect-seo",
    question: "Does page speed affect SEO?",
    description: "Yes, but less than most think. Speed is part of Google's page experience signals; relevance still decides most rankings. Slow pages mostly lose visitors.",
    topic: "technical",
    related: ["what-are-core-web-vitals", "is-wordpress-good-for-seo", "why-is-my-website-not-showing-up-on-google"],
    published: N,
  },
  {
    slug: "what-is-a-canonical-tag",
    question: "What is a canonical tag?",
    description: "A line of code that tells Google which address is the main version of a page when the same content sits at several addresses. Google treats it as a hint.",
    topic: "technical",
    related: ["what-is-duplicate-content", "how-to-check-if-your-website-is-indexed", "what-is-a-sitemap"],
    published: N,
  },
  {
    slug: "what-is-mobile-first-indexing",
    question: "What is mobile-first indexing?",
    description: "Google reads and ranks the phone version of your website, not the desktop one. Anything missing from your phone pages is, for Google, missing from your site.",
    topic: "technical",
    related: ["does-page-speed-affect-seo", "what-are-core-web-vitals", "why-is-my-website-not-showing-up-on-google"],
    published: N,
  },
  {
    slug: "do-404-errors-hurt-seo",
    question: "Do 404 errors hurt SEO?",
    description: "Not your whole site. Google treats 404s as normal. What hurts is a broken link to a page that should exist, or a moved page with no redirect.",
    topic: "technical",
    related: ["what-is-internal-linking", "what-does-an-seo-audit-include", "why-is-my-website-not-showing-up-on-google"],
    published: N,
  },
  {
    slug: "what-is-a-title-tag",
    question: "What is a title tag?",
    description: "The HTML title of a page. Google usually shows it as the blue link in search results, so it is the main thing people read before they click.",
    topic: "on-page",
    related: ["what-is-a-meta-description", "what-is-internal-linking", "what-does-an-seo-audit-include"],
    published: N,
  },
  {
    slug: "what-is-a-meta-description",
    question: "What is a meta description?",
    description: "A short summary of a page in its code that Google may show under the title in results. It does not change rankings, but a good one earns more clicks.",
    topic: "on-page",
    related: ["what-is-a-title-tag", "what-is-duplicate-content", "is-seo-worth-it-for-small-business"],
    published: N,
  },
  {
    slug: "what-is-duplicate-content",
    question: "What is duplicate content in SEO?",
    description: "The same or nearly the same text at more than one web address. Google does not penalise it, but it shows only one version and you do not choose which.",
    topic: "on-page",
    related: ["what-is-a-canonical-tag", "how-many-pages-should-a-website-have", "is-chatgpt-content-bad-for-seo"],
    published: N,
  },
  {
    slug: "what-is-internal-linking",
    question: "What is internal linking in SEO?",
    description: "Links from one page of your website to another. They help Google find your pages, understand what each is about, and see which pages matter most.",
    topic: "on-page",
    related: ["what-is-a-title-tag", "do-404-errors-hurt-seo", "how-many-pages-should-a-website-have"],
    published: N,
  },
  {
    slug: "does-alt-text-help-seo",
    question: "Does alt text help SEO?",
    description: "Yes. Google reads alt text to understand images, which helps them show in image search. It also lets screen readers describe them.",
    topic: "on-page",
    related: ["what-is-a-title-tag", "what-does-an-seo-audit-include", "do-small-business-websites-need-to-be-ada-compliant"],
    published: N,
  },
  {
    slug: "do-you-need-a-blog-for-seo",
    question: "Do you need a blog for SEO?",
    description: "No. You need pages that answer what customers search for. For most small businesses that means strong service pages first, articles second.",
    topic: "on-page",
    related: ["how-many-pages-should-a-website-have", "how-to-do-keyword-research-for-free", "is-seo-worth-it-for-small-business"],
    published: N,
  },
  {
    slug: "how-many-pages-should-a-website-have",
    question: "How many pages should a website have for SEO?",
    description: "There is no target number. Have one useful page for each service, place and question people search for. More thin pages do not help and can hurt.",
    topic: "on-page",
    related: ["do-you-need-a-blog-for-seo", "what-is-duplicate-content", "what-is-internal-linking"],
    published: N,
  },
  {
    slug: "what-is-eeat",
    question: "What is E-E-A-T in SEO?",
    description: "Experience, Expertise, Authoritativeness and Trust: what Google's raters look for in content. Trust matters most. It is a guide, not a score.",
    topic: "on-page",
    related: ["do-you-need-a-blog-for-seo", "is-chatgpt-content-bad-for-seo", "how-to-get-more-google-reviews"],
    published: N,
  },
  {
    slug: "how-to-do-keyword-research-for-free",
    question: "How do I do keyword research for free?",
    description: "Use Google itself: autocomplete, People Also Ask and related searches. Search Console shows what already brings visits; Keyword Planner adds volumes.",
    topic: "on-page",
    related: ["what-is-google-search-console", "do-you-need-a-blog-for-seo", "how-many-pages-should-a-website-have"],
    published: N,
  },
  {
    slug: "what-is-local-seo",
    question: "What is local SEO?",
    description: "Getting a business found in local searches and on Google Maps, like 'plumber near me'. It runs on your Business Profile, reviews and website together.",
    topic: "local-seo",
    related: ["how-to-rank-higher-on-google-maps", "how-to-get-more-google-reviews", "why-is-my-business-not-on-google-maps"],
    published: N,
  },
  {
    slug: "how-to-rank-higher-on-google-maps",
    seoTitle: "How to Rank Higher on Google Maps",
    question: "How do I rank higher on Google Maps?",
    description: "Complete your Google Business Profile, choose the right main category, earn steady genuine reviews, and make your website match the services you list.",
    topic: "local-seo",
    related: ["what-is-local-seo", "how-to-get-more-google-reviews", "why-is-my-business-not-on-google-maps"],
    published: N,
  },
  {
    slug: "how-to-get-more-google-reviews",
    seoTitle: "How to Get More Google Reviews (Without Breaking Rules)",
    question: "How do I get more Google reviews?",
    description: "Ask every customer, at the right moment, with a direct review link from your Google Business Profile. Never pay for reviews or only ask the happy ones.",
    topic: "local-seo",
    related: ["how-to-rank-higher-on-google-maps", "what-is-local-seo", "what-is-eeat"],
    published: N,
  },
  {
    slug: "how-long-does-seo-take",
    seoTitle: "How Long Does SEO Take to Show Results?",
    question: "How long does SEO take to work?",
    description: "Usually four months to a year before the changes show clear results, according to Google. Fixing a technical block can show sooner. New sites take longer.",
    topic: "seo-basics",
    related: ["is-seo-worth-it-for-small-business", "how-long-for-a-new-website-to-show-up-on-google", "do-backlinks-still-matter"],
    published: N,
  },
  {
    slug: "do-backlinks-still-matter",
    question: "Do backlinks still matter for SEO?",
    description: "Yes, but quality beats quantity. Links from real, relevant sites still help Google find and trust you. Bought or swapped links break Google's rules.",
    topic: "seo-basics",
    related: ["what-is-internal-linking", "what-is-eeat", "how-long-does-seo-take"],
    published: N,
  },
  {
    slug: "does-social-media-help-seo",
    question: "Does social media help SEO?",
    description: "Not directly. Likes and shares are not a Google ranking factor. Social media helps by getting your business seen, searched for by name and mentioned elsewhere.",
    topic: "seo-basics",
    related: ["do-backlinks-still-matter", "how-to-increase-ai-visibility", "what-is-local-seo"],
    published: N,
  },
  {
    slug: "is-wordpress-good-for-seo",
    question: "Is WordPress good for SEO?",
    description: "Yes. Google does not prefer any website builder. WordPress ranks well when fast, well built and updated; heavy themes and plugins hold it back.",
    topic: "seo-basics",
    related: ["does-page-speed-affect-seo", "what-are-core-web-vitals", "what-is-schema-markup"],
    published: N,
  },
  {
    slug: "what-is-google-search-console",
    question: "What is Google Search Console?",
    description: "A free Google tool that shows which searches your site appears for, how many clicks you get, which pages are indexed, and any problems Google finds.",
    topic: "seo-basics",
    related: ["how-to-submit-a-sitemap-to-google", "how-to-check-if-your-website-is-indexed", "how-to-do-keyword-research-for-free"],
    published: N,
  },
];

export const answerBySlug = (slug: string) => ANSWERS.find((a) => a.slug === slug);
export const topicByKey = (key: TopicKey) => TOPICS.find((t) => t.key === key)!;
