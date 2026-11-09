import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-local-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Local SEO is the work of getting a business found when people search for something nearby, such as &quot;dentist near me&quot; or &quot;electrician in Leeds&quot;. Those searches show a map with three businesses, then normal results. Your Google Business Profile, your reviews and your website all feed into both.
        </>
      }
      sources={[SRC.gbpLocalRanking]}
    >
      <h2>How Google picks local results</h2>

      <p>
        Google says local results are based on three things:
      </p>

      <ul>
        <li>Relevance: how well your profile and website match the search.</li>
        <li>Distance: how far you are from the searcher or the place named.</li>
        <li>Prominence: how well known you are, from reviews, links, articles and your position in normal search results.</li>
      </ul>

      <p>
        You cannot change distance, so the work goes into the other two.
      </p>

      <h2>What local SEO usually includes</h2>

      <ul>
        <li>A complete, accurate Google Business Profile with the right categories.</li>
        <li>Steady, genuine reviews, with replies.</li>
        <li>A website with a page for each service and the areas you serve.</li>
        <li>The same name, address and phone number everywhere your business is listed.</li>
        <li>Mentions from local sites: news, associations, suppliers.</li>
      </ul>

      <h2>Who needs it</h2>

      <p>
        Any business that serves customers in a place: clinics, trades, restaurants, shops, lawyers. If you serve customers at their address without a public office, see <a href="/answers/what-is-a-service-area-business">what a service-area business is</a>.
      </p>
    </AnswerPage>
  );
}
