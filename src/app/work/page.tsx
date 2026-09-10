import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/work" },
  title: "Our Work — Real Results Only | Ru Visibility",
  description:
    "We don't publish client results until they're real and approved to share. See what kind of AI visibility change we're working toward, honestly labeled.",
};

export default function WorkPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>Our Work</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            No client results here yet — on purpose.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left mb-8">
            We won't put a client's name, logo, or numbers on this page
            until we've actually done the work and they've agreed to be
            shown. Once real results exist, they'll show up here — real
            before-and-afters, not manufactured case studies. The example
            below shows the kind of change we're aiming for, clearly marked
            as illustrative — not a real client.
          </p>
          <Button render={<a href="/contact">Be Our First</a>} />
        </div>

        {/* Clearly labeled illustrative example — not a real client result.
            Rushil chose to include this so the page isn't empty, on the
            condition it's never mistaken for a real claim. Replace with
            real before/after data the moment a real client exists. */}
        <h2 className="text-2xl tracking-tight mb-6 max-w-2xl">
          What the change we&apos;re aiming for looks like
        </h2>

        <div className="max-w-2xl mb-16 border-2 border-dashed rounded-md p-6 md:p-8">
          <span className="inline-block text-xs font-medium tracking-wide uppercase text-muted-foreground border rounded-full px-3 py-1 mb-6">
            Illustrative Example — Not a Real Client
          </span>
          <p className="text-sm text-muted-foreground mb-6">
            This is the kind of shift a visibility audit and fix cycle is
            built to produce. It's a sample, not a claim about any real
            business.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-3">
              <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Before</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Not mentioned at all when asked an AI tool for a
                  recommendation in its category.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="font-medium text-sm">After</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Appears as a recommended option, with accurate details
                  about what it actually offers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl border-t pt-10">
          <h2 className="text-2xl tracking-tight mb-4">Why we work this way</h2>
          <p className="text-muted-foreground leading-relaxed italic">
            &ldquo;I built Ru Visibility because most SEO agencies either
            overpromise or hide behind jargon. I'd rather show you exactly
            what's broken, fix what I can fix directly, and tell you
            honestly when something's genuinely out of anyone's
            control.&rdquo;
          </p>
          <p className="text-sm font-medium mt-3">— Rushil, Founder</p>
        </div>
      </div>
    </div>
  );
}
