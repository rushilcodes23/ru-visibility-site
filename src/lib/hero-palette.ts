/**
 * Shared hero/background palette. Lives outside the hero component because
 * the animated background is now site-wide (rendered from the root layout),
 * while the hero still needs the same values for its own class rules.
 */
export const LIGHT = {
  shellBg: "#F8FAFC",
  shellText: "#0f172a",
  glitchBase: "#0f172a",
  glitchMid: "#475569",
  ruText: "#0f172a",
  tagline: "#475569",
  subtitle: "#475569",
  bracket: "#0f172a",
  glow: "rgba(148,175,222,0.30)",
  btnText: "#fff",
  btnFrom: "#1e293b",
  btnTo: "#0f172a",
  btnHoverFrom: "#334155",
  btnHoverTo: "#1e293b",
  btnShadow: "rgba(15,23,42,0.3)",
  btnHoverShadow: "rgba(15,23,42,0.4)",
  outlineText: "#0f172a",
  outlineBorder: "#cbd5e1",
  outlineHoverBg: "rgba(15,23,42,0.04)",
  canvasDefault: "rgba(100,116,139,0.55)",
  canvasActive: "#0f172a",
  canvasParticle: "rgba(15,23,42,0.28)",
  canvasShadow: "rgba(15,23,42,0.55)",
  btnRing: "rgba(15,23,42,0.18)",
  headingGlow: "rgba(132,160,215,0.24)",
  outlineHoverBorder: "#0f172a",
};


export const DARK = {
  shellBg: "#0a0e17",
  shellText: "#f1f5f9",
  glitchBase: "#f1f5f9",
  glitchMid: "#94a3b8",
  ruText: "#f1f5f9",
  tagline: "#cbd5e1",
  subtitle: "#cbd5e1",
  bracket: "#f1f5f9",
  glow: "rgba(42,66,120,0.44)",
  btnText: "#0f172a",
  btnFrom: "#f1f5f9",
  btnTo: "#cbd5e1",
  btnHoverFrom: "#ffffff",
  btnHoverTo: "#e2e8f0",
  btnShadow: "rgba(241,245,249,0.15)",
  btnHoverShadow: "rgba(241,245,249,0.25)",
  outlineText: "#f1f5f9",
  outlineBorder: "#334155",
  outlineHoverBg: "rgba(241,245,249,0.06)",
  canvasDefault: "rgba(148,163,184,0.5)",
  canvasActive: "#f1f5f9",
  canvasParticle: "rgba(241,245,249,0.3)",
  canvasShadow: "rgba(241,245,249,0.6)",
  btnRing: "rgba(241,245,249,0.28)",
  headingGlow: "rgba(48,74,140,0.40)",
  outlineHoverBorder: "#f1f5f9",
};

export type Palette = typeof LIGHT;

export const cssVars = (o: Palette) =>
  Object.entries(o)
    .map(([k, v]) => `--qh-${k}: ${v};`)
    .join(' ');
