"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   All styles inlined — no Tailwind, no CSS file
   Background is ALWAYS light (#F8FAFC) regardless of
   the host page's color scheme.

   Content/branding reskinned for Ru Visibility (AI/SEO
   visibility audits). Visual system (colors, canvas
   background, glitch effect, layout) is unchanged from
   the source component pending a separate design pass.
   Navbar lives in ../site-navbar.tsx (site-wide chrome,
   rendered from the root layout) — not duplicated here.
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&display=swap');

  /* Hard-reset: force light palette on the entire component */
  .qhero-shell,
  .qhero-shell *,
  .qhero-shell *::before,
  .qhero-shell *::after {
    box-sizing: border-box;
  }

  .qhero-shell {
    font-family: 'Space Grotesk', sans-serif;
    color-scheme: light;          /* tells the browser: render ME in light */
    background: #F8FAFC;
    color: #0f172a;
  }

  /* Glitch on "VISIBILITY" */
  .qhero-glitch {
    position: relative;
    display: inline-block;
    font-weight: 900;
    color: #0f172a;                   /* start dark */
    animation: qhero-color-toggle 7s infinite step-end;
  }
  .qhero-glitch::before,
  .qhero-glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0;
    background: #F8FAFC;             /* match the white bg */
  }
  .qhero-glitch::before { animation: qhero-glitch-1 7s infinite linear; z-index: 2; }
  .qhero-glitch::after  { animation: qhero-glitch-2 7s infinite linear; z-index: 3; }

  @keyframes qhero-color-toggle {
    0%,  44%   { color: #0f172a; text-shadow: none; }
    42.1%, 44.9% { text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff; }
    45%,  94%  { color: #f97316; text-shadow: none; }
    92.1%, 94.9% { text-shadow: -2px 0 #a3e635, 2px 0 #ef4444; }
    95%, 100%  { color: #0f172a; text-shadow: none; }
  }

  @keyframes qhero-glitch-1 {
    0%,   42%  { opacity: 0; transform: translate(0); }
    42.1%      { opacity: 1; color: #00ffff; clip-path: polygon(0 0,100% 0,100% 45%,0 45%); transform: translate(-10px,-5px) skew(20deg); }
    43%        { color: #ff00ff; transform: translate(10px,5px) skew(-20deg); clip-path: polygon(0 10%,100% 0,100% 30%,0 35%); }
    44%        { color: #f97316; transform: translate(-10px,5px); clip-path: polygon(0 40%,100% 50%,100% 80%,0 90%); }
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
    background: linear-gradient(135deg, #f97316, #c2410c);
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-family: 'Space Grotesk', sans-serif;
    transition: background 200ms, transform 200ms, box-shadow 200ms;
    box-shadow: 0 10px 30px rgba(234,88,12,0.3);
    position: relative;
    z-index: 30;
  }
  .qhero-btn:hover { background: linear-gradient(135deg, #fb923c, #ea580c); transform: scale(1.05); box-shadow: 0 14px 40px rgba(234,88,12,0.4); }
  .qhero-btn:active { transform: scale(0.96); }
  .qhero-btn svg { transition: transform 200ms; }
  .qhero-btn:hover svg { transform: translateX(4px); }

  /* Secondary hero CTA — outline, doesn't compete with the primary button */
  .qhero-btn-outline {
    background: transparent;
    color: #0f172a;
    border: 1.5px solid #cbd5e1;
    box-shadow: none;
  }
  .qhero-btn-outline:hover {
    background: rgba(15,23,42,0.04);
    color: #0f172a;
    transform: scale(1.05);
    box-shadow: none;
  }
`;

/* ─────────────────────────────────────────────
   Animated dot-grid + floating particle canvas
   Always white background, orange on hover
───────────────────────────────────────────── */
function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let isMobile = false;

    const SPACING = 30;
    const BASE_R = 1.5;
    const HOVER_R = 100;
    const SCAN_DUR = 2500;
    const SCAN_PAUSE = 4000;
    const DEFAULT_COLOR = "rgba(148,163,184,0.4)";
    const ACTIVE_COLOR = "#ff5500";

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
        c.fillStyle = "rgba(249,115,22,0.15)";
        c.fill();
      }
    }

    const particles: Particle[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      particles.length = 0;
      const n = isMobile ? 12 : 40;
      for (let i = 0; i < n; i++) particles.push(new Particle(canvas.width, canvas.height));
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
      particles.forEach(p => { p.update(canvas.width, canvas.height); p.draw(ctx); });

      const loopTime = performance.now() % (SCAN_DUR + SCAN_PAUSE);
      const scanY = isMobile
        ? (Math.min(loopTime / SCAN_DUR, 1)) * (canvas.height + HOVER_R * 2) - HOVER_R
        : 0;

      for (let x = 0; x < canvas.width; x += SPACING) {
        for (let y = 0; y < canvas.height; y += SPACING) {
          const dx = x - mouseX, dy = y - mouseY;
          const dist = isMobile ? Math.abs(y - scanY) : Math.sqrt(dx * dx + dy * dy);

          if (dist < HOVER_R) {
            const scale = 1 - dist / HOVER_R;
            ctx.fillStyle = ACTIVE_COLOR;
            ctx.shadowBlur = isMobile ? 0 : 15;
            ctx.shadowColor = isMobile ? "transparent" : "rgba(255,85,0,0.4)";
            ctx.beginPath();
            ctx.arc(x, y, BASE_R + scale * (isMobile ? 2 : 3), 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = DEFAULT_COLOR;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
            ctx.beginPath();
            ctx.arc(x, y, BASE_R, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    resize();
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /* Fixed layer — always #F8FAFC, never inherits dark-mode */
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "#F8FAFC",   /* hardcoded light */
        colorScheme: "light",
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block" }} />

      {/* Soft slate glow — top-left */}
      <div style={{
        position: "absolute", top: "-20%", left: "-10%",
        width: "50%", height: "50%",
        background: "rgba(203,213,225,0.4)",
        filter: "blur(120px)", borderRadius: "9999px",
      }} />
      {/* Soft slate glow — bottom-right */}
      <div style={{
        position: "absolute", bottom: "-20%", right: "-10%",
        width: "40%", height: "40%",
        background: "rgba(203,213,225,0.4)",
        filter: "blur(120px)", borderRadius: "9999px",
      }} />

      {/* Giant < > brackets, barely visible */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", userSelect: "none", opacity: 0.025,
      }}>
        <span style={{ fontSize: "40vw", fontWeight: 900, lineHeight: 1, color: "#0f172a" }}>
          &lt;
        </span>
        <span style={{ width: "20vw" }} />
        <span style={{ fontSize: "40vw", fontWeight: 900, lineHeight: 1, color: "#0f172a" }}>
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
        /* Explicitly override any inherited dark bg */
        background: "#F8FAFC",
        colorScheme: "light" as React.CSSProperties["colorScheme"],
      }}
    >
      <style>{STYLES}</style>

      {/* Layer 0: dot-grid background (fixed) */}
      <DotGridBackground />

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
            width={72}
            height={72}
            priority
            style={{ margin: "0 auto 1.5rem", display: "block" }}
          />
        </div>

        <div className="qhero-fade-up-delay-1" style={{ marginBottom: "2rem" }}>
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
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {/* Orange tagline */}
            <span
              className="qhero-tagline-pulse"
              style={{
                fontSize: "clamp(0.8rem, 2.2vw, 1.25rem)",
                fontWeight: 900,
                letterSpacing: "0.28em",
                color: "#ea580c",
                marginBottom: "1.5rem",
                display: "block",
              }}
            >
              WE MAKE YOUR BUSINESS VISIBLE
            </span>

            {/* Large split title */}
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
              <span style={{ color: "#0f172a", opacity: 0.9 }}>GET</span>
              <span className="qhero-glitch" data-text="DISCOVERED">
                DISCOVERED
              </span>
            </div>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="qhero-fade-up-delay-2"
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
            fontWeight: 400,
            color: "#64748b",
            maxWidth: "42rem",
            lineHeight: 1.7,
            margin: "0 0 3rem",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          We make your business visible to ChatGPT, Gemini, and every other
          place people search — then keep improving your SEO and GEO every
          month, not just hand you a one-time report. Ongoing maintenance,
          content, and a plain-English check-in on how your site is actually
          performing, all included.
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
