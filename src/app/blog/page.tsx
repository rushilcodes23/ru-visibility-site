import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog — SEO & GEO Insights | Ru Visibility",
  description:
    "Real findings on AI visibility, SEO, and growing your business online — written by Ru Visibility, not recycled advice.",
};

const TOPICS = [
  "How AI tools decide which businesses to name",
  "Why a technically perfect site can still be invisible",
  "What local search actually rewards now",
  "Which standard SEO advice has quietly stopped being true",
];

const START_HERE = [
  { href: "/why-it-matters", label: "Why SEO & GEO Matter" },
  { href: "/how-we-work", label: "How We Work" },
  { href: "/why-us", label: "Why Us" },
];

const POSTS = [
  {
    slug: "why-geo-matters",
    title: "Why GEO Matters",
    excerpt:
      "GEO isn't a buzzword — it's whether AI tools recommend your business at all. Why that's different from regular SEO, and what to actually do about it.",
    author: "Rushil",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;

  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>Blog</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            Real findings, not recycled SEO advice.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Most SEO writing online is the same handful of tips reworded
            endlessly, usually by someone who hasn&apos;t run the audit
            they&apos;re describing. We&apos;d rather write less often and
            only about things we&apos;ve actually tested — what AI tools
            genuinely do with a website, what moves visibility, and what
            turns out not to matter at all.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
        <h2 className="text-2xl tracking-tight mb-6">Latest writing</h2>

        <div className="flex flex-col gap-6">
          {featured && (
            <a
              href={`/blog/${featured.slug}`}
              className="group block bg-primary text-primary-foreground rounded-md p-8 transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl"
            >
              <span className="inline-block text-xs font-medium tracking-wide uppercase bg-primary-foreground text-primary rounded-full px-3 py-1 mb-4">
                Latest
              </span>
              <h2 className="text-2xl md:text-3xl tracking-tight mb-3">{featured.title}</h2>
              <p className="opacity-80 text-sm md:text-base leading-relaxed mb-5">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-70">By {featured.author}</span>
                <span className="inline-flex items-center gap-1 font-medium">
                  Read post
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          )}

          {rest.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-muted rounded-md p-6 transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <h2 className="text-xl tracking-tight mb-2">{post.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>
              <span className="text-xs text-muted-foreground">By {post.author}</span>
            </a>
          ))}
        </div>

        <div className="border-t pt-10 mt-20">
          <h2 className="text-2xl tracking-tight mb-4">
            What gets written here
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Things we have actually tested. If we try a change on a site and
            it moves something, that is worth writing up. If we try it and
            nothing happens, that is worth writing up too, and it is the
            half almost nobody publishes.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The subjects that keep coming up: how AI tools decide which
            businesses to name, why a site can be technically perfect and
            still invisible, what local search actually rewards now, and
            which bits of standard SEO advice have quietly stopped being
            true.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            There is no schedule. A post goes up when there is something
            real to say, which is why there are not many of them. Writing to
            fill a calendar is how you end up with the recycled advice this
            page exists to avoid.
          </p>
        </div>

        <div className="border-t pt-10 mt-16">
          <h2 className="text-2xl tracking-tight mb-4">
            Want the version that applies to your site?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            General writing only goes so far. If you want to know what any
            of this means for your business specifically,{" "}
            <a href="/contact" className="underline underline-offset-4 text-foreground">
              send us your website address
            </a>{" "}
            and we will tell you what we see. It is a faster route to a real
            answer than reading everything here and guessing which parts
            apply.
          </p>
        </div>
          </div>

          {/* Sticky rail — one post does not fill a page, and the reading
              column is capped for line length, so the right third was
              sitting empty on desktop. */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-primary text-primary-foreground rounded-md p-6">
              <h2 className="text-xl tracking-tight mb-2">
                Skip the reading
              </h2>
              <p className="opacity-80 text-sm leading-relaxed mb-5">
                Send us your website address and we will tell you what we
                actually see, rather than what tends to be true in general.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-1 rounded-full bg-primary-foreground text-primary text-sm font-medium px-4 py-2 transition-transform duration-200 hover:scale-105"
              >
                Talk to Us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-muted rounded-md border border-border/50 p-6">
              <h2 className="text-lg tracking-tight mb-3">
                What we write about
              </h2>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {TOPICS.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-foreground">&middot;</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-muted rounded-md border border-border/50 p-6">
              <h2 className="text-lg tracking-tight mb-3">Start here</h2>
              <ul className="flex flex-col gap-3 text-sm">
                {START_HERE.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="group flex items-center justify-between gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="font-medium text-foreground">
                        {r.label}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
