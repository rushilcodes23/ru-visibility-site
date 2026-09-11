"use client";

import Image from "next/image";

/* ─────────────────────────────────────────────
   Self-contained styles, theme-aware. Monochrome
   palette — matches the logo (pure black mark), no
   orange. Navbar lives in ../site-navbar.tsx (site-wide
   chrome, rendered from the root layout) — not
   duplicated here.
───────────────────────────────────────────── */

function getStyles() {
  return `


  .qhero-heading-glow {
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(88vw, 54rem);
    height: min(46vh, 22rem);
    pointer-events: none;
    /* Same reasoning as the corner glows: explicit alpha per stop, and a
       final stop of / 0 rather than transparent, so the blue stays blue all
       the way out instead of greying toward black. */
    background: radial-gradient(
      ellipse closest-side at center,
      rgb(var(--qh-headingGlowRgb) / var(--qh-headingGlowA)) 0%,
      rgb(var(--qh-headingGlowRgb) / calc(var(--qh-headingGlowA) * 0.80)) 24%,
      rgb(var(--qh-headingGlowRgb) / calc(var(--qh-headingGlowA) * 0.50)) 45%,
      rgb(var(--qh-headingGlowRgb) / calc(var(--qh-headingGlowA) * 0.24)) 63%,
      rgb(var(--qh-headingGlowRgb) / calc(var(--qh-headingGlowA) * 0.07)) 79%,
      rgb(var(--qh-headingGlowRgb) / 0) 93%
    );
  }
  @media (max-width: 767px) {
    .qhero-heading-glow {
      width: 105vw;
      height: min(34vh, 15rem);
      opacity: 0.9;
    }
  }

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
    /* Transparent: the animated grid is a site-wide layer behind this. */
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
    /* Not transparent: the hero is the one section with no scrim over the
       dot grid, so a see-through button put the dots behind its own label. */
    background: color-mix(in srgb, var(--qh-shellBg) 78%, transparent);
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
      }}
    >
      <style>{getStyles()}</style>

      {/* A pool of light under the wordmark. The dot grid itself is
          site-wide now and lives in the root layout. */}
      <div aria-hidden="true" className="qhero-heading-glow" />

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
            src="/logo-mark-220.png"
            alt="Ru Visibility"
            width={110}
            height={110}
            priority
            unoptimized
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
