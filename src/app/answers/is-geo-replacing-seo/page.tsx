import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  scores,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "is-geo-replacing-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          No. Google says &ldquo;the best practices for SEO remain relevant for
          AI features in Google Search&rdquo;, and GEO builds on the same
          foundation. What has changed is that being found now also means
          being mentioned in AI answers, and most websites are much further
          behind on that part.
        </>
      }
      sources={[SRC.googleAi]}
    >
      <h2>The foundation is shared</h2>
      <p>
        Both depend on pages that can be crawled, indexed and understood. Google
        adds that there is nothing special to bolt on for its AI features:
        &ldquo;You don&apos;t need to create new machine readable files, AI
        text files, or markup to appear in these features&rdquo; (
        <Ext href={SRC.googleAi.href}>Google Search Central</Ext>). A site that
        is hard for Google to read is usually hard for AI tools too.
      </p>

      <h2>What GEO adds on top</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          Letting the crawlers that ChatGPT, Claude and Perplexity use reach
          your site. They don&apos;t affect Google rankings, so SEO work rarely
          checks them.
        </li>
        <li>
          Writing in short, quotable answers rather than only in pages built to
          rank for a phrase.
        </li>
        <li>
          Making your business recognizable as one entity across your site,
          listings and profiles.
        </li>
        <li>Earning mentions that an AI tool can use as evidence.</li>
      </ul>

      <FromOurAudits>
        Across <OurAudits />, the average SEO score was {scores.seo.mean}/100
        and the average AI visibility score was {scores.geo.mean}/100.{" "}
        {scores.seo.grades.A} sites earned an A for SEO;{" "}
        {scores.geo.grades.A === 1 ? "just one" : scores.geo.grades.A} earned
        an A for AI visibility.
      </FromOurAudits>

      <h2>So where should a small business start?</h2>
      <p>
        With whatever stops both. A page told to stay out of Google can&apos;t
        appear in Google&apos;s AI Overviews either, so indexing problems come
        first. Then the AI-specific gaps, which for most sites are the bigger
        ones.
      </p>
      <p>
        In our audits, {universal.anyNoindex.sitesPct}% of sites had at least
        one page told to hide from search engines — sometimes on purpose, often
        not. It is usually a quick fix, and it matters for both.
      </p>
      <p>
        For the full comparison, see{" "}
        <a href="/blog/seo-vs-geo">SEO vs GEO: How Search Is Changing for Businesses</a>.
      </p>
    </AnswerPage>
  );
}
