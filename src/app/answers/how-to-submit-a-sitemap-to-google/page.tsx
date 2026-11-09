import { AnswerPage, CodeBlock, Ext, SRC, answerMetadata } from "@/components/answer-page";

const SLUG = "how-to-submit-a-sitemap-to-google";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Add and verify your website in Google Search Console, open the Sitemaps report, type your sitemap address (often sitemap.xml) and press Submit. Also add a line to your robots.txt file that points to it, so other search engines find it too.
        </>
      }
      sources={[SRC.googleBuildSitemap, SRC.searchConsole]}
    >
      <h2>Step by step</h2>

      <ul>
        <li>Open <Ext href="https://search.google.com/search-console">Google Search Console</Ext> and add your website. A Domain property, verified through your domain&apos;s DNS settings, covers every version of your site.</li>
        <li>In the left menu, open Sitemaps.</li>
        <li>Type the end of your sitemap address, for example sitemap.xml, and press Submit.</li>
        <li>Come back after a few days. The report shows whether Google could read the file and how many pages it found.</li>
      </ul>

      <h2>Add it to robots.txt as well</h2>

      <p>
        Put this line anywhere in your robots.txt file, with your own address:
      </p>

      <CodeBlock label="robots.txt line pointing to a sitemap">
        {`Sitemap: https://www.example.com/sitemap.xml`}
      </CodeBlock>

      <h2>What submitting does not do</h2>

      <p>
        Submitting tells Google the pages exist. It does not promise Google will index them all. If the report says pages were found but they still do not show up, read <a href="/answers/how-to-check-if-your-website-is-indexed">how to check if your website is indexed</a>. The old &quot;ping&quot; address that some plugins used to notify Google no longer works, so Search Console and robots.txt are the two ways that count.
      </p>
    </AnswerPage>
  );
}
