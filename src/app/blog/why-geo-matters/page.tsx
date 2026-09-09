import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Why GEO Matters — Ru Visibility",
  description:
    "GEO isn't a buzzword — it's whether AI tools recommend your business at all. Rushil, founder of Ru Visibility, on why this matters now.",
};

export default function WhyGeoMattersPost() {
  return (
    <article className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4 max-w-2xl">
        <Badge className="mb-4">Blog</Badge>
        <h1 className="text-3xl md:text-5xl tracking-tighter font-regular mb-3">
          Why GEO Matters
        </h1>
        <p className="text-sm text-muted-foreground mb-10">By Rushil, Founder</p>

        <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed">
          <p>
            A few years ago, if your business wasn&apos;t on Google, you were
            basically invisible. That&apos;s still true — but it&apos;s no
            longer the whole story. A growing number of people now ask
            ChatGPT, Gemini, or Perplexity directly for a recommendation
            instead of typing into a search bar. If those tools don&apos;t
            know your business exists, or have no reason to recommend it
            over a competitor, you&apos;re invisible to that entire channel —
            one that barely existed a few years ago and is only growing.
          </p>

          <p>
            That&apos;s what GEO — Generative Engine Optimization — actually
            is. Not a buzzword, not a rebrand of SEO. It&apos;s the practice
            of making sure AI systems can actually read your site, understand
            what you offer, and have real reasons to recommend you when
            someone asks.
          </p>

          <h2 className="text-2xl text-foreground tracking-tight mt-4">
            Why it&apos;s different from regular SEO
          </h2>
          <p>
            Traditional SEO is largely about ranking in a list of blue links.
            GEO is about being the answer itself — the one thing an AI tool
            says out loud, with no other options shown alongside it. That&apos;s
            a much higher bar, and a much bigger prize. It also means the old
            playbook — keyword stuffing, backlink schemes, thin content —
            doesn&apos;t work the same way. AI models are reading for
            substance, clarity, and whether your site actually answers the
            question a real person is asking.
          </p>

          <h2 className="text-2xl text-foreground tracking-tight mt-4">
            The part nobody likes to hear
          </h2>
          <p>
            I won&apos;t tell you GEO is guaranteed to work a certain way by a
            certain date — nobody can honestly say that. AI models retrain on
            their own schedule, and what gets a business recommended today
            can shift. What doesn&apos;t change is the cost of doing nothing:
            if a competitor is visible and you&apos;re not, they get the
            customer. That loss never shows up as an error message. It just
            looks like a customer who went somewhere else.
          </p>

          <h2 className="text-2xl text-foreground tracking-tight mt-4">
            What I&apos;d actually tell you to do
          </h2>
          <p>
            Start by finding out where you actually stand — ask the AI tools
            yourself, the same way a real customer would. That&apos;s the
            entire idea behind the audit we run: not guessing, not selling
            fear, just checking the real, current state and going from
            there.
          </p>

          <p>
            This is why I built Ru Visibility around ongoing work instead of
            a one-time report. GEO isn&apos;t something you fix once and
            forget — it&apos;s something you keep paying attention to,
            because the landscape keeps moving.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <Button render={<a href="/contact">Get Your Visibility Audit</a>} />
        </div>
      </div>
    </article>
  );
}
