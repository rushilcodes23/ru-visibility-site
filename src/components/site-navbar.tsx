"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

/* Self-contained, inline styles — same approach as the hero. Uses the
   site's CSS variables directly (var(--foreground) etc.) so it follows
   the light/dark theme automatically, same as every Tailwind-token-based
   part of the site — no separate light/dark objects needed here. */
const STYLES = `
  .ru-nav-wrap {
    position: fixed;
    top: 16px;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    font-family: var(--font-space-grotesk), sans-serif;
  }

  .ru-nav-pill {
    width: 100%;
    max-width: 60rem;
    background: color-mix(in srgb, var(--background) 85%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid color-mix(in srgb, var(--foreground) 8%, transparent);
    border-radius: 9999px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.07);
    padding: 8px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 300ms;
    box-sizing: border-box;
  }
  .ru-nav-pill * { box-sizing: border-box; }

  .ru-logo-link {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .dark .ru-logo-link img { filter: invert(1); }
  .ru-logo-text {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
    color: var(--foreground);
    white-space: nowrap;
  }
  .ru-logo-text span { color: var(--muted-foreground); }

  .ru-nav-links {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ru-nav-link {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--muted-foreground);
    text-decoration: none;
    transition: color 200ms, transform 200ms, background 200ms;
  }
  .ru-nav-link:hover,
  .ru-nav-link:focus-visible {
    color: var(--foreground);
    transform: scale(1.08);
    background: color-mix(in srgb, var(--foreground) 8%, transparent);
    outline: none;
  }

  .ru-nav-cta {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--primary-foreground);
    background: var(--primary);
    border-radius: 9999px;
    text-decoration: none;
    transition: background 200ms, transform 200ms, box-shadow 200ms;
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    white-space: nowrap;
  }
  /* Ring pulls it off the bar the way the featured blog card sits off the
     page — token-driven, so it reads correctly in both themes. */
  .ru-nav-cta {
    box-shadow: 0 4px 14px rgba(0,0,0,0.15),
                0 0 0 3px color-mix(in srgb, var(--primary) 14%, transparent);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .ru-nav-cta:hover,
  .ru-nav-cta:focus-visible {
    background: color-mix(in srgb, var(--primary) 85%, var(--background));
    transform: scale(1.06);
    box-shadow: 0 8px 22px rgba(0,0,0,0.22),
                0 0 0 5px color-mix(in srgb, var(--primary) 26%, transparent);
    outline: none;
  }

  .ru-hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--foreground);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-width: 44px;
    min-height: 44px;
    z-index: 110;
    position: relative;
  }
  .ru-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: transform 250ms, opacity 250ms;
  }

  .ru-mobile-overlay {
    position: fixed;
    inset: 0;
    z-index: 90;
    background: color-mix(in srgb, var(--background) 97%, transparent);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.75rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;
  }
  .ru-mobile-overlay.open { opacity: 1; pointer-events: auto; }
  .ru-mobile-link {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--foreground);
    text-decoration: none;
    transition: color 200ms;
  }
  .ru-mobile-link:hover { color: var(--muted-foreground); }
  .ru-mobile-cta {
    margin-top: 1.5rem;
    padding: 12px 32px;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--primary-foreground);
    background: var(--primary);
    border-radius: 9999px;
    text-decoration: none;
    transition: background 200ms;
  }
  .ru-mobile-cta {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 14%, transparent);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .ru-mobile-cta:hover,
  .ru-mobile-cta:focus-visible {
    background: color-mix(in srgb, var(--primary) 85%, var(--background));
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--primary) 26%, transparent);
    outline: none;
  }

  @media (max-width: 767px) {
    .ru-nav-links,
    .ru-nav-cta { display: none; }
    .ru-hamburger { display: flex; }
  }
`;

const NAV_LINKS = [
  { label: "How We Work", href: "/how-we-work" },
  { label: "What We Do", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Why Us", href: "/why-us" },
];

// Points at the on-site form, not a mailto — visitors shouldn't have to
// open a mail client to reach us.
const TALK_TO_US_HREF = "/contact";

function RuVisibilityLogo() {
  return (
    <a href="/" className="ru-logo-link">
      <Image src="/logo-mark.png" alt="" width={28} height={28} priority />
      <span className="ru-logo-text">
        RU <span>VISIBILITY</span>
      </span>
    </a>
  );
}

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <style>{STYLES}</style>

      <header className="ru-nav-wrap">
        <div className="ru-nav-pill">
          <RuVisibilityLogo />

          <nav aria-label="Main Navigation">
            <ul className="ru-nav-links">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="ru-nav-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href={TALK_TO_US_HREF} className="ru-nav-cta">
              Talk to Us
            </a>
            <button
              className="ru-hamburger"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span style={{ transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`ru-mobile-overlay${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="ru-mobile-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a href={TALK_TO_US_HREF} className="ru-mobile-cta" onClick={() => setOpen(false)}>
          Talk to Us
        </a>
      </div>
    </>
  );
}
