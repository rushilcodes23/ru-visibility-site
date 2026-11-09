import { AnswerPage, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "what-is-a-sitemap";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          A sitemap is a file, usually at yoursite.com/sitemap.xml, that lists the pages you want search engines to find. It can also say when each page last changed. It helps Google discover pages faster. It does not make them rank higher.
        </>
      }
      sources={[SRC.googleSitemaps, SRC.googleBuildSitemap]}
    >
      <h2>Does a small website need one?</h2>

      <p>
        Google says a small site with good links between its pages may not need a sitemap, because its crawler can follow the links. It still costs nothing to have one, and most website builders such as WordPress, Shopify, Wix and Squarespace make one for you.
      </p>

      <h2>What a good sitemap contains</h2>

      <ul>
        <li>Only pages you want in Google: no thank-you pages, test pages or duplicates.</li>
        <li>The final address of each page, not one that redirects.</li>
        <li>A last-modified date that changes only when the page really changed. Google uses this date when it trusts it, and ignores the priority and change-frequency fields.</li>
      </ul>

      <p>
        One sitemap file can hold up to 50,000 addresses. Larger sites split it into several files.
      </p>

      <h2>How to check yours</h2>

      <p>
        Open yoursite.com/sitemap.xml in a browser. If nothing loads, try /sitemap_index.xml or look at the last lines of /robots.txt, where the sitemap address is often listed. Then <a href="/answers/how-to-submit-a-sitemap-to-google">submit it to Google</a> so you can see which pages Google has picked up.
      </p>
    </AnswerPage>
  );
}
