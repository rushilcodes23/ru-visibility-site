import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "how-to-do-keyword-research-for-free";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Start with Google itself. Type your service into the search box and note the suggestions, the People Also Ask questions and the related searches at the bottom. Then check Google Search Console to see what people already searched to find you, and Google Keyword Planner for rough search volumes.
        </>
      }
      sources={[SRC.searchConsole, SRC.keywordPlanner]}
    >
      <h2>Free sources, and what each tells you</h2>

      <ul>
        <li>Google autocomplete: real searches people type. It proves a search exists, not how often. Every question in this site&apos;s answers section came from autocomplete.</li>
        <li>People Also Ask: the questions Google links to a search. Good for answer pages.</li>
        <li>Google Search Console: the searches your site already appears for, with clicks and positions. The best source once your site has some traffic.</li>
        <li>Google Keyword Planner: free with a Google Ads account. It shows search volume in broad ranges unless you run ads.</li>
        <li>Google Trends: whether interest is rising, falling or seasonal.</li>
      </ul>

      <h2>How to use what you find</h2>

      <p>
        Group searches that mean the same thing, such as &quot;dentist near me open Saturday&quot; and &quot;weekend dentist&quot;, and answer them on one page. Prefer specific searches that show intent to buy, like &quot;AC repair cost&quot;, over broad single words.
      </p>

      <h2>A common mistake</h2>

      <p>
        Picking keywords by volume alone. A small search with clear buying intent in your area is worth more to a local business than a big national one you will never rank for.
      </p>
    </AnswerPage>
  );
}
