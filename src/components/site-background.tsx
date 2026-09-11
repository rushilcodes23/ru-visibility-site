"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { LIGHT, DARK, cssVars } from "@/lib/hero-palette";

/**
 * The animated dot grid, rendered once from the root layout so it sits behind
 * every page rather than only the hero. It is a fixed, full-viewport layer at
 * z-index 0; all site content sits above it on z-index 10, and the navbar and
 * theme toggle higher still.
 *
 * This component also emits the `--qh-*` custom properties on :root, so the
 * hero's own class rules can reference them on every page.
 */
export default function SiteBackground() {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // resolvedTheme is the reliable source: reading the class off <html> is a
    // frame behind on every toggle, because this effect runs before the theme
    // provider's own effect has flipped it. The class is only the first-mount
    // fallback, where the blocking theme script has already set it.
    const isDark = resolvedTheme
      ? resolvedTheme === "dark"
      : document.documentElement.classList.contains("dark");
    const t = isDark ? DARK : LIGHT;

    let raf = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let isMobile = false;
    let running = false;
    let last = 0;

    const SPACING = 30;
    const BASE_R = 1.6;
    const HOVER_R = 150;

    class Particle {
      x = 0; y = 0; vx = 0; vy = 0; size = 0;
      constructor(w: number, h: number) { this.reset(w, h, true); }
      reset(w: number, h: number, anywhere = false) {
        this.x = Math.random() * w;
        // On phones these drift downward, so respawn above the fold once they
        // fall off the bottom rather than bouncing back up.
        this.y = anywhere ? Math.random() * h : -10;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = isMobile
          ? 0.25 + Math.random() * 0.45
          : (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }
      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (isMobile) {
          if (this.y > h + 10) this.reset(w, h);
          if (this.x < 0 || this.x > w) this.vx *= -1;
        } else {
          if (this.x < 0 || this.x > w) this.vx *= -1;
          if (this.y < 0 || this.y > h) this.vy *= -1;
        }
      }
      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = t.canvasParticle;
        c.fill();
      }
    }

    const particles: Particle[] = [];
    // The plain grid never changes between frames, so it is rendered once per
    // resize onto an offscreen canvas and blitted, rather than redrawing
    // several thousand dots every frame forever.
    let staticGrid: HTMLCanvasElement | null = null;

    const renderStaticGrid = (w: number, h: number) => {
      const grid = document.createElement("canvas");
      grid.width = w;
      grid.height = h;
      const gctx = grid.getContext("2d");
      if (!gctx) return null;
      gctx.fillStyle = t.canvasDefault;
      for (let x = 0; x < w; x += SPACING) {
        for (let y = 0; y < h; y += SPACING) {
          gctx.beginPath();
          gctx.arc(x, y, BASE_R, 0, Math.PI * 2);
          gctx.fill();
        }
      }
      return grid;
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      particles.length = 0;
      const n = isMobile ? 26 : 40;
      for (let i = 0; i < n; i++) particles.push(new Particle(canvas.width, canvas.height));
      staticGrid = renderStaticGrid(canvas.width, canvas.height);
      if (prefersReduced && staticGrid) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(staticGrid, 0, 0);
      }
    };

    // The layer is fixed to the viewport, so client coordinates map straight
    // onto canvas coordinates with no conversion.
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => { mouseX = -1000; mouseY = -1000; };

    const draw = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);

      // Phones animate at half rate. The cost was always the 60fps
      // full-viewport repaint, not the motion itself.
      if (isMobile && now - last < 1000 / 30) return;
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (staticGrid) ctx.drawImage(staticGrid, 0, 0);
      particles.forEach((p) => { p.update(canvas.width, canvas.height); p.draw(ctx); });

      // No cursor on a touch screen, so phones get the drifting particles
      // only and skip the highlight sweep entirely.
      if (!isMobile) {
        ctx.fillStyle = t.canvasActive;
        ctx.shadowBlur = 18;
        ctx.shadowColor = t.canvasShadow;

        const minX = Math.max(0, Math.floor((mouseX - HOVER_R) / SPACING) * SPACING);
        const maxX = Math.min(canvas.width, mouseX + HOVER_R);
        const minY = Math.max(0, Math.floor((mouseY - HOVER_R) / SPACING) * SPACING);
        const maxY = Math.min(canvas.height, mouseY + HOVER_R);

        for (let x = minX; x < maxX; x += SPACING) {
          for (let y = minY; y < maxY; y += SPACING) {
            const dx = x - mouseX, dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < HOVER_R) {
              const scale = 1 - dist / HOVER_R;
              ctx.globalAlpha = Math.min(1, 0.25 + scale);
              ctx.beginPath();
              ctx.arc(x, y, BASE_R + scale * 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        // Reset both, or the shadow and alpha bleed into the next frame.
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    };

    const start = () => {
      if (!running && !prefersReduced && !document.hidden) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Nothing to animate for a backgrounded tab.
    const onVisibility = () => { if (document.hidden) stop(); else start(); };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    start();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, [resolvedTheme]);

  return (
    <>
      <style>{`:root { ${cssVars(LIGHT)} } :root.dark { ${cssVars(DARK)} }`}</style>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "var(--qh-shellBg)",
        }}
      >
        {/* Glows render before the canvas so the grid sits on top of them. */}
        <div style={{
          position: "absolute", top: "-25%", left: "-15%",
          width: "70%", height: "70%",
          background: "radial-gradient(circle, var(--qh-glow) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-25%", right: "-15%",
          width: "60%", height: "60%",
          background: "radial-gradient(circle, var(--qh-glow) 0%, transparent 70%)",
        }} />
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block" }} />
      </div>
    </>
  );
}
