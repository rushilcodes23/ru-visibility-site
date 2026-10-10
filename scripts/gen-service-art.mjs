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

/** Drawing helpers, bound to one palette. */
function kit(c) {
  return {
    surf: (x, y, w, h, r = 8) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c.fg}" fill-opacity=".05" stroke="${c.fg}" stroke-opacity=".28"/>`,
    fill: (x, y, w, h, r = 6, o = 0.1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c.fg}" fill-opacity="${o}"/>`,
    bar: (x, y, w, o = 0.18, h = 3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c.fg}" fill-opacity="${o}"/>`,
    blueBar: (x, y, w, h = 3.5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c.blue}"/>`,
    text: (x, y, t, { size = 9.5, color = c.muted, weight = 500, anchor = "start" } = {}) =>
      `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(t)}</text>`,
    check: (cx, cy, r = 7) =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.blue}"/><path d="M${cx - r * 0.42} ${cy + 0.2}l${r * 0.3} ${r * 0.3} ${r * 0.58} -${r * 0.62}" stroke="${c.card}" stroke-width="${Math.max(1.4, r * 0.24)}"/>`,
    warn: (cx, cy, r = 7) =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.warn}"/><path d="M${cx} ${cy - r * 0.45}v${r * 0.5}" stroke="${c.card}" stroke-width="${r * 0.26}"/><circle cx="${cx}" cy="${cy + r * 0.45}" r="${r * 0.13}" fill="${c.card}"/>`,
    chip: (x, y, w, t, color = c.blue, h = 16) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${color}"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2 + 3.2}" font-family="${FONT}" font-size="8.8" font-weight="600" fill="${c.card}" text-anchor="middle">${esc(t)}</text>`,
    outlineChip: (x, y, w, t, h = 16) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" stroke="${c.fg}" stroke-opacity=".35"/>` +
      `<text x="${x + w / 2}" y="${y + h / 2 + 3.2}" font-family="${FONT}" font-size="8.8" font-weight="500" fill="${c.muted}" text-anchor="middle">${esc(t)}</text>`,
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
    const engines = [["ChatGPT", 34], ["Gemini", 80], ["Perplexity", 126]];
    return [
      k.surf(18, 46, 118, 68),
      `<rect x="30" y="60" width="14" height="14" rx="4" fill="${c.blue}"/>`,
      k.text(52, 71, "Your business", { color: c.fg, weight: 600, size: 10 }),
      k.bar(30, 86, 92), k.bar(30, 96, 70),
      ...engines.map(([, y]) => k.line(`M138 80 C 160 80, 160 ${y}, 180 ${y}`, { o: 0.35, dash: true })),
      ...engines.map(([name, y]) => k.surf(182, y - 13, 120, 26, 13) + k.text(196, y + 3.5, name, { color: c.fg, size: 9.8 }) + k.check(288, y, 6.5)),
    ].join("");
  },

  // Technical SEO: the site's structure, crawled, with one broken page found.
  technical(c, k) {
    const node = (x, y, w, t, ok = true) => k.surf(x, y, w, 22, 6) + k.text(x + w / 2, y + 14.5, t, { color: c.fg, size: 9.5, anchor: "middle" }) + (ok ? k.check(x + w, y, 5.5) : "");
    return [
      node(130, 12, 60, "Home"),
      k.line("M160 34 V 48 M64 48 H 256 M64 48 V 62 M160 48 V 62 M256 48 V 62", { o: 0.3 }),
      node(24, 62, 80, "Services"), node(120, 62, 80, "About"), node(216, 62, 80, "Blog"),
      k.line("M256 84 V 112", { o: 0.3, dash: true }),
      `<rect x="216" y="112" width="80" height="22" rx="6" stroke="${c.warn}" stroke-dasharray="3 3"/>`,
      k.text(256, 126.5, "Old page", { color: c.warn, size: 9.5, anchor: "middle", weight: 600 }),
      k.warn(296, 112, 5.5),
      k.text(206, 127, "Broken link", { color: c.warn, size: 9.5, anchor: "end", weight: 600 }),
    ].join("");
  },

  // Accessibility audits: a page and the checks it is put through.
  accessibility(c, k) {
    const items = [["Alt text", true], ["Contrast", true], ["Keyboard", true], ["Captions", false]];
    return [
      k.surf(18, 18, 150, 124),
      k.dots(30, 30),
      k.fill(30, 42, 126, 44, 6, 0.08),
      `<path d="M42 78 l14 -14 10 10 8 -8 14 12" stroke="${c.fg}" stroke-opacity=".35" stroke-width="1.3"/>`,
      k.chip(118, 48, 30, "alt", c.blue, 14),
      k.bar(30, 98, 110), k.bar(30, 108, 90),
      `<rect x="30" y="120" width="56" height="12" rx="6" fill="${c.blue}" fill-opacity=".85"/>`,
      k.text(186, 30, "Checks", { color: c.muted }),
      ...items.map(([t, ok], i) => (ok ? k.check(194, 52 + i * 26, 6.5) : k.warn(194, 52 + i * 26, 6.5)) + k.text(208, 55.5 + i * 26, t, { color: ok ? c.fg : c.warn, size: 10, weight: ok ? 500 : 600 })),
    ].join("");
  },

  // Blog and content: a post that answers a real question, every month.
  content(c, k) {
    const q = (y) => `<circle cx="58" cy="${y}" r="6" fill="${c.blue}"/>` + k.text(58, y + 3.2, "?", { color: c.card, size: 9, weight: 700, anchor: "middle" });
    return [
      k.surf(38, 12, 168, 136),
      k.text(52, 30, "Blog post", { color: c.muted }),
      k.bar(52, 40, 118, 0.7, 6),
      q(62), k.blueBar(70, 60.5, 104, 4),
      k.bar(52, 76, 136), k.bar(52, 86, 124), k.bar(52, 96, 130),
      q(116), k.blueBar(70, 114.5, 90, 4),
      k.bar(52, 130, 120),
      k.outlineChip(220, 22, 80, "Every month"),
      `<path d="M276 58 l12 12 -42 42 -15 4 4 -15z" fill="${c.fg}" fill-opacity=".12" stroke="${c.fg}" stroke-opacity=".45" stroke-width="1.2"/>`,
      `<path d="M235 101 l11 11" stroke="${c.fg}" stroke-opacity=".45" stroke-width="1.2"/>`,
    ].join("");
  },

  // Website design and build: the same site on desktop and phone.
  design(c, k) {
    return [
      k.text(18, 14, "Desktop", { color: c.muted }),
      k.surf(18, 20, 196, 122),
      k.dots(30, 31),
      k.fill(30, 42, 172, 40, 6, 0.08),
      k.blueBar(42, 54, 80, 5), k.bar(42, 66, 110),
      k.fill(30, 90, 54, 26, 5, 0.07), k.fill(89, 90, 54, 26, 5, 0.07), k.fill(148, 90, 54, 26, 5, 0.07),
      k.chip(30, 122, 64, "SEO ready", c.blue, 14),
      k.text(230, 30, "Phone", { color: c.muted }),
      `<rect x="230" y="36" width="72" height="112" rx="12" fill="${c.fg}" fill-opacity=".05" stroke="${c.fg}" stroke-opacity=".28"/>`,
      k.bar(254, 44, 24, 0.25),
      k.fill(240, 56, 52, 30, 5, 0.08), k.blueBar(246, 66, 32, 4),
      k.bar(240, 94, 52), k.bar(240, 104, 40), k.fill(240, 116, 52, 22, 5, 0.07),
    ].join("");
  },

  // Website monetization: the step where visitors give up, found and fixed.
  monetization(c, k) {
    const steps = [["Visit", 14], ["Product", 92], ["Cart", 170], ["Buy", 248]];
    return [
      ...steps.map(([t, x]) =>
        (t === "Cart"
          ? `<rect x="${x}" y="54" width="60" height="30" rx="7" fill="${c.blue}" fill-opacity=".12" stroke="${c.blue}" stroke-width="1.4"/>`
          : k.surf(x, 54, 60, 30, 7)) + k.text(x + 30, 72.5, t, { color: t === "Cart" ? c.blue : c.fg, size: 10, weight: t === "Cart" ? 600 : 500, anchor: "middle" })),
      ...[74, 152, 230].map((x) => k.line(`M${x + 2} 69 H ${x + 15}`, { o: 0.4 }) + k.head(x + 16, 69)),
      k.chip(176, 26, 48, "Fix this", c.blue, 16),
      k.line("M200 84 C 200 100, 210 108, 220 120", { color: c.warn, o: 1, dash: true, w: 1.5 }),
      `<path d="M213 119 l7.5 1.5 -1.5 -7.5" stroke="${c.warn}" stroke-width="1.5"/>`,
      k.text(222, 140, "Where visitors leave", { color: c.warn, size: 9.5, weight: 600, anchor: "middle" }),
    ].join("");
  },

  // Digital marketing: ads, social and email, all bringing people to the site.
  marketing(c, k) {
    const src = [["Ads", 34], ["Social", 80], ["Email", 126]];
    return [
      ...src.map(([t, y]) => k.surf(18, y - 14, 92, 28, 14) + k.text(64, y + 3.5, t, { color: c.fg, size: 10, anchor: "middle" })),
      ...src.map(([, y]) => k.line(`M112 ${y} C 150 ${y}, 160 80, 192 80`, { o: 0.35, dash: true })),
      k.head(196, 80),
      k.surf(200, 34, 104, 92),
      k.dots(212, 46),
      k.text(212, 70, "Your site", { color: c.blue, weight: 600, size: 10.5 }),
      k.bar(212, 82, 78), k.bar(212, 92, 64), k.fill(212, 102, 46, 14, 7, 0.12),
    ].join("");
  },

  // AI integration: one assistant behind a chatbot, reports and routine jobs.
  "ai-integration"(c, k) {
    const sat = (x, y, w, t, sub) => k.surf(x, y, w, 40, 8) + k.text(x + 12, y + 17, t, { color: c.fg, size: 10, weight: 600 }) + k.text(x + 12, y + 30, sub, { color: c.muted, size: 8.6 });
    return [
      k.line("M136 80 H 112 M184 72 L 214 42 M184 88 L 214 118", { o: 0.35 }),
      `<circle cx="160" cy="80" r="26" fill="${c.blue}" fill-opacity=".14" stroke="${c.blue}" stroke-width="1.4"/>`,
      k.spark(160, 80, 10),
      sat(14, 60, 98, "Chatbot", "answers customers"),
      sat(214, 22, 92, "Reports", "write themselves"),
      sat(214, 98, 92, "Tasks", "run on their own"),
    ].join("");
  },

  // Regular maintenance: the site watched, the routine jobs ticked off.
  maintenance(c, k) {
    const jobs = ["Updates", "Backups", "Links", "Speed"];
    return [
      k.surf(18, 18, 176, 124),
      k.text(30, 36, "Site health", { color: c.muted }),
      k.line("M30 92 H 82 L 92 70 L 104 112 L 114 80 L 122 92 H 182", { color: c.blue, o: 1, w: 1.8 }),
      k.bar(30, 124, 152, 0.1, 6),
      `<rect x="30" y="124" width="112" height="6" rx="3" fill="${c.blue}" fill-opacity=".6"/>`,
      k.outlineChip(118, 26, 64, "Watching"),
      ...jobs.map((t, i) => k.check(220, 40 + i * 27, 6.5) + k.text(234, 43.5 + i * 27, t, { color: c.fg, size: 10 })),
    ].join("");
  },

  // Monthly reporting: what we did, what changed, what is next. In words.
  reporting(c, k) {
    const arrow = (cx, cy, d) => `<circle cx="${cx}" cy="${cy}" r="7" fill="${c.fg}" fill-opacity=".14"/>` +
      (d === "up" ? `<path d="M${cx} ${cy + 3.5}v-7m-3 3l3-3 3 3" stroke="${c.fg}" stroke-opacity=".8" stroke-width="1.4"/>`
        : `<path d="M${cx - 3.5} ${cy}h7m-3-3l3 3-3 3" stroke="${c.fg}" stroke-opacity=".8" stroke-width="1.4"/>`);
    const rows = [["What we did", "check"], ["What changed", "up"], ["What is next", "next"]];
    return [
      k.surf(40, 10, 240, 140),
      k.text(56, 32, "Monthly report", { color: c.fg, size: 11, weight: 600 }),
      k.bar(204, 27, 60, 0.12),
      ...rows.map(([t, kind], i) => {
        const y = 58 + i * 32;
        return (kind === "check" ? k.check(62, y, 7) : arrow(62, y, kind)) +
          k.text(76, y + 3.5, t, { color: c.fg, size: 10 }) + k.bar(160, y - 4, 104) + k.bar(160, y + 4, 76);
      }),
    ].join("");
  },

  // Essentials: SEO and GEO worked on every month, side by side.
  essentials(c, k) {
    const head = (x, a, b) => `<text x="${x}" y="22" font-family="${FONT}" font-size="9.5"><tspan fill="${c.blue}" font-weight="700">${a}</tspan><tspan fill="${c.muted}" font-weight="500"> · ${b}</tspan></text>`;
    return [
      head(18, "SEO", "Google"), head(166, "GEO", "AI answers"),
      k.surf(18, 30, 136, 96),
      k.fill(30, 40, 112, 12, 6, 0.08),
      ...[62, 82, 102].map((y, i) => (i === 0 ? k.blueBar(30, y, 70, 4) : k.bar(30, y, 70, 0.3, 4)) + k.bar(30, y + 8, 104)),
      k.surf(166, 30, 136, 96),
      k.bar(178, 44, 96, 0.25),
      `<rect x="178" y="60" width="10" height="10" rx="3" fill="${c.blue}"/>`,
      k.text(194, 68.5, "Your business", { color: c.blue, weight: 600, size: 9.6 }),
      k.check(290, 65, 6),
      k.bar(178, 84, 104), k.bar(178, 96, 88), k.bar(178, 108, 96),
      k.outlineChip(122, 136, 76, "Every month"),
    ].join("");
  },

  // Complete: every part of the work, handled.
  complete(c, k) {
    const tiles = [["SEO & GEO", 36, 18], ["Accessibility", 164, 18], ["Maintenance", 36, 86], ["Content", 164, 86]];
    return tiles.map(([t, x, y]) =>
      k.surf(x, y, 120, 56, 8) + k.text(x + 14, y + 24, t, { color: c.fg, size: 10.5, weight: 600 }) + k.bar(x + 14, y + 36, 78) + k.check(x + 120 - 14, y + 14, 6.5)
    ).join("");
  },

  // Custom: pick only the parts you need.
  custom(c, k) {
    const tiles = [["Website", 24, 34, true], ["Local", 120, 34, true], ["Content", 216, 34, false], ["Speed", 24, 92, false], ["Store", 120, 92, false], ["Reports", 216, 92, true]];
    return [
      k.text(24, 22, "Pick only what you need", { color: c.muted }),
      ...tiles.map(([t, x, y, on]) =>
        (on ? `<rect x="${x}" y="${y}" width="80" height="46" rx="8" fill="${c.blue}" fill-opacity=".12" stroke="${c.blue}" stroke-width="1.4"/>`
          : `<rect x="${x}" y="${y}" width="80" height="46" rx="8" stroke="${c.fg}" stroke-opacity=".3" stroke-dasharray="4 4"/>`) +
        k.text(x + 40, y + 27, t, { color: on ? c.blue : c.muted, size: 10, weight: on ? 600 : 500, anchor: "middle" }) +
        (on ? k.check(x + 80, y, 6) : "")),
      `<path d="M188 70 l0 20 5 -5 4 9 4 -2 -4 -9 7 0z" fill="${c.fg}" fill-opacity=".85" stroke="${c.card}" stroke-width="1"/>`,
    ].join("");
  },

  // Website build: designed and coded, and fast on a phone from day one.
  build(c, k) {
    return [
      k.surf(18, 22, 170, 116),
      k.dots(30, 33),
      k.text(32, 76, "</>", { color: c.blue, size: 22, weight: 700 }),
      k.bar(84, 58, 88, 0.3, 4), k.bar(84, 70, 70, 0.18, 4), k.bar(84, 82, 80, 0.18, 4),
      k.bar(32, 100, 140), k.bar(32, 112, 112), k.bar(32, 124, 126),
      k.surf(200, 38, 102, 98),
      `<path d="M220 108 A 31 31 0 0 1 282 108" stroke="${c.fg}" stroke-opacity=".18" stroke-width="7"/>`,
      `<path d="M220 108 A 31 31 0 0 1 274 88" stroke="${c.blue}" stroke-width="7"/>`,
      `<path d="M251 108 L 270 92" stroke="${c.fg}" stroke-opacity=".8" stroke-width="2.2"/><circle cx="251" cy="108" r="3.5" fill="${c.fg}" fill-opacity=".8"/>`,
      k.text(251, 128, "Fast on phones", { color: c.fg, size: 9.6, anchor: "middle", weight: 600 }),
    ].join("");
  },

  // Local and Maps: your listing on the map, with the buttons people use.
  local(c, k) {
    return [
      k.surf(14, 12, 292, 136, 10),
      k.line("M14 52 C 90 60, 150 30, 306 46 M14 118 C 110 108, 200 132, 306 112 M96 12 C 104 60, 88 104, 100 148 M226 12 C 218 52, 236 96, 222 148", { o: 0.16, w: 5 }),
      k.text(26, 30, "Map results", { color: c.muted }),
      `<path d="M110 40 c-11 0 -19 8 -19 18 c0 13 19 30 19 30 s19 -17 19 -30 c0 -10 -8 -18 -19 -18z" fill="${c.blue}"/><circle cx="110" cy="58" r="6.5" fill="${c.card}"/>`,
      `<rect x="146" y="64" width="146" height="70" rx="9" fill="${c.card}" stroke="${c.fg}" stroke-opacity=".28"/>`,
      `<rect x="158" y="76" width="12" height="12" rx="3.5" fill="${c.blue}"/>`,
      k.text(176, 86, "Your business", { color: c.fg, size: 10, weight: 600 }),
      k.bar(158, 98, 100),
      k.outlineChip(158, 110, 62, "Directions"),
      k.outlineChip(226, 110, 44, "Call"),
    ].join("");
  },

  // Store and revenue: a product page that can be found, and sales tracked.
  store(c, k) {
    const ev = ["View", "Add to cart", "Sale"];
    return [
      k.surf(18, 14, 124, 132),
      k.fill(30, 26, 100, 56, 6, 0.08),
      `<path d="M44 74 l16 -16 12 12 10 -10 16 14" stroke="${c.fg}" stroke-opacity=".35" stroke-width="1.3"/>`,
      k.bar(30, 92, 88, 0.6, 5), k.bar(30, 104, 60),
      `<rect x="30" y="118" width="100" height="18" rx="9" fill="${c.blue}"/>`,
      k.text(80, 130.5, "Add to cart", { color: c.card, size: 9, weight: 600, anchor: "middle" }),
      k.surf(158, 30, 146, 100),
      k.text(172, 50, "Tracking", { color: c.muted }),
      ...ev.map((t, i) => k.check(180, 72 + i * 22, 6) + k.text(194, 75.5 + i * 22, t, { color: c.fg, size: 10 })),
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
