import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-internal-linking";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Internal links are links from one page on your website to another page on the same site, such as a link from a blog post to a service page. They help Google find pages, tell it what each linked page is about, and show which pages you consider most important.
        </>
      }
      sources={[SRC.googleLinks]}
    >
      <h2>Why they matter</h2>

      <p>
        Google finds most pages by following links. A page with no links pointing to it, sometimes called an orphan page, may be found late or not at all. The words in a link, the anchor text, also tell Google and visitors what to expect on the other side.
      </p>

      <h2>How to do it well</h2>

      <ul>
        <li>Link with descriptive words, such as &quot;teeth whitening prices&quot;, not &quot;click here&quot;.</li>
        <li>Link from pages that get visits to the pages you want to rank, usually service pages.</li>
        <li>Link related topics together: a post about leaking taps should link to your tap repair service.</li>
        <li>Use normal links that work without clicking a menu script. Google follows standard links with an address.</li>
        <li>Keep the menu simple, then use links within text for depth.</li>
      </ul>

      <h2>A quick check</h2>

      <p>
        Pick your most important service page and count how many of your own pages link to it. If the answer is only the menu, add links from related posts and pages. This page links to related answers for the same reason.
      </p>
    </AnswerPage>
  );
}
