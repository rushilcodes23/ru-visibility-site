import { Button } from "@/components/ui/button";
import { AuditCta } from "@/components/ui/audit-cta";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";
import ReadingProgress from "@/components/reading-progress";

export const metadata = pageMetadata({
  path: "/blog/seo-mistakes-from-1500-audits",
  title: "I Audited 1,500+ Websites: The 21 SEO Mistakes I See Most Often",
  description:
    "Every number here comes from crawling 1,504 real business websites. The 21 problems that kept repeating, what each one actually costs, and the order I would fix them in.",
  type: "article",
});

/** Inline emphasis for the lines worth remembering. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="font-medium text-foreground"
      style={{
        // A soft wash rather than a rule. An underline at this size sits
        // straight through the descenders of p, g and y and reads as a
        // strikethrough; a tint sits behind the whole phrase and cannot be
        // mistaken for one. clone keeps the wash continuous across a line
        // break instead of restarting it on each fragment.
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        // --primary is near-white in dark mode, so mixing it produced a
        // grey box. The editorial accent is the green one.
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

const post = POSTS.find((p) => p.slug === "seo-mistakes-from-1500-audits")!;

/* ── Numbers ──────────────────────────────────────────────────────────────
   Every figure below is read from the same data file that drives /research,
   never typed in by hand. The research page's own <title> sat at "1,503"
   for days after the corpus moved on, which is exactly the drift this
   avoids: re-aggregate, and this article updates with it.                 */
const { corpus, scores, universal, subsetOnly, crawlerBlocks, platforms, headingsByPlatform } =
  findings;

/** Heading stats for one detected platform, by name. */
const plat = (name: string) => headingsByPlatform.find((p) => p.platform === name)!;

const N = corpus.uniqueDomains.toLocaleString("en-US");
/** A signal stored as a positive, reported as the problem it implies. */
const inv = (k: keyof typeof universal) =>
  Math.round((100 - universal[k].sitesPct) * 10) / 10;
const bot = (name: string) => crawlerBlocks.find((b) => b.crawler === name)!;
const wordpressPct = Math.round(
  (platforms["WordPress"] / corpus.uniqueDomains) * 1000
) / 10;

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "I Audited 1,500+ Websites: The 21 SEO Mistakes I See Most Often",
  description:
    "The 21 problems that kept repeating across 1,504 audited business websites, with the measured numbers behind each one.",
  author: {
    "@type": "Person",
    name: "Rushil",
    url: "https://ruvisibility.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "Ru Visibility",
    logo: "https://ruvisibility.com/logo-mark.png",
  },
  datePublished: post.published,
  dateModified: post.updated ?? post.published,
  mainEntityOfPage: "https://ruvisibility.com/blog/seo-mistakes-from-1500-audits",
};

/**
 * Rounded from the rendered word count at 220wpm, which is a reasonable pace
 * for prose carrying this many numbers. Stated so someone can decide whether
 * they have time for it now or should come back — on a piece this long that
 * is a real question, and leaving it unanswered costs readers at the top.
 */
const READ_MINUTES = 16;

type Mistake = { n: number; title: string; body: React.ReactNode };

const MISTAKES: Mistake[] = [
  {
    n: 1,
    title: "Assuming robots.txt is the only door",
    body: (
      <>
        <p>
          This is the first thing I check, and what the numbers showed
          surprised me enough that I went back and re-ran them.
        </p>
        <p>
          Deliberately blocking AI answer engines in robots.txt is rare. Across
          the corpus, {bot("OAI-SearchBot").robotsDisallowPct}% disallow
          OAI-SearchBot, {bot("ChatGPT-User").robotsDisallowPct}% disallow
          ChatGPT-User, {bot("PerplexityBot").robotsDisallowPct}% disallow
          PerplexityBot. Almost nobody is choosing to shut these out.
        </p>
        <p>
          The training-only crawlers are a different story —{" "}
          {bot("GPTBot").robotsDisallowPct}% disallow GPTBot. That is a
          deliberate, defensible decision about who gets to train on your
          writing, and it costs you nothing in AI answers today.
        </p>
        <p>
          Here is the part that matters.{" "}
          <Mark>
            Between {bot("Perplexity-User").httpBlockedPct}% and{" "}
            {bot("OAI-SearchBot").httpBlockedPct}% of sites returned an
            outright HTTP error to the crawlers that answer questions live
          </Mark>{" "}
          — a 403, a challenge page, a firewall rule. Almost none of that is a
          robots.txt decision. It is bot-protection software, set up to stop
          scrapers, quietly refusing the crawlers you would actually want
          visiting. The owner checks robots.txt, sees nothing blocking
          anything, and reasonably concludes they are fine.
        </p>
        <p>
          One caveat I will state plainly, because it cuts against my own
          number: about one site in ten also returned an error to a request
          carrying Googlebot&apos;s user-agent. That figure means almost
          nothing. Google verifies its crawler by IP address, not by the name
          in the request, so a security system refusing a stranger who claims
          to be Googlebot is behaving correctly. Counted strictly — sites whose
          own robots.txt says no — exactly{" "}
          {bot("Googlebot").robotsDisallowCount} site in {N} disallows
          Googlebot. Any audit that reports the first number without explaining
          the second is selling you a problem you do not have.
        </p>
        <p className="article-fix">
          <b>Fix</b> check
          robots.txt first, because it is free. Then check what your CDN or
          security layer is doing, which is where the real blocks live and
          where nobody thinks to look.
        </p>
      </>
    ),
  },
  {
    n: 2,
    title: "A sitemap that exists but nothing points to",
    body: (
      <>
        <p>
          {inv("sitemapFound")}% of the sites have no discoverable sitemap at
          all. A separate {universal.sitemapFoundNotDeclared.sitesPct}% —{" "}
          {universal.sitemapFoundNotDeclared.count} sites — have one that
          exists and works, but robots.txt never points to it. It was built. It
          just was not announced.
        </p>
        <p>
          Search engines can still find pages by following links. A sitemap is
          the difference between eventually and reliably, particularly for
          anything more than a couple of clicks from the homepage.
        </p>
        <p className="article-fix">
          <b>Fix</b> confirm
          your sitemap loads, then confirm robots.txt carries a{" "}
          <code className="text-xs">Sitemap:</code> line pointing at it. Most
          platforms generate one automatically — the gap is usually that
          nothing ever wired the two together.
        </p>
      </>
    ),
  },
  {
    n: 3,
    title: "A noindex tag left on a page that was meant to go live",
    body: (
      <>
        <p>
          {universal.anyNoindex.sitesPct}% of sites had at least one{" "}
          <code className="text-xs">noindex</code> tag in the crawl. Some of
          that is intentional — a thank-you page, a legal draft, something
          genuinely not meant to be found. I cannot tell from a crawl which
          ones were deliberate, and I am not going to pretend otherwise.
        </p>
        <p>
          What makes this one worth checking is that{" "}
          <Mark>
            a noindexed page looks completely normal to a human visitor
          </Mark>
          . It loads, it reads fine, nothing is visibly wrong. It simply never
          appears in search.
        </p>
        <p className="article-fix">
          <b>Fix</b> search
          your page source for &ldquo;noindex&rdquo; on anything you want
          found, especially after a migration or a redesign.
        </p>
      </>
    ),
  },
  {
    n: 4,
    title: "Missing canonical tags",
    body: (
      <>
        <p>
          {universal.missingCanonicalSomewhere.sitesPct}% of sites were missing
          a canonical tag on at least one page. A canonical tag tells Google
          which version of a page is the original. Without one, near-duplicate
          URLs — with and without a trailing slash, with a tracking parameter,
          with and without <code className="text-xs">www</code> — can be
          treated as separate competing pages rather than one.
        </p>
        <p className="article-fix">
          <b>Fix</b> every
          indexable page should carry a self-referencing canonical by default.
          This is a platform-level setting, not a page-by-page chore.
        </p>
      </>
    ),
  },
  {
    n: 5,
    title: "Pages with no H1 at all",
    body: (
      <>
        <p>
          {universal.missingH1Somewhere.sitesPct}% of sites have at least one
          page with no H1 heading anywhere on it. An H1 is the cheapest,
          clearest signal you can give about what a page is for.{" "}
          <Mark>A page with no H1 is a page asking Google to guess.</Mark>
        </p>
        <p className="article-fix">
          <b>Fix</b> one
          clear H1 per page, stating the subject in the words a customer would
          use. Not the business name. Not a slogan.
        </p>
      </>
    ),
  },
  {
    n: 6,
    title: "Two H1s doing two different jobs",
    body: (
      <>
        <p>
          The opposite problem, and nearly as common:{" "}
          {universal.multipleH1Somewhere.sitesPct}% of sites have at least one
          page carrying more than one H1.
        </p>
        <p>
          The interesting part is where it clusters. Broken out by the platform
          each site runs on:
        </p>
        <div
          tabIndex={0}
          role="region"
          aria-label="Share of sites with more than one H1, by platform"
          className="overflow-x-auto rounded-md border focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          <table className="w-full text-sm">
            <caption className="sr-only">
              Share of audited sites with a page carrying more than one H1,
              grouped by the platform detected on the site
            </caption>
            <thead>
              <tr className="border-b">
                <th scope="col" className="p-3 text-left font-medium">Platform</th>
                <th scope="col" className="p-3 text-right font-medium">Sites</th>
                <th scope="col" className="p-3 text-right font-medium">Two or more H1s</th>
              </tr>
            </thead>
            <tbody>
              {[...headingsByPlatform]
                .sort((a, b) => b.multipleH1Pct - a.multipleH1Pct)
                .map((r) => (
                  <tr key={r.platform} className="border-b last:border-0">
                    <th scope="row" className="p-3 text-left font-normal whitespace-nowrap">
                      {r.platform}
                    </th>
                    <td className="p-3 text-right tabular-nums">{r.sites}</td>
                    <td className="p-3 text-right tabular-nums">{r.multipleH1Pct}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p>
          <Mark>
            The hand-built sites are dramatically cleaner
          </Mark>
          . Next.js sites sit at {plat("Next.js").multipleH1Pct}%. The
          drag-and-drop builders are the worst: {plat("Wix").multipleH1Pct}% of
          the Wix sites and {plat("Squarespace").multipleH1Pct}% of the
          Squarespace ones. That is what you would expect when the tool decides
          your heading levels instead of you.
        </p>
        <p>
          Read the small rows carefully, though. Wix is {plat("Wix").sites}{" "}
          sites and Squarespace is {plat("Squarespace").sites}, so a handful of
          sites moves those figures several points. The direction is solid; the
          exact ordering between the small builders is not. Anything under ten
          sites is left out of the table entirely rather than published as a
          percentage one site could swing.
        </p>
        <p className="article-fix">
          <b>Fix</b> one H1.
          Everything else that looks like a headline is an H2 or lower.
        </p>
      </>
    ),
  },
  {
    n: 7,
    title: "No meta description, so Google writes one for you",
    body: (
      <>
        <p>
          {universal.missingMetaSomewhere.sitesPct}% of sites are missing a
          meta description somewhere — the single most common on-page gap in
          the whole dataset. When you do not write one, Google pulls a snippet
          from the page itself. Sometimes that is a reasonable summary. Often
          it is an awkward half-sentence with no relationship to why anyone
          should click.
        </p>
        <p>
          A meta description does not move rankings directly. It is free space
          in the search result, and it is the easiest thing on this entire list
          to fix in bulk.
        </p>
      </>
    ),
  },
  {
    n: 8,
    title: "No structured data anywhere on the site",
    body: (
      <>
        <p>
          {inv("anySchema")}% of sites have no structured data at all.
          Structured data tells a machine explicitly what a page is — a
          business, an article, a question and its answer — rather than making
          it infer that from surrounding text.
        </p>
        <p>
          Worth separating what Google actually says here from what gets sold.
          Google has stated structured data is{" "}
          <strong className="font-medium text-foreground">not required</strong>{" "}
          for its AI-generated search features. It is what earns rich results
          in classic search, and it is the cleanest way to state plain facts
          about your business.{" "}
          <Mark>
            Anyone selling schema markup as an AI-visibility fix is overstating
            it.
          </Mark>
        </p>
        <p className="article-fix">
          <b>Fix</b> start
          with Organization or LocalBusiness — whichever is actually true —
          before anything more elaborate. Never mark up reviews that do not
          exist; that is a manual-action trigger, not a grey area.
        </p>
      </>
    ),
  },
  {
    n: 9,
    title: "Writing that never actually answers a question",
    body: (
      <>
        <p>
          {inv("anyFaqBlock")}% of sites have no question-and-answer content
          anywhere.
        </p>
        <p>
          Most business websites describe things. &ldquo;We offer implant
          dentistry using the latest techniques.&rdquo; That is not wrong, but
          it is not an answer to anything either. Nobody typed a question that
          sentence resolves. A person scanning for the thing they need, or a
          system assembling an answer, has nothing to grab.
        </p>
        <p className="article-fix">
          <b>Fix</b> take
          the five questions customers actually ask before booking. Make each
          one a heading, and answer it directly in the paragraph underneath —
          two or three sentences that still make sense quoted on their own.
        </p>
      </>
    ),
  },
  {
    n: 10,
    title: "Nothing on the page is shaped to be quoted",
    body: (
      <>
        <p>
          {inv("anyTable")}% of sites have no table anywhere on them.
        </p>
        <p>
          This matters for a boring, mechanical reason. Featured snippets and
          AI-generated answers pull disproportionately from content that is
          already structured — a table, a numbered list, a clearly separated
          question and answer.{" "}
          <Mark>
            A paragraph has to be interpreted before it can be lifted. A table
            just gets copied.
          </Mark>
        </p>
        <p className="article-fix">
          <b>Fix</b>{" "}
          wherever you are already comparing options or listing steps, put it
          in that literal shape instead of dissolving it into prose.
        </p>
      </>
    ),
  },
  {
    n: 11,
    title: "Broken internal links",
    body: (
      <>
        <p>
          {universal.brokenInternalLinks.sitesPct}% of sites have at least one
          internal link that leads nowhere. Each one is a dead end for a
          visitor and a wasted path for whatever ranking value that link was
          meant to pass along.
        </p>
        <p className="article-fix">
          <b>Fix</b> the
          easiest item on this list, because it needs no judgment — a link
          either resolves or it does not. Any crawl finds every instance in
          minutes.
        </p>
      </>
    ),
  },
  {
    n: 12,
    title: "Redirect chains nobody noticed",
    body: (
      <>
        <p>
          {universal.redirectChains.sitesPct}% of sites have a URL that
          redirects to another URL that redirects again before anything loads.
          Each hop adds delay. They accumulate quietly over a site&apos;s life:
          a page gets renamed, nobody updates the links pointing at the old
          one, a new redirect goes on top of the old redirect.
        </p>
        <p className="article-fix">
          <b>Fix</b> point
          every redirect straight at its final destination. This is a one-time
          cleanup, not an ongoing discipline.
        </p>
      </>
    ),
  },
  {
    n: 13,
    title: "Images carrying information with nothing describing them",
    body: (
      <>
        <p>
          Measured across the{" "}
          {subsetOnly.altTextGap.denominator.toLocaleString("en-US")} sites
          with at least one informative image:{" "}
          {subsetOnly.altTextGap.sitesPct}% have a real gap in alt text
          coverage.
        </p>
        <p>
          Worth saying how that is counted, because it is easy to get wrong in
          a way that flatters the finding. A decorative image — a divider, a
          background texture — is{" "}
          <em>supposed</em> to have empty alt text. Counting those as failures
          roughly doubles the number and punishes sites for doing it correctly.{" "}
          <Mark>
            We had that bug in our own aggregation and reported 37% until we
            caught it.
          </Mark>{" "}
          The figure above counts only images that carry information and have
          nothing describing them.
        </p>
      </>
    ),
  },
  {
    n: 14,
    title: "The pages that make money are buried",
    body: (
      <>
        <p>
          I do not have a clean corpus-wide number for this one, so treat it as
          a pattern rather than a statistic. It is one of the most common
          internal-linking problems in practice: the page that should be
          earning — a specific service, a specific location — sits three or
          four clicks deep, reachable only through a dropdown or a footer link
          nobody clicks.
        </p>
        <p className="article-fix">
          <b>Fix</b> your
          commercially important pages should be one or two clicks from the
          homepage, through a link a person would actually notice.
        </p>
      </>
    ),
  },
  {
    n: 15,
    title: "Two of your own pages fighting for the same search",
    body: (
      <>
        <p>
          <Mark>
            {subsetOnly.titleClash.sitesPct}% of sites have at least one pair
            of pages whose titles are chasing the same search.
          </Mark>{" "}
          That is {subsetOnly.titleClash.count} of the{" "}
          {subsetOnly.titleClash.denominator.toLocaleString("en-US")} sites
          where the question is answerable at all — a site with only one
          crawled page cannot have the problem, so it is excluded rather than
          counted as a pass.
        </p>
        <p>
          The usual shape is a &ldquo;services&rdquo; page and a &ldquo;what we
          offer&rdquo; page covering identical ground. Instead of one strong
          page you get two mediocre ones splitting the same signals.
        </p>
        <p>
          How that is counted matters, because the naive version of this check
          flags everything. Every title on a site repeats the brand and the
          category, so the comparison drops any word appearing in more than
          half of that site&apos;s own titles before looking for an overlap.
          Without that filter a homepage &ldquo;matches&rdquo; every service
          page and the number is meaningless.
        </p>
        <p>
          One honest limit: this measures that two titles target the same
          thing.{" "}
          <Mark>
            Only Search Console can prove the two pages are actually competing
          </Mark>{" "}
          — one query, two of your URLs, trading positions. Treat the figure as
          risk, not proof.
        </p>
        <p className="article-fix">
          <b>Fix</b> confirm
          it in Search Console, then keep the stronger page, fold the other
          into it, and redirect.
        </p>
      </>
    ),
  },
  {
    n: 16,
    title: "The same page with the city swapped",
    body: (
      <>
        <p>
          The one I watch most carefully, because it carries real enforcement
          risk. Google&apos;s scaled-content-abuse policy targets exactly this:
          many pages that are barely differentiated, built to catch a keyword
          variant rather than to say something new.
        </p>
        <p>
          The classic version is a location-page template — same three
          paragraphs, same structure, city name swapped. It is tempting because
          it produces pages fast. It is also easy for a similarity check and a
          human reader to spot, and the policy judges the page, not whether a
          person or a model wrote it.
        </p>
        <p className="article-fix">
          <b>Fix</b> if the
          argument on a page would read identically with the location swapped,
          it is a template, not a page. Give it something specific to that
          place, or merge it.
        </p>
      </>
    ),
  },
  {
    n: 17,
    title: "Nothing on the site is signed by a person",
    body: (
      <>
        <p>
          No number here, and the reason is worth stating precisely rather
          than hand-waving.{" "}
          <Mark>
            Our audit does check for a byline — it just started checking after
            this corpus was crawled.
          </Mark>{" "}
          Exactly one report on disk carries the field. Producing a real
          percentage would mean re-crawling all {N} sites, not re-reading what
          we already have, so there is nothing honest to publish yet.
        </p>
        <p>
          It is one of the most consistent gaps I see, though, and it matters
          more than it used to. Google&apos;s quality guidance names experience
          and expertise explicitly, and both attach to a person, not a company.
          A page with no byline and no named author gives a reader — and a
          system weighing what to repeat — nothing to evaluate.
        </p>
        <p className="article-fix">
          <b>Fix</b> put a
          real name on anything carrying a judgment. A person, not &ldquo;our
          team.&rdquo; If they hold a relevant qualification, say so in text,
          not inside an image.
        </p>
      </>
    ),
  },
  {
    n: 18,
    title: "Profiles that exist but were never linked back",
    body: (
      <>
        <p>
          {universal.noSameAs.sitesPct}% of sites have no{" "}
          <code className="text-xs">sameAs</code> links in their structured
          data. Even where a business plainly has a LinkedIn page, a Facebook
          page, a directory listing, nothing on the website formally connects
          them.
        </p>
        <p>
          <code className="text-xs">sameAs</code> is how a machine confirms
          your website and those profiles describe the same entity. Without it
          each one sits in isolation, and nothing lets a system trying to
          verify who you are draw a confident line between them.
        </p>
        <p className="article-fix">
          <b>Fix</b> this
          only requires listing profiles you already have. Minutes of schema
          work, not new content.
        </p>
      </>
    ),
  },
  {
    n: 19,
    title: "Nobody else has ever written about the business",
    body: (
      <>
        <p>
          The starkest number in the dataset:{" "}
          <Mark>
            {universal.noPressSection.sitesPct}% of sites have no press
            mentions, no &ldquo;as featured in,&rdquo; nothing indicating an
            independent source has ever written about them.
          </Mark>
        </p>
        <p>
          It is also the hardest to fix and the most worth taking seriously.
          Everything else on this list is something you control on your own
          site. This one is not. Independent mentions are consistently among
          the strongest signals both classic search and AI systems use to
          decide whether to trust and repeat a claim, and you cannot generate
          them by editing your own pages.
        </p>
        <p className="article-fix">
          <b>Fix</b> a
          programme, not a task. Local press, industry roundups, original data
          worth citing. Slow — and the one thing a competitor cannot copy
          overnight the way they can copy a meta description.
        </p>
      </>
    ),
  },
  {
    n: 20,
    title: "A site slow enough to lose people before they read anything",
    body: (
      <>
        <p>
          Our audit marks performance as inferred rather than measured — a
          single request from one location is not field data — so I am not
          going to attach a corpus percentage to it.
        </p>
        <p>
          What is worth saying: the direct ranking effect of speed is smaller
          than most people assume. The real cost is behavioural. A slow page
          loses the visitor before they see whether the content was any good,
          and no amount of good SEO elsewhere recovers that.
        </p>
        <p className="article-fix">
          <b>Fix</b> run
          your own homepage through PageSpeed Insights rather than trusting a
          general claim. Note that INP replaced First Input Delay as the
          responsiveness metric in 2024, so older advice is measuring the wrong
          thing.
        </p>
      </>
    ),
  },
  {
    n: 21,
    title: "Local listings that do not match the website",
    body: (
      <>
        <p>
          Last, and specific to any business serving a physical area. Your
          name, address and phone number need to match exactly everywhere they
          appear — website, Google Business Profile, every directory. A
          mismatch as small as a suite number in one place and not another
          quietly undermines the trust signal local search depends on.
        </p>
        <p>
          This is established practice rather than something I can prove from
          this dataset, and I would rather label it that way than dress it up.
        </p>
        <p className="article-fix">
          <b>Fix</b> pick
          the canonical version of your details and make every listing match it
          precisely, not approximately.
        </p>
      </>
    ),
  },
];

export default function SeoMistakesPost() {
  return (
    <article className="w-full pb-20 pt-24 lg:pb-32 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <ReadingProgress />

      <div className="container mx-auto max-w-[78rem] px-4">
        <div className="article-shell">
          {/* Sticky contents. On a wide screen this is what the empty left
              margin becomes: the list stays reachable for the whole article
              instead of being scrolled past once near the top. */}
          <aside className="article-rail" aria-label="Article contents">
            <p className="article-rail-title">The 21, in order</p>
            <nav>
              {MISTAKES.map((m) => (
                <a key={m.n} href={`#mistake-${m.n}`}>
                  {m.n}. {m.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="article-scrim min-w-0">
        {/* No eyebrow above the headline. The title says what this is. */}
        <header className="mb-12">
          <h1
            className="text-[2.1rem] font-regular leading-[1.1] tracking-tighter md:text-[3.25rem]"
            style={{ textWrap: "balance" }}
          >
            I Audited 1,500+ Websites: The 21 SEO Mistakes I See Most Often
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-5 text-sm text-muted-foreground">
            <span className="text-foreground">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published}>{formatPostDate(post.published)}</time>
            <span aria-hidden="true">·</span>
            <span>{READ_MINUTES} min read</span>
            {post.updated && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  Updated{" "}
                  <time dateTime={post.updated}>
                    {formatPostDate(post.updated)}
                  </time>
                </span>
              </>
            )}
          </div>
        </header>

        <div className="article-body flex flex-col gap-6">
          <p>
            I have spent the last several weeks running the same audit, over
            and over, on {N} real business websites. Not a sample of ten picked
            because they made a good story — {N} of them, crawled and scored
            the same way every time.
          </p>

          <p>
            Most of what is wrong with these sites is not exotic. It is the
            same handful of mistakes, repeating across businesses that have
            never met, built by different developers, on different platforms,
            in different countries. That repetition is the interesting part.{" "}
            <Mark>
              When the same problem appears on hundreds of unrelated sites, it
              is not bad luck — it is something the tools people use, or the
              advice they are given, keeps producing.
            </Mark>
          </p>

          <p>
            This is that list, in the order I would fix it, with the real
            numbers behind the ones I can measure. Where I do not have a number
            for something, I say so rather than reaching for one.
          </p>

          <h2>
            What &ldquo;{N} audits&rdquo; actually means
          </h2>
          <p>
            Vague authority claims are worth nothing, so here is exactly what
            sits behind this.
          </p>
          <p>
            Between {fmtDate(corpus.firstAudit)} and {fmtDate(corpus.lastAudit)}{" "}
            I ran a crawl-based audit — same checks, same scoring, same rules —
            against {N} unique domains. Most are dental implant clinics: the
            bulk in the United States, smaller groups in France and the UAE,
            plus a set of hair transplant clinics in Dubai.{" "}
            <Mark>
              This is not a random cross-section of every kind of business.
            </Mark>{" "}
            It is a deep, repeated look at one type of local service business,
            audited at volume.
          </p>
          <p>
            Why it still applies if you are not a dental clinic: nothing on
            this list is dental-specific. A missing canonical tag, a blocked
            crawler, an unlinked profile — none of that cares what industry you
            are in. The platforms are familiar too. More than half the corpus (
            {wordpressPct}%) runs on WordPress, which is roughly what you would
            find auditing local service businesses generally.
          </p>
          <p>
            One limitation worth stating up front: a crawl cannot see what
            other websites say about a business, and part of AI visibility
            depends entirely on that. We leave it blank rather than guess,
            which means the real picture is probably slightly worse than these
            numbers, not better.
          </p>

          <blockquote className="my-2 rounded-md border-l-4 border-primary bg-muted py-5 pl-6 pr-5 text-lg font-medium leading-relaxed text-foreground md:text-xl">
            These businesses average {scores.seo.mean} out of 100 on
            conventional SEO and {scores.geo.mean} on AI visibility. Out of all{" "}
            {N} sites, {scores.geo.grades.A ?? 0} scored an A.
          </blockquote>

          <p>
            That gap — roughly{" "}
            {Math.round((scores.seo.mean - scores.geo.mean) * 10) / 10} points,
            showing up almost everywhere — is the shape of the whole problem.
            Sites in reasonable order for Google are frequently doing nothing
            at all for AI search. Several of the items below explain why.
          </p>

          {/* Contents. Twenty-one items is past the point where a reader can
              hold the list in their head, and most arrive wanting one of them
              rather than all of them. Two columns so it stays one screen. */}
          <nav aria-labelledby="toc-heading" className="mt-6 rounded-[14px] border p-6 md:p-7">
            <h2
              id="toc-heading"
              className="!mt-0 !text-base !tracking-normal"
              style={{ fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}
            >
              All 21, in order
            </h2>
            <ol className="mt-4 grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2">
              {MISTAKES.map((m) => (
                <li key={m.n} className="flex gap-2.5 leading-snug">
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {m.n}.
                  </span>
                  <a
                    href={`#mistake-${m.n}`}
                    className="article-plain text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {m.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {MISTAKES.map((m) => (
            <section
              key={m.n}
              id={`mistake-${m.n}`}
              className="article-step flex flex-col gap-4"
            >
              <span className="article-step-n" aria-hidden="true">
                {String(m.n).padStart(2, "0")}
              </span>
              <h2>
                <span className="sr-only">Mistake {m.n}: </span>
                {m.title}
              </h2>
              {m.body}
            </section>
          ))}

          <h2>
            Where I would actually start
          </h2>
          <p>
            Twenty-one is too many to look at once. If I were fixing one of
            these sites myself, in this order:
          </p>
          <p>
            <strong className="font-medium text-foreground">
              First, the things that make you invisible outright.
            </strong>{" "}
            Check robots.txt and your security layer for blocked crawlers,
            confirm a sitemap exists and is declared, check for a stray
            noindex. An hour, combined, and it is the difference between being
            findable and not.
          </p>
          <p>
            <strong className="font-medium text-foreground">
              Second, the on-page fundamentals.
            </strong>{" "}
            H1s, meta descriptions, canonical tags. Boring and fast, and they
            compound — fixing one page teaches you the pattern for the other
            fifty.
          </p>
          <p>
            <strong className="font-medium text-foreground">
              Third, the structural work.
            </strong>{" "}
            Real schema, content shaped as actual answers, internal links
            pointing at the pages you want found. Slower, but it holds.
          </p>
          <p>
            <strong className="font-medium text-foreground">
              Last, the slow ones.
            </strong>{" "}
            Earning real mentions, building genuine attribution, fixing
            duplicate-content problems properly. These are not afternoon jobs,
            and anyone who tells you otherwise has not done one.
          </p>
          <p>
            I have audited {N} of these sites now and still find something from
            this list on almost every one — including, before we fixed it, our
            own. The full aggregate data behind every number above is on our{" "}
            <a
              href="/research"
              className="underline underline-offset-4 text-foreground"
            >
              research page
            </a>
            , including the parts where the sites did well.
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
