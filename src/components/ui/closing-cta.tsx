import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/scroll-reveal";

export function ClosingCta() {
  return (
    <div className="w-full py-20 lg:py-32 border-t bg-muted/30">
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
              <Button size="lg" render={<a href="/contact">Get Your Visibility Audit</a>} />
              <Button variant="outline" size="lg" render={<a href="/pricing">See Pricing</a>} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
