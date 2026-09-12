"use client";

import { useEffect, useRef, useState } from "react";

// Fades content in once when it scrolls into view. Plain IntersectionObserver
// + CSS transition — no animation library, same approach used everywhere
// else on this site.
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
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // The hero canvas already honours reduce-motion; this did not, so every
    // section on the site still slid and faded for someone who had asked the
    // OS for less movement. Reading it in an effect rather than at render
    // keeps the server and first client render identical.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Content still has to be readable if the observer never fires — a stuck
  // opacity: 0 would hide the section outright, which is worse than no
  // animation at all.
  const shown = visible || reduced;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: reduced
          ? "none"
          : `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
