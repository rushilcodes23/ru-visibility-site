import {
  AnswerPage,
  answerMetadata,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "are-google-ai-overviews-accurate";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Not always. Google&apos;s own help page says &ldquo;AI Overviews can
          and will make mistakes.&rdquo; If one says something wrong about your
          business, fix the sources it draws on, starting with your website and
          your Google Business Profile, and report the overview using its
          feedback buttons.
        </>
      }
      sources={[SRC.googleAiHelp, SRC.googleAi, SRC.gbpLocalRanking]}
    >
      <h2>Why mistakes happen</h2>
      <p>
        AI Overviews are written by generative AI, which builds an answer from
        several sources at once. If those sources are out of date, or disagree
        with each other, the summary can come out wrong: old opening hours, a
        service you stopped offering, a price from three years ago. Google
        doesn&apos;t hide this; its help page carries the warning that
        &ldquo;AI responses may include mistakes&rdquo; (
        <Ext href={SRC.googleAiHelp.href}>Google Search Help</Ext>).
      </p>

      <h2>If an overview gets your business wrong</h2>
      <ol className="flex list-decimal flex-col gap-2 pl-6">
        <li>
          <strong>Find the source.</strong> Look at the links the overview
          shows. The wrong detail usually comes from one of them.
        </li>
        <li>
          <strong>Fix your own pages first.</strong> Put the correct facts in
          plain text on your website: services, areas, hours, prices.
        </li>
        <li>
          <strong>Fix your Business Profile.</strong> Google says businesses
          with &ldquo;complete and accurate info&rdquo; do better in local
          results (
          <Ext href={SRC.gbpLocalRanking.href}>Google Business Profile Help</Ext>
          ).
        </li>
        <li>
          <strong>Fix the directories.</strong> Anywhere your details appear,
          make them match.
        </li>
        <li>
          <strong>Report it.</strong> Use the thumbs-down at the bottom of the
          overview and choose &ldquo;Report a problem&rdquo;.
        </li>
      </ol>
      <p>
        Then give it time. Google has to recrawl the corrected pages before
        an overview can reflect them.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {universal.noSameAs.sitesPct}% didn&apos;t link their
        social and listing profiles in their structured data. That link is one
        of the simplest ways to tell Google that scattered profiles all
        describe the same, current business.
      </FromOurAudits>

      <h2>How to make mistakes less likely</h2>
      <p>
        Keep your key facts in one obvious place on your site, written as
        sentences rather than only inside images. Date things that change,
        such as prices and offers. And keep every listing saying the same
        thing, so there is nothing contradictory for a summary to pick up.
      </p>
    </AnswerPage>
  );
}
