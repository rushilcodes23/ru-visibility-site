import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AuditCta } from "@/components/ui/audit-cta";
import { POSTS, formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Blog — SEO & GEO Insights | Ru Visibility",
  description: "Real findings on AI visibility, SEO, and growing your business online — written by Ru Visibility, not recycled advice.",
});

const START_HERE = [
  { href: "/research", label: "The research behind these posts" },
  { href: "/why-it-matters", label: "Why SEO & GEO matter" },
  { href: "/how-we-work", label: "How we work" },
];

/**
 * One post, as a card. Same treatment for every post regardless of position —
 * the previous version gave the newest post an inverted light card and every
 * other post a dark one, so two entries in the same list read as two
 * different kinds of object.
 *
 * The whole card is the link. The "Read now" cue in the corner is decorative
 * reinforcement of that, hidden from assistive tech, because the link already
 * announces itself by its heading.
 */
function PostCard({
  post,
  featured = false,
}: {
  post: (typeof POSTS)[number];
  featured?: boolean;
}) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={`post-card card-surface group block rounded-[14px] ${
        featured ? "p-7 md:p-10" : "p-6 md:p-8"
      }`}
    >
      <span aria-hidden="true" className="post-card-cue">
        Read now
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>

      <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
        <time dateTime={post.published}>{formatPostDate(post.published)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.author}</span>
      </div>

      <h2
        className={`tracking-tight text-foreground ${
          featured ? "text-2xl md:text-[2rem] md:leading-[1.15]" : "text-xl md:text-2xl"
        }`}
        style={{ textWrap: "balance" }}
      >
        {post.title}
      </h2>

      <p
        className={`mt-3 leading-relaxed text-muted-foreground ${
          featured ? "max-w-2xl text-base md:text-lg" : "max-w-2xl text-sm md:text-base"
        }`}
      >
        {post.excerpt}
      </p>
    </a>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <div className="page-surface w-full py-20 lg:py-28">
        <div className="container mx-auto px-4">
          {/* Single column, capped for reading. The previous two-column
              layout put a short sticky rail beside a short list, so on
              desktop the page ended with roughly 700px of empty space
              between the content and the footer. */}
          <div className="mx-auto max-w-3xl">
            <header className="page-head mb-14">
              <h1 className="text-left text-4xl font-regular tracking-tighter md:text-6xl">
                Real findings, not recycled SEO advice.
              </h1>
              <p className="mt-5 max-w-2xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground">
                Most SEO writing online is the same handful of tips reworded
                endlessly, usually by someone who hasn&apos;t run the audit
                they&apos;re describing. We&apos;d rather write less often and
                only about things we&apos;ve actually tested — what AI tools
                genuinely do with a website, what moves visibility, and what
                turns out not to matter at all.
              </p>
            </header>

            <div className="flex flex-col gap-5">
              {featured && <PostCard post={featured} featured />}
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Prose, not a card. This is the editor's note about the blog
                itself and it reads better as writing on the page than as
                another box in a column of boxes. */}
            <section className="mt-20 border-t pt-12">
              <h2 className="text-2xl tracking-tight md:text-3xl">
                What gets written here
              </h2>
              <div className="mt-5 flex max-w-2xl flex-col gap-4 leading-relaxed text-muted-foreground">
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

              <ul className="mt-10 flex flex-col divide-y border-y">
                {START_HERE.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="group flex items-center justify-between gap-4 py-4 text-foreground transition-colors hover:text-muted-foreground"
                    >
                      <span className="text-base font-medium">{r.label}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
      <AuditCta />
    </>
  );
}
