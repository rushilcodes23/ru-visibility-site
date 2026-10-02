import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "how-to-appear-in-google-ai-overviews";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Google says there is no special trick: &ldquo;To be eligible to be
          shown as a supporting link in AI Overviews or AI Mode, a page must be
          indexed and eligible to be shown in Google Search with a
          snippet.&rdquo; Past that, you need the clearest, most trustworthy
          answer to the question being asked.
        </>
      }
      sources={[SRC.googleAi, SRC.gbpLocalRanking]}
    >
      <h2>Meet Google&apos;s two requirements</h2>
      <p>
        <strong>Indexed.</strong> The page has to be in Google&apos;s index.
        Google Search Console&apos;s URL Inspection tool tells you whether it
        is;{" "}
        <a href="/answers/how-to-check-if-your-website-is-indexed">here is how to check</a>.
      </p>
      <p>
        <strong>Eligible for a snippet.</strong> A page that uses{" "}
        <code>nosnippet</code> or a very small <code>max-snippet</code> limits
        what Google may show from it. Google lists those, along with{" "}
        <code>data-nosnippet</code> and <code>noindex</code>, as the controls for
        limiting what appears from your pages (
        <Ext href={SRC.googleAi.href}>Google Search Central</Ext>). Only use them
        where you mean to.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {universal.anyNoindex.sitesPct}% had at least one page
        told to stay out of search engines, sometimes on purpose and often by
        accident. A page like that can&apos;t be a supporting link anywhere in
        Google.
      </FromOurAudits>

      <h2>You don&apos;t need special markup</h2>
      <p>
        Google is explicit: &ldquo;You don&apos;t need to create new machine
        readable files, AI text files, or markup to appear in these features.
        There&apos;s also no special schema.org structured data that you need
        to add.&rdquo; Treat anyone selling an &ldquo;AI Overview schema
        package&rdquo; with suspicion.
      </p>

      <h2>Answer the whole question, not just the phrase</h2>
      <p>
        Google says AI Overviews and AI Mode &ldquo;may use a &lsquo;query
        fan-out&rsquo; technique — issuing multiple related searches across
        subtopics and data sources&rdquo;. So the pages that get linked tend to
        be the ones covering what someone really needs to know: what it costs,
        how long it takes, what to watch out for, who it suits. Put those
        answers in plain sentences near the top of the relevant page.
      </p>

      <h2>If you serve a local area</h2>
      <p>
        Keep your Google Business Profile complete and accurate. Google says
        &ldquo;businesses with complete and accurate info are more likely to
        show up in local search results&rdquo; (
        <Ext href={SRC.gbpLocalRanking.href}>Google Business Profile Help</Ext>).
      </p>

      <h2>What nobody can promise</h2>
      <p>
        Google decides when an AI Overview appears and which pages it links.
        Meeting the requirements makes you eligible; it doesn&apos;t guarantee
        a place.
      </p>
    </AnswerPage>
  );
}
