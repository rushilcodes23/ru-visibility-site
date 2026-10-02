import { AnswerPage, answerMetadata, Ext, SRC } from "@/components/answer-page";

const SLUG = "how-long-for-a-new-website-to-show-up-on-google";
export const metadata = answerMetadata(SLUG);

export default function Page() {
  return (
    <AnswerPage
      slug={SLUG}
      short={
        <>
          Google says &ldquo;crawling can take anywhere from a few days to a few
          weeks.&rdquo; That is only to be found and indexed. Ranking well for
          competitive searches usually takes much longer, and nobody can
          guarantee it.
        </>
      }
      sources={[SRC.googleRecrawl, SRC.googleSite]}
    >
      <h2>Getting indexed: days to weeks</h2>
      <p>
        Before a site can appear at all, Google has to discover it, crawl it
        and add it to its index. In Google&apos;s words: &ldquo;Crawling can
        take anywhere from a few days to a few weeks&rdquo; (
        <Ext href={SRC.googleRecrawl.href}>Google Search Central</Ext>).
      </p>
      <p>What helps:</p>
      <ul className="flex list-disc flex-col gap-2 pl-6">
        <li>Add the site to Google Search Console and submit your sitemap.</li>
        <li>Use URL Inspection to request indexing of your most important pages.</li>
        <li>Get the site linked from somewhere Google already visits: your Google Business Profile, directories, social profiles.</li>
      </ul>
      <p>
        Don&apos;t keep re-requesting. Google notes that &ldquo;requesting a
        recrawl multiple times for the same URL won&apos;t get it crawled any
        faster.&rdquo;
      </p>

      <h2>Getting ranked: months, if at all</h2>
      <p>
        Being indexed means Google knows the page exists. Appearing near the
        top for a search like &ldquo;accountant in [your city]&rdquo; depends
        on how well the page matches the search, how many established
        competitors there are, and how much of the web vouches for you. For a
        new site with no links yet, that is a matter of months of steady work,
        not days.
      </p>
      <p>
        Your business name usually comes first. Searching for it is the
        quickest way to see whether Google has picked the site up at all.
      </p>

      <h2>Checking progress</h2>
      <p>
        Search Console shows which pages are indexed and which searches you
        have started to appear for. A <code>site:</code> search is a rough
        check, but Google warns it &ldquo;doesn&apos;t necessarily return all
        the URLs that are indexed&rdquo; (
        <Ext href={SRC.googleSite.href}>Google</Ext>).
      </p>
    </AnswerPage>
  );
}
