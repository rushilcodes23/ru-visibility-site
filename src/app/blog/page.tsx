import { Badge } from "@/components/ui/badge";

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
          {POSTS.map((post) => (
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
