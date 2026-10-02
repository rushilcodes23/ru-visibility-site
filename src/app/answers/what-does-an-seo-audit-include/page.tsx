import {
  AnswerPage,
  answerMetadata,
  FromOurAudits,
  OurAudits,
  SRC,
  universal,
} from "@/components/answer-page";

const SLUG = "what-does-an-seo-audit-include";
export const metadata = answerMetadata(SLUG);

const noSitemap = Math.round((100 - universal.sitemapFound.sitesPct) * 10) / 10;

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          A proper SEO audit checks whether Google can reach and index your
          pages, how each page is titled and described, how fast and
          phone-friendly the site is, whether links work, and whether
          structured data is valid. A current one also checks whether AI tools
          can read your site, since they now send customers too.
        </>
      }
      sources={[SRC.googleAi, SRC.richResults]}
    >
      <h2>1. Can Google find and index your pages?</h2>
      <p>
        The robots.txt file, the sitemap, any <code>noindex</code> tags, and
        canonical tags that say which version of a page is the original. A
        mistake here hides pages completely, so it comes first.
      </p>

      <h2>2. Is each page clearly labelled?</h2>
      <p>
        Every page needs its own title, a short description, and one main
        heading that says what the page is about. Two pages competing for the
        same search with near-identical titles is a common, quiet problem.
      </p>

      <h2>3. Does the site work properly?</h2>
      <p>
        Speed and Google&apos;s Core Web Vitals, how the site behaves on a
        phone, secure HTTPS, broken links and redirects that bounce through
        several addresses before loading.
      </p>

      <h2>4. Is the structured data valid?</h2>
      <p>
        Structured data describes your business to machines: name, address,
        opening hours, services. It needs to be accurate and free of errors;
        Google&apos;s Rich Results Test checks it.
      </p>

      <h2>5. Is the content worth finding?</h2>
      <p>
        Thin pages, duplicated pages, and whether your pages actually answer
        what customers ask.
      </p>

      <h2>6. Can AI tools read it too?</h2>
      <p>
        Whether ChatGPT&apos;s, Claude&apos;s and Perplexity&apos;s crawlers
        are allowed in, and whether your important text is in the page rather
        than only appearing after JavaScript runs. Classic audits skip this;
        it is now part of being found.{" "}
        <a href="/answers/what-is-an-ai-visibility-audit">More on AI visibility audits</a>.
      </p>

      <FromOurAudits>
        What turned up across <OurAudits />: {universal.missingMetaSomewhere.sitesPct}%
        had a page with no meta description, {universal.missingH1Somewhere.sitesPct}%
        a page with no main heading, {universal.anyNoindex.sitesPct}% a page told
        to stay out of search engines, and {noSitemap}% had no sitemap we
        could find. Every site enforced HTTPS.
      </FromOurAudits>

      <h2>What you should get at the end</h2>
      <p>
        A short, ordered list: what is wrong, why it matters, and what to fix
        first, in plain English. Our first check is free if you want to see
        one: send your web address using the form below.
      </p>
    </AnswerPage>
  );
}
