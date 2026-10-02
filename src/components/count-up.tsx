"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { compactCount } from "@/lib/format";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServer = () => false;

/** Fast at first, easing to a stop — a linear count reads like a loading bar. */
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts up to `value` once, the first time it scrolls into view.
 *
 * The final value is rendered on the server and on first client paint, so the
 * real number is in the HTML for crawlers, AI systems and anyone with JS off —
 * the animation only ever replaces a number that was already there. That also
 * means no hydration mismatch: both sides render the same string.
 */
export default function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 2600,
  className,
  compact = false,
}: {
  value: number;
  decimals?: number;
  /** Ends on a short form like "1.5k+". On the way it counts whole numbers
   *  to 999, then 1.00k, 1.01k… so the climb past a thousand stays visible. */
  compact?: boolean;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          if (cancelled) return;
          const t = Math.min((now - start) / durationMs, 1);
          setDisplay(value * easeOutQuart(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs, reduced]);

  // Derived rather than assigned in the effect: with reduce-motion on, the
  // animation never runs, so the final value is simply what gets rendered.
  const current = reduced ? value : display;
  const shown = compact
    ? current === value
      ? compactCount(value)
      : current < 1000
        ? Math.floor(current).toLocaleString("en-US")
        : `${(Math.floor(current / 10) / 100).toFixed(2)}k`
    : current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
