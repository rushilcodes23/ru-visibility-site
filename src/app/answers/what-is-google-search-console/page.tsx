import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-google-search-console";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Google Search Console is a free tool from Google for website owners. It shows the searches your site appears for, how often people click, which pages Google has indexed, and problems such as pages it cannot read, slow pages or security issues. It is where Google reports directly on how Search sees your site.
        </>
      }
      sources={[SRC.searchConsole]}
    >
      <h2>What you can do with it</h2>

      <ul>
        <li>Performance: see searches, clicks, impressions and average position for each page.</li>
        <li>Pages: see which pages are indexed, which are not, and why.</li>
        <li>URL Inspection: check one page and ask Google to recrawl it after a change.</li>
        <li>Sitemaps: <a href="/answers/how-to-submit-a-sitemap-to-google">submit your sitemap</a>.</li>
        <li>Core Web Vitals, security issues and manual actions.</li>
      </ul>

      <h2>How to set it up</h2>

      <p>
        Go to search.google.com/search-console, add your website and prove you own it. The Domain option, verified by adding a record in your domain&apos;s DNS settings, covers every version of your site.
      </p>

      <h2>Search Console or Google Analytics?</h2>

      <p>
        Search Console shows what happens on Google before people reach your site. Google Analytics shows what visitors do once they arrive. Most businesses use both, and Search Console is the one that answers SEO questions.
      </p>
    </AnswerPage>
  );
}
