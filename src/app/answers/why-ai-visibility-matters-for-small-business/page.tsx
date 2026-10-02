import {
  AnswerPage,
  answerMetadata,
  blockedPct,
  Ext,
  FromOurAudits,
  OurAudits,
  robotsPct,
  scores,
  SRC,
} from "@/components/answer-page";

const SLUG = "why-ai-visibility-matters-for-small-business";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Because an AI answer usually names a few businesses, not ten. When
          someone asks ChatGPT or Google&apos;s AI Overview which provider to
          choose or what something should cost, the answer is a shortlist. If
          the tool can&apos;t read your site, or can&apos;t tell what you do,
          you aren&apos;t on it.
        </>
      }
      sources={[SRC.googleAi, SRC.openaiBots]}
    >
      <h2>An answer is a shortlist</h2>
      <p>
        A Google results page shows ten or more options and lets the person
        compare. An AI answer does the comparing for them and names a handful,
        sometimes one. There is no page two to climb onto. For a small
        business that wins work through being found, that is the difference
        between being considered and not existing for that customer.
      </p>
      <p>
        These questions also tend to come at the moment a decision is being
        made: which accountant, which clinic, what a fair price is, what to
        watch out for. Those are the conversations a small business most
        wants to be part of.
      </p>

      <h2>Ranking on Google doesn&apos;t automatically carry over</h2>
      <p>
        Google says its usual SEO advice applies to its own AI features (
        <Ext href={SRC.googleAi.href}>Google Search Central</Ext>). But
        ChatGPT, Claude and Perplexity read the web through their own
        crawlers, with their own rules. A site can be welcome to Google and
        still turn those crawlers away, often through a security setting
        nobody remembers switching on.
      </p>

      <FromOurAudits>
        Of <OurAudits />, only {robotsPct("Googlebot")}% blocked Google in
        robots.txt, but {blockedPct("OAI-SearchBot")}% turned away
        OAI-SearchBot, the crawler ChatGPT search uses, and{" "}
        {blockedPct("PerplexityBot")}% turned away Perplexity&apos;s. On
        average the sites scored {scores.seo.mean}/100 for SEO and{" "}
        {scores.geo.mean}/100 for AI visibility.
      </FromOurAudits>

      <h2>Most small businesses are behind, which is the opening</h2>
      <p>
        The gap in those scores is the useful part. The basics of being found
        on Google are in reasonable shape for most businesses; the AI side is
        where almost everyone has work to do. A small business that sorts it
        out now is competing against sites that haven&apos;t.
      </p>

      <h2>What it doesn&apos;t mean</h2>
      <p>
        It doesn&apos;t mean abandoning Google: plenty of your customers will
        keep searching the way they always have. The two rest on the same
        foundation, and most of the work helps with both;{" "}
        <a href="/answers/is-geo-replacing-seo">more on how they relate</a>.
        And it doesn&apos;t mean anyone can promise you a mention. What you
        can control is whether the tools can read you and whether what they
        find is clear and accurate.
      </p>
    </AnswerPage>
  );
}
