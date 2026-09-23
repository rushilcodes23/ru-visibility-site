"use client";

import { useEffect, useRef } from "react";

/**
 * A 2px rule across the top that tracks position through an article.
 *
 * On a piece this long the reader's real question is "how much of this is
 * left", and a progress rule answers it without taking any layout space or
 * asking for a click.
 *
 * Written against a ref and scaleX rather than React state on purpose: this
 * updates on every scroll frame, and routing that through a re-render would
 * put the whole page's reconciliation on the scroll path. transform is also
 * the one property here that never triggers layout.
 */
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour the OS setting by simply not animating — the bar still tracks
    // position, it just jumps rather than easing.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.style.transition = reduced ? "none" : "transform 90ms linear";

    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      // Total scrollable distance. Guard the divide: a short article on a
      // tall viewport has nothing to scroll and would otherwise divide by 0.
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="article-progress"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
