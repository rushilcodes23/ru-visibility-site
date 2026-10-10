#!/usr/bin/env node
/**
 * Draws the 16 service illustrations (src/assets/illustrations/<name>-light.svg
 * and -dark.svg) used by service-art.tsx on the homepage and /services.
 *
 *   node scripts/gen-service-art.mjs
 *
 * Same visual language as the blog covers (post-visual.tsx): flat lines, one
 * blue for what matters, one amber for a problem, and a few words of label so
 * each picture says what the service does without its card.
 *
 * Rule, unchanged from the first set: pictures of the kind of work only. No
 * numbers, no business names, no ratings or scores, so nothing can read as a
 * result we claim. Product names (ChatGPT, Gemini, Perplexity, Google) are
 * fine: they are the places the work is aimed at, not outcomes.
 *
 * These ship as plain <img> files (see service-art.tsx), so they cannot read
 * the page's CSS. Each palette below copies the theme's own values; change the
 * theme, change these, run again.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src/assets/illustrations");

const PALETTES = {
  light: { fg: "#0f172a", muted: "#566372", card: "#ffffff", blue: "#5b7fc4", warn: "#c2620f" },
  dark: { fg: "#f1f5f9", muted: "#94a3b8", card: "#111827", blue: "#7ea0e0", warn: "#f0a35e" },
};
const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/**
 * Drawing helpers, bound to one palette. Text sizes are set for the real card
 * size: on a 1440px screen the homepage panel is about 244px wide, so the 320
 * unit drawing shows at roughly three quarters size and a 12 unit label lands
 * near 9px on screen.
 */
function kit(c) {
  return {
    surf: (x, y, w, h, r = 8) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c.fg}" fill-opacity=".05" stroke="${c.fg}" stroke-opacity=".28"/>`,
    fill: (x, y, w, h, r = 6, o = 0.1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c.fg}" fill-opacity="${o}"/>`,
    bar: (x, y, w, o = 0.18, h = 3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c.fg}" fill-opacity="${o}"/>`,
    blueBar: (x, y, w, h = 3.5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c.blue}"/>`,
    text: (x, y, t, { size = 11, color = c.muted, weight = 500, anchor = "start" } = {}) =>
      `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(t)}</text>`,
    check: (cx, cy, r = 7) =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.blue}"/><path d="M${cx - r * 0.42} ${cy + 0.2}l${r * 0.3} ${r * 0.3} ${r * 0.58} -${r * 0.62}" stroke="${c.card}" stroke-width="${Math.max(1.4, r * 0.24)}"/>`,
    warn: (cx, cy, r = 7) =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.warn}"/><path d="M${cx} ${cy - r * 0.45}v${r * 0.5}" stroke="${c.card}" stroke-width="${r * 0.26}"/><circle cx="${cx}" cy="${cy + r * 0.45}" r="${r * 0.13}" fill="${c.card}"/>`,
    chip: (x, y, w, t, color = c.blue, h = 18) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2 + 3.7}" font-family="${FONT}" font-size="10.5" font-weight="600" fill="${c.card}" text-anchor="middle">${esc(t)}</text>`,
    outlineChip: (x, y, w, t, h = 18) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" stroke="${c.fg}" stroke-opacity=".35"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2 + 3.7}" font-family="${FONT}" font-size="10.5" font-weight="500" fill="${c.muted}" text-anchor="middle">${esc(t)}</text>`,
    dots: (x, y) => [0, 1, 2].map((i) => `<circle cx="${x + i * 7}" cy="${y}" r="1.8" fill="${c.fg}" fill-opacity=".3"/>`).join(""),
    head: (x, y, dir = "right", color = c.fg, o = 0.5) => {
      const d = { right: `M${x - 5} ${y - 4}l5 4-5 4`, down: `M${x - 4} ${y - 5}l4 5 4-5`, left: `M${x + 5} ${y - 4}l-5 4 5 4` }[dir];
      return `<path d="${d}" stroke="${color}" stroke-opacity="${o}" stroke-width="1.3"/>`;
    },
    line: (d, { color = c.fg, o = 0.35, dash = false, w = 1.2 } = {}) =>
      `<path d="${d}" stroke="${color}" stroke-opacity="${o}" stroke-width="${w}"${dash ? ' stroke-dasharray="3 4"' : ""}/>`,
    spark: (cx, cy, s = 8, color = c.blue) =>
      `<path d="M${cx} ${cy - s}C${cx + s * 0.12} ${cy - s * 0.12} ${cx + s * 0.12} ${cy - s * 0.12} ${cx + s} ${cy}C${cx + s * 0.12} ${cy + s * 0.12} ${cx + s * 0.12} ${cy + s * 0.12} ${cx} ${cy + s}C${cx - s * 0.12} ${cy + s * 0.12} ${cx - s * 0.12} ${cy + s * 0.12} ${cx - s} ${cy}C${cx - s * 0.12} ${cy - s * 0.12} ${cx - s * 0.12} ${cy - s * 0.12} ${cx} ${cy - s}Z" fill="${color}"/>`,
  };
}

/** One function per service. Each returns the inside of a 320 x 160 drawing. */
const SCENES = {
  // AI Visibility (GEO): your business, named across the AI tools.
  geo(c, k) {
    const engines = [["ChatGPT", 32], ["Gemini", 80], ["Perplexity", 128]];
    return [
      k.surf(10, 44, 134, 72),
      `<rect x="22" y="58" width="15" height="15" rx="4" fill="${c.blue}"/>`,
      k.text(44, 70, "Your business", { color: c.fg, weight: 600, size: 12.5 }),
      k.bar(22, 88, 104), k.bar(22, 99, 78),
      ...engines.map(([, y]) => k.line(`M146 80 C 166 80, 166 ${y}, 184 ${y}`, { o: 0.35, dash: true })),
      ...engines.map(([name, y]) => k.surf(186, y - 15, 124, 30, 15) + k.text(200, y + 4.3, name, { color: c.fg, size: 12 }) + k.check(294, y, 7)),
    ].join("");
  },

  // Technical SEO: the site's structure, crawled, with one broken page found.
  technical(c, k) {
    const node = (x, y, w, t, ok = true) => k.surf(x, y, w, 26, 7) + k.text(x + w / 2, y + 17.2, t, { color: c.fg, size: 11.5, anchor: "middle" }) + (ok ? k.check(x + w, y, 6) : "");
    return [
      node(126, 10, 68, "Home"),
      k.line("M160 36 V 50 M62 50 H 258 M62 50 V 62 M160 50 V 62 M258 50 V 62", { o: 0.3 }),
      node(18, 62, 88, "Services"), node(116, 62, 88, "About"), node(214, 62, 88, "Blog"),
      k.line("M258 88 V 116", { o: 0.3, dash: true }),
      `<rect x="214" y="116" width="88" height="26" rx="7" stroke="${c.warn}" stroke-dasharray="3 3"/>`,
      k.text(258, 133.2, "Old page", { color: c.warn, size: 11.5, anchor: "middle", weight: 600 }),
      k.warn(302, 116, 6),
      k.text(204, 133.5, "Broken link", { color: c.warn, size: 11.5, anchor: "end", weight: 600 }),
    ].join("");
  },

  // Accessibility audits: a page and the checks it is put through.
  accessibility(c, k) {
    const items = [["Alt text", true], ["Contrast", true], ["Keyboard", true], ["Captions", false]];
    return [
      k.surf(12, 16, 150, 128),
      k.dots(24, 28),
      k.fill(24, 40, 126, 46, 6, 0.08),
      `<path d="M36 78 l14 -14 10 10 8 -8 14 12" stroke="${c.fg}" stroke-opacity=".35" stroke-width="1.3"/>`,
      k.chip(108, 46, 36, "alt", c.blue, 17),
      k.bar(24, 98, 110), k.bar(24, 108, 90),
      `<rect x="24" y="122" width="58" height="13" rx="6.5" fill="${c.blue}" fill-opacity=".85"/>`,
      k.text(182, 28, "Checks", { color: c.muted, size: 11 }),
      ...items.map(([t, ok], i) => (ok ? k.check(190, 52 + i * 28, 7) : k.warn(190, 52 + i * 28, 7)) + k.text(205, 56.2 + i * 28, t, { color: ok ? c.fg : c.warn, size: 12, weight: ok ? 500 : 600 })),
    ].join("");
  },

  // Blog and content: a post that answers a real question, every month.
  content(c, k) {
    const q = (y) => `<circle cx="52" cy="${y}" r="7" fill="${c.blue}"/>` + k.text(52, y + 3.8, "?", { color: c.card, size: 10.5, weight: 700, anchor: "middle" });
    return [
      k.surf(30, 10, 176, 140),
      k.text(44, 30, "Blog post", { color: c.muted, size: 11 }),
      k.bar(44, 40, 126, 0.7, 6),
      q(62), k.blueBar(66, 60.25, 112, 4.5),
      k.bar(44, 78, 144), k.bar(44, 88, 130), k.bar(44, 98, 138),
      q(118), k.blueBar(66, 116.25, 96, 4.5),
      k.bar(44, 134, 128),
      k.outlineChip(216, 18, 94, "Every month"),
      `<path d="M280 58 l12 12 -42 42 -15 4 4 -15z" fill="${c.fg}" fill-opacity=".12" stroke="${c.fg}" stroke-opacity=".45" stroke-width="1.2"/>`,
      `<path d="M239 101 l11 11" stroke="${c.fg}" stroke-opacity=".45" stroke-width="1.2"/>`,
    ].join("");
  },

  // Website design and build: the same site on desktop and phone.
  design(c, k) {
    return [
      k.text(14, 14, "Desktop", { color: c.muted, size: 11 }),
      k.surf(14, 20, 200, 124),
      k.dots(26, 31),
      k.fill(26, 42, 176, 40, 6, 0.08),
      k.blueBar(38, 54, 84, 5), k.bar(38, 66, 112),
      k.fill(26, 90, 56, 24, 5, 0.07), k.fill(86, 90, 56, 24, 5, 0.07), k.fill(146, 90, 56, 24, 5, 0.07),
      k.chip(26, 120, 78, "SEO ready", c.blue, 17),
      k.text(230, 30, "Phone", { color: c.muted, size: 11 }),
      `<rect x="230" y="36" width="76" height="112" rx="12" fill="${c.fg}" fill-opacity=".05" stroke="${c.fg}" stroke-opacity=".28"/>`,
      k.bar(256, 44, 24, 0.25),
      k.fill(240, 56, 56, 30, 5, 0.08), k.blueBar(246, 66, 34, 4),
      k.bar(240, 94, 56), k.bar(240, 104, 42), k.fill(240, 116, 56, 22, 5, 0.07),
    ].join("");
  },

  // Website monetization: the step where visitors give up, found and fixed.
  monetization(c, k) {
    const steps = [["Visit", 8], ["Product", 88], ["Cart", 168], ["Buy", 248]];
    return [
      ...steps.map(([t, x]) =>
        (t === "Cart"
          ? `<rect x="${x}" y="52" width="64" height="34" rx="8" fill="${c.blue}" fill-opacity=".12" stroke="${c.blue}" stroke-width="1.4"/>`
          : k.surf(x, 52, 64, 34, 8)) + k.text(x + 32, 73.3, t, { color: t === "Cart" ? c.blue : c.fg, size: 12, weight: t === "Cart" ? 600 : 500, anchor: "middle" })),
      ...[72, 152, 232].map((x) => k.line(`M${x + 2} 69 H ${x + 13}`, { o: 0.4 }) + k.head(x + 14, 69)),
      k.chip(168, 24, 64, "Fix this", c.blue, 18),
      k.line("M200 86 C 200 102, 208 110, 216 120", { color: c.warn, o: 1, dash: true, w: 1.5 }),
      `<path d="M209 119.5 l7.5 1.5 -1.5 -7.5" stroke="${c.warn}" stroke-width="1.5"/>`,
      k.text(214, 142, "Where visitors leave", { color: c.warn, size: 11.5, weight: 600, anchor: "middle" }),
    ].join("");
  },

  // Digital marketing: ads, social and email, all bringing people to the site.
  marketing(c, k) {
    const src = [["Ads", 32], ["Social", 80], ["Email", 128]];
    return [
      ...src.map(([t, y]) => k.surf(12, y - 15, 98, 30, 15) + k.text(61, y + 4.3, t, { color: c.fg, size: 12, anchor: "middle" })),
      ...src.map(([, y]) => k.line(`M112 ${y} C 150 ${y}, 160 80, 192 80`, { o: 0.35, dash: true })),
      k.head(196, 80),
      k.surf(200, 32, 108, 96),
      k.dots(212, 44),
      k.text(212, 70, "Your site", { color: c.blue, weight: 600, size: 13 }),
      k.bar(212, 84, 80), k.bar(212, 94, 66), k.fill(212, 106, 48, 14, 7, 0.12),
    ].join("");
  },

  // AI integration: one assistant behind a chatbot, reports and routine jobs.
  "ai-integration"(c, k) {
    const sat = (x, y, w, t, sub) => k.surf(x, y, w, 44, 9) + k.text(x + 12, y + 19, t, { color: c.fg, size: 12, weight: 600 }) + k.text(x + 12, y + 34, sub, { color: c.muted, size: 10 });
    return [
      k.line("M134 80 H 120 M182 70 L 208 44 M182 90 L 208 116", { o: 0.35 }),
      `<circle cx="160" cy="80" r="25" fill="${c.blue}" fill-opacity=".14" stroke="${c.blue}" stroke-width="1.4"/>`,
      k.spark(160, 80, 10),
      sat(6, 58, 114, "Chatbot", "answers customers"),
      sat(208, 18, 106, "Reports", "write themselves"),
      sat(208, 98, 106, "Tasks", "run on their own"),
    ].join("");
  },

  // Regular maintenance: the site watched, the routine jobs ticked off.
  maintenance(c, k) {
    const jobs = ["Updates", "Backups", "Links", "Speed"];
    return [
      k.surf(12, 16, 184, 128),
      k.text(24, 36, "Site health", { color: c.muted, size: 11 }),
      k.line("M24 92 H 78 L 88 70 L 100 112 L 110 80 L 118 92 H 184", { color: c.blue, o: 1, w: 1.8 }),
      k.bar(24, 126, 160, 0.1, 6),
      `<rect x="24" y="126" width="118" height="6" rx="3" fill="${c.blue}" fill-opacity=".6"/>`,
      k.outlineChip(110, 24, 76, "Watching"),
      ...jobs.map((t, i) => k.check(218, 38 + i * 28, 7) + k.text(233, 42.2 + i * 28, t, { color: c.fg, size: 12 })),
    ].join("");
  },

  // Monthly reporting: what we did, what changed, what is next. In words.
  reporting(c, k) {
    const arrow = (cx, cy, d) => `<circle cx="${cx}" cy="${cy}" r="7.5" fill="${c.fg}" fill-opacity=".14"/>` +
      (d === "up" ? `<path d="M${cx} ${cy + 3.5}v-7m-3 3l3-3 3 3" stroke="${c.fg}" stroke-opacity=".8" stroke-width="1.4"/>`
        : `<path d="M${cx - 3.5} ${cy}h7m-3-3l3 3-3 3" stroke="${c.fg}" stroke-opacity=".8" stroke-width="1.4"/>`);
    const rows = [["What we did", "check"], ["What changed", "up"], ["What is next", "next"]];
    return [
      k.surf(26, 8, 268, 144),
      k.text(42, 32, "Monthly report", { color: c.fg, size: 13, weight: 600 }),
      k.bar(214, 27, 64, 0.12),
      ...rows.map(([t, kind], i) => {
        const y = 60 + i * 32;
        return (kind === "check" ? k.check(50, y, 7.5) : arrow(50, y, kind)) +
          k.text(66, y + 4.2, t, { color: c.fg, size: 12 }) + k.bar(170, y - 4, 108) + k.bar(170, y + 4, 80);
      }),
    ].join("");
  },

  // Essentials: SEO and GEO worked on every month, side by side.
  essentials(c, k) {
    const head = (x, a, b) => `<text x="${x}" y="20" font-family="${FONT}" font-size="11"><tspan fill="${c.blue}" font-weight="700">${a}</tspan><tspan fill="${c.muted}" font-weight="500"> · ${b}</tspan></text>`;
    return [
      head(12, "SEO", "Google"), head(164, "GEO", "AI answers"),
      k.surf(12, 28, 144, 98),
      k.fill(24, 38, 120, 12, 6, 0.08),
      ...[60, 80, 100].map((y, i) => (i === 0 ? k.blueBar(24, y, 74, 4) : k.bar(24, y, 74, 0.3, 4)) + k.bar(24, y + 8, 110)),
      k.surf(164, 28, 144, 98),
      k.bar(176, 42, 100, 0.25),
      `<rect x="176" y="57" width="12" height="12" rx="3.5" fill="${c.blue}"/>`,
      k.text(194, 67.2, "Your business", { color: c.blue, weight: 600, size: 11.5 }),
      k.check(294, 63, 6.5),
      k.bar(176, 84, 110), k.bar(176, 96, 92), k.bar(176, 108, 100),
      k.outlineChip(114, 136, 92, "Every month"),
    ].join("");
  },

  // Complete: every part of the work, handled.
  complete(c, k) {
    const tiles = [["SEO & GEO", 26, 16], ["Accessibility", 164, 16], ["Maintenance", 26, 86], ["Content", 164, 86]];
    return tiles.map(([t, x, y]) =>
      k.surf(x, y, 130, 58, 9) + k.text(x + 14, y + 25, t, { color: c.fg, size: 12.5, weight: 600 }) + k.bar(x + 14, y + 39, 80) + k.check(x + 130 - 14, y + 15, 7)
    ).join("");
  },

  // Custom: pick only the parts you need.
  custom(c, k) {
    const tiles = [["Website", 16, 32, true], ["Local", 116, 32, true], ["Content", 216, 32, false], ["Speed", 16, 92, false], ["Store", 116, 92, false], ["Reports", 216, 92, true]];
    return [
      k.text(16, 20, "Pick only what you need", { color: c.muted, size: 11 }),
      ...tiles.map(([t, x, y, on]) =>
        (on ? `<rect x="${x}" y="${y}" width="88" height="48" rx="9" fill="${c.blue}" fill-opacity=".12" stroke="${c.blue}" stroke-width="1.4"/>`
          : `<rect x="${x}" y="${y}" width="88" height="48" rx="9" stroke="${c.fg}" stroke-opacity=".3" stroke-dasharray="4 4"/>`) +
        k.text(x + 44, y + 28.2, t, { color: on ? c.blue : c.muted, size: 12, weight: on ? 600 : 500, anchor: "middle" }) +
        (on ? k.check(x + 88, y, 6.5) : "")),
      `<path d="M190 70 l0 20 5 -5 4 9 4 -2 -4 -9 7 0z" fill="${c.fg}" fill-opacity=".85" stroke="${c.card}" stroke-width="1"/>`,
    ].join("");
  },

  // Website build: designed and coded, and fast on a phone from day one.
  build(c, k) {
    return [
      k.surf(12, 20, 176, 120),
      k.dots(24, 31),
      k.text(26, 76, "</>", { color: c.blue, size: 24, weight: 700 }),
      k.bar(84, 56, 90, 0.3, 4), k.bar(84, 68, 72, 0.18, 4), k.bar(84, 80, 82, 0.18, 4),
      k.bar(26, 100, 146), k.bar(26, 112, 116), k.bar(26, 124, 130),
      k.surf(198, 34, 110, 106),
      `<path d="M222 106 A 31 31 0 0 1 284 106" stroke="${c.fg}" stroke-opacity=".18" stroke-width="7"/>`,
      `<path d="M222 106 A 31 31 0 0 1 276 86" stroke="${c.blue}" stroke-width="7"/>`,
      `<path d="M253 106 L 272 90" stroke="${c.fg}" stroke-opacity=".8" stroke-width="2.2"/><circle cx="253" cy="106" r="3.5" fill="${c.fg}" fill-opacity=".8"/>`,
      k.text(253, 129, "Fast on phones", { color: c.fg, size: 11.5, anchor: "middle", weight: 600 }),
    ].join("");
  },

  // Local and Maps: your listing on the map, with the buttons people use.
  local(c, k) {
    return [
      k.surf(10, 10, 300, 140, 10),
      k.line("M10 52 C 90 60, 150 30, 310 46 M10 120 C 110 110, 200 134, 310 114 M92 10 C 100 60, 84 104, 96 150 M226 10 C 218 52, 236 96, 222 150", { o: 0.16, w: 5 }),
      k.text(22, 30, "Map results", { color: c.muted, size: 11 }),
      `<path d="M104 40 c-11 0 -19 8 -19 18 c0 13 19 30 19 30 s19 -17 19 -30 c0 -10 -8 -18 -19 -18z" fill="${c.blue}"/><circle cx="104" cy="58" r="6.5" fill="${c.card}"/>`,
      `<rect x="136" y="60" width="164" height="78" rx="10" fill="${c.card}" stroke="${c.fg}" stroke-opacity=".28"/>`,
      `<rect x="148" y="72" width="14" height="14" rx="4" fill="${c.blue}"/>`,
      k.text(169, 83.5, "Your business", { color: c.fg, size: 12, weight: 600 }),
      k.bar(148, 96, 110),
      k.outlineChip(148, 108, 76, "Directions"),
      k.outlineChip(230, 108, 52, "Call"),
    ].join("");
  },

  // Store and revenue: a product page that can be found, and sales tracked.
  store(c, k) {
    const ev = ["View", "Add to cart", "Sale"];
    return [
      k.surf(12, 12, 130, 136),
      k.fill(24, 24, 106, 56, 6, 0.08),
      `<path d="M38 72 l16 -16 12 12 10 -10 16 14" stroke="${c.fg}" stroke-opacity=".35" stroke-width="1.3"/>`,
      k.bar(24, 92, 92, 0.6, 5), k.bar(24, 104, 62),
      `<rect x="24" y="118" width="106" height="20" rx="10" fill="${c.blue}"/>`,
      k.text(77, 132, "Add to cart", { color: c.card, size: 10.5, weight: 600, anchor: "middle" }),
      k.surf(156, 26, 152, 108),
      k.text(170, 47, "Tracking", { color: c.muted, size: 11 }),
      ...ev.map((t, i) => k.check(178, 70 + i * 24, 7) + k.text(193, 74.2 + i * 24, t, { color: c.fg, size: 12 })),
    ].join("");
  },
};

for (const [name, scene] of Object.entries(SCENES)) {
  for (const [mode, c] of Object.entries(PALETTES)) {
    const body = scene(c, kit(c));
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="160" viewBox="0 0 320 160" fill="none" stroke-linecap="round" stroke-linejoin="round">${body}</svg>\n`;
    writeFileSync(path.join(OUT, `${name}-${mode}.svg`), svg);
  }
}
console.log(`wrote ${Object.keys(SCENES).length * 2} files to ${OUT}`);
