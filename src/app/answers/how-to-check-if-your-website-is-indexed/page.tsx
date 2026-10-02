import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "how-to-check-if-your-website-is-indexed";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          The reliable way is the URL Inspection tool in Google Search Console,
          which says whether a specific page is indexed and, if not, why. A{" "}
          <code>site:yourdomain.com</code> search gives a rough picture, but
          Google says it &ldquo;doesn&apos;t necessarily return all the URLs that
          are indexed.&rdquo;
        </>
      }
      sources={[SRC.googleSite, SRC.googleRecrawl]}
    >
      <h2>The quick check: a site: search</h2>
      <p>
        Type <code>site:yourdomain.com</code> into Google. You will see pages
        Google has indexed from your site. It is a fair first look, with two
        limits Google spells out: the operator &ldquo;doesn&apos;t necessarily
        return all the URLs that are indexed&rdquo;, and &ldquo;bigger sites
        shouldn&apos;t expect to see all their URLs in the results&rdquo; (
        <Ext href={SRC.googleSite.href}>Google</Ext>). So a page missing from
        the list isn&apos;t proof it is missing from Google.
      </p>

      <h2>The reliable check: Search Console</h2>
      <ol className="flex list-decimal flex-col gap-2 pl-6">
        <li>Add your site to Google Search Console and verify that you own it. It is free.</li>
        <li>Paste a page address into the URL Inspection bar at the top.</li>
        <li>
          Read the result. It tells you whether the page is on Google, and if
          it isn&apos;t, the reason: blocked, marked noindex, a duplicate of
          another page, or not crawled yet.
        </li>
      </ol>
      <p>
        For the whole site, the Page indexing report lists which pages are
        indexed and groups the rest by reason.
      </p>

      <h2>If a page isn&apos;t indexed</h2>
      <p>
        Fix the reason first, then use Request indexing in URL Inspection.
        Google adds that &ldquo;there&apos;s a quota for submitting individual
        URLs and requesting a recrawl multiple times for the same URL
        won&apos;t get it crawled any faster&rdquo; (
        <Ext href={SRC.googleRecrawl.href}>Google Search Central</Ext>), so ask
        once and give it time.
      </p>
      <p>
        Being indexed is necessary for Google&apos;s AI Overviews too: Google
        says a page must be &ldquo;indexed and eligible to be shown in Google
        Search with a snippet&rdquo; to be linked from one.
      </p>
    </AnswerPage>
  );
}
