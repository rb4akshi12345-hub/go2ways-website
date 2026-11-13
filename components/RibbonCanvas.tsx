"use client";

import React, { useEffect, useRef } from "react";

interface RibbonCanvasProps {
  faint?: boolean;
  className?: string;
}

export default function RibbonCanvas({
  faint = false,
  className = "ribbon",
}: RibbonCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    let isVisible = true;
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      });
      observer.observe(host);
    }

    const drawRibbon = (t: number) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      if (faint) {
        grad.addColorStop(0, "rgba(120,200,120,0.55)");
        grad.addColorStop(0.5, "rgba(120,170,230,0.45)");
        grad.addColorStop(1, "rgba(150,210,140,0.55)");
      } else {
        grad.addColorStop(0, "#3aa7e0");
        grad.addColorStop(0.18, "#c2d93a");
        grad.addColorStop(0.36, "#9fd24a");
        grad.addColorStop(0.58, "#8b56c7");
        grad.addColorStop(0.78, "#6b6fd6");
        grad.addColorStop(1, "#2f8fe0");
      }
      ctx.strokeStyle = grad;
      const lines = faint ? 26 : 44;
      const mid = h * 0.5;
      const spread = faint ? h * 0.42 : h * 0.46;
      const step = Math.max(6, w / 140);

      for (let i = 0; i < lines; i++) {
        const k = i / (lines - 1) - 0.5;
        ctx.globalAlpha = faint ? 0.35 : 0.55 + 0.45 * (1 - Math.abs(k) * 2);
        ctx.lineWidth = faint ? 0.8 : 1;
        if (faint) ctx.setLineDash([10, 7]);
        else ctx.setLineDash([]);
        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += step) {
          const u = x / w;
          const base =
            mid +
            Math.sin(u * Math.PI * 2.1 + t * 0.45) * h * 0.18 +
            Math.sin(u * Math.PI * 4.3 - t * 0.3) * h * 0.06;
          const twist = Math.cos(u * Math.PI * 2.6 - t * 0.5 + 0.8);
          const y = base + k * spread * twist + Math.sin(u * 18 + t + i * 0.15) * 1.2;
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId: number;
    const t0 = performance.now();
    let last = 0;

    if (!reduceMotion) {
      const loop = (now: number) => {
        animId = requestAnimationFrame(loop);
        if (document.hidden || now - last < 1000 / 45) return;
        last = now;
        const t = (now - t0) / 1000;
        if (isVisible) drawRibbon(t);
      };
      animId = requestAnimationFrame(loop);
    } else {
      drawRibbon(0);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      window.removeEventListener("resize", size);
      if (host.contains(canvas)) host.removeChild(canvas);
    };
  }, [faint]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      suppressHydrationWarning
    />
  );
}
