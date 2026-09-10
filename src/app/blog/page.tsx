import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog — SEO & GEO Insights | Ru Visibility",
  description:
    "Real findings on AI visibility, SEO, and growing your business online — written by Ru Visibility, not recycled advice.",
};

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
        </div>

        <div className="flex flex-col gap-6 max-w-2xl">
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
      </div>
    </div>
  );
}
