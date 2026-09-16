import Image from "next/image";
import ScrollReveal from "@/components/scroll-reveal";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="card-surface rounded-md p-6 flex flex-col gap-4 h-full">
      <blockquote className="text-muted-foreground leading-relaxed text-sm flex-1">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {t.logo && (
          <Image
            src={t.logo}
            alt={`${t.business} logo`}
            width={36}
            height={36}
            className="rounded-md object-contain"
          />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">{t.name}</span>
          <span className="text-muted-foreground text-xs">{t.business}</span>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Homepage strip. Renders nothing while there are no real testimonials —
 * an empty "no reviews yet" panel on a homepage advertises the absence.
 */
export function TestimonialsStrip() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="page-surface w-full py-20 lg:py-28 border-t">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl tracking-tighter mb-10 text-center">
            What clients say.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <Card key={`${t.name}-${t.business}`} t={t} />
            ))}
          </div>
          {TESTIMONIALS.length > 3 && (
            <div className="text-center mt-8">
              <a href="/testimonials" className="underline underline-offset-4 text-sm">
                Read all {TESTIMONIALS.length}
              </a>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

/** Full list for the dedicated page, with an honest empty state. */
export function TestimonialsList() {
  if (TESTIMONIALS.length === 0) {
    return (
      <div className="card-surface rounded-md border border-dashed p-10 text-center max-w-2xl">
        <h2 className="text-xl tracking-tight mb-3">No testimonials here yet.</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Ru Visibility is new, and we would rather show you an empty page than
          a made-up quote. Every testimonial that appears here will be a real
          named person from a real paid engagement, published with their
          written permission.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          In the meantime, the things we can actually show you are{" "}
          <a href="/research" className="underline underline-offset-4 text-foreground">
            the aggregate findings from every site we have audited
          </a>{" "}
          and{" "}
          <a href="/accessibility" className="underline underline-offset-4 text-foreground">
            our own accessibility scan results
          </a>
          . Both are measured, dated, and checkable.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <Card key={`${t.name}-${t.business}`} t={t} />
      ))}
    </div>
  );
}
