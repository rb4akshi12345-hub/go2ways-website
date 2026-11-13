"use client";

import React, { useEffect, useRef } from "react";
import { WAVES } from "@/data/waves";

interface SilkWaveProps {
  wave: "hero" | "cta";
  speed?: number;
  parallax?: boolean;
  className?: string;
}

interface ShapeData {
  el: SVGPathElement;
  tokens: string[];
  nums: { ti: number; v: number; role: "x" | "y"; x?: number }[];
  still: boolean;
  phase: number;
  amp: number;
}

export default function SilkWave({
  wave,
  speed = 1,
  parallax = false,
  className = "silk-wave",
}: SilkWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const markup = WAVES[wave];
    if (!markup) return;

    host.innerHTML = markup;
    const svg = host.querySelector("svg");
    if (!svg) return;

    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    const shapes: ShapeData[] = paths.map((p, index) => {
      const id = p.getAttribute("id") || "";
      const d = p.getAttribute("d") || "";
      const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
      const nums: { ti: number; v: number; role: "x" | "y"; x?: number }[] = [];
      let cmd = "";
      let pairPos = 0;

      tokens.forEach((t, ti) => {
        if (/[a-zA-Z]/.test(t)) {
          cmd = t;
          pairPos = 0;
          return;
        }
        const v = parseFloat(t);
        let role: "x" | "y" = "x";
        if (cmd === "V" || cmd === "v") role = "y";
        else if (cmd === "H" || cmd === "h") role = "x";
        else {
          role = pairPos % 2 === 0 ? "x" : "y";
          pairPos++;
        }
        nums.push({ ti, v, role });
      });

      let lastX = 0;
      nums.forEach((n) => {
        if (n.role === "x") lastX = n.v;
        else n.x = lastX;
      });

      return {
        el: p,
        tokens,
        nums,
        still: id === "Fade",
        phase: index * 0.085,
        amp: /Ribbon/.test(id) ? 1 : /Edge/.test(id) ? 0.6 : 1.15,
      };
    });

    let isVisible = true;
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      });
      observer.observe(host);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId: number;
    const t0 = performance.now();
    let last = 0;

    const render = (t: number) => {
      shapes.forEach((s) => {
        if (s.still) return;
        const out = s.tokens.slice();
        s.nums.forEach((n) => {
          if (n.role !== "y" || n.v >= 598) {
            out[n.ti] = String(n.v);
            return;
          }
          const x = n.x ?? 0;
          const dy =
            s.amp *
            (11 * Math.sin(x * 0.0042 + t * 0.55 + s.phase) +
              8 * Math.sin(x * 0.0019 - t * 0.33 + s.phase * 0.6) +
              3 * Math.sin(x * 0.011 + t * 0.9 + s.phase * 2));
          out[n.ti] = (n.v + dy).toFixed(1);
        });
        s.el.setAttribute("d", out.join(" "));
      });
    };

    if (!reduceMotion) {
      const loop = (now: number) => {
        animId = requestAnimationFrame(loop);
        if (document.hidden || now - last < 1000 / 45) return;
        last = now;
        const t = ((now - t0) / 1000) * speed;
        if (isVisible) render(t);
      };
      animId = requestAnimationFrame(loop);
    }

    let scrollHandler: (() => void) | null = null;
    if (parallax) {
      scrollHandler = () => {
        const y = window.scrollY;
        host.style.transform = `translate3d(0, ${(y * 0.18).toFixed(1)}px, 0)`;
      };
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
    };
  }, [wave, speed, parallax]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      suppressHydrationWarning
    />
  );
}
