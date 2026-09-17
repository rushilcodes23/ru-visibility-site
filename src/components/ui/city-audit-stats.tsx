import CountUp from "@/components/count-up";
import findings from "@/lib/research-findings.json";

/**
 * Real audit numbers for one city, from the campaign actually run there.
 *
 * This exists because every city page was otherwise the same page with the
 * name swapped — the audit measured 82% wording overlap between the worst
 * pair. A block of genuinely different, first-hand numbers is the honest way
 * to make a page about Dallas different from a page about Chicago.
 *
 * Renders NOTHING for a city with no campaign behind it. There is no
 * fallback, no estimate and no "typical figures" — a city page without real
 * work behind it simply does not get this section.
 */
export function CityAuditStats({ slug, city }: { slug: string; city: string }) {
  const data = findings.cities.find((c) => c.slug === slug);
  if (!data) return null;

  const stats = [
    { v: data.noSameAsPct, suffix: "%", label: "had not declared their own profiles in schema" },
    { v: data.noFaqPct, suffix: "%", label: "answered no questions anywhere on the site" },
    { v: data.aiBlockedPct, suffix: "%", label: "were blocking a crawler that feeds AI answers" },
  ];

  return (
    <div className="card-surface rounded-md p-6 md:p-8 mb-16">
      <h2 className="text-2xl tracking-tight mb-3 md:text-3xl">
        What we found in {city}
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
        We audited{" "}
        <strong className="text-foreground font-medium">
          <CountUp value={data.sites} /> local dental practices
        </strong>{" "}
        in {city} with our own tool, as outreach research — not clients, and
        none of them named here. They averaged {data.seoMean} out of 100 on
        conventional Google SEO but only{" "}
        <strong className="text-foreground font-medium">{data.geoMean}</strong>{" "}
        on AI visibility. The businesses competing with you locally are, on
        average, in the same position.
      </p>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-3xl tracking-tighter font-medium tabular-nums">
              <CountUp value={s.v} decimals={1} suffix={s.suffix} />
            </dd>
            <span aria-hidden="true" className="text-muted-foreground text-sm leading-snug">
              {s.label}
            </span>
          </div>
        ))}
      </dl>

      <p className="text-muted-foreground text-sm leading-relaxed mt-6">
        Audited between {findings.corpus.firstAudit} and {findings.corpus.lastAudit}. The
        same method is published in full on our{" "}
        <a href="/research" className="underline underline-offset-4 text-foreground">
          research page
        </a>
        , across {findings.corpus.uniqueDomains.toLocaleString("en-US")} sites.
      </p>
    </div>
  );
}
