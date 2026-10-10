/**
 * The picture on a post card, and the art in each post's social preview
 * (public/covers/*.png is rendered from these, so the two always match).
 *
 * One small drawing per post that states its argument in a single shape:
 * no stock photo, no gradient blob, no people. Flat SVG in the page's own
 * colours: `currentColor` for the neutral lines (so it follows light and dark
 * mode), `--accent-line` for the thing that matters and `--cover-warn` for a
 * refusal. Pure geometry, nothing to load.
 */

const FONT = "var(--font-space-grotesk), system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const BLUE = "var(--accent-line)";
const WARN = "var(--cover-warn)";

/** robots.txt waves the crawler in; the server sends it back. */
function RobotsVsServer() {
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="A robots.txt file that allows crawlers, and a server that refuses them with a 403">
      {/* robots.txt */}
      <rect x="14" y="22" width="104" height="96" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.28" />
      <text x="26" y="42" fontSize="9.5" fill="currentColor" fillOpacity="0.55" style={{ fontFamily: FONT }}>robots.txt</text>
      <text x="26" y="66" fontSize="8.5" fill="currentColor" fillOpacity="0.8" style={{ fontFamily: MONO }}>User-agent: *</text>
      <text x="26" y="82" fontSize="8.5" fill={BLUE} style={{ fontFamily: MONO }}>Allow: /</text>
      <rect x="26" y="96" width="58" height="3" rx="1.5" fill="currentColor" fillOpacity="0.14" />
      <circle cx="116" cy="24" r="10" fill={BLUE} />
      <path d="M111.5 24.2l3 3 6-6.4" fill="none" stroke="var(--card)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* the crawler's trip: in on the dashed line, back on the warm one */}
      <path d="M128 62 H 200" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeDasharray="3 4" />
      <path d="M196 58 l6 4 -6 4" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="160" cy="62" r="4.5" fill="currentColor" fillOpacity="0.8" />
      <path d="M204 84 C 186 104, 160 104, 140 90" fill="none" stroke={WARN} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M146 88.5 l-6.4 1.6 2.6 -6" fill="none" stroke={WARN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      {/* server */}
      {[30, 58, 86].map((y) => (
        <g key={y}>
          <rect x="214" y={y} width="92" height="22" rx="5" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.28" />
          <circle cx="226" cy={y + 11} r="2.4" fill="currentColor" fillOpacity="0.35" />
          <rect x="236" y={y + 9.5} width="40" height="3" rx="1.5" fill="currentColor" fillOpacity="0.16" />
        </g>
      ))}
      <rect x="264" y="113" width="42" height="17" rx="8.5" fill={WARN} />
      <text x="285" y="125" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="var(--card)" style={{ fontFamily: FONT }}>403</text>
    </svg>
  );
}

/** A list of links on one side, an answer that names someone on the other. */
function SearchVsAnswer() {
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="A search results list beside an AI answer that names one business">
      <text x="16" y="16" fontSize="8.5" fill="currentColor" fillOpacity="0.5" style={{ fontFamily: FONT }}>Search</text>
      <rect x="16" y="24" width="128" height="16" rx="8" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.28" />
      <circle cx="28" cy="32" r="3.2" fill="none" stroke="currentColor" strokeOpacity="0.5" />
      <path d="M30.4 34.4l2.4 2.4" stroke="currentColor" strokeOpacity="0.5" strokeLinecap="round" />
      {[52, 74, 96, 118].map((y, i) => (
        <g key={y}>
          <rect x="16" y={y} width={[78, 64, 84, 58][i]} height="4.5" rx="2.25" fill={BLUE} fillOpacity="0.75" />
          <rect x="16" y={y + 9} width={[118, 104, 112, 96][i]} height="3" rx="1.5" fill="currentColor" fillOpacity="0.16" />
        </g>
      ))}

      <path d="M160 18 V 126" stroke="currentColor" strokeOpacity="0.1" />

      <text x="176" y="16" fontSize="8.5" fill="currentColor" fillOpacity="0.5" style={{ fontFamily: FONT }}>AI answer</text>
      <rect x="216" y="24" width="88" height="16" rx="8" fill="currentColor" fillOpacity="0.1" />
      <rect x="226" y="30.5" width="60" height="3" rx="1.5" fill="currentColor" fillOpacity="0.35" />
      <rect x="176" y="48" width="128" height="78" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.28" />
      <rect x="188" y="62" width="100" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      <rect x="188" y="76" width="34" height="9" rx="4.5" fill={BLUE} />
      <rect x="228" y="79" width="62" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      <rect x="188" y="94" width="92" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />
      <rect x="188" y="106" width="70" height="3" rx="1.5" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

/** A field of sites, and a lens over a few of them. */
function AuditLens() {
  const cols = 24;
  const rows = 9;
  const lens = { x: 196, y: 64, r: 34 };
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 22 + c * 11.6;
      const y = 20 + r * 11.6;
      if (Math.hypot(x - lens.x, y - lens.y) < lens.r + 4) continue;
      dots.push(<circle key={`${r}-${c}`} cx={x} cy={y} r="1.7" fill="currentColor" fillOpacity="0.24" />);
    }
  }
  // Inside the lens, the same sites up close: most fine, a few with a problem.
  const close = [
    { x: -14, y: -13, bad: false }, { x: 6, y: -15, bad: true }, { x: 20, y: 3, bad: false },
    { x: -18, y: 7, bad: true }, { x: 1, y: 6, bad: false }, { x: -4, y: 22, bad: false }, { x: 16, y: 21, bad: true },
  ];
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="A grid of websites with a magnifying glass showing problems on some of them">
      {dots}
      <circle cx={lens.x} cy={lens.y} r={lens.r} fill="var(--card)" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" />
      {close.map((d, i) =>
        d.bad ? (
          <g key={i}>
            <circle cx={lens.x + d.x} cy={lens.y + d.y} r="6" fill={WARN} />
            <path d={`M${lens.x + d.x - 2.2} ${lens.y + d.y - 2.2}l4.4 4.4m0 -4.4l-4.4 4.4`} stroke="var(--card)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ) : (
          <circle key={i} cx={lens.x + d.x} cy={lens.y + d.y} r="5" fill="currentColor" fillOpacity="0.28" />
        )
      )}
      <path d={`M${lens.x + 25} ${lens.y + 25} L ${lens.x + 46} ${lens.y + 46}`} stroke="currentColor" strokeOpacity="0.55" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/** One question, one answer, and the business it names. */
function AnswerNamed() {
  const rowsY = [52, 72, 92, 112];
  const named = 1;
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img"
      aria-label="A customer's question and an AI answer that names one business out of four">
      <rect x="16" y="44" width="96" height="40" rx="10" fill="currentColor" fillOpacity="0.1" />
      <path d="M34 84 l-6 10 14 -10" fill="currentColor" fillOpacity="0.1" />
      <rect x="28" y="56" width="70" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4" />
      <rect x="28" y="67" width="48" height="3" rx="1.5" fill="currentColor" fillOpacity="0.4" />

      <path d="M120 64 H 142" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 4" />
      <path d="M139 60 l5 4 -5 4" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="150" y="18" width="154" height="110" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.28" />
      <rect x="164" y="32" width="96" height="3.5" rx="1.75" fill="currentColor" fillOpacity="0.3" />
      {rowsY.map((y, i) => (
        <g key={y}>
          <rect x="164" y={y - 5} width="10" height="10" rx="3" fill={i === named ? BLUE : "currentColor"} fillOpacity={i === named ? 1 : 0.18} />
          <rect x="182" y={y - 1.5} width={i === named ? 76 : [64, 0, 70, 56][i]} height="3" rx="1.5"
            fill={i === named ? BLUE : "currentColor"} fillOpacity={i === named ? 0.9 : 0.18} />
        </g>
      ))}
      <circle cx="282" cy={rowsY[named]} r="8" fill={BLUE} />
      <path d={`M278.2 ${rowsY[named] + 0.2}l2.6 2.6 5-5.2`} fill="none" stroke="var(--card)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const VARIANTS = {
  "robots-txt-says-yes-server-says-no": RobotsVsServer,
  "seo-vs-geo": SearchVsAnswer,
  "seo-mistakes-from-1500-audits": AuditLens,
  "why-geo-matters": AnswerNamed,
} as const;

export function PostVisual({ slug }: { slug: string }) {
  const Art = VARIANTS[slug as keyof typeof VARIANTS] ?? AuditLens;
  return (
    <div className="post-visual" data-cover={slug}>
      <Art />
    </div>
  );
}
