import { Badge } from "@/components/ui/badge";
import { LOCATIONS, OTHER_AREAS } from "@/lib/locations";
import { MapPin } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/locations" },
  title: "Where We Work — US & India SEO/GEO | Ru Visibility",
  description:
    "SEO and GEO visibility management for businesses in Dallas, Atlanta, Houston, Miami, Phoenix, Raipur, Jaipur, and beyond.",
};

export default function LocationsIndexPage() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start max-w-2xl mb-16">
          <Badge>Where We Work</Badge>
          <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-left">
            US-focused. Working everywhere.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground text-left">
            Most of our work is in the US right now. India is growing fast.
            The work itself is the same in every city. Pick yours below, or
            read how we work with businesses anywhere else.
          </p>
        </div>

        <h2 className="text-2xl tracking-tight mb-6">Cities we work in</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {LOCATIONS.map((l) => (
            <a
              key={l.slug}
              href={`/locations/${l.slug}`}
              className="bg-muted rounded-md border border-border/50 p-6 flex flex-col gap-2 transition-transform hover:scale-[1.03] hover:shadow-lg"
            >
              <MapPin className="w-6 h-6 stroke-1 text-primary" />
              <span className="font-medium">{l.city}</span>
              <span className="text-sm text-muted-foreground">
                {l.region}, {l.country}
              </span>
            </a>
          ))}
        </div>

        <a
          href={`/locations/${OTHER_AREAS.slug}`}
          className="inline-block text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground mb-20"
        >
          Don&apos;t see your city? We work beyond this list too →
        </a>

        <div className="max-w-2xl rounded-md border border-border/50 bg-muted/50 p-6 md:p-8 mb-16">
          <h2 className="text-2xl tracking-tight mb-4">
            What a city page covers
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Each city page is written for that city. It is not the same page
            with the name swapped out. That would be lazy, and search engines
            spot it fast.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            On each one you will find what we actually do for businesses
            there, why local search has shifted, and how to start. The tone
            is plain. No jargon, no filler.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The work behind them does not change by city. We audit the site,
            fix what is broken, write the pages that need to exist, and check
            whether AI tools name you when someone asks. Where you are only
            changes who we are trying to reach.
          </p>
        </div>

        <div className="max-w-2xl mt-12 rounded-md border border-border/50 bg-muted/50 p-6 md:p-8">
          <h2 className="text-2xl tracking-tight mb-4">
            Not on the list?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            That is fine. This work is remote. We do not need to be in your
            city to fix your site, and we are not going to pretend we have an
            office in a place we do not.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The cities above are the markets we focus on most. If yours is
            missing, the answer is still yes. Just tell us where you are and
            who you sell to.
          </p>
        </div>
      </div>
    </div>
  );
}
