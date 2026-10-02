import { AuditCta } from "@/components/ui/audit-cta";
import { pageMetadata } from "@/lib/seo";
import { formatPostDate } from "@/lib/posts";
import { answerBySlug, topicByKey, type Answer } from "@/lib/answers";
import findings from "@/lib/research-findings.json";

const SITE = "https://ruvisibility.com";

function get(slug: string): Answer {
  const a = answerBySlug(slug);
  if (!a) throw new Error(`No answer registered for "${slug}" in src/lib/answers.ts`);
  return a;
}

/** Metadata for an answer page. The brand suffix is dropped when the question
 *  alone would already be cut off in a search result. */
export function answerMetadata(slug: string) {
  const a = get(slug);
  return pageMetadata({
    path: `/answers/${slug}`,
    title: a.question.length > 52 ? a.question : `${a.question} | Ru Visibility`,
    description: a.description,
    type: "article",
  });
}

// Figures quoted on these pages come straight from the same file as /research,
// so an answer can never disagree with the research page it links to.
const { corpus, crawlerBlocks, universal, scores } = findings;
export const AUDITED = corpus.uniqueDomains.toLocaleString("en-US");
export const blockedPct = (crawler: string) =>
  crawlerBlocks.find((c) => c.crawler === crawler)?.combinedPct;
export const robotsPct = (crawler: string) =>
  crawlerBlocks.find((c) => c.crawler === crawler)?.robotsDisallowPct;
export { universal, scores };

/** The one-line description of the audited sites, used wherever a page quotes
 *  them — the sample is not the whole web, and every page says so. */
export function OurAudits() {
  return (
    <>
      the {AUDITED} small-business websites we audited between August and
      September 2026 (mostly dental clinics in the US, France and the UAE;{" "}
      <a href="/research">how we measured</a>)
    </>
  );
}

/** A figure from our own audits, set apart so it reads as evidence. */
export function FromOurAudits({ children }: { children: React.ReactNode }) {
  return (
    <aside className="article-fix">
      <b>From our audits</b>
      {children}
    </aside>
  );
}

/** A robots.txt or terminal snippet. Focusable because it scrolls sideways on
 *  a phone, and a scrollable region has to be reachable by keyboard. */
export function CodeBlock({ label, children }: { label: string; children: string }) {
  return (
    <pre
      tabIndex={0}
      aria-label={label}
      className="overflow-x-auto rounded-md border bg-muted/50 p-4 text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <code className="bg-transparent p-0">{children}</code>
    </pre>
  );
}

// What each AI crawler is for, in each company's own terms (OpenAI, Anthropic,
// Perplexity and Google crawler documentation, checked 2 October 2026).
const AI_CRAWLERS = [
  { name: "OAI-SearchBot", by: "OpenAI", job: "Finds pages to show in ChatGPT search", kind: "Answers" },
  { name: "ChatGPT-User", by: "OpenAI", job: "Opens a page when a ChatGPT user's request needs it", kind: "Answers" },
  { name: "GPTBot", by: "OpenAI", job: "Collects content for training OpenAI's models", kind: "Training" },
  { name: "Claude-SearchBot", by: "Anthropic", job: "Indexes pages to improve Claude's search results", kind: "Answers" },
  { name: "Claude-User", by: "Anthropic", job: "Fetches a page when a Claude user asks a question", kind: "Answers" },
  { name: "ClaudeBot", by: "Anthropic", job: "Collects content that may be used for training", kind: "Training" },
  { name: "PerplexityBot", by: "Perplexity", job: "Finds and links pages in Perplexity search (not training)", kind: "Answers" },
  { name: "Perplexity-User", by: "Perplexity", job: "Visits a page to answer a user's question", kind: "Answers" },
  { name: "Google-Extended", by: "Google", job: "A robots.txt setting for Gemini training; does not affect Google Search", kind: "Training" },
] as const;

export function AiCrawlerTable({ only }: { only?: string[] }) {
  const rows = only ? AI_CRAWLERS.filter((c) => only.includes(c.name)) : AI_CRAWLERS;
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="AI crawlers and what they are for"
      className="overflow-x-auto rounded-md border focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
    >
      <table className="w-full min-w-[34rem] text-sm">
        <caption className="sr-only">AI crawlers, who runs them, and what they are for</caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="p-3 text-left font-medium">Name in robots.txt</th>
            <th scope="col" className="p-3 text-left font-medium">Company</th>
            <th scope="col" className="p-3 text-left font-medium">What it is for</th>
            <th scope="col" className="p-3 text-left font-medium">Kind</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.name} className="border-b last:border-0 align-top">
              <th scope="row" className="p-3 text-left font-medium whitespace-nowrap">{c.name}</th>
              <td className="p-3">{c.by}</td>
              <td className="p-3">{c.job}</td>
              <td className="p-3">{c.kind}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type Source = { label: string; href: string };

// Every outside source the answers cite, each read at the source on
// 2 October 2026. Quoted wording on the pages is copied from these.
export const SRC = {
  googleAi: { label: "Google Search Central: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
  googleGenAi: { label: "Google Search Central: guidance on using generative AI content", href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" },
  googleRecrawl: { label: "Google Search Central: ask Google to recrawl your URLs", href: "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl" },
  googleSite: { label: "Google Search Central: the site: search operator", href: "https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site" },
  googleCrawlers: { label: "Google Search Central: Google's common crawlers (Google-Extended)", href: "https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers" },
  googleJs: { label: "Google Search Central: JavaScript SEO basics", href: "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics" },
  googleAiHelp: { label: "Google Search Help: AI Overviews", href: "https://support.google.com/websearch/answer/14901683" },
  gbpGuidelines: { label: "Google Business Profile: guidelines for representing your business", href: "https://support.google.com/business/answer/3038177" },
  gbpServiceArea: { label: "Google Business Profile: managing your service area", href: "https://support.google.com/business/answer/9157481" },
  gbpLocalRanking: { label: "Google Business Profile: tips to improve your local ranking", href: "https://support.google.com/business/answer/7091" },
  openaiBots: { label: "OpenAI: overview of OpenAI crawlers", href: "https://developers.openai.com/api/docs/bots" },
  anthropicBots: { label: "Anthropic: how Anthropic crawls the web and how to block it", href: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler" },
  perplexityBots: { label: "Perplexity: Perplexity crawlers", href: "https://docs.perplexity.ai/guides/bots" },
  cloudflareAiBots: { label: "Cloudflare docs: Block AI bots", href: "https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/" },
  cloudflare2025: { label: "Cloudflare blog: Content Independence Day (1 July 2025)", href: "https://blog.cloudflare.com/content-independence-day-no-ai-crawl-without-compensation/" },
  vercelAiCrawler: { label: "Vercel: The rise of the AI crawler (17 December 2024)", href: "https://vercel.com/blog/the-rise-of-the-ai-crawler" },
  geoPaper: { label: "Aggarwal et al., GEO: Generative Engine Optimization (KDD 2024)", href: "https://arxiv.org/abs/2311.09735" },
  ahrefsPricing: { label: "Ahrefs: SEO pricing survey of 439 providers (updated August 2024)", href: "https://ahrefs.com/blog/seo-pricing/" },
  adaGuidance: { label: "US Department of Justice: Guidance on Web Accessibility and the ADA (March 2022)", href: "https://www.ada.gov/resources/web-guidance/" },
  w3cTools: { label: "W3C: selecting web accessibility evaluation tools", href: "https://www.w3.org/WAI/test-evaluate/tools/selecting/" },
  wcag: { label: "W3C: WCAG 2 overview", href: "https://www.w3.org/WAI/standards-guidelines/wcag/" },
  richResults: { label: "Google Rich Results Test", href: "https://search.google.com/test/rich-results" },
} satisfies Record<string, Source>;

/** An outside link inside answer text. */
export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function AnswerPage({
  slug,
  short,
  sources = [],
  children,
}: {
  slug: string;
  /** The direct answer, two or three sentences. */
  short: React.ReactNode;
  sources?: Source[];
  children: React.ReactNode;
}) {
  const a = get(slug);
  const topic = topicByKey(a.topic);
  const related = a.related.map(get);
  const url = `${SITE}/answers/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.question,
      description: a.description,
      author: { "@type": "Person", name: "Rushil A. Bajpai", url: `${SITE}/about` },
      publisher: { "@id": `${SITE}/#organization` },
      image: `${SITE}/opengraph-image.png`,
      datePublished: a.published,
      dateModified: a.updated ?? a.published,
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Answers", item: `${SITE}/answers` },
        { "@type": "ListItem", position: 3, name: a.question, item: url },
      ],
    },
  ];

  const relatedList = related.map((r) => (
    <li key={r.slug}>
      <a href={`/answers/${r.slug}`}>{r.question}</a>
    </li>
  ));

  return (
    <article className="w-full pt-24 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto max-w-[78rem] px-4 pb-20 lg:pb-28">
        <div className="article-shell">
          <aside className="article-rail" aria-label="Related questions">
            <p className="article-rail-title">Related questions</p>
            <nav>
              {related.map((r) => (
                <a key={r.slug} href={`/answers/${r.slug}`}>
                  {r.question}
                </a>
              ))}
              <a href="/answers">All answers</a>
            </nav>
          </aside>

          <div className="article-scrim min-w-0">
            <header className="mb-10">
              <nav aria-label="Breadcrumb" className="mb-5 text-sm text-muted-foreground">
                <a href="/answers" className="underline-offset-4 hover:underline">
                  Answers
                </a>
                <span aria-hidden="true" className="mx-2">/</span>
                <a href={`/answers#${topic.key}`} className="underline-offset-4 hover:underline">
                  {topic.title}
                </a>
              </nav>
              <h1
                className="text-[2.1rem] font-regular leading-[1.08] tracking-tighter md:text-[3.25rem]"
                style={{ textWrap: "balance" }}
              >
                {a.question}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-5 text-sm text-muted-foreground">
                <a href="/about" className="text-foreground underline-offset-4 hover:underline">
                  Rushil A. Bajpai
                </a>
                <span aria-hidden="true">·</span>
                <span>Founder, Ru Visibility</span>
                <span aria-hidden="true">·</span>
                <time dateTime={a.updated ?? a.published}>
                  {a.updated ? "Updated " : ""}
                  {formatPostDate(a.updated ?? a.published)}
                </time>
              </div>
            </header>

            <div className="article-body flex flex-col gap-6">
              <div className="article-key">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Short answer
                </p>
                {short}
              </div>

              {children}

              {sources.length > 0 && (
                <>
                  <h2>Sources</h2>
                  <ul className="flex list-disc flex-col gap-2 pl-6 text-base">
                    {sources.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* The rail holds these on wide screens; everywhere else they
                  come at the end, where the next question is wanted. */}
              <div className="min-[1180px]:hidden">
                <h2>Related questions</h2>
                <ul className="mt-5 flex list-disc flex-col gap-2 pl-6 text-base">
                  {relatedList}
                  <li>
                    <a href="/answers">All answers</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuditCta />
    </article>
  );
}
