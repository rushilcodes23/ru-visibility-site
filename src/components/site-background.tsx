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
    // Mobile sweep: a wave travelling down the screen. The front edge (the
    // lowest lit row) is the brightest; SCAN_TAIL px of trail behind it fade
    // out gradually. SCAN_SECONDS is one pass from top to bottom.
    const SCAN_TAIL = 240;
    // How far ahead of the front a row starts fading in (see the draw loop).
    const SCAN_LEAD = 45;
    const SCAN_SECONDS = 4;
    let scanY = 0;

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
      /** k = elapsed time in 30fps frames, so speed is the same at any frame rate. */
      update(w: number, h: number, k: number) {
        this.x += this.vx * k;
        this.y += this.vy * k;
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
    // The plain grid is no longer drawn here at all — it is a CSS background on
    // the canvas element (see .qh-dots in the style block below), so it paints
    // with the rest of the page instead of waiting for React to hydrate.
    //
    // Measured on a throttled phone before this: first paint at 2184ms but the
    // canvas had no pixels until 4299ms, because this is a client component and
    // nothing here runs until hydration finishes. A full-screen background
    // arriving 2.1s after the text is exactly what Speed Index penalises.
    //
    // It also removes a full-viewport clear-and-blit from every single frame,
    // which was the one fixed cost the loop paid whether or not anything moved.
    // The canvas now carries only what actually changes: the drifting particles
    // and the lit dots.

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

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      particles.length = 0;
      const n = isMobile ? 26 : 40;
      for (let i = 0; i < n; i++) particles.push(new Particle(canvas.width, canvas.height));
      glowSprite = renderGlowSprite();
      // Nothing to pre-paint: the dot grid is CSS and is already on screen,
      // including under reduce-motion, where this loop never starts.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

      // Frame budget. Desktop stays at half rate: drifting dots and a cursor
      // glow read the same at 30fps, and every frame makes the frosted navbar
      // re-blur its backdrop. Phones run at the display rate, because their
      // one moving thing is the wave, and a wave sweeping down the screen at
      // 30fps visibly stepped.
      //
      // The remainder is carried instead of resetting `last = now`: resetting
      // made a 60Hz display alternate 16ms and 50ms frames, which is judder.
      const interval = isMobile ? 0 : 1000 / 30;
      const since = now - last;
      if (since < interval - 2) return;
      last = interval ? now - (since % interval) : now;
      // Real elapsed time, so the wave keeps a steady speed when a frame is
      // late — capped so resuming after a scroll pause never jumps ahead.
      const dt = Math.min(since, 50);

      // Clear only. The grid underneath is the element's CSS background, so it
      // survives the clear for free instead of being redrawn 30 times a second.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const k = dt / (1000 / 30);
      particles.forEach((p) => { p.update(canvas.width, canvas.height, k); p.draw(ctx); });

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
        // scanY is the front edge. It runs until the whole tail has left the
        // bottom of the screen, then starts again at the top.
        scanY += (dt * canvas.height) / (SCAN_SECONDS * 1000);
        if (scanY - SCAN_TAIL > canvas.height) scanY = -SCAN_LEAD;

        // Brightest at the front, fading to nothing SCAN_TAIL px behind it.
        // Squaring the brightness keeps the front crisp and lets the tail thin
        // out slowly, which is what reads as a wave rather than a band.
        //
        // The row just ahead of the front fades IN over SCAN_LEAD px, so
        // brightness is continuous as the front passes each row. Without it a
        // row switched from dark to full brightness in a single frame — the
        // popping that made the wave look buggy.
        const minY = Math.max(0, Math.ceil((scanY - SCAN_TAIL) / SPACING) * SPACING);
        const maxY = Math.min(canvas.height, scanY + SCAN_LEAD);
        for (let y = minY; y <= maxY; y += SPACING) {
          const d = y - scanY; // > 0: ahead of the front; < 0: in the trail
          const t = d > 0 ? 1 - d / SCAN_LEAD : 1 + d / SCAN_TAIL;
          if (t <= 0) continue;
          ctx.globalAlpha = Math.min(1, 0.08 + 0.92 * t * t);
          for (let x = 0; x < canvas.width; x += SPACING) {
            litDot(x, y, BASE_R + t * 3.5);
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

    // The drifting dots wait until the page has loaded and the browser is
    // idle. The grid itself is CSS and already on screen, so nothing visible
    // is late — but running the loop during load cost 0.5–1s of phone main
    // thread in Lighthouse (measured with the loop off vs on), competing with
    // hydration for nothing anyone can see yet.
    const hasIdle = "requestIdleCallback" in window;
    let idle = 0;
    const whenIdle = () => {
      idle = hasIdle ? window.requestIdleCallback(start, { timeout: 3000 }) : window.setTimeout(start, 1500);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      window.removeEventListener("load", whenIdle);
      if (hasIdle) window.cancelIdleCallback(idle); else clearTimeout(idle);
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

        /* The dot grid, as a CSS background rather than something the canvas
           redraws. It has to line up with the canvas exactly, because the
           moving particles and the lit hover/scan dots are still drawn on the
           canvas on top of it:
             - canvas draws dots at x,y = 0, 30, 60 ... with radius BASE_R
             - a radial-gradient's default centre is the middle of its tile, so
               shifting the tile origin by half a step puts those centres back
               on the same multiples of 30
           Keep SPACING and BASE_R in the effect above in step with these two
           numbers. The stops are feathered rather than a hard cut so the edge
           matches the antialiasing of a filled canvas arc. */
        .qh-dots {
          background-image: radial-gradient(
            circle,
            var(--qh-canvasDefault) 1.15px,
            transparent 1.95px
          );
          background-size: 30px 30px;
          background-position: -15px -15px;
        }

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
        <canvas
          ref={canvasRef}
          className="qh-dots"
          style={{ position: "absolute", inset: 0, display: "block" }}
        />
      </div>
    </>
  );
}
