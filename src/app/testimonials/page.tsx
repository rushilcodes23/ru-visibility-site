import { Badge } from "@/components/ui/badge";
import { TestimonialsList } from "@/components/ui/testimonials";
import ScrollReveal from "@/components/scroll-reveal";
import { TESTIMONIALS } from "@/lib/testimonials";
import { pageMetadata } from "@/lib/seo";

const hasAny = TESTIMONIALS.length > 0;

// Real user value, no search value while the list is empty — CONTENT_RULES.md
// names noindex as the right handling for exactly that case. Populating
// src/lib/testimonials.ts flips this to indexable on the next build.
export const metadata = {
  ...pageMetadata({
    path: "/testimonials",
    title: "Testimonials | Ru Visibility",
    description:
      "Real quotes from real paid engagements, published with permission — and nothing else.",
  }),
  ...(hasAny ? {} : { robots: { index: false, follow: true } }),
};

export default function TestimonialsPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-12">
            <Badge>Testimonials</Badge>
            <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
              What clients say, once clients have said it.
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
              This page holds real quotes from real paid engagements, published
              with written permission and nothing invented in between.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <TestimonialsList />
        </ScrollReveal>
      </div>
    </div>
  );
}
