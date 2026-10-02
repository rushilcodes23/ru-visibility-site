import {
  AnswerPage,
  answerMetadata,
  CodeBlock,
  Ext,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "why-is-my-website-not-showing-up-on-google";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Usually one of four things: Google hasn&apos;t found the site yet,
          something tells Google not to index it, Google can&apos;t reach it,
          or it is indexed but other pages answer the search better. Google
          Search Console, which is free, tells you which.
        </>
      }
      sources={[SRC.googleRecrawl, SRC.googleSite]}
    >
      <h2>First, find out which problem you have</h2>
      <p>
        Search Google for your exact business name. If your site comes up for
        that but not for &ldquo;plumber in [your town]&rdquo;, Google knows
        about you and the issue is ranking. If it doesn&apos;t come up even
        for your name, the issue is that Google hasn&apos;t found or
        isn&apos;t indexing the site.
      </p>

      <h2>1. Google hasn&apos;t found it yet</h2>
      <p>
        New sites and new pages take time. Google says crawling &ldquo;can take
        anywhere from a few days to a few weeks&rdquo; (
        <Ext href={SRC.googleRecrawl.href}>Google Search Central</Ext>). You can
        help by adding the site to Google Search Console and submitting a
        sitemap, the list of your pages.
      </p>

      <h2>2. Something tells Google to stay away</h2>
      <p>
        A <code>noindex</code> tag on a page, often left switched on from when
        the site was being built, or a robots.txt rule like this one, which
        blocks the whole site:
      </p>
      <CodeBlock label="A robots.txt rule that blocks every crawler from the whole site">
        {`User-agent: *
Disallow: /`}
      </CodeBlock>
      <p>
        On WordPress, check Settings → Reading for a box labelled
        &ldquo;Discourage search engines from indexing this site&rdquo;.
      </p>

      <FromOurAudits>
        Of <OurAudits />, {universal.anyNoindex.sitesPct}% had at least one page
        told to hide from search engines, sometimes on purpose and often by
        accident, and {Math.round((100 - universal.sitemapFound.sitesPct) * 10) / 10}%
        had no sitemap we could find.
      </FromOurAudits>

      <h2>3. Google can&apos;t reach it</h2>
      <p>
        Server errors, a site that is down at the wrong moment, or a security
        setting refusing Google&apos;s crawler. Search Console reports these
        under Page indexing.
      </p>

      <h2>4. It&apos;s indexed, just not ranking</h2>
      <p>
        If Google knows the page but other businesses appear first, the work is
        relevance and trust: pages that clearly match what people search for,
        a complete Google Business Profile if you serve a local area, and
        other sites mentioning you. That takes longer, and nobody can promise a
        position.
      </p>

      <h2>The fastest way to get a straight answer</h2>
      <p>
        In Search Console, paste a page address into URL Inspection. It tells
        you whether that page is indexed and, if not, why. A{" "}
        <code>site:yourdomain.com</code> search gives a rough picture, but
        Google says it &ldquo;doesn&apos;t necessarily return all the URLs that
        are indexed&rdquo; (<Ext href={SRC.googleSite.href}>Google</Ext>).
      </p>
    </AnswerPage>
  );
}
