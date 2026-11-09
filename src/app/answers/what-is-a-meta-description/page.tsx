import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-a-meta-description";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          A meta description is a one or two sentence summary of a page, set in its code. Google often shows it under the blue title in search results. It does not affect rankings, but it is your pitch to the person deciding whether to click.
        </>
      }
      sources={[SRC.googleSnippets]}
    >
      <h2>How long should a meta description be?</h2>

      <p>
        Google sets no limit, but it cuts the text shown in results to fit the screen. Around 150 to 160 characters usually shows in full on a computer and a little less on a phone. Put the most useful words first.
      </p>

      <h2>How to write one</h2>

      <ul>
        <li>Describe this page, not the whole business.</li>
        <li>Answer what the searcher wants to know: what you offer, where, and why choose you.</li>
        <li>Write a different one for every important page. Copied descriptions are often ignored.</li>
        <li>Use plain sentences. Lists of keywords look like spam and get rewritten.</li>
      </ul>

      <h2>Why Google sometimes shows different text</h2>

      <p>
        Google picks the snippet for each search. If another part of your page answers the search better, Google shows that instead of your meta description. That is normal. A clear, specific description just raises the chance yours is used.
      </p>
    </AnswerPage>
  );
}
