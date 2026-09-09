import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>Blog</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            First posts are on the way.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            We're writing about what actually moves the needle for AI and
            search visibility — real findings from real audits, not
            recycled SEO advice. Nothing published yet, so we're not going
            to fake a preview list here. Check back soon.
          </p>
        </div>
      </div>
    </div>
  );
}
