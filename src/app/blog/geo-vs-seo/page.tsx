import { Button } from "@/components/ui/button";
import { AuditCta } from "@/components/ui/audit-cta";
import ReadingProgress from "@/components/reading-progress";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

// Written to answer the questions Google autocomplete shows people typing
// (checked 1 October 2026): "geo vs seo", "what is seo vs geo vs aeo", "is
// generative engine optimization real", "how to check ai visibility of
// website". Every number comes from research-findings.json, so it cannot
// drift from /research; the two outside claims quote their sources.

export const metadata = pageMetadata({
  path: "/blog/geo-vs-seo",
  title: "GEO vs SEO vs AEO: What's Actually Different | Ru Visibility",
  description:
    "SEO, GEO and AEO in plain English, with data from 1,504 website audits: sites average 83 on SEO but 69 on AI visibility. What differs, and what to check.",
  type: "article",
});

/** Same inline emphasis as the other two posts. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="font-medium text-foreground"
      style={{
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        background: "color-mix(in oklch, var(--accent-green) 22%, transparent)",
        borderRadius: "3px",
        padding: "0.08em 0.24em",
        margin: "0 -0.06em",
      }}
    >
      {children}
    </mark>
  );
}

const post = POSTS.find((p) => p.slug === "geo-vs-seo")!;
const { corpus, scores, universal, crawlerBlocks } = findings;
const N = corpus.uniqueDomains.toLocaleString("en-US");
const blockedPct = (name: string) => crawlerBlocks.find((c) => c.crawler === name)?.combinedPct;
const noFaqPct = Math.round((100 - universal.anyFaqBlock.sitesPct) * 10) / 10;

const SECTIONS = [
  { id: "what-is-each", label: "SEO, GEO and AEO in one line each" },
  { id: "difference", label: "GEO vs SEO: what is actually different" },
  { id: "the-data", label: `What ${N} audits show` },
  { id: "is-seo-dead", label: "Is SEO dead?" },
  { id: "is-geo-real", label: "Is GEO real, or a new name for SEO?" },
  { id: "other-names", label: "LLMO, AI SEO and the other names" },
  { id: "check-yourself", label: "How to check your own AI visibility" },
];

/** ~1,150 words at 220wpm. */
const READ_MINUTES = 6;

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "GEO vs SEO vs AEO: What's Actually Different",
  description: metadata.description,
  author: { "@type": "Person", name: post.author, url: "https://ruvisibility.com/about" },
  publisher: { "@type": "Organization", name: "Ru Visibility", logo: "https://ruvisibility.com/logo-mark.png" },
  image: "https://ruvisibility.com/opengraph-image.png",
  datePublished: post.published,
  dateModified: post.updated ?? post.published,
  mainEntityOfPage: "https://ruvisibility.com/blog/geo-vs-seo",
};

const COMPARE = [
  {
    row: "Where you want to appear",
    seo: "In Google's list of results",
    geo: "Named inside an AI answer — ChatGPT, Gemini, Perplexity, Google's AI answers",
    aeo: "Quoted as the answer itself",
  },
  {
    row: "What it depends on",
    seo: "Pages that can be crawled, understood, and trusted enough to rank",
    geo: "AI tools being able to reach the site, tell who the business is, and find reasons to name it",
    aeo: "A short, direct answer on the page that makes sense on its own",
  },
  {
    row: `Average across ${N} audits`,
    seo: `${scores.seo.mean} / 100`,
    geo: `${scores.geo.mean} / 100`,
    aeo: "Scored in newer audits; not in this dataset",
  },
];

export default function GeoVsSeoPost() {
  return (
    <article className="w-full pb-20 pt-24 lg:pb-32 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <ReadingProgress />

      <div className="container mx-auto max-w-[78rem] px-4">
        <div className="article-shell">
          <aside className="article-rail" aria-label="Article contents">
            <p className="article-rail-title">In this piece</p>
            <nav>
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="article-scrim min-w-0">
            <header className="mb-12">
              <h1
                className="text-[2.35rem] font-regular leading-[1.06] tracking-tighter md:text-[4rem]"
                style={{ textWrap: "balance" }}
              >
                GEO vs SEO vs AEO: What&apos;s Actually Different
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-5 text-sm text-muted-foreground">
                <span className="text-foreground">{post.author}</span>
                <span aria-hidden="true">·</span>
                <span>Founder</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                <span aria-hidden="true">·</span>
                <span>{READ_MINUTES} min read</span>
              </div>
            </header>

            <div className="article-body flex flex-col gap-6">
              <p>
                Three acronyms, one question underneath all of them: when
                someone looks for a business like yours, does yours come up?
                They differ in <em>where</em> it comes up. Here is each one in
                plain English, what our own audits show about the gap between
                them, and a way to check where you stand in about twenty
                minutes.
              </p>

              <h2 id="what-is-each">SEO, GEO and AEO in one line each</h2>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>
                  <strong>SEO</strong> (search engine optimisation): getting
                  found on Google when someone searches. The base — everything
                  else is built on top of it.
                </li>
                <li>
                  <strong>GEO</strong> (generative engine optimisation): getting
                  named when someone asks ChatGPT, Gemini or Perplexity for a
                  recommendation.
                </li>
                <li>
                  <strong>AEO</strong> (answer engine optimisation): writing so
                  the answer can be lifted straight off your page, instead of
                  the machine having to work it out.
                </li>
              </ul>

              <h2 id="difference">GEO vs SEO: what is actually different</h2>
              <p>
                SEO is about ranking in a list. <Mark>GEO is about being the
                name in the answer</Mark> — often the only one shown, with no
                second place to fall back to. AEO is the writing side of the
                same thing: an answer engine can only quote what is already
                written as an answer.
              </p>
              <div
                tabIndex={0}
                role="region"
                aria-label="SEO, GEO and AEO compared"
                className="overflow-x-auto rounded-md border focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
              >
                <table className="w-full min-w-[34rem] text-sm">
                  <caption className="sr-only">
                    SEO, GEO and AEO compared: where each one shows up, what it
                    depends on, and the average audit score
                  </caption>
                  <thead>
                    <tr className="border-b">
                      <th scope="col" className="p-3 text-left font-medium"><span className="sr-only">Compared on</span></th>
                      <th scope="col" className="p-3 text-left font-medium">SEO</th>
                      <th scope="col" className="p-3 text-left font-medium">GEO</th>
                      <th scope="col" className="p-3 text-left font-medium">AEO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map((r) => (
                      <tr key={r.row} className="border-b last:border-0 align-top">
                        <th scope="row" className="p-3 text-left font-medium">{r.row}</th>
                        <td className="p-3">{r.seo}</td>
                        <td className="p-3">{r.geo}</td>
                        <td className="p-3">{r.aeo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="the-data">What {N} audits show</h2>
              <p>
                Across the {N} business websites we have audited, the average
                site scores <strong>{scores.seo.mean}</strong> out of 100 on
                SEO and <strong>{scores.geo.mean}</strong> on GEO.{" "}
                <Mark>
                  {scores.seo.grades.A} sites earned an A for SEO; {scores.geo.grades.A}{" "}
                  earned an A for GEO.
                </Mark>{" "}
                Most businesses have done reasonable work on being found by
                Google and far less on being named by AI. The gaps are
                specific:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>
                  {universal.noSameAs.sitesPct}% never tell machines which
                  profiles elsewhere belong to them (no <code>sameAs</code> in
                  their markup), so an AI tool cannot be sure their Google
                  listing, Facebook page and website are one business.
                </li>
                <li>
                  {noFaqPct}% have no question-and-answer section at all, and
                  only {universal.anyTable.sitesPct}% use a table anywhere —
                  the two formats an answer is easiest to lift from.
                </li>
                <li>
                  {universal.noPressSection.sitesPct}% have no press or &quot;as
                  featured in&quot; section: nothing independent for an AI tool
                  to follow.
                </li>
              </ul>
              <p>
                The full breakdown, by industry and market, is on the{" "}
                <a href="/research">research page</a>.
              </p>

              <h2 id="is-seo-dead">Is SEO dead?</h2>
              <p>
                No. An AI tool that searches the web still has to find your
                pages and read them, and that part is SEO. Google says so
                directly about its own AI features:{" "}
                <Mark>
                  &ldquo;The best practices for SEO remain relevant for AI
                  features in Google Search&rdquo;
                </Mark>
                , and there are{" "}
                &ldquo;no additional requirements to appear in AI Overviews or
                AI Mode&rdquo; (
                <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer">
                  Google Search Central
                </a>
                ). What changes is the last step: a ranked list gives you a
                chance on page one; an AI answer names a few businesses, or
                one.
              </p>

              <h2 id="is-geo-real">Is GEO real, or a new name for SEO?</h2>
              <p>
                The term comes from a research paper, <em>GEO: Generative
                Engine Optimization</em> (Aggarwal and others, KDD 2024), which
                tested what makes a source more visible inside AI-generated
                answers. Its headline result:{" "}
                <Mark>&ldquo;GEO can boost visibility by up to 40% in
                generative engine responses&rdquo;</Mark> — with the caveat that
                &ldquo;the efficacy of these strategies varies across
                domains&rdquo; (
                <a href="https://arxiv.org/abs/2311.09735" target="_blank" rel="noopener noreferrer">
                  arXiv
                </a>
                ). So it is real, and it overlaps with SEO rather than
                replacing it. The honest version: nobody can promise an AI tool
                will name you, and anyone who guarantees it is guessing.
              </p>

              <h2 id="other-names">LLMO, AI SEO and the other names</h2>
              <p>
                <strong>LLMO</strong> (large language model optimisation) is a
                newer name for the same work as GEO and AEO together.{" "}
                <strong>AI SEO</strong> is an umbrella term some agencies use
                for all of it. Neither is a separate technique, so a quote
                that lists SEO, GEO, AEO and LLMO as four separate jobs is
                worth a second look.
              </p>

              <h2 id="check-yourself">How to check your own AI visibility</h2>
              <p>
                This is the same order our audit works in. The first two steps
                cost nothing and take about twenty minutes.
              </p>
              <ol className="list-decimal pl-6 flex flex-col gap-3">
                <li>
                  <strong>Ask like a customer.</strong> In ChatGPT, Perplexity
                  and Gemini, ask for the best business like yours in your
                  city. Ask each one a few times — the answers change between
                  runs — and write down which businesses and which websites
                  come up. That list, and whether you are on it, is your
                  starting point.
                </li>
                <li>
                  <strong>Make sure the door is open.</strong> Some sites turn
                  away the crawlers AI answers depend on, usually through a
                  firewall setting nobody remembers switching on. In our
                  audits, {blockedPct("PerplexityBot")}% of sites refused
                  Perplexity&apos;s crawler, {blockedPct("OAI-SearchBot")}%
                  ChatGPT&apos;s search crawler and {blockedPct("Claude-SearchBot")}%
                  Claude&apos;s. Check your robots.txt, and your hosting or CDN
                  bot settings.
                </li>
                <li>
                  <strong>Say who you are, in the markup.</strong> List every
                  profile the business already has — Google Business Profile,
                  Facebook, LinkedIn, directories — in the{" "}
                  <code>sameAs</code> field of the business&apos;s schema
                  markup.
                </li>
                <li>
                  <strong>Answer the questions people ask.</strong> A heading
                  phrased as the question, then two or three sentences that
                  answer it. Google&apos;s autocomplete shows what people type:
                  start typing your service and read the suggestions.
                </li>
                <li>
                  <strong>Earn mentions elsewhere.</strong> The slow part. AI
                  tools weigh what other sites say about you, and no change to
                  your own site replaces that.
                </li>
              </ol>
              <p>
                If you would rather have it measured, our audit scores SEO,
                GEO, AEO and E-E-A-T separately and tells you which of these is
                holding you back.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t">
              <Button render={<a href="#audit">Get Your Visibility Audit</a>} />
            </div>
          </div>
        </div>
      </div>
      <AuditCta />
    </article>
  );
}
