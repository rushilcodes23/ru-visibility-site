// Deliberately NOT a client component. It has no state, no effects, no event
// handlers — every animation here is CSS. Marking it "use client" shipped the
// whole thing, including what is now ru-visibility-hero.css, into the browser
// bundle and made it part of hydration for no benefit. Lighthouse attributed
// ~2.3s of script evaluation to the homepage bundle before this was removed.
import Image from "next/image";
import logoMark from "@/../public/logo-mark-220.webp";
// Theme-aware styles for the hero. A stylesheet rather than a <style> string
// in the markup: the build minifies it, and the comments stay out of the page.
// It was 7.2 KB, sent twice (once in the HTML, once in the page data).
import "./ru-visibility-hero.css";

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
      {/* A pool of light under the wordmark. The dot grid itself is
          site-wide now and lives in the root layout. */}
      <div aria-hidden="true" className="qhero-heading-glow" />

      {/* Layer 1: Hero content (navbar is site-wide, see layout.tsx). A
          <section>, not <main>: the single <main> lives in layout.tsx. */}
      <section
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
        <div style={{ marginBottom: "1.5rem" }}>
          <Image
            src={logoMark}
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

        <div style={{ marginBottom: "1.5rem" }}>
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
                fontSize: "clamp(2.75rem, 13vw, 10rem)",
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
                fontSize: "clamp(0.95rem, 2.6vw, 1.25rem)",
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
          style={{
            fontSize: "clamp(1.02rem, 2.4vw, 1.1rem)",
            fontWeight: 400,
            color: "var(--qh-subtitle)",
            maxWidth: "42rem",
            lineHeight: 1.7,
            margin: "0 0 3rem",
            fontFamily: "var(--font-space-grotesk), sans-serif",
          }}
        >
          Your customers are asking AI for recommendations. We make sure your
          business is ready to be found. Through continuous SEO, GEO, and
          technical improvements, we increase your visibility across ChatGPT,
          Gemini, and Google—with clear monthly updates you can actually
          understand.
        </p>

        {/* CTAs */}
        <div className="qhero-cta-row">
          <a href="#audit" className="qhero-btn">
            <span>Get Your Visibility Audit</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
          <a href="/why-it-matters" className="qhero-btn qhero-btn-outline">
            <span>Why SEO &amp; GEO Matter</span>
          </a>
        </div>
      </section>
    </div>
  );
}
