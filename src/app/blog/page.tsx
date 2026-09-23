import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AuditCta } from "@/components/ui/audit-cta";
import { PostVisual } from "@/components/ui/post-visual";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import findings from "@/lib/research-findings.json";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Blog — SEO & GEO Insights | Ru Visibility",
  description: "Real findings on AI visibility, SEO, and growing your business online — written by Ru Visibility, not recycled advice.",
});

const N = findings.corpus.uniqueDomains.toLocaleString("en-US");

const START_HERE = [
  { href: "/research", label: "The research behind these posts" },
  { href: "/why-it-matters", label: "Why SEO & GEO matter" },
  { href: "/how-we-work", label: "How we work" },
];

/**
 * One post.
 *
 * The graphic is not decoration: PostVisual draws from that post's own
 * measured numbers. It is also what lets this index use the full width
 * honestly — a text-only card stretched across 1300px is just a long line,
 * which is why the previous version had to cap itself and left the sides
 * empty.
 *
 * The whole card is one link. The "Read now" cue is aria-hidden reinforcement
 * of that, since the link already announces itself by its heading.
 */
function PostCard({
  post,
  kicker,
}: {
  post: (typeof POSTS)[number];
  kicker?: string;
}) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="post-card card-surface group flex h-full flex-col gap-5 rounded-[14px] p-5 md:p-6"
    >
      <span aria-hidden="true" className="post-card-cue">
        Read now
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>

      <PostVisual slug={post.slug} />

      <div className="flex flex-1 flex-col">
        {kicker && <span className="post-card-kicker mb-3">{kicker}</span>}

        <h2
          className="text-xl tracking-tight text-foreground md:text-2xl"
          style={{ textWrap: "balance" }}
        >
          {post.title}
        </h2>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2.5 border-t pt-4 text-xs text-muted-foreground">
          <span className="text-foreground">{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.published}>{formatPostDate(post.published)}</time>
        </div>
      </div>
    </a>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <div className="blog-canvas page-surface w-full py-20 lg:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <header className="page-head mb-14 max-w-3xl">
            <h1 className="text-left text-4xl font-regular tracking-tighter md:text-6xl">
              Real findings, not recycled SEO advice.
            </h1>
            <p className="mt-5 text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
              Most SEO writing online is the same handful of tips reworded
              endlessly, usually by someone who hasn&apos;t run the audit
              they&apos;re describing. We&apos;d rather write less often and
              only about things we&apos;ve actually tested — what AI tools
              genuinely do with a website, what moves visibility, and what
              turns out not to matter at all.
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              Everything here is measured against the same{" "}
              <a
                href="/research"
                className="text-foreground underline underline-offset-4"
              >
                {N} audited sites
              </a>
              . The charts on these cards are that data, not stock art.
            </p>
          </header>

          {/* Two columns on desktop. With a graphic each, two cards fill the
              width without either one becoming a stretched line of text. */}
          <div className="grid gap-5 md:grid-cols-2">
            {featured && <PostCard post={featured} kicker="Latest" />}
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <section className="mt-20 grid gap-12 border-t pt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 className="text-2xl tracking-tight md:text-3xl">
                What gets written here
              </h2>
              <div className="mt-5 flex flex-col gap-4 leading-relaxed text-muted-foreground">
                <p>
                  Things we have actually tested. If we try a change on a site
                  and it moves something, that is worth writing up. If we try
                  it and nothing happens, that is worth writing up too, and it
                  is the half almost nobody publishes.
                </p>
                <p>
                  The subjects that keep coming up: how AI tools decide which
                  businesses to name, why a site can be technically perfect and
                  still invisible, what local search actually rewards now, and
                  which bits of standard SEO advice have quietly stopped being
                  true.
                </p>
                <p>
                  There is no schedule. A post goes up when there is something
                  real to say, which is why there are not many of them. Writing
                  to fill a calendar is how you end up with the recycled advice
                  this page exists to avoid.
                </p>
              </div>
            </div>

            <div>
              <h2 className="post-card-kicker mb-5">Start here</h2>
              <ul className="flex flex-col divide-y border-y">
                {START_HERE.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="group flex items-center justify-between gap-4 py-4 text-foreground transition-colors hover:text-muted-foreground"
                    >
                      <span className="text-[0.9375rem] font-medium">
                        {r.label}
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <AuditCta />
    </>
  );
}
