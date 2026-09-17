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
    // Mobile sweep: how tall the lit band is, and how long one pass takes.
    const SCAN_R = 130;
    const SCAN_SECONDS = 4;
    let scanY = -SCAN_R;

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

    // One lit dot, glow and all, rendered once into a small offscreen canvas.
    //
    // The glow used to come from ctx.shadowBlur set on the main context, which
    // is the most expensive operation in canvas 2D and was being paid on every
    // one of the ~100 lit dots, 60 times a second, forever. Baking it into a
    // sprite pays that cost once per resize and turns each dot into a plain
    // drawImage. The look is identical because it is literally the same
    // drawing operation, just cached.
    const SPRITE_DOT = BASE_R + 4;   // the largest a lit dot ever gets
    const SPRITE_PAD = 20;           // room for the blur to fall off
    let glowSprite: HTMLCanvasElement | null = null;

    const renderGlowSprite = () => {
      const r = SPRITE_DOT + SPRITE_PAD;
      const s = document.createElement("canvas");
      s.width = s.height = Math.ceil(r * 2);
      const sctx = s.getContext("2d");
      if (!sctx) return null;
      sctx.fillStyle = t.canvasActive;
      sctx.shadowBlur = 18;
      sctx.shadowColor = t.canvasShadow;
      sctx.beginPath();
      sctx.arc(r, r, SPRITE_DOT, 0, Math.PI * 2);
      sctx.fill();
      return s;
    };

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
      glowSprite = renderGlowSprite();
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

      // Half rate on EVERY device, not just phones.
      //
      // The cost here is the full-viewport clear and blit, which is paid every
      // frame whether or not anything moved — measured at ~24% of the main
      // thread while sitting completely idle with the cursor off-screen, and
      // it forces the frosted navbar to re-blur its backdrop just as often.
      // Drifting dots and a cursor glow read the same at 30fps, so the second
      // half of those frames was buying nothing.
      if (now - last < 1000 / 30) return;
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (staticGrid) ctx.drawImage(staticGrid, 0, 0);
      particles.forEach((p) => { p.update(canvas.width, canvas.height); p.draw(ctx); });

      // No shadowBlur here any more — it lives in glowSprite. See above.
      const sprite = glowSprite;
      const spriteR = SPRITE_DOT + SPRITE_PAD;
      /** Blits the cached lit dot, scaled so its core matches `dotR`. */
      const litDot = (x: number, y: number, dotR: number) => {
        if (!sprite) return;
        const k = dotR / SPRITE_DOT;
        const half = spriteR * k;
        ctx.drawImage(sprite, x - half, y - half, half * 2, half * 2);
      };

      if (isMobile) {
        // There is no cursor to follow on a phone, so the highlight is a band
        // that travels down the screen instead — the same lit-dot effect,
        // driven by time rather than a pointer.
        scanY += canvas.height / (SCAN_SECONDS * 30);
        if (scanY > canvas.height + SCAN_R) scanY = -SCAN_R;

        const minY = Math.max(0, Math.floor((scanY - SCAN_R) / SPACING) * SPACING);
        const maxY = Math.min(canvas.height, scanY + SCAN_R);
        for (let y = minY; y < maxY; y += SPACING) {
          const scale = 1 - Math.abs(y - scanY) / SCAN_R;
          if (scale <= 0) continue;
          ctx.globalAlpha = Math.min(1, 0.2 + scale * 0.9);
          for (let x = 0; x < canvas.width; x += SPACING) {
            litDot(x, y, BASE_R + scale * 3.5);
          }
        }
      } else {
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
              litDot(x, y, BASE_R + scale * 4);
            }
          }
        }
      }
      // Reset, or the alpha bleeds into the next frame.
      ctx.globalAlpha = 1;
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

    // Freeze while the page is actually scrolling, and thaw shortly after it
    // stops. Measured: hiding this canvas entirely took scroll cost from 24%
    // of the main thread to 13%, so it is the single biggest thing competing
    // with the scroll itself. The layer is position:fixed, so a held frame is
    // indistinguishable from a live one while the content is moving — and the
    // drifting dots resume the moment the gesture ends.
    let scrollIdle = 0;
    const onScroll = () => {
      stop();
      clearTimeout(scrollIdle);
      scrollIdle = window.setTimeout(start, 140);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    start();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(scrollIdle);
      cancelAnimationFrame(raf);
    };
  }, [resolvedTheme]);

  return (
    <>
      <style>{`
        :root { ${cssVars(LIGHT)} }
        :root.dark { ${cssVars(DARK)} }

        .qh-glow { position: absolute; pointer-events: none; }

        /* Alpha is set per stop from raw channels rather than by mixing
           toward transparent. Mixing a translucent colour with transparent
           in sRGB drags its channels toward black, so the blue greyed out as
           it faded — and because the base colour already carried alpha, each
           mix compounded it until nothing was left in light mode. The final
           stop is an explicit zero alpha for the same reason: transparent is
           rgba(0,0,0,0),
           and interpolating toward it tints the tail grey. */
        .qh-glow-a,
        .qh-glow-b {
          background: radial-gradient(
            ellipse closest-side at center,
            rgb(var(--qh-glowRgb) / var(--qh-glowA)) 0%,
            rgb(var(--qh-glowRgb) / calc(var(--qh-glowA) * 0.82)) 22%,
            rgb(var(--qh-glowRgb) / calc(var(--qh-glowA) * 0.54)) 42%,
            rgb(var(--qh-glowRgb) / calc(var(--qh-glowA) * 0.28)) 60%,
            rgb(var(--qh-glowRgb) / calc(var(--qh-glowA) * 0.09)) 78%,
            rgb(var(--qh-glowRgb) / 0) 93%
          );
        }

        .qh-glow-a { top: -25%; left: -15%; width: 70%; height: 70%; }
        .qh-glow-b { bottom: -25%; right: -15%; width: 60%; height: 60%; }

        /* On a narrow, tall viewport those two proportions put both blobs in
           roughly the same place, and they merge into one muddy wash. Wider,
           shorter and pushed further off the edges keeps them reading as
           light rather than as shapes. */
        @media (max-width: 767px) {
          /* Smaller and much weaker than desktop. At 110% wide and 0.9
             opacity these filled most of a phone screen, and stacked with
             the heading glow and the dot grid the whole thing read as noise
             rather than as depth. */
          .qh-glow-a {
            top: -10%; left: -25%;
            width: 80%; height: 26%;
            opacity: 0.45;
          }
          .qh-glow-b {
            bottom: -10%; right: -25%;
            width: 75%; height: 24%;
            opacity: 0.4;
          }
        }
      `}</style>
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
        <div className="qh-glow qh-glow-a" />
        <div className="qh-glow qh-glow-b" />
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block" }} />
      </div>
    </>
  );
}
