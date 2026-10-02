import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "what-is-generative-engine-optimization";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Generative engine optimization (GEO) is the work of making your
          business easy for AI answer tools, such as ChatGPT, Gemini, Perplexity
          and Google&apos;s AI Overviews, to find, understand and cite. The
          term comes from a research paper first published in November 2023
          and accepted at the KDD 2024 conference.
        </>
      }
      sources={[SRC.geoPaper, SRC.googleAi]}
    >
      <h2>Where the name comes from</h2>
      <p>
        &ldquo;Generative&rdquo; refers to AI tools that write an answer
        instead of showing a list of links. In <em>GEO: Generative Engine
        Optimization</em>, Pranjal Aggarwal and five co-authors described it
        as &ldquo;the first novel paradigm to aid content creators in
        improving their content visibility in generative engine
        responses&rdquo;. Their tests found that GEO &ldquo;can boost
        visibility by up to 40% in generative engine responses&rdquo;, and that
        what works &ldquo;varies across domains&rdquo; (
        <Ext href={SRC.geoPaper.href}>the paper on arXiv</Ext>).
      </p>

      <h2>What the work involves</h2>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Access:</strong> letting the crawlers AI tools use read your
          site, instead of turning them away by accident.
        </li>
        <li>
          <strong>Clarity:</strong> pages that say plainly what you do, for
          whom and where, with short answers to the questions people ask.
        </li>
        <li>
          <strong>Consistency:</strong> the same business details on your
          site, your Google Business Profile and directories.
        </li>
        <li>
          <strong>Evidence:</strong> facts, figures, sources and outside
          mentions that make you worth citing.
        </li>
      </ul>

      <h2>How it relates to SEO</h2>
      <p>
        SEO helps you rank in a list; GEO helps you get mentioned in an
        answer. They share a foundation: Google says &ldquo;the best practices
        for SEO remain relevant for AI features in Google Search&rdquo; (
        <Ext href={SRC.googleAi.href}>Google Search Central</Ext>). The longer
        version is in our article{" "}
        <a href="/blog/seo-vs-geo">SEO vs GEO: How Search Is Changing for Businesses</a>.
      </p>

      <h2>Other names for the same thing</h2>
      <p>
        You will also see AEO (answer engine optimization), LLMO (large
        language model optimization) and &ldquo;AI SEO&rdquo;. They overlap
        almost entirely; agencies use whichever name their clients search for.{" "}
        <a href="/services#what-these-mean">Our plain-English table</a> says
        which are genuinely different and which are new labels for the same
        work.
      </p>
    </AnswerPage>
  );
}
