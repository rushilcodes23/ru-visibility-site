import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "where-google-ai-overviews-get-information";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          From Google Search itself. Google says AI Overviews may use
          &ldquo;query fan-out&rdquo;, issuing several related searches across
          subtopics and data sources, then show links to pages that support the
          answer. To be one of those links, a page must be indexed and eligible
          to appear in Search with a snippet.
        </>
      }
      sources={[SRC.googleAi, SRC.googleCrawlers, SRC.googleAiHelp]}
    >
      <h2>More searches than the one you typed</h2>
      <p>
        An AI Overview isn&apos;t written from a single results page. In
        Google&apos;s words, AI Overviews and AI Mode &ldquo;may use a
        &lsquo;query fan-out&rsquo; technique — issuing multiple related
        searches across subtopics and data sources&rdquo; (
        <Ext href={SRC.googleAi.href}>Google Search Central</Ext>). Ask about
        replacing a roof and the overview may draw on pages about cost,
        materials and timing, not only pages that match your exact words.
      </p>

      <h2>Which pages can be linked</h2>
      <p>
        Google sets the bar plainly: &ldquo;To be eligible to be shown as a
        supporting link in AI Overviews or AI Mode, a page must be indexed and
        eligible to be shown in Google Search with a snippet.&rdquo; Those
        links are how an overview sends visitors to websites, so for a
        business they are the part that matters.
      </p>

      <h2>When an overview appears at all</h2>
      <p>
        Not on every search. Google&apos;s help page says they appear
        &ldquo;when our systems determine that generative AI can be especially
        helpful – for example, when you want to quickly understand information
        from a range of sources&rdquo; (
        <Ext href={SRC.googleAiHelp.href}>Google Search Help</Ext>).
      </p>

      <h2>What controls what Google uses</h2>
      <p>
        For your pages in Search, Google points to the usual controls:
        &ldquo;use <code>nosnippet</code>, <code>data-nosnippet</code>,{" "}
        <code>max-snippet</code>, or <code>noindex</code>&rdquo;. One common
        mix-up: blocking <code>Google-Extended</code> in robots.txt does not
        take you out of AI Overviews. Google says it &ldquo;does not impact a
        site&apos;s inclusion in Google Search nor is it used as a ranking
        signal in Google Search&rdquo; (
        <Ext href={SRC.googleCrawlers.href}>Google&apos;s crawler documentation</Ext>).
        What it controls is whether your content may be used to train
        Google&apos;s Gemini models.
      </p>

      <h2>What this means for your site</h2>
      <p>
        There is no separate AI index to get into. Being indexed, being
        allowed a snippet, and answering the surrounding questions clearly are
        what make a page usable.{" "}
        <a href="/answers/how-to-appear-in-google-ai-overviews">
          How to get into AI Overviews
        </a>{" "}
        covers the practical steps.
      </p>
    </AnswerPage>
  );
}
