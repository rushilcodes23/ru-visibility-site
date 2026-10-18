import { Badge } from "@/components/ui/badge";
import { AuditCta } from "@/components/ui/audit-cta";
import { compactCount } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

export const metadata = pageMetadata({
  path: "/glossary",
  title: "SEO, GEO and AEO Glossary | Ru Visibility",
  description: "Plain definitions of SEO, GEO and AEO terms, from AI crawlers to canonical tags, with figures from our audit of 1.5k+ business websites.",
});

// Why this page exists: one place that defines every term the answers and
// posts use, and links each to the page that explains it properly. What makes
// it more than a list a prompt could write is the "In our audits" line under
// most terms, read from research-findings.json like every other figure on the
// site (CONTENT_RULES.md). Definitions agree with the answer pages they link
// to; when one of those changes, check the matching term here.
const SITE = "https://ruvisibility.com";
const AUDITED = compactCount(findings.corpus.uniqueDomains);
const { scores, universal: u, aiCrawlerAccess: access } = findings;
const blocked = (crawler: string) =>
  findings.crawlerBlocks.find((c) => c.crawler === crawler)?.combinedPct;

type Term = {
  id: string;
  term: string;
  /** Plain text: it is also the schema.org description. */
  definition: string;
  /** What our own audits measured, where they measured it. */
  measured?: string;
  link?: { href: string; label: string };
};

const GROUPS: { title: string; terms: Term[] }[] = [
  {
    title: "AI search",
    terms: [
      {
        id: "geo",
        term: "GEO (generative engine optimization)",
        definition: "Work that makes a business more likely to be named in answers written by AI tools such as ChatGPT, Gemini, Perplexity and Google's AI Overviews. It builds on SEO rather than replacing it.",
        measured: `Across ${AUDITED} business websites, the average AI visibility score was ${scores.geo.mean}/100, against ${scores.seo.mean}/100 for SEO.`,
        link: { href: "/answers/what-is-generative-engine-optimization", label: "What is generative engine optimization?" },
      },
      {
        id: "aeo",
        term: "AEO (answer engine optimization)",
        definition: "Shaping a page so a direct answer can be lifted from it: the answer comes first, headings are phrased as the questions people ask, and each section makes sense on its own.",
        measured: `${u.anyFaqBlock.sitesPct}% of the sites we checked had a questions-and-answers section on any page we read.`,
        link: { href: "/answers/seo-vs-geo-vs-aeo", label: "SEO vs GEO vs AEO" },
      },
      {
        id: "llmo",
        term: "LLMO and AI SEO",
        definition: "Other names for GEO and AEO. LLM optimization and AI SEO describe the same work under a newer label, not a separate service.",
        link: { href: "/answers/seo-vs-geo-vs-aeo", label: "SEO vs GEO vs AEO" },
      },
      {
        id: "ai-overview",
        term: "AI Overview",
        definition: "The AI-written summary Google shows above the normal results for some searches, with links to pages that support it. A page has to be indexed and allowed a snippet to be one of those links.",
        link: { href: "/answers/where-google-ai-overviews-get-information", label: "Where do Google AI Overviews get their information?" },
      },
      {
        id: "query-fan-out",
        term: "Query fan-out",
        definition: "How Google says its AI Overviews and AI Mode may answer: by issuing several related searches across subtopics and combining what they find. A page can be cited for one sub-question it answers well.",
        link: { href: "/answers/how-to-appear-in-google-ai-overviews", label: "How do I appear in Google AI Overviews?" },
      },
      {
        id: "ai-visibility-audit",
        term: "AI visibility audit",
        definition: "A check of whether ChatGPT, Gemini, Perplexity and Google's AI answers can reach a website, understand it, and have reason to mention the business.",
        link: { href: "/answers/what-is-an-ai-visibility-audit", label: "What is an AI visibility audit?" },
      },
    ],
  },
  {
    title: "AI crawlers",
    terms: [
      {
        id: "ai-crawler",
        term: "AI crawler",
        definition: "A program that fetches web pages for an AI company: to train its models, to build a search index, or to read a page a user asked about. Each one announces itself by name.",
        measured: `${access.disallowedInRobots.sitesPct}% of the sites we checked shut out an AI crawler in robots.txt.`,
        link: { href: "/answers/check-if-ai-crawlers-can-access-your-website", label: "How to check if AI crawlers can access your website" },
      },
      {
        id: "gptbot",
        term: "GPTBot",
        definition: "OpenAI's crawler for collecting training data. It is separate from OAI-SearchBot, the crawler that decides whether a site can appear in ChatGPT search.",
        measured: `${blocked("GPTBot")}% of the sites we checked refused GPTBot.`,
        link: { href: "/answers/what-is-gptbot", label: "What is GPTBot?" },
      },
      {
        id: "oai-searchbot",
        term: "OAI-SearchBot",
        definition: "OpenAI's crawler that finds pages to show in ChatGPT search. Blocking it keeps a site out of those answers; blocking GPTBot does not.",
        measured: `${blocked("OAI-SearchBot")}% of the sites we checked refused OAI-SearchBot.`,
        link: { href: "/answers/what-is-gptbot", label: "What is GPTBot?" },
      },
      {
        id: "claudebot",
        term: "ClaudeBot, Claude-SearchBot and Claude-User",
        definition: "Anthropic's three crawlers. ClaudeBot collects content that may be used for training, Claude-SearchBot indexes pages for Claude's search results, and Claude-User fetches a page when a user asks Claude a question.",
        measured: `${blocked("ClaudeBot")}% of the sites we checked refused ClaudeBot, and ${blocked("Claude-SearchBot")}% refused Claude-SearchBot.`,
        link: { href: "/answers/should-you-block-ai-crawlers", label: "Should you block AI crawlers?" },
      },
      {
        id: "perplexitybot",
        term: "PerplexityBot",
        definition: "Perplexity's crawler that finds and links pages in Perplexity search; Perplexity says it is not used for training. Perplexity-User visits a page to answer a user's question.",
        measured: `${blocked("PerplexityBot")}% of the sites we checked refused PerplexityBot.`,
        link: { href: "/answers/check-if-ai-crawlers-can-access-your-website", label: "How to check if AI crawlers can access your website" },
      },
      {
        id: "google-extended",
        term: "Google-Extended",
        definition: "A robots.txt setting, not a separate crawler. It controls whether Google may use a site for training and grounding Gemini, and Google says it does not affect a site's inclusion in Google Search.",
        link: { href: "/answers/should-you-block-ai-crawlers", label: "Should you block AI crawlers?" },
      },
      {
        id: "blocked-by-name",
        term: "Blocked by name",
        definition: "A server or firewall refusing a request because of the crawler name it carries, while serving the same request under another name. robots.txt can say yes while the server says no.",
        measured: `${access.blockedByNameAtServer.sitesPct}% of the ${access.blockedByNameAtServer.denominator} sites we could test refused an AI crawler this way, against ${access.disallowedInRobots.sitesPct}% that shut one out in robots.txt.`,
        link: { href: "/blog/robots-txt-says-yes-server-says-no", label: "Your robots.txt says yes, but your server says no" },
      },
    ],
  },
  {
    title: "Technical SEO",
    terms: [
      {
        id: "robots-txt",
        term: "robots.txt",
        definition: "A plain text file at yourdomain.com/robots.txt that tells crawlers which parts of a site they may visit. Well-behaved crawlers follow it; it is a request, not a lock.",
        measured: `${u.sitemapInRobots.sitesPct}% of the sites we checked used it to point crawlers to their sitemap.`,
        link: { href: "/answers/check-if-ai-crawlers-can-access-your-website", label: "How to check if AI crawlers can access your website" },
      },
      {
        id: "xml-sitemap",
        term: "XML sitemap",
        definition: "A file listing the pages a site wants search engines to find, with the dates they last changed. It helps them find pages; it does not make Google index them.",
        measured: `${u.sitemapFound.sitesPct}% of the sites we checked had one we could find, and ${u.sitemapFoundNotDeclared.sitesPct}% had one their robots.txt never mentioned.`,
        link: { href: "/answers/how-to-check-if-your-website-is-indexed", label: "How to check if your website is indexed" },
      },
      {
        id: "noindex",
        term: "noindex",
        definition: "A rule in a page's code or headers telling search engines to leave the page out of their results. A noindexed page can't appear in Google, or in Google's AI Overviews.",
        measured: `${u.anyNoindex.sitesPct}% of the sites we checked had at least one noindexed page, sometimes on purpose, often not.`,
        link: { href: "/answers/why-is-my-website-not-showing-up-on-google", label: "Why is my website not showing up on Google?" },
      },
      {
        id: "canonical-tag",
        term: "Canonical tag",
        definition: "A tag naming the preferred address of a page when the same content can load at several addresses, so search engines know which one to show.",
        measured: `${u.missingCanonicalSomewhere.sitesPct}% of the sites we checked had a page with no canonical tag.`,
        link: { href: "/blog/seo-mistakes-from-1500-audits", label: "SEO mistakes from 1.5k+ audits" },
      },
      {
        id: "meta-description",
        term: "Meta description",
        definition: "The short summary written for a page, often shown under its link in search results. Google writes its own when the summary doesn't match what was searched.",
        measured: `${u.missingMetaSomewhere.sitesPct}% of the sites we checked had a page with none.`,
        link: { href: "/blog/seo-mistakes-from-1500-audits", label: "SEO mistakes from 1.5k+ audits" },
      },
      {
        id: "h1",
        term: "H1 (main heading)",
        definition: "The main heading of a page. Google is fine with more than one; what matters is that the main heading says what the page is about.",
        measured: `${u.missingH1Somewhere.sitesPct}% of the sites we checked had a page with no H1 at all.`,
        link: { href: "/blog/seo-mistakes-from-1500-audits", label: "SEO mistakes from 1.5k+ audits" },
      },
      {
        id: "nosnippet",
        term: "nosnippet and max-snippet",
        definition: "Rules that stop or limit how much of a page Google may quote. Google's documentation says they also limit using the page as input for AI Overviews and AI Mode.",
        link: { href: "/answers/how-to-appear-in-google-ai-overviews", label: "How do I appear in Google AI Overviews?" },
      },
      {
        id: "javascript-rendering",
        term: "JavaScript rendering",
        definition: "Building a page's content in the browser with JavaScript instead of sending it ready-made from the server. Many AI crawlers read only the HTML they are sent.",
        measured: `${u.jsDependent.sitesPct}% of the sites we checked depended on it for their main content.`,
        link: { href: "/answers/do-ai-crawlers-render-javascript", label: "Do AI crawlers render JavaScript?" },
      },
      {
        id: "structured-data",
        term: "Structured data (schema markup)",
        definition: "Code, usually JSON-LD, that states facts about a page in the shared schema.org vocabulary: who the business is, what a page offers, who wrote it.",
        measured: `${u.anySchema.sitesPct}% of the sites we checked had some.`,
        link: { href: "/answers/how-to-increase-ai-visibility", label: "How to increase your website's AI visibility" },
      },
      {
        id: "sameas",
        term: "sameAs",
        definition: "A structured-data field listing a business's other official profiles, so a machine can confirm the website and those profiles describe the same business.",
        measured: `${u.noSameAs.sitesPct}% of the sites we checked had none.`,
        link: { href: "/answers/how-to-increase-ai-visibility", label: "How to increase your website's AI visibility" },
      },
      {
        id: "llms-txt",
        term: "llms.txt",
        definition: "A proposed text file listing a site's key pages for AI tools. Google says its AI features need no new machine-readable or AI text files, so we don't count a missing one as a problem.",
        link: { href: "/answers/is-geo-replacing-seo", label: "Is GEO replacing SEO?" },
      },
    ],
  },
  {
    title: "Content and trust",
    terms: [
      {
        id: "e-e-a-t",
        term: "E-E-A-T",
        definition: "Experience, expertise, authoritativeness and trust: the qualities Google asks its quality raters to look for in a page and in the people and business behind it.",
      },
      {
        id: "scaled-content-abuse",
        term: "Scaled content abuse",
        definition: "Google's spam policy against producing many pages mainly to rank, with little value for readers, whether people or AI tools wrote them. It is judged page by page, not by the tool used.",
        link: { href: "/answers/is-chatgpt-content-bad-for-seo", label: "Is ChatGPT content bad for SEO?" },
      },
      {
        id: "entity",
        term: "Entity",
        definition: "A business, person or place that a search engine or AI tool recognises as one specific thing, because its name and details match across its website, profiles and listings.",
        link: { href: "/answers/how-chatgpt-chooses-businesses-to-recommend", label: "How does ChatGPT decide which businesses to recommend?" },
      },
      {
        id: "brand-mention",
        term: "Brand mention",
        definition: "Another site naming a business, with or without a link. Search engines and AI tools can read it as evidence that the business exists and that people talk about it.",
        measured: `${u.noPressSection.sitesPct}% of the sites we checked showed no press or "as seen in" mentions on the pages we read.`,
        link: { href: "/answers/how-chatgpt-chooses-businesses-to-recommend", label: "How does ChatGPT decide which businesses to recommend?" },
      },
    ],
  },
  {
    title: "Accessibility and local",
    terms: [
      {
        id: "wcag",
        term: "WCAG",
        definition: "The Web Content Accessibility Guidelines, the W3C standard an accessibility audit measures a website against.",
        link: { href: "/answers/what-is-a-website-accessibility-audit", label: "What is a website accessibility audit?" },
      },
      {
        id: "ada",
        term: "ADA (for websites)",
        definition: "The Americans with Disabilities Act. The US Justice Department says it covers the websites of businesses open to the public, without setting a detailed technical rule for them. General information, not legal advice.",
        link: { href: "/answers/do-small-business-websites-need-to-be-ada-compliant", label: "Do small business websites need to be ADA compliant?" },
      },
      {
        id: "service-area-business",
        term: "Service-area business",
        definition: "A business that serves customers where they are rather than at a shop or office. On Google Business Profile it can hide its address and list the areas it serves instead.",
        link: { href: "/answers/what-is-a-service-area-business", label: "What is a service-area business?" },
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.terms);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${SITE}/glossary#terms`,
  name: "SEO, GEO and AEO glossary",
  url: `${SITE}/glossary`,
  hasDefinedTerm: ALL.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    url: `${SITE}/glossary#${t.id}`,
    inDefinedTermSet: `${SITE}/glossary#terms`,
  })),
};

export default function GlossaryPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-12">
          <Badge>Glossary</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            SEO, GEO and AEO terms, in plain words
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Every term the answers and posts on this site use, defined in a
            sentence or two, with a link to the page that explains it. Where we
            measured something, the figure comes from our own audit of{" "}
            {AUDITED} business websites.
          </p>
          <nav aria-label="Glossary sections" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {GROUPS.map((g) => (
              <a key={g.title} href={`#${slugify(g.title)}`} className="underline underline-offset-4">
                {g.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-16 max-w-3xl">
          {GROUPS.map((g) => (
            <section key={g.title} aria-labelledby={slugify(g.title)}>
              <h2 id={slugify(g.title)} className="text-2xl tracking-tight mb-6 md:text-3xl scroll-mt-24">
                {g.title}
              </h2>
              <div className="flex flex-col gap-8">
                {g.terms.map((t) => (
                  <div key={t.id} id={t.id} className="scroll-mt-24">
                    <h3 className="text-lg font-medium tracking-tight mb-2">{t.term}</h3>
                    <p className="text-muted-foreground leading-relaxed">{t.definition}</p>
                    {t.measured && (
                      <p className="text-sm leading-relaxed mt-2">
                        <span className="font-medium">In our audits:</span>{" "}
                        <span className="text-muted-foreground">{t.measured}</span>
                      </p>
                    )}
                    {t.link && (
                      <a href={t.link.href} className="text-sm underline underline-offset-4 mt-2 inline-block">
                        {t.link.label} →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <AuditCta />
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
