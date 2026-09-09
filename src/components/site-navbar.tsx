"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

/* Self-contained, inline styles — same approach as the hero, so the
   navbar renders identically regardless of which page's Tailwind
   context it sits in. */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&display=swap');

  .ru-nav-wrap {
    position: fixed;
    top: 16px;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    font-family: 'Space Grotesk', sans-serif;
  }

  .ru-nav-pill {
    width: 100%;
    max-width: 56rem;
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(251,146,60,0.25);
    border-radius: 9999px;
    box-shadow: 0 8px 32px rgba(234,88,12,0.07);
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
  .ru-logo-text {
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.01em;
    color: #0f172a;
    white-space: nowrap;
  }
  .ru-logo-text span { color: #ea580c; }

  .ru-nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .ru-nav-link {
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
    text-decoration: none;
    transition: color 200ms, transform 200ms;
  }
  .ru-nav-link:hover { color: #ea580c; transform: scale(1.08); }

  .ru-nav-cta {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    font-size: 0.75rem;
    font-weight: 700;
    color: #fff;
    background: #0f172a;
    border-radius: 9999px;
    text-decoration: none;
    transition: background 200ms, transform 200ms, box-shadow 200ms;
    box-shadow: 0 4px 14px rgba(15,23,42,0.15);
    white-space: nowrap;
  }
  .ru-nav-cta:hover { background: #ea580c; transform: scale(1.05); box-shadow: 0 6px 18px rgba(234,88,12,0.3); }

  .ru-hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #0f172a;
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
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;
  }
  .ru-mobile-overlay.open { opacity: 1; pointer-events: auto; }
  .ru-mobile-link {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    text-decoration: none;
    transition: color 200ms;
  }
  .ru-mobile-link:hover { color: #ea580c; }
  .ru-mobile-cta {
    margin-top: 2rem;
    padding: 12px 32px;
    font-size: 1.125rem;
    font-weight: 700;
    color: #fff;
    background: #0f172a;
    border-radius: 9999px;
    text-decoration: none;
    transition: background 200ms;
  }
  .ru-mobile-cta:hover { background: #ea580c; }

  @media (max-width: 767px) {
    .ru-nav-links,
    .ru-nav-cta { display: none; }
    .ru-hamburger { display: flex; }
  }
`;

/* Nav routes — "#" placeholders point at pages not built yet
   (see WEBSITE-DATA.md for the planned site structure). */
const NAV_LINKS = [
  { label: "How We Work", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "/contact" },
];

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
            <a href="/contact" className="ru-nav-cta">
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
        <a href="/contact" className="ru-mobile-cta" onClick={() => setOpen(false)}>
          Talk to Us
        </a>
      </div>
    </>
  );
}
