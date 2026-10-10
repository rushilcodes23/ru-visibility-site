"use client";

import { useEffect, useRef, useState } from "react";
import { compactCount } from "@/lib/format";

/** Fast at first, easing to a stop — a linear count reads like a loading bar. */
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts up to `value` once, the first time it scrolls into view.
 *
 * The final value is rendered on the server and on first client paint, so the
 * real number is in the HTML for crawlers, AI systems and anyone with JS off —
 * the animation only ever replaces a number that was already there. That also
 * means no hydration mismatch: both sides render the same string.
 *
 * It runs even with the "reduce motion" setting on (Windows switches that on
 * whenever its animation effects are off). Nothing moves on screen — only
 * the digits change — so it is not the kind of motion that setting is for.
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

  useEffect(() => {
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
          // The first frame can be stamped slightly before `start`; clamp so it
          // never shows a negative number.
          const t = Math.min(Math.max((now - start) / durationMs, 0), 1);
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
  }, [value, durationMs]);

  const shown = compact
    ? display === value
      ? compactCount(value)
      : display < 1000
        ? Math.floor(display).toLocaleString("en-US")
        : `${(Math.floor(display / 10) / 100).toFixed(2)}k`
    : display.toLocaleString("en-US", {
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
