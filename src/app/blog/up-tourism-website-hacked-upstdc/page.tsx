import { AuditCta } from "@/components/ui/audit-cta";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

// Checked by hand on 25 October 2026: Google results for site:upstdc.co.in (screenshot below) and the homepage fetched
// as a visitor and as Googlebot. Short first version - Rushil will refine it.

const SLUG = "up-tourism-website-hacked-upstdc";
const TITLE = "UP Government Tourism Website (upstdc.co.in) Is Hacked: Thai Gambling Pages in Google";
const SEARCH_TITLE = "UP Tourism Website upstdc.co.in Hacked: Thai Slot Spam";

export const metadata = pageMetadata({
  path: `/blog/${SLUG}`,
  title: SEARCH_TITLE,
  description:
    "The Uttar Pradesh State Tourism (UPSTDC) website upstdc.co.in is hacked: Google shows Thai slot and betting pages under it. What it looks like and how to check.",
  type: "article",
  image: `/covers/${SLUG}.png`,
});

const post = POSTS.find((p) => p.slug === SLUG)!;

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: post.excerpt,
  datePublished: post.published,
  author: { "@type": "Person", name: post.author, url: "https://ruvisibility.com/about" },
  publisher: { "@type": "Organization", name: "Ru Visibility", url: "https://ruvisibility.com" },
  image: `https://ruvisibility.com/covers/${SLUG}.png`,
  mainEntityOfPage: `https://ruvisibility.com/blog/${SLUG}`,
  keywords: "UP government website hacked, UP Tourism website hacked, upstdc.co.in hacked, UPSTDC hacked, Uttar Pradesh tourism website hacked, government website hacked India",
};

export default function UpTourismHackPost() {
  return (
    <article className="w-full pb-20 pt-24 lg:pb-32 lg:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }} />
      <div className="container mx-auto max-w-[52rem] px-4">
        <header className="mb-10">
          <h1 className="text-[2.1rem] font-regular leading-[1.08] tracking-tighter md:text-[3.2rem]" style={{ textWrap: "balance" }}>
            {TITLE}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-5 text-sm text-muted-foreground">
            <span className="text-foreground">{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>Founder, Ru Visibility</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published}>{formatPostDate(post.published)}</time>
          </div>
        </header>

        <div className="article-body flex flex-col gap-6">
          <p>
            The official website of the Uttar Pradesh State Tourism Development Corporation (UPSTDC), <strong>upstdc.co.in</strong>,
            is hacked. When I searched Google for <code>site:upstdc.co.in</code> on 25 October 2026, the results were full of Thai
            gambling pages: slot games, &quot;free credit&quot; slots, 365bet and a &quot;Dragon Games – Get a ₹900 reward&quot;
            app page, all listed under the UP Tourism web address.
          </p>

          <figure className="flex flex-col gap-2">
            <img
              src="/blog/upstdc-google-thai-slot-results.webp"
              width={1024}
              height={705}
              alt="Google search results for site:upstdc.co.in showing Thai slot and betting page titles under the UP Tourism website"
              className="w-full rounded-lg border"
            />
            <figcaption className="text-sm text-muted-foreground">
              Google results for site:upstdc.co.in, 25 October 2026. The Thai titles say things like &quot;slot 1234 free credit&quot;
              and &quot;try slot games&quot;.
            </figcaption>
          </figure>

          <h2 id="what">What the UP Tourism hack looks like</h2>
          <p>
            If you open upstdc.co.in in a normal browser, you see the real tourism website. That is why it is easy to miss. But when
            Google&apos;s crawler asks for the same homepage, the server sends back a different page titled
            &nbsp;<strong>&quot;สล็อตได้เงินจริง&quot;</strong> – Thai for &quot;slots, real money&quot;. Showing Google one page and
            visitors another is called <strong>cloaking</strong>, and it is a common way hackers use a trusted government domain to push
            gambling sites up in search results.
          </p>
          <p>
            The spam pages also sit on UPSTDC sub-addresses such as contractor.upstdc.co.in and feedback.upstdc.co.in, so this is not one
            stray page.
          </p>

          <h2 id="why">Why it matters</h2>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>People searching for UP tourism, hotels or bookings can land on gambling pages carrying a government name.</li>
            <li>Google can mark a hacked site as unsafe, which pushes real tourism pages down.</li>
            <li>A government domain is trusted, so it is valuable to spammers – the longer it stays, the more pages they add.</li>
          </ul>

          <h2 id="check">How to see it yourself</h2>
          <ol className="list-decimal pl-6 flex flex-col gap-2">
            <li>
              Search Google for <code>site:upstdc.co.in</code>. The Thai slot titles show in the results.
            </li>
            <li>
              Open Google&apos;s <a href="https://search.google.com/test/rich-results">Rich Results Test</a>, paste upstdc.co.in, then
              click <em>View tested page</em>. The HTML there is what Google receives – the gambling page, not the tourism site.
            </li>
          </ol>

          <h2 id="next">What should happen next</h2>
          <p>
            The site owner needs to remove the spam pages and the code that serves them, find and close the way the attackers got in,
            change every password, and ask Google to recrawl the site in Search Console. In India, hacked government websites can be
            reported to CERT-In at <a href="mailto:incident@cert-in.org.in">incident@cert-in.org.in</a>.
          </p>

          <h2 id="not-only">It is not only government websites</h2>
          <p>
            The same kind of hack is common on business websites, and owners rarely notice because their own visits look normal. In
            October 2026 I checked 1,360 business websites in Raipur and found 45 hacked – hospitals, clinics, hotels, builders and
            jewellers – with casino pages, hidden gambling links or redirects to betting sites.
          </p>
          <p>
            If you want to know whether your website has hidden spam that Google sees and you don&apos;t,{" "}
            <a href="https://ruvisibility.com">Ru Visibility</a> checks it the way Google does and tells you in plain English what is wrong.
          </p>
        </div>
      </div>
      <AuditCta />
    </article>
  );
}
