import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "how-does-generative-engine-optimization-work";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          AI answer tools work in two steps: they gather sources, then write an
          answer from them. GEO works on both. First it makes sure your pages
          can be found and fetched at all; then it makes them easy to quote
          accurately once they are.
        </>
      }
      sources={[SRC.googleAi, SRC.geoPaper, SRC.vercelAiCrawler]}
    >
      <h2>Step 1: getting retrieved</h2>
      <p>
        Before an AI tool can use your page, it has to reach it. ChatGPT,
        Claude and Perplexity read the web through their own crawlers, and a
        robots.txt rule or a security setting can shut any of them out.
        Google&apos;s AI features work from its search index; Google says AI
        Overviews and AI Mode &ldquo;may use a &lsquo;query fan-out&rsquo;
        technique — issuing multiple related searches across subtopics and data
        sources&rdquo; (<Ext href={SRC.googleAi.href}>Google Search Central</Ext>).
      </p>
      <p>
        Pages also have to be readable once fetched. Vercel found that
        &ldquo;none of the major AI crawlers currently render JavaScript&rdquo;
        (<Ext href={SRC.vercelAiCrawler.href}>Vercel</Ext>), so text that only
        appears after scripts run may not be seen at all.
      </p>

      <h2>Step 2: getting used in the answer</h2>
      <p>
        From the sources it gathers, the tool picks passages and facts to
        build its reply. Short, self-contained passages that answer one
        question are easy to lift. Long paragraphs that circle the point get
        summarized instead, and a summary is less likely to carry your name.
      </p>
      <p>
        The research that named GEO tested which changes help. Adding
        citations, quotations and statistics raised a page&apos;s visibility in
        AI answers by up to 40% in the authors&apos; benchmark, and they noted
        the effect &ldquo;varies across domains&rdquo; (
        <Ext href={SRC.geoPaper.href}>Aggarwal et al., KDD 2024</Ext>).
      </p>

      <FromOurAudits>
        Of <OurAudits />, only {universal.anyFaqBlock.sitesPct}% had any
        questions-and-answers section, and only {universal.anyTable.sitesPct}%
        had a single table on the pages we checked. Both are formats AI answers
        can lift almost unchanged.
      </FromOurAudits>

      <h2>Step 3: being believed</h2>
      <p>
        Tools compare what different sources say. If your site, your Google
        Business Profile and other listings agree on who you are and what you
        do, and other people mention you too, you are a safer thing to repeat.
        If they disagree, you are a risk.
      </p>

      <h2>What GEO can&apos;t do</h2>
      <p>
        It can&apos;t guarantee a mention. The tools change, answers vary
        between people, and nobody outside these companies controls them.
        What it does is remove the reasons a tool would skip you.
      </p>
    </AnswerPage>
  );
}
