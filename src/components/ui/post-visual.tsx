import findings from "@/lib/research-findings.json";

/**
 * The graphic on a post card.
 *
 * Every other blog in this category fills this slot with a stock photo or an
 * abstract gradient. Ours is drawn from the post's own numbers — the bars in
 * the audit card are the real measured shares from research-findings.json, so
 * the picture on the card is the finding, not decoration wrapped around it.
 * Re-aggregate and these redraw themselves.
 *
 * Pure SVG geometry, no images to load and nothing to go stale.
 */

const { universal, subsetOnly, crawlerBlocks } = findings;

/** The five most common problems, worst first. Real shares, real labels. */
const BARS: { label: string; pct: number }[] = [
  { label: "No independent mentions", pct: universal.noPressSection.sitesPct },
  { label: "Nothing quotable", pct: Math.round((100 - universal.anyTable.sitesPct) * 10) / 10 },
  { label: "Answers no questions", pct: Math.round((100 - universal.anyFaqBlock.sitesPct) * 10) / 10 },
  { label: "Profiles not declared", pct: universal.noSameAs.sitesPct },
  { label: "Pages competing", pct: subsetOnly.titleClash.sitesPct },
];

function AuditBars() {
  const rowH = 26;
  const gap = 8;
  const labelW = 0;
  // Bars scale into the space LEFT of the value column. Without this the
  // 96.7% bar ran under its own number and the two overlapped.
  const valueGutter = 52;
  const trackW = 320 - labelW - valueGutter;
  const h = BARS.length * rowH + (BARS.length - 1) * gap;
  return (
    <svg
      viewBox={`0 0 320 ${h}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`The five most common problems found, from ${BARS[0].pct}% down to ${BARS[BARS.length - 1].pct}% of sites`}
    >
      {BARS.map((b, i) => {
        const y = i * (rowH + gap);
        const w = (b.pct / 100) * trackW;
        return (
          <g key={b.label}>
            {/* Track, so a short bar still reads against a measured width. */}
            <rect
              x={labelW} y={y} width={trackW} height={rowH} rx={4}
              fill="currentColor" opacity={0.06}
            />
            <rect
              x={labelW} y={y} width={w} height={rowH} rx={4}
              fill="var(--accent-green)" opacity={0.85 - i * 0.11}
            />
            <text
              x={labelW + 10} y={y + rowH / 2 + 4}
              fontSize="11" fill="currentColor" opacity={0.85}
              style={{ fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}
            >
              {b.label}
            </text>
            <text
              x={314} y={y + rowH / 2 + 4} textAnchor="end"
              fontSize="11" fill="currentColor" opacity={0.6}
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {b.pct}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/**
 * One question fanning out to the handful of businesses an AI names, with the
 * rest of the field left dark. That is the argument of the GEO post in one
 * shape: being listed is not the same as being named.
 */
function AnswerFan() {
  const origin = { x: 24, y: 70 };
  // Deterministic, not random — a server/client mismatch here would hydrate
  // into a different picture than the one that was rendered.
  const targets = [
    { y: 14, named: false }, { y: 34, named: false }, { y: 54, named: true },
    { y: 74, named: true }, { y: 94, named: false }, { y: 114, named: false },
    { y: 128, named: false },
  ];
  return (
    <svg
      viewBox="0 0 320 140"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="One question fanning out to seven businesses, of which two are named"
    >
      {targets.map((t, i) => (
        <path
          key={i}
          d={`M ${origin.x} ${origin.y} C 140 ${origin.y}, 170 ${t.y}, 286 ${t.y}`}
          fill="none"
          stroke={t.named ? "var(--accent-green)" : "currentColor"}
          strokeOpacity={t.named ? 0.9 : 0.16}
          strokeWidth={t.named ? 1.6 : 1}
        />
      ))}
      {targets.map((t, i) => (
        <circle
          key={`d${i}`} cx={292} cy={t.y} r={t.named ? 4 : 2.5}
          fill={t.named ? "var(--accent-green)" : "currentColor"}
          fillOpacity={t.named ? 1 : 0.22}
        />
      ))}
      <circle cx={origin.x} cy={origin.y} r={5} fill="currentColor" fillOpacity={0.75} />
    </svg>
  );
}

/** Crawler access, as a grid: the share of sites each one cannot get into. */
function CrawlerGrid() {
  const rows = crawlerBlocks.slice(0, 8);
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {rows.map((b, i) => {
        const cols = 20;
        const lit = Math.round((b.combinedPct / 100) * cols);
        return [...Array(cols)].map((_, c) => (
          <rect
            key={`${i}-${c}`}
            x={c * 16} y={i * 17} width={11} height={11} rx={2}
            fill={c < lit ? "var(--accent-green)" : "currentColor"}
            fillOpacity={c < lit ? 0.8 : 0.08}
          />
        ));
      })}
    </svg>
  );
}

const VARIANTS = {
  "seo-mistakes-from-1500-audits": AuditBars,
  "why-geo-matters": AnswerFan,
} as const;

export function PostVisual({ slug }: { slug: string }) {
  const Art = VARIANTS[slug as keyof typeof VARIANTS] ?? CrawlerGrid;
  return (
    <div className="post-visual">
      <Art />
    </div>
  );
}
