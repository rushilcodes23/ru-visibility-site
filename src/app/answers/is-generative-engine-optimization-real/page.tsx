import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "is-generative-engine-optimization-real";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Yes, in the sense that it has been measured: a peer-reviewed paper
          accepted at KDD 2024 found that changes to content could raise its
          visibility in AI answers by up to 40%. But the effect varied by
          subject, the tests ran on a research benchmark rather than in your
          market, and nobody controls what an AI tool says.
        </>
      }
      sources={[SRC.geoPaper, SRC.googleGenAi, SRC.openaiBots]}
    >
      <h2>What the research showed</h2>
      <p>
        The term comes from <em>GEO: Generative Engine Optimization</em> by
        Pranjal Aggarwal and five co-authors, first published in November 2023
        and accepted to KDD 2024, one of the main data-science conferences.
        To test their ideas they built &ldquo;GEO-bench, a large-scale
        benchmark of diverse user queries across multiple domains&rdquo;, and
        reported that GEO &ldquo;can boost visibility by up to 40% in
        generative engine responses&rdquo; (
        <Ext href={SRC.geoPaper.href}>the paper</Ext>).
      </p>

      <h2>What it didn&apos;t show</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          That it works the same everywhere. The authors say the efficacy of
          their methods &ldquo;varies across domains&rdquo;.
        </li>
        <li>
          That it works the same in today&apos;s products. A benchmark is a
          controlled test, and ChatGPT, Gemini and the rest change often.
        </li>
        <li>That any particular business will be mentioned. Nobody can show that.</li>
      </ul>

      <h2>Why it isn&apos;t just SEO with a new name</h2>
      <p>
        Much of it overlaps with good SEO, but some of it is genuinely new.
        AI companies run their own crawlers, and some of them decide whether
        you can appear at all: OpenAI says sites that block its search crawler
        &ldquo;will not be shown in ChatGPT search answers&rdquo; (
        <Ext href={SRC.openaiBots.href}>OpenAI</Ext>). Choosing which of those
        crawlers to allow, writing in passages a tool can quote, and making
        your business recognizable across sources are not things a classic
        SEO audit looks at.
      </p>

      <h2>How to judge a GEO offer</h2>
      <p>Be wary of anyone who:</p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>guarantees mentions in ChatGPT or a top spot in AI answers;</li>
        <li>claims secret techniques they can&apos;t explain;</li>
        <li>
          proposes publishing large numbers of near-identical pages. Google
          warns that generating &ldquo;many pages without adding value for
          users may violate Google&apos;s spam policy on scaled content
          abuse&rdquo; (<Ext href={SRC.googleGenAi.href}>Google Search Central</Ext>).
        </li>
      </ul>
      <p>
        Real GEO work looks unglamorous: fixing access, rewriting pages so they
        answer questions clearly, cleaning up listings, earning mentions, and
        measuring what changes.
      </p>
    </AnswerPage>
  );
}
