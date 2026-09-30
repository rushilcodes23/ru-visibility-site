"use client";

import { useEffect, useRef } from "react";

// Fades content in once when it scrolls into view. Plain IntersectionObserver
// + CSS transition — no animation library, same approach used everywhere
// else on this site.
//
// Visible by default; hidden only once we know it is below the fold. It used
// to be server-rendered at opacity 0 and shown by JavaScript, so text at the
// top of /services, the city pages and others stayed invisible until the
// scripts had loaded and run — 1.3–1.9s of Largest Contentful Paint delay on
// a phone in Lighthouse. Now a section already on screen at load is simply
// shown; one below the fold is hidden after hydration (off screen, so nobody
// sees it disappear) and fades in on scroll as before. With no JavaScript,
// or with reduce-motion set, everything is just visible.
//
// Styles are set on the element directly rather than through state: one
// fewer render per section, and nothing to re-render on scroll.
export default function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transition = `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    // Never leave a section stuck invisible.
    return () => {
      observer.disconnect();
      el.style.opacity = "";
      el.style.transform = "";
      el.style.transition = "";
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
