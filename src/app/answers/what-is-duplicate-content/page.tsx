import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-duplicate-content";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Duplicate content is the same or very similar text at more than one web address, on your site or across sites. Google does not penalize it in normal cases. It picks one version to show and leaves out the rest, which may not be the one you want.
        </>
      }
      sources={[SRC.googleCanonical, SRC.googleSpam]}
    >
      <h2>When it is a real problem</h2>

      <ul>
        <li>Many pages that differ only in a word, such as one service page copied for 30 towns with the town name swapped. Google may treat this as spam under its doorway abuse policy.</li>
        <li>Product descriptions copied from the manufacturer, which hundreds of other shops also use. Your page has no reason to be chosen.</li>
        <li>Your content copied by another site that Google sees first.</li>
      </ul>

      <h2>The harmless kind</h2>

      <p>
        The same page at www and non-www, with tracking codes, or in a print version. Google groups these and shows one. A <a href="/answers/what-is-a-canonical-tag">canonical tag</a> or a redirect tells it which.
      </p>

      <h2>How to fix it</h2>

      <p>
        Merge pages that say the same thing into one stronger page and redirect the others to it. Rewrite copied descriptions in your own words with details only you know: prices, photos, how you do the job. For location pages, only keep a page where you have something real to say about that place.
      </p>
    </AnswerPage>
  );
}
