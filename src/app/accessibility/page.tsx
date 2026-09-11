import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accessibility, Eye, Keyboard, Contrast } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/accessibility",
  title: "Accessibility Statement | Ru Visibility",
  description: "Our accessibility statement, and the real, measured standard we hold client sites to as part of every audit.",
});

const COMMITMENTS = [
  {
    icon: Eye,
    title: "Real scans, not guesses",
    body: "Every accessibility finding — ours or a client's — comes from an actual axe-core scan, not a visual once-over.",
  },
  {
    icon: Keyboard,
    title: "Keyboard navigable",
    body: "Every interactive element on this site — links, buttons, the contact form — works without a mouse.",
  },
  {
    icon: Contrast,
    title: "Readable contrast",
    body: "Text and interactive elements are checked against real contrast ratios, not just what looks fine on one screen.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className="page-surface w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="page-head flex flex-col gap-4 items-start max-w-2xl mb-16">
            <Badge>Accessibility</Badge>
            <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
              We hold our own site to the standard we sell.
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
              We audit other businesses for accessibility risk — it would be
              a bad look if our own site didn't meet a real standard. Here's
              what that actually means, and what to do if something's still
              wrong.
            </p>
          </div>
        </ScrollReveal>

        <h2 className="text-3xl tracking-tight mb-6 md:text-4xl">What we hold ourselves to</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {COMMITMENTS.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 100}>
              <div className="card-surface rounded-md p-6 flex flex-col gap-3 h-full transition-transform duration-200 hover:scale-[1.02]">
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10">
                  <c.icon className="w-6 h-6 stroke-1 text-primary" />
                </div>
                <h3 className="text-lg tracking-tight">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {c.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 card-surface rounded-md p-6 md:p-8 flex flex-col gap-4">
            <h2 className="text-2xl tracking-tight flex items-center gap-2 md:text-3xl">
              <Accessibility className="w-6 h-6" />
              Found a real issue on this site?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Tell us directly and we'll fix it — no ticket system, no
              runaround. This isn't a legal disclaimer page; it's an open
              invitation to actually flag what's broken.
            </p>
            <Button
              size="lg"
              className="w-fit"
              render={<a href="mailto:rushil@ruvisibility.com?subject=Accessibility%20issue">Report an Issue</a>}
            />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
