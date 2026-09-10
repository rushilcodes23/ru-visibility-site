"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

/* ─────────────────────────────────────────────
   Self-contained styles, theme-aware. Monochrome
   palette — matches the logo (pure black mark), no
   orange. Navbar lives in ../site-navbar.tsx (site-wide
   chrome, rendered from the root layout) — not
   duplicated here.
───────────────────────────────────────────── */
const LIGHT = {
  shellBg: "#F8FAFC",
  shellText: "#0f172a",
  glitchBase: "#0f172a",
  glitchMid: "#475569",
  ruText: "#0f172a",
  tagline: "#475569",
  subtitle: "#64748b",
  bracket: "#0f172a",
  glow: "rgba(203,213,225,0.4)",
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
  canvasDefault: "rgba(148,163,184,0.4)",
  canvasActive: "#1e293b",
  canvasParticle: "rgba(15,23,42,0.12)",
  canvasShadow: "rgba(15,23,42,0.4)",
  btnRing: "rgba(15,23,42,0.18)",
  outlineHoverBorder: "#0f172a",
};

const DARK = {
  shellBg: "#0a0e17",
  shellText: "#f1f5f9",
  glitchBase: "#f1f5f9",
  glitchMid: "#94a3b8",
  ruText: "#f1f5f9",
  tagline: "#cbd5e1",
  subtitle: "#94a3b8",
  bracket: "#f1f5f9",
  glow: "rgba(30,41,59,0.6)",
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
  canvasDefault: "rgba(100,116,139,0.4)",
  canvasActive: "#f1f5f9",
  canvasParticle: "rgba(241,245,249,0.12)",
  canvasShadow: "rgba(241,245,249,0.4)",
  btnRing: "rgba(241,245,249,0.28)",
  outlineHoverBorder: "#f1f5f9",
};

// Both palettes ship as CSS custom properties in one static stylesheet.
// next-themes sets .dark on <html> in a blocking script before first
// paint, so the correct colors apply immediately — no JS round-trip, no
// white flash on refresh in dark mode.
const cssVars = (o: typeof LIGHT) =>
  Object.entries(o)
    .map(([k, v]) => `--qh-${k}: ${v};`)
    .join(" ");

function getStyles() {
  return `
  :root { ${cssVars(LIGHT)} }
  :root.dark { ${cssVars(DARK)} }

  .qhero-shell,
  .qhero-shell *,
  .qhero-shell *::before,
  .qhero-shell *::after {
    box-sizing: border-box;
  }

  /* The logo mark is black ink on transparent — inverted to white in dark
     mode via CSS rather than a JS ternary, so it never flashes black. */
  :root.dark .qhero-logo { filter: invert(1); }

  .qhero-shell {
    font-family: var(--font-space-grotesk), sans-serif;
    background: var(--qh-shellBg);
    color: var(--qh-shellText);
  }

  /* Glitch on "VISIBILITY" */
  .qhero-glitch {
    position: relative;
    display: inline-block;
    font-weight: 900;
    color: var(--qh-glitchBase);
    animation: qhero-color-toggle 7s infinite step-end;
  }
  .qhero-glitch::before,
  .qhero-glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0;
    background: var(--qh-shellBg);
  }
  .qhero-glitch::before { animation: qhero-glitch-1 7s infinite linear; z-index: 2; }
  .qhero-glitch::after  { animation: qhero-glitch-2 7s infinite linear; z-index: 3; }

  @keyframes qhero-color-toggle {
    0%,  44%   { color: var(--qh-glitchBase); text-shadow: none; }
    42.1%, 44.9% { text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff; }
    45%,  94%  { color: var(--qh-glitchMid); text-shadow: none; }
    92.1%, 94.9% { text-shadow: -2px 0 #a3e635, 2px 0 #ef4444; }
    95%, 100%  { color: var(--qh-glitchBase); text-shadow: none; }
  }

  @keyframes qhero-glitch-1 {
    0%,   42%  { opacity: 0; transform: translate(0); }
    42.1%      { opacity: 1; color: #00ffff; clip-path: polygon(0 0,100% 0,100% 45%,0 45%); transform: translate(-10px,-5px) skew(20deg); }
    43%        { color: #ff00ff; transform: translate(10px,5px) skew(-20deg); clip-path: polygon(0 10%,100% 0,100% 30%,0 35%); }
    44%        { color: var(--qh-glitchMid); transform: translate(-10px,5px); clip-path: polygon(0 40%,100% 50%,100% 80%,0 90%); }
    44.9%      { opacity: 1; }
    45%        { opacity: 0; }
    45.1%, 92% { opacity: 0; transform: translate(0); }
    92.1%      { opacity: 1; color: #00ffff; clip-path: polygon(0 60%,100% 55%,100% 100%,0 100%); transform: translate(10px,-5px) skew(10deg); }
    93%        { color: #ff00ff; transform: translate(-5px,5px) skew(-10deg); clip-path: polygon(0 20%,100% 20%,100% 100%,0 80%); }
    94.9%      { opacity: 1; }
    95%        { opacity: 0; }
  }
  @keyframes qhero-glitch-2 {
    0%,   42%  { opacity: 0; transform: translate(0); }
    42.1%      { opacity: 1; color: #a3e635; clip-path: polygon(0 55%,100% 55%,100% 100%,0 100%); transform: translate(10px,5px); }
    43%        { color: #ef4444; transform: translate(-10px,-5px) skew(10deg); clip-path: polygon(0 20%,100% 20%,100% 100%,0 80%); }
    45%        { opacity: 0; }
    45.1%, 92% { opacity: 0; transform: translate(0); }
    92.1%      { opacity: 1; color: #a3e635; clip-path: polygon(0 0,100% 0,100% 45%,0 45%); transform: translate(-10px,-5px); }
    93%        { color: #ef4444; transform: translate(10px,5px) skew(-20deg); clip-path: polygon(0 10%,100% 0,100% 30%,0 35%); }
    95%        { opacity: 0; }
  }

  /* Hero content entrance */
  @keyframes qhero-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .qhero-fade-up { animation: qhero-fade-up 800ms ease-out both; }
  .qhero-fade-up-delay-1 { animation: qhero-fade-up 800ms 150ms ease-out both; }
  .qhero-fade-up-delay-2 { animation: qhero-fade-up 800ms 300ms ease-out both; }

  /* Tagline pulse */
  @keyframes qhero-pulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.6; }
  }
  .qhero-tagline-pulse { animation: qhero-pulse 2s ease-in-out infinite; }

  /* Hero CTA button */
  .qhero-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: 9999px;
    background: linear-gradient(135deg, var(--qh-btnFrom), var(--qh-btnTo));
    color: var(--qh-btnText);
    font-weight: 700;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-family: var(--font-space-grotesk), sans-serif;
    transition: background 200ms, transform 200ms, box-shadow 200ms;
    box-shadow: 0 10px 30px var(--qh-btnShadow);
    position: relative;
    z-index: 30;
  }
  .qhero-btn:hover,
  .qhero-btn:focus-visible {
    background: linear-gradient(135deg, var(--qh-btnHoverFrom), var(--qh-btnHoverTo));
    transform: scale(1.05);
    box-shadow: 0 14px 40px var(--qh-btnHoverShadow), 0 0 0 4px var(--qh-btnRing);
    outline: none;
  }
  .qhero-btn:active { transform: scale(0.96); }
  .qhero-btn svg { transition: transform 200ms; }
  .qhero-btn:hover svg { transform: translateX(4px); }

  /* Secondary hero CTA — outline, doesn't compete with the primary button */
  .qhero-btn-outline {
    background: transparent;
    color: var(--qh-outlineText);
    border: 1.5px solid var(--qh-outlineBorder);
    box-shadow: none;
  }
  .qhero-btn-outline:hover,
  .qhero-btn-outline:focus-visible {
    background: var(--qh-outlineHoverBg);
    color: var(--qh-outlineText);
    border-color: var(--qh-outlineHoverBorder);
    transform: scale(1.05);
    box-shadow: 0 0 0 4px var(--qh-btnRing);
  }
`;
}

/* ─────────────────────────────────────────────
   Animated dot-grid + floating particle canvas
───────────────────────────────────────────── */
function DotGridBackground({ themeKey }: { themeKey: string | undefined }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pulled off the live CSS variables rather than a React-held palette.
    // The .dark class is already on <html> before this effect runs, so the
    // canvas cannot paint one theme and then correct itself.
    const css = getComputedStyle(document.documentElement);
    const cv = {
      canvasDefault: css.getPropertyValue("--qh-canvasDefault").trim(),
      canvasActive: css.getPropertyValue("--qh-canvasActive").trim(),
      canvasParticle: css.getPropertyValue("--qh-canvasParticle").trim(),
      canvasShadow: css.getPropertyValue("--qh-canvasShadow").trim(),
    };

    let raf: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isMobile = false;

    const SPACING = 30;
    const BASE_R = 1.5;
    const HOVER_R = 100;

    class Particle {
      x = 0; y = 0; vx = 0; vy = 0; size = 0;
      constructor(w: number, h: number) { this.reset(w, h); }
      reset(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }
      update(w: number, h: number) {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = cv.canvasParticle;
        c.fill();
      }
    }

    const particles: Particle[] = [];
    // The default-colored grid never changes between mouse moves — redrawing
    // several thousand dots every single frame forever was the main cost of
    // this animation. Render it once per resize onto an offscreen canvas and
    // just blit that each frame, then draw only the handful of dots near the
    // cursor on top.
    let staticGrid: HTMLCanvasElement | null = null;

    const renderStaticGrid = (w: number, h: number) => {
      const grid = document.createElement("canvas");
      grid.width = w;
      grid.height = h;
      const gctx = grid.getContext("2d");
      if (!gctx) return null;
      gctx.fillStyle = cv.canvasDefault;
      for (let x = 0; x < w; x += SPACING) {
        for (let y = 0; y < h; y += SPACING) {
          gctx.beginPath();
          gctx.arc(x, y, BASE_R, 0, Math.PI * 2);
          gctx.fill();
        }
      }
      return grid;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      particles.length = 0;
      const n = isMobile ? 12 : 40;
      for (let i = 0; i < n; i++) particles.push(new Particle(canvas.width, canvas.height));
      staticGrid = renderStaticGrid(canvas.width, canvas.height);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000; };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (staticGrid) ctx.drawImage(staticGrid, 0, 0);
      particles.forEach(p => { p.update(canvas.width, canvas.height); p.draw(ctx); });

      // No hover-highlight sweep on mobile — there's no hover on touch, and
      // it has no functional purpose there. Static grid + drifting
      // particles already give the same ambient feel for a fraction of the
      // ongoing CPU/battery cost.
      if (!isMobile) {
        ctx.fillStyle = cv.canvasActive;
        ctx.shadowBlur = 15;
        ctx.shadowColor = cv.canvasShadow;

        const minX = Math.max(0, Math.floor((mouseX - HOVER_R) / SPACING) * SPACING);
        const maxX = Math.min(canvas.width, mouseX + HOVER_R);
        const minY = Math.max(0, Math.floor((mouseY - HOVER_R) / SPACING) * SPACING);
        const maxY = Math.min(canvas.height, mouseY + HOVER_R);

        for (let x = minX; x < maxX; x += SPACING) {
          for (let y = minY; y < maxY; y += SPACING) {
            const dx = x - mouseX, dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < HOVER_R) {
              const scale = 1 - dist / HOVER_R;
              ctx.beginPath();
              ctx.arc(x, y, BASE_R + scale * 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    resize();

    // Respect the OS-level "reduce motion" preference: draw the static
    // grid once and stop, instead of animating forever regardless.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (staticGrid) ctx.drawImage(staticGrid, 0, 0);
    } else {
      draw();
    }
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, [themeKey]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "var(--qh-shellBg)",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block" }} />

      <div style={{
        position: "absolute", top: "-20%", left: "-10%",
        width: "50%", height: "50%",
        background: "var(--qh-glow)",
        filter: "blur(120px)", borderRadius: "9999px",
      }} />
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%",
        width: "40%", height: "40%",
        background: "var(--qh-glow)",
        filter: "blur(120px)", borderRadius: "9999px",
      }} />

      {/* Giant < > brackets, barely visible */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", userSelect: "none", opacity: 0.025,
      }}>
        <span style={{ fontSize: "40vw", fontWeight: 900, lineHeight: 1, color: "var(--qh-bracket)" }}>
          &lt;
        </span>
        <span style={{ width: "20vw" }} />
        <span style={{ fontSize: "40vw", fontWeight: 900, lineHeight: 1, color: "var(--qh-bracket)" }}>
          &gt;
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Root export
───────────────────────────────────────────── */
export default function RuVisibilityHero() {
  // Only the canvas needs to know the theme in JS, and only so it can
  // repaint when the toggle flips. Every colour in the markup comes from
  // CSS variables, so there is nothing to gate on a mounted flag and
  // nothing that renders light-first before correcting itself.
  const { resolvedTheme } = useTheme();

  return (
    <div
      className="qhero-shell"
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--qh-shellBg)",
      }}
    >
      <style>{getStyles()}</style>

      {/* Layer 0: dot-grid background (fixed) */}
      <DotGridBackground themeKey={resolvedTheme} />

      {/* Layer 1: Hero content (navbar is site-wide, see layout.tsx) */}
      <main
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 1rem 3rem",
          width: "100%",
          maxWidth: "64rem",
          margin: "0 auto",
        }}
      >
        <div className="qhero-fade-up" style={{ marginBottom: "1.5rem" }}>
          <Image
            src="/logo-mark.png"
            alt="Ru Visibility"
            width={110}
            height={110}
            priority
            className="qhero-logo"
            style={{
              margin: "0 auto",
              display: "block",
            }}
          />
        </div>

        <div className="qhero-fade-up-delay-1" style={{ marginBottom: "1.5rem" }}>
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              userSelect: "none",
              margin: 0,
              fontFamily: "var(--font-space-grotesk), sans-serif",
            }}
          >
            {/* Large brand wordmark — same name as the logo itself */}
            <div
              style={{
                fontSize: "clamp(2.25rem, 11vw, 10rem)",
                fontWeight: 900,
                lineHeight: 0.85,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                maxWidth: "100%",
                overflowWrap: "break-word",
              }}
            >
              <span style={{ color: "var(--qh-ruText)", opacity: 0.9 }}>RU</span>
              <span className="qhero-glitch" data-text="VISIBILITY">
                VISIBILITY
              </span>
            </div>

            {/* Tagline, below the wordmark */}
            <span
              className="qhero-tagline-pulse"
              style={{
                fontSize: "clamp(0.8rem, 2.2vw, 1.25rem)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "var(--qh-tagline)",
                marginTop: "1.5rem",
                display: "block",
                textTransform: "none",
              }}
            >
              We make your business visible.
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="qhero-fade-up-delay-2"
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
            fontWeight: 400,
            color: "var(--qh-subtitle)",
            maxWidth: "42rem",
            lineHeight: 1.7,
            margin: "0 0 3rem",
            fontFamily: "var(--font-space-grotesk), sans-serif",
          }}
        >
          To ChatGPT, Gemini, and every other place people search — then we
          keep improving your SEO and GEO every month, not just hand you a
          one-time report. Ongoing maintenance, content, and a plain-English
          check-in on how your site is actually performing, all included.
        </p>

        {/* CTAs */}
        <div className="qhero-fade-up-delay-2" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          <a href="/contact" className="qhero-btn">
            <span>Get Your Visibility Audit</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
          <a href="/why-it-matters" className="qhero-btn qhero-btn-outline">
            <span>Why SEO &amp; GEO Matter</span>
          </a>
        </div>
      </main>
    </div>
  );
}
