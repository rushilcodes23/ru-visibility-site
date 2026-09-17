#!/usr/bin/env node
/**
 * Aggregates every audit report on disk into anonymous corpus-wide statistics
 * for the /research page.
 *
 *   node scripts/aggregate-findings.mjs --root "C:/Users/hp/Desktop"
 *   node scripts/aggregate-findings.mjs --root ../.. --out src/lib/research-findings.json
 *
 * Two rules this script exists to enforce, because /research is a public page:
 *
 * 1. NO CLIENT DATA LEAVES. Output contains counts and percentages only —
 *    never a domain, name, URL or any other per-site identifier. The input
 *    folders hold real prospect data that was never meant to be published.
 * 2. NO SILENT DENOMINATOR DRIFT. A field added partway through the campaign
 *    (compliance and business-value modules landed in Sept 2026) is present on
 *    a subset of reports only. Averaging it against the full corpus would
 *    silently overstate coverage, so anything below 100% presence is reported
 *    separately, against its own denominator, in `subsetOnly`.
 *
 * 3. NO SCORING FORMULA IN THE PUBLIC FILE. Component weights, recommendation
 *    ids and pitch-type taxonomy describe how the audit tool works, which is
 *    the product. They go to `--full` (private, never committed); the public
 *    `--out` file carries only observable facts about the sites themselves.
 *    Note this matters even for data the page never renders — an imported
 *    JSON module is bundled and served whether a component reads it or not.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
function arg(flag, fallback) {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
}

const ROOT = path.resolve(arg("--root", path.join(process.cwd(), "..", "..")));
const OUT_JSON = path.resolve(arg("--out", "src/lib/research-findings.json"));
const OUT_CSV = path.resolve(arg("--csv", "research-findings.csv"));
// Optional. Everything the public file deliberately leaves out. Keep it off
// the repo — it describes the scoring engine, not the audited sites.
const OUT_FULL = args.includes("--full") ? path.resolve(arg("--full", "research-findings.full.json")) : null;

// Folders that hold stale duplicates of the live campaign data. Aggregating
// these would double-count domains that also exist in the live folders.
const SKIP_DIRS = new Set([
  "node_modules", ".git", ".next", "RU website", "tool copy", "tool backup",
  "old laptop", "sf-batch-temp", "sf-test-output",
]);
const SKIP_PREFIX = "backup-";

async function findReportFiles(dir, acc = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    if (SKIP_DIRS.has(e.name) || e.name.startsWith(SKIP_PREFIX)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await findReportFiles(p, acc);
    else if (e.isFile() && e.name.endsWith(".json") && path.basename(dir) === "reports") acc.push(p);
  }
  return acc;
}

/** A real audit report, as opposed to a PDF payload or a business summary. */
function isAuditReport(j) {
  return Boolean(j && j.raw && j.scored && j.raw.domain && Array.isArray(j.raw.pages));
}

/**
 * Which campaign a report came from, derived from its path on disk. Used for
 * the per-market breakdown on /research.
 *
 * These labels describe what was actually audited and nothing more. Every
 * campaign so far has been dental or hair-transplant clinics, so there is no
 * segment for any other industry — if one is ever wanted, it has to come from
 * running real audits in that industry, not from relabelling these.
 */
/**
 * The US campaign city a report came from, for the per-city blocks on the
 * location pages. Only cities with a real campaign folder appear here — a city
 * page without one gets no stats block rather than an invented one.
 */
const CAMPAIGN_CITIES = {
  dallas: "Dallas", miami: "Miami", atlanta: "Atlanta",
  houston: "Houston", phoenix: "Phoenix", charlotte: "Charlotte",
};
function cityOf(filePath) {
  const p = filePath.replace(/\\/g, "/").toLowerCase();
  for (const slug of Object.keys(CAMPAIGN_CITIES)) {
    if (p.includes(`/usa/`) && p.includes(`/${slug}/`)) return slug;
  }
  return null;
}

function segmentOf(filePath) {
  const p = filePath.replace(/\\/g, "/").toLowerCase();
  if (p.includes("/hair transplant dubai/")) return { key: "hair-uae", industry: "Hair transplant clinics", market: "Dubai" };
  if (p.includes("/dental implant dubai/")) return { key: "dental-dubai", industry: "Dental clinics", market: "Dubai" };
  if (p.includes("/dental implant abu dhabi/")) return { key: "dental-ad", industry: "Dental clinics", market: "Abu Dhabi" };
  if (p.includes("/france dental implant/")) return { key: "dental-fr", industry: "Dental clinics", market: "France" };
  if (p.includes("/usa/")) return { key: "dental-us", industry: "Dental clinics", market: "United States" };
  return null;
}

const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);
const mean = (xs) => (xs.length ? Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10 : 0);
function median(xs) {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round(((s[m - 1] + s[m]) / 2) * 10) / 10;
}

/**
 * Counts a yes/no signal while tracking how many records could answer it at
 * all, so a field that only exists on newer reports can never be averaged
 * against the whole corpus.
 */
function signal() {
  return { yes: 0, eligible: 0 };
}
function record(sig, value) {
  if (value === undefined || value === null) return;
  sig.eligible++;
  if (value) sig.yes++;
}

async function main() {
  const files = await findReportFiles(ROOT);
  process.stderr.write(`scanned ${files.length} json files under ${ROOT}\n`);

  /** @type {Map<string, any>} newest report wins when a domain appears twice */
  const byDomain = new Map();
  let skipped = 0;

  for (const f of files) {
    let j;
    try {
      j = JSON.parse(await readFile(f, "utf8"));
    } catch {
      skipped++;
      continue;
    }
    if (!isAuditReport(j)) {
      skipped++;
      continue;
    }
    const domain = String(j.raw.domain).toLowerCase();
    const when = Date.parse(j.raw.checkedAt || 0) || 0;
    const prev = byDomain.get(domain);
    if (!prev || when > prev.when) byDomain.set(domain, { when, j, segment: segmentOf(f), city: cityOf(f) });
  }

  const entries = [...byDomain.values()].sort((a, b) => a.when - b.when);
  const reports = entries.map((r) => r.j);
  const N = reports.length;
  if (!N) throw new Error(`no audit reports found under ${ROOT}`);

  const geoScores = [];
  const seoScores = [];
  const geoGrades = {};
  const seoGrades = {};
  const botBlocked = {};
  const botEligible = {};
  const compLoss = {};
  const recFreq = {};
  const pitchTypes = {};
  const platforms = {};
  const checkedDates = [];

  // Page-level signals, all present on every report version.
  const sig = {
    httpsEnforced: signal(),
    sitemapFound: signal(),
    sitemapInRobots: signal(),
    anyNoindex: signal(),
    missingCanonicalSomewhere: signal(),
    missingTitleSomewhere: signal(),
    missingMetaSomewhere: signal(),
    missingH1Somewhere: signal(),
    multipleH1Somewhere: signal(),
    anySchema: signal(),
    anyFaqBlock: signal(),
    anyTable: signal(),
    brokenInternalLinks: signal(),
    redirectChains: signal(),
    jsDependent: signal(),
    altTextGap: signal(),
    noSameAs: signal(),
    noPressSection: signal(),
  };

  // Fields that only exist on reports produced after a mid-campaign change.
  const subset = {
    complianceAccessibility: signal(),
    trackingOnForms: signal(),
    businessValueScored: signal(),
  };

  // Per-market rollup. Only a handful of metrics — enough to show that the
  // pattern holds across markets, without turning /research into a spreadsheet.
  const cityAcc = new Map();
  const segAcc = new Map();
  function seg(entry) {
    if (!entry.segment) return null;
    const k = entry.segment.key;
    if (!segAcc.has(k)) {
      segAcc.set(k, {
        ...entry.segment,
        sites: 0, geoSum: 0, seoSum: 0,
        noSameAs: 0, noPress: 0, aiBlocked: 0, missingMeta: 0, noFaq: 0,
      });
    }
    return segAcc.get(k);
  }

  for (const entry of entries) {
    const r = entry.j;
    const s = seg(entry);
    const { raw, scored } = r;
    if (raw.checkedAt) checkedDates.push(raw.checkedAt.slice(0, 10));

    if (s) {
      s.sites++;
      if (typeof scored.geo?.total === "number") s.geoSum += scored.geo.total;
      if (typeof scored.seo?.total === "number") s.seoSum += scored.seo.total;
      const pgs = (raw.pages || []).filter((p) => p && p.ok !== false);
      if (pgs.length) {
        if (!pgs.some((p) => (p.schema?.sameAs?.length || 0) > 0)) s.noSameAs++;
        if (!pgs.some((p) => p.pressSection)) s.noPress++;
        if (pgs.some((p) => !p.metaDescription)) s.missingMeta++;
        if (!pgs.some((p) => (p.faqBlocks || 0) > 0)) s.noFaq++;
      }
      // Blocked to at least one crawler that feeds live AI answers.
      const answerBots = Object.entries(raw.bots || {}).filter(([n]) =>
        /SearchBot|ChatGPT-User|Claude-User|PerplexityBot|Perplexity-User/.test(n)
      );
      if (answerBots.some(([, i]) => i && i.status && i.status !== "ok")) s.aiBlocked++;
    }

    // Per-city rollup for the location pages.
    if (entry.city) {
      if (!cityAcc.has(entry.city)) {
        cityAcc.set(entry.city, { slug: entry.city, city: CAMPAIGN_CITIES[entry.city], sites: 0, geoSum: 0, seoSum: 0, noSameAs: 0, noFaq: 0, aiBlocked: 0 });
      }
      const c = cityAcc.get(entry.city);
      c.sites++;
      if (typeof scored.geo?.total === "number") c.geoSum += scored.geo.total;
      if (typeof scored.seo?.total === "number") c.seoSum += scored.seo.total;
      const pgs = (raw.pages || []).filter((p) => p && p.ok !== false);
      if (pgs.length) {
        if (!pgs.some((p) => (p.schema?.sameAs?.length || 0) > 0)) c.noSameAs++;
        if (!pgs.some((p) => (p.faqBlocks || 0) > 0)) c.noFaq++;
      }
      const ab = Object.entries(raw.bots || {}).filter(([n]) =>
        /SearchBot|ChatGPT-User|Claude-User|PerplexityBot|Perplexity-User/.test(n)
      );
      if (ab.some(([, i]) => i && i.status && i.status !== "ok")) c.aiBlocked++;
    }

    if (typeof scored.geo?.total === "number") geoScores.push(scored.geo.total);
    if (typeof scored.seo?.total === "number") seoScores.push(scored.seo.total);
    if (scored.geo?.grade) geoGrades[scored.geo.grade] = (geoGrades[scored.geo.grade] || 0) + 1;
    if (scored.seo?.grade) seoGrades[scored.seo.grade] = (seoGrades[scored.seo.grade] || 0) + 1;
    if (scored.pitchType) pitchTypes[scored.pitchType] = (pitchTypes[scored.pitchType] || 0) + 1;
    if (raw.platform?.name) platforms[raw.platform.name] = (platforms[raw.platform.name] || 0) + 1;

    for (const [bot, info] of Object.entries(raw.bots || {})) {
      botEligible[bot] = (botEligible[bot] || 0) + 1;
      // "ok" means it got through; anything else is a block or an error.
      if (info && info.status && info.status !== "ok") {
        botBlocked[bot] = (botBlocked[bot] || 0) + 1;
      }
    }

    for (const c of [...(scored.geo?.components || []), ...(scored.seo?.components || [])]) {
      if (!c?.key) continue;
      const lost = (c.available || 0) - (c.earned || 0);
      const e = (compLoss[c.key] ||= {
        key: c.key,
        label: c.label || c.key,
        family: (scored.geo?.components || []).includes(c) ? "GEO" : "SEO",
        available: c.available || 0,
        sitesLosingAny: 0,
        totalLost: 0,
        eligible: 0,
      });
      e.eligible++;
      e.totalLost += lost;
      if (lost > 0.01) e.sitesLosingAny++;
    }

    for (const rec of scored.recommendations || []) {
      if (!rec?.id) continue;
      const e = (recFreq[rec.id] ||= {
        id: rec.id,
        title: rec.title || rec.id,
        category: rec.category || "",
        effort: rec.effort || "",
        count: 0,
      });
      e.count++;
    }

    const pages = raw.pages || [];
    const ok = pages.filter((p) => p && p.ok !== false);
    record(sig.httpsEnforced, raw.httpsEnforced === true);
    record(sig.sitemapFound, (raw.sitemap?.count || 0) > 0);
    record(sig.sitemapInRobots, raw.sitemap?.declaredInRobots === true);
    record(sig.brokenInternalLinks, (raw.linkCheck?.broken?.length || 0) > 0);
    record(sig.redirectChains, (raw.linkCheck?.redirectChains?.length || 0) > 0);

    if (ok.length) {
      record(sig.anyNoindex, ok.some((p) => /noindex/i.test(p.robotsMeta || "")));
      record(sig.missingCanonicalSomewhere, ok.some((p) => !p.canonical));
      record(sig.missingTitleSomewhere, ok.some((p) => !p.title));
      record(sig.missingMetaSomewhere, ok.some((p) => !p.metaDescription));
      record(sig.missingH1Somewhere, ok.some((p) => (p.h1Count || 0) === 0));
      record(sig.multipleH1Somewhere, ok.some((p) => (p.h1Count || 0) > 1));
      record(sig.anySchema, ok.some((p) => (p.schema?.blocks || 0) > 0));
      record(sig.anyFaqBlock, ok.some((p) => (p.faqBlocks || 0) > 0));
      record(sig.anyTable, ok.some((p) => (p.tables || 0) > 0));
      record(sig.jsDependent, ok.some((p) => p.emptyRoot === true));
      record(sig.noPressSection, !ok.some((p) => p.pressSection));

      const imgs = ok.reduce((a, p) => a + (p.images || 0), 0);
      const desc = ok.reduce((a, p) => a + (p.imagesDescriptiveAlt || 0), 0);
      if (imgs > 0) record(sig.altTextGap, desc / imgs < 0.5);

      record(sig.noSameAs, !ok.some((p) => (p.schema?.sameAs?.length || 0) > 0));
    }

    // Subset-only modules — absent entirely on reports predating them, which
    // is why these use their own eligibility counter rather than N.
    if (r.compliance !== undefined || raw.compliance !== undefined) {
      const c = r.compliance || raw.compliance;
      record(subset.complianceAccessibility, (c?.violations?.length || 0) > 0);
      record(subset.trackingOnForms, c?.trackingOnForms === true || (c?.trackers?.length || 0) > 0);
    }
    if (r.business !== undefined || scored.business !== undefined) {
      record(subset.businessValueScored, true);
    }
  }

  const dates = checkedDates.filter(Boolean).sort();
  const compArr = Object.values(compLoss)
    .map((c) => ({
      key: c.key,
      label: c.label,
      family: c.family,
      pointsAvailable: c.available,
      sitesLosingAnyPct: pct(c.sitesLosingAny, c.eligible),
      avgPointsLost: mean([c.totalLost / Math.max(c.eligible, 1)]),
      denominator: c.eligible,
    }))
    .sort((a, b) => b.sitesLosingAnyPct - a.sitesLosingAnyPct);

  const recArr = Object.values(recFreq)
    .map((r) => ({ ...r, sharePct: pct(r.count, N) }))
    .sort((a, b) => b.count - a.count);

  const botArr = Object.keys(botEligible)
    .map((bot) => ({
      crawler: bot,
      blockedCount: botBlocked[bot] || 0,
      blockedPct: pct(botBlocked[bot] || 0, botEligible[bot]),
      denominator: botEligible[bot],
    }))
    .sort((a, b) => b.blockedPct - a.blockedPct);

  const universal = {};
  const subsetOnly = {};
  for (const [name, s] of Object.entries(sig)) {
    const row = { sitesPct: pct(s.yes, s.eligible), count: s.yes, denominator: s.eligible };
    // A signal every report could answer belongs in the headline numbers; one
    // that only some could answer keeps its own denominator and is labelled.
    if (s.eligible === N) universal[name] = row;
    else subsetOnly[name] = { ...row, coveragePct: pct(s.eligible, N) };
  }
  for (const [name, s] of Object.entries(subset)) {
    if (!s.eligible) continue;
    subsetOnly[name] = {
      sitesPct: pct(s.yes, s.eligible),
      count: s.yes,
      denominator: s.eligible,
      coveragePct: pct(s.eligible, N),
    };
  }

  // Public: observable facts about the audited sites. Nothing about how the
  // scoring engine reaches a number.
  const out = {
    generatedAt: new Date().toISOString(),
    corpus: {
      uniqueDomains: N,
      jsonFilesScanned: files.length,
      nonAuditFilesSkipped: skipped,
      firstAudit: dates[0] || null,
      lastAudit: dates[dates.length - 1] || null,
    },
    scores: {
      geo: { mean: mean(geoScores), median: median(geoScores), grades: geoGrades, denominator: geoScores.length },
      seo: { mean: mean(seoScores), median: median(seoScores), grades: seoGrades, denominator: seoScores.length },
    },
    crawlerBlocks: botArr,
    segments: [...segAcc.values()]
      .map((s) => ({
        key: s.key,
        industry: s.industry,
        market: s.market,
        sites: s.sites,
        geoMean: Math.round((s.geoSum / s.sites) * 10) / 10,
        seoMean: Math.round((s.seoSum / s.sites) * 10) / 10,
        noSameAsPct: pct(s.noSameAs, s.sites),
        noPressPct: pct(s.noPress, s.sites),
        aiBlockedPct: pct(s.aiBlocked, s.sites),
        missingMetaPct: pct(s.missingMeta, s.sites),
        noFaqPct: pct(s.noFaq, s.sites),
      }))
      .sort((a, b) => b.sites - a.sites),
    // Per-city, for the location pages. Only cities with a real campaign
    // behind them appear; the rest get no stats block rather than a made-up one.
    cities: [...cityAcc.values()]
      .filter((c) => c.sites >= 20)
      .map((c) => ({
        slug: c.slug,
        city: c.city,
        sites: c.sites,
        geoMean: Math.round((c.geoSum / c.sites) * 10) / 10,
        seoMean: Math.round((c.seoSum / c.sites) * 10) / 10,
        noSameAsPct: pct(c.noSameAs, c.sites),
        noFaqPct: pct(c.noFaq, c.sites),
        aiBlockedPct: pct(c.aiBlocked, c.sites),
      }))
      .sort((a, b) => b.sites - a.sites),
    platforms,
    universal,
    subsetOnly,
  };

  await writeFile(OUT_JSON, JSON.stringify(out, null, 2) + "\n");

  if (OUT_FULL) {
    await writeFile(
      OUT_FULL,
      JSON.stringify({ ...out, componentLoss: compArr, topRecommendations: recArr, pitchTypes }, null, 2) + "\n"
    );
  }

  const rows = [["metric", "value", "unit", "count", "denominator"]];
  rows.push(["unique_domains", N, "count", N, N]);
  rows.push(["geo_score_mean", out.scores.geo.mean, "score", "", geoScores.length]);
  rows.push(["geo_score_median", out.scores.geo.median, "score", "", geoScores.length]);
  rows.push(["seo_score_mean", out.scores.seo.mean, "score", "", seoScores.length]);
  rows.push(["seo_score_median", out.scores.seo.median, "score", "", seoScores.length]);
  for (const b of botArr) rows.push([`crawler_blocked_${b.crawler}`, b.blockedPct, "percent", b.blockedCount, b.denominator]);
  // Component and recommendation rows are deliberately absent — same reason
  // they're absent from the public JSON. They live in --full only.
  for (const [k, v] of Object.entries(universal)) rows.push([`universal_${k}`, v.sitesPct, "percent", v.count, v.denominator]);
  for (const [k, v] of Object.entries(subsetOnly)) rows.push([`subset_${k}`, v.sitesPct, "percent", v.count, v.denominator]);

  const csv = rows
    .map((r) => r.map((c) => (/[",\n]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : String(c))).join(","))
    .join("\n");
  await writeFile(OUT_CSV, csv + "\n");

  process.stderr.write(
    `\n${N} unique domains aggregated (${dates[0]} → ${dates[dates.length - 1]})\n` +
      `JSON: ${OUT_JSON}\nCSV:  ${OUT_CSV}\n`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
