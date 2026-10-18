import {
  AnswerPage,
  answerMetadata,
  blockedPct,
  Ext,
  FromOurAudits,
  OurAudits,
  scores,
  SRC,
  universal,
} from "@/components/answer-page";

// Asked in Google autocomplete as "what is seo vs geo vs aeo", "geo vs seo"
// and "what is seo geo aio" (checked 18 October 2026). Every figure is read
// from research-findings.json, like the other answers.
const SLUG = "seo-vs-geo-vs-aeo";
export const metadata = answerMetadata(SLUG);

const noFaqPct = Math.round((100 - universal.anyFaqBlock.sitesPct) * 10) / 10;

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          SEO gets your pages found and ranked by Google. GEO gets your
          business named in answers from AI tools like ChatGPT, Gemini and
          Google&apos;s AI Overviews. AEO is the writing in between: shaping a
          page so a direct answer can be lifted from it. They share one
          foundation, and in our audits most websites were furthest behind on
          GEO.
        </>
      }
      sources={[SRC.googleAi, SRC.geoPaper, SRC.openaiBots]}
    >
      <h2>What does SEO cover?</h2>
      <p>
        Search engine optimization is everything that lets Google crawl a
        page, index it and rank it for the searches your customers type:
        titles, headings, links, speed, and pages that are allowed to appear
        at all. It is the oldest of the three and still the base. Google says
        &ldquo;the best practices for SEO remain relevant for AI features in
        Google Search&rdquo; (
        <Ext href={SRC.googleAi.href}>Google Search Central</Ext>).
      </p>
      <p>
        The basics are still missed often. In our audits,{" "}
        {universal.missingMetaSomewhere.sitesPct}% of sites had a page with no
        search description and {universal.missingH1Somewhere.sitesPct}% had a
        page with no main heading.
      </p>

      <h2>What does GEO cover?</h2>
      <p>
        Generative engine optimization is about the AI answer itself: whether
        the tools that write answers can reach your site, recognise your
        business as one entity, and find other sites that mention it. Much of
        that never affects a Google ranking, which is why SEO work rarely
        checks it. OpenAI, for example, runs a separate crawler for ChatGPT
        search (
        <Ext href={SRC.openaiBots.href}>OpenAI</Ext>).
      </p>
      <p>
        In our audits, {blockedPct("GPTBot")}% of sites refused OpenAI&apos;s
        GPTBot, and {universal.noSameAs.sitesPct}% never linked their own
        social profiles to their website in a way a machine can read.
      </p>

      <h2>What does AEO cover?</h2>
      <p>
        Answer engine optimization is the shape of the writing. A short, direct
        answer under a heading phrased as the question; sections that make
        sense on their own; lists, tables and plain sentences an answer can be
        lifted from. It helps featured snippets in Google and answers from AI
        tools alike. In a study of AI answers, adding quotes, figures and
        sources made pages measurably more likely to be quoted (
        <Ext href={SRC.geoPaper.href}>Aggarwal et al., KDD 2024</Ext>).
      </p>
      <p>
        In our audits, {noFaqPct}% of sites answered no questions anywhere on
        the pages we checked, and only {universal.anyTable.sitesPct}% used a
        table.
      </p>

      <FromOurAudits>
        Across <OurAudits />, the average SEO score was {scores.seo.mean}/100
        and the average AI visibility score was {scores.geo.mean}/100. The same
        websites, measured both ways.
      </FromOurAudits>

      <h2>Are LLMO and AI SEO something else?</h2>
      <p>
        No. LLM optimization and AI SEO are other names for the same work as
        GEO and AEO. A provider using a new name is not selling a different
        thing.
      </p>

      <h2>Which one should a business work on first?</h2>
      <p>
        Whatever blocks all three. A page told to stay out of search engines
        can&apos;t appear in Google or in its AI Overviews, and{" "}
        {universal.anyNoindex.sitesPct}% of the sites we checked had at least
        one. After that, write answers to the questions customers actually ask
        (AEO), then work on being mentioned and recognised (GEO). For the
        longer comparison, see{" "}
        <a href="/blog/seo-vs-geo">SEO vs GEO: How Search Is Changing for Businesses</a>.
      </p>
    </AnswerPage>
  );
}
