import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function WorkPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl">
          <Badge>Our Work</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            No client results here yet — on purpose.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left mb-8">
            We won't put a client's name, logo, or numbers on this page
            until we've actually done the work and they've agreed to be
            shown. So right now, this page is honestly empty. Once real
            results exist, they'll show up here — real before-and-afters,
            not manufactured case studies.
          </p>
          <Button render={<a href="/contact">Be Our First</a>} />
        </div>
      </div>
    </div>
  );
}
