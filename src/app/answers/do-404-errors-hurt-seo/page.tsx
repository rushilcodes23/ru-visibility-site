import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "do-404-errors-hurt-seo";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          No, 404 errors do not hurt your site&apos;s rankings overall. Google says they are a normal part of the web and simply drops those addresses from its index over time. The harm comes when a page that matters returns a 404, or when a moved page has no redirect.
        </>
      }
      sources={[SRC.googleHttp]}
    >
      <h2>When a 404 is fine</h2>

      <p>
        Old offers, deleted posts and mistyped addresses are meant to return 404. There is no need to redirect every one of them to the homepage. Google treats that as a &quot;soft 404&quot; anyway.
      </p>

      <h2>When it costs you</h2>

      <ul>
        <li>A page that still gets visits or links from other sites was deleted or renamed without a redirect. Its earned value is lost.</li>
        <li>Your own menu, footer or buttons link to dead pages, so visitors hit errors.</li>
        <li>A real page shows &quot;not found&quot; text but returns a normal 200 code. Google reports this as a soft 404 and may drop the page.</li>
      </ul>

      <h2>How to find and fix them</h2>

      <p>
        The Pages report in Search Console lists addresses that return &quot;Not found (404)&quot;. For each one, ask whether a similar page exists. If it does, add a 301 redirect to it. If not, let it stay a 404 and fix any of your own links that point there.
      </p>
    </AnswerPage>
  );
}
