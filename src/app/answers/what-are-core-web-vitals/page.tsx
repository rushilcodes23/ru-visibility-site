import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-are-core-web-vitals";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Core Web Vitals are three measures Google uses for how a page feels to real visitors: how fast the main content appears, how quickly the page reacts to a tap or click, and how much the layout jumps while loading.
        </>
      }
      sources={[SRC.googleCwv, SRC.googlePageExp]}
    >
      <h2>The three measures and the good scores</h2>

      <ul>
        <li>Largest Contentful Paint (LCP): how long the biggest image or text block takes to appear. Good is 2.5 seconds or less.</li>
        <li>Interaction to Next Paint (INP): how quickly the page responds after a tap, click or key press. Good is 200 milliseconds or less. It replaced First Input Delay in March 2024.</li>
        <li>Cumulative Layout Shift (CLS): how much things move around as the page loads, such as a button jumping just as you tap it. Good is 0.1 or less.</li>
      </ul>

      <p>
        A page passes when at least 75% of real visits are good on each of the three.
      </p>

      <h2>Where to see your scores</h2>

      <p>
        Google Search Console has a Core Web Vitals report built from real Chrome visitors. PageSpeed Insights shows the same field data for one page, plus a lab test. A new or small site may not have enough visitors for field data, and then only the lab test shows.
      </p>

      <h2>How much they matter</h2>

      <p>
        Google uses them as part of page experience in ranking, but it says relevance comes first: a slow page with the best answer can still outrank a fast page with a weak one. Treat them as a tie-breaker and as a reason visitors stay. More in <a href="/answers/does-page-speed-affect-seo">does page speed affect SEO</a>.
      </p>
    </AnswerPage>
  );
}
