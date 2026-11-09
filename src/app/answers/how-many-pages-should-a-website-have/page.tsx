import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "how-many-pages-should-a-website-have";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          There is no ideal number. Google ranks pages, not websites, so each separate thing people search for, such as a service, a place you serve or a common question, deserves its own useful page. Adding pages only to have more pages does not help and can count against you.
        </>
      }
      sources={[SRC.googleHelpful, SRC.googleSpam]}
    >
      <h2>A sensible starting point for a small business</h2>

      <ul>
        <li>Home page.</li>
        <li>One page per main service, with real detail.</li>
        <li>About page with who you are and your experience.</li>
        <li>Contact page with address, phone and hours.</li>
        <li>Pages for the areas you serve, only where you have something specific to say about each.</li>
        <li>Answers to common customer questions.</li>
      </ul>

      <h2>Why more is not always better</h2>

      <p>
        Google&apos;s spam policies name doorway abuse and scaled content abuse: many pages made mainly to catch searches, with little value of their own. Thirty copies of one page with a different town name is the classic doorway example. Weak pages can also drag down how Google sees the whole site.
      </p>

      <h2>How to judge a page</h2>

      <p>
        Ask whether a customer would be glad to land on it. If two pages answer the same question, merge them. If a page has nothing a competitor&apos;s page does not, add your own details or remove it.
      </p>
    </AnswerPage>
  );
}
