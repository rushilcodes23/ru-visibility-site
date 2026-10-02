import { AnswerPage, answerMetadata, Ext, SRC, universal } from "@/components/answer-page";

const SLUG = "how-long-does-an-seo-audit-take";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          The automated part is quick: crawling a small business website takes
          minutes. Checking what the crawl found, ruling out false alarms and
          turning it into a fix list in the right order is what takes the time,
          and that depends on the size of the site and how deep the audit goes.
        </>
      }
      sources={[SRC.googleRecrawl]}
    >
      <h2>The crawl: minutes</h2>
      <p>
        An audit starts with software visiting your pages the way a search
        engine does: following links, recording status codes, titles,
        headings, speed and structured data. For a site with tens of pages
        that is quick. For a site with thousands it takes longer, mostly
        because there is more to look at afterwards.
      </p>

      <h2>The review: where the time goes</h2>
      <p>
        Raw output needs a person. Tools flag things that look wrong but
        aren&apos;t, and some problems only show up when someone reads the
        pages. We learned this on our own data: our broken-link figure
        dropped from 9.8% of sites to {universal.brokenInternalLinks.sitesPct}%
        once we stopped counting links that a site&apos;s firewall refused to
        our checker but that work fine for visitors (
        <a href="/blog/seo-mistakes-from-1500-audits">the correction is here</a>
        ). Telling those apart is the slow, valuable part.
      </p>

      <h2>The write-up: short, and in order</h2>
      <p>
        A useful audit ends with a short list in plain English: what is
        wrong, why it matters, and what to fix first. If you receive a long
        document with no order to it, the thinking hasn&apos;t been done yet.
      </p>

      <h2>Seeing results takes longer than the audit</h2>
      <p>
        Fixes only count once Google has crawled the corrected pages, and
        Google says crawling &ldquo;can take anywhere from a few days to a few
        weeks&rdquo; (
        <Ext href={SRC.googleRecrawl.href}>Google Search Central</Ext>). So
        judge an audit by whether its fixes were right, checked again a few
        weeks later, not by how fast the report arrived.
      </p>
      <p>
        Our first check is free: send your web address using the form below.
      </p>
    </AnswerPage>
  );
}
