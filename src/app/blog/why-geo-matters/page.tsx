import { Button } from "@/components/ui/button";
import { AuditCta } from "@/components/ui/audit-cta";
import ReadingProgress from "@/components/reading-progress";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/blog/why-geo-matters",
  title: "Why GEO Matters — Ru Visibility",
  description: "GEO isn't a buzzword — it's whether AI tools recommend your business at all. Rushil, founder of Ru Visibility, on why this matters now.",
  type: "article",
});

/** Inline emphasis for the lines worth remembering. Same treatment as the
 * 21-mistakes post: a soft green wash rather than an underline, which sits
 * through descenders at this size and reads as a strikethrough. clone keeps
 * it continuous when the phrase wraps across a line. */
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <mark
      className="font-medium text-foreground"
      style={{
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        background: "color-mix(in oklch, var(--accent-green) 22%, transparent)",
        borderRadius: "3px",
        padding: "0.08em 0.24em",
        margin: "0 -0.06em",
      }}
    >
      {children}
    </mark>
  );
}

const post = POSTS.find((p) => p.slug === "why-geo-matters")!;

/** Section anchors for the contents rail. Only three here, against 21 on the
 * other post, but the rail is the same idea at any length: it is what fills
 * the space beside the prose instead of leaving it empty. */
const SECTIONS = [
  { id: "different-from-seo", label: "Why it's different from regular SEO" },
  { id: "cant-promise", label: "What I can't promise you" },
  { id: "what-to-do", label: "What I'd actually tell you to do" },
];

/** ~750 words at 220wpm. */
const READ_MINUTES = 4;

const postJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why GEO Matters",
  description:
    "GEO isn't a buzzword — it's whether AI tools recommend your business at all.",
  author: { "@type": "Person", name: post.author },
  publisher: { "@type": "Organization", name: "Ru Visibility", logo: "https://ruvisibility.com/logo-mark.png" },
  datePublished: post.published,
  dateModified: post.updated ?? post.published,
  mainEntityOfPage: "https://ruvisibility.com/blog/why-geo-matters",
};

export default function WhyGeoMattersPost() {
  return (
    <article className="w-full pb-20 pt-24 lg:pb-32 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <ReadingProgress />

      <div className="container mx-auto max-w-[78rem] px-4">
        <div className="article-shell">
          <aside className="article-rail" aria-label="Article contents">
            <p className="article-rail-title">In this piece</p>
            <nav>
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="article-scrim min-w-0">
            {/* No eyebrow above the headline, same as the other post — the
                title says what this is. */}
            <header className="mb-12">
              <h1
                className="text-[2.1rem] font-regular leading-[1.1] tracking-tighter md:text-[3.25rem]"
                style={{ textWrap: "balance" }}
              >
                Why GEO Matters
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-5 text-sm text-muted-foreground">
                <span className="text-foreground">{post.author}</span>
                <span aria-hidden="true">·</span>
                <span>Founder</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                <span aria-hidden="true">·</span>
                <span>{READ_MINUTES} min read</span>
                {post.updated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated{" "}
                      <time dateTime={post.updated}>
                        {formatPostDate(post.updated)}
                      </time>
                    </span>
                  </>
                )}
              </div>
            </header>

            <div className="article-body flex flex-col gap-6">
              <p>
                A few years ago, if your business wasn&apos;t on Google, you were
                basically invisible. That&apos;s still true — but it&apos;s no
                longer the whole story. A growing number of people now ask
                ChatGPT, Gemini, or Perplexity directly for a recommendation
                instead of typing into a search bar. If those tools don&apos;t
                know your business exists, or have no reason to recommend it
                over a competitor,{" "}
                <Mark>you&apos;re invisible to that entire channel</Mark> — one
                that barely existed a few years ago and is only growing.
              </p>

              <p>
                That&apos;s what GEO — Generative Engine Optimization — actually
                is. Not a buzzword, not a rebrand of SEO.
              </p>

              <blockquote className="my-2 rounded-md border-l-4 border-primary bg-muted py-5 pl-6 pr-5 text-lg font-medium leading-relaxed text-foreground md:text-xl">
                GEO is making sure AI systems can read your site, understand what
                you offer, and have real reasons to recommend you when someone
                asks.
              </blockquote>

              <h2 id="different-from-seo">
                Why it&apos;s different from regular SEO
              </h2>
              <p>
                Traditional SEO is largely about ranking in a list of blue links.
                <Mark>GEO is about being the answer itself</Mark> — the one thing
                an AI tool names, often with nothing else shown beside it. There
                is no second place on that list. It also means the old playbook
                works differently: keyword stuffing in particular measures{" "}
                <em>worse</em> than making no change at all in the published
                research on this, which is not something you can say about most
                SEO advice.
              </p>

              <h2 id="cant-promise">What I can&apos;t promise you</h2>
              <p>
                I won&apos;t tell you GEO is guaranteed to work a certain way by a
                certain date — nobody can honestly say that. AI models retrain on
                their own schedule, and what gets a business named today can
                shift. Anyone quoting you a guaranteed citation is guessing.
              </p>
              <p>
                What doesn&apos;t change is the cost of doing nothing. If a
                competitor is visible and you&apos;re not, they get the customer.
                That loss never shows up as an error message. It just looks like a
                customer who went somewhere else.
              </p>

              <h2 id="what-to-do">What I&apos;d actually tell you to do</h2>
              <p>
                Start by finding out where you actually stand. Open ChatGPT or
                Perplexity and ask for a business like yours, the way a customer
                would — then note which names come back and whether yours is among
                them. That takes ten minutes and costs nothing, and it is the
                same first step our audit takes.
              </p>

              <p>
                Then check the plumbing. A surprising number of sites are shut out
                by something nobody chose: a firewall rule refusing the crawlers
                that answer questions, or a robots.txt line inherited from a
                template. We measured that across{" "}
                <a href="/research">every site we have audited</a> — it is
                more common than you would expect, and it is usually a
                five-minute fix once you know.
              </p>

              <p>
                After that it stops being a one-time job. GEO isn&apos;t something
                you fix once and forget, which is why we built Ru Visibility
                around ongoing work rather than a single report.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t">
              <Button render={<a href="#audit">Get Your Visibility Audit</a>} />
            </div>
          </div>
        </div>
      </div>
      <AuditCta />
    </article>
  );
}
