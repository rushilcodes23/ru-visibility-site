import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "does-page-speed-affect-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Yes, a little. Google uses page experience, including speed, in ranking, but it says a relevant, helpful page can outrank a faster one. The bigger cost of a slow site is visitors who leave before it loads.
        </>
      }
      sources={[SRC.googlePageExp, SRC.googleCwv]}
    >
      <h2>Where speed counts</h2>

      <p>
        Speed matters most when pages are otherwise close: two plumbers in the same town with similar pages and reviews. Then a page that loads fast and does not jump around has the edge. Speed also affects crawling on large sites, because Google fetches fewer pages from a slow server.
      </p>

      <h2>The usual causes of a slow small-business site</h2>

      <ul>
        <li>Photos uploaded straight from a camera or phone, several megabytes each.</li>
        <li>Too many plugins, chat widgets, tracking tags and sliders.</li>
        <li>Cheap shared hosting with slow server response.</li>
        <li>Big page builders that load the code for every feature on every page.</li>
      </ul>

      <h2>What to fix first</h2>

      <p>
        Resize and compress images (WebP is a good format), remove plugins and scripts you do not use, and turn on caching. Check the result in PageSpeed Insights on the mobile tab, because Google ranks the mobile version of your site. See <a href="/answers/what-are-core-web-vitals">what Core Web Vitals are</a> for the scores worth watching.
      </p>
    </AnswerPage>
  );
}
