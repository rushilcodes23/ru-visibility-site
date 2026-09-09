import { Badge } from "@/components/ui/badge";
import { LOCATIONS, OTHER_AREAS } from "@/lib/locations";
import { MapPin } from "lucide-react";

export const metadata = {
  title: "Where We Work — US & India SEO/GEO Coverage | Ru Visibility",
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
            Most of our client work is in the US market right now, alongside
            growing work in India. The process is identical everywhere —
            pick your city, or see how we work with businesses anywhere else.
          </p>
        </div>

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
          className="inline-block text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
        >
          Don&apos;t see your city? We work beyond this list too →
        </a>
      </div>
    </div>
  );
}
