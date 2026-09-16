import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/scroll-reveal";

// ctaHref points at the on-page audit form where one exists, so a page with
// the form on it doesn't send people to /contact to make the same request.
export function ClosingCta({ ctaHref = "/contact" }: { ctaHref?: string }) {
  return (
    <div className="page-surface w-full py-20 lg:py-32 border-t">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl tracking-tighter">
              See where you actually stand.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              One audit tells you whether ChatGPT, Gemini, and Google can
              actually find and recommend your business — no guessing, no
              guaranteed-results sales pitch, just the real, current answer.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" render={<a href={ctaHref}>Get Your Visibility Audit</a>} />
              <Button variant="outline" size="lg" render={<a href="/services">See What We Do</a>} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
