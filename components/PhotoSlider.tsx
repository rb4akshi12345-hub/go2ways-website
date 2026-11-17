"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoSliderProps {
  photos: Photo[];
  label: string;
  /** How long each photo stays before sliding on, in milliseconds. */
  interval?: number;
}

/**
 * Auto-sliding photo gallery. The progress bar on the current dot times each
 * slide. It keeps going on hover and only pauses when scrolled out of view or
 * when the tab is hidden. Swipe on touch screens. Still for people who prefer reduced motion.
 */
export default function PhotoSlider({ photos, label, interval = 3500 }: PhotoSliderProps) {
  const n = photos.length;
  const boxRef = useRef<HTMLDivElement>(null);
  // index can equal n: that is the copy of the first photo, used for a seamless loop
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  const startX = useRef<number | null>(null);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && boxRef.current) {
      io = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), { threshold: 0.3 });
      io.observe(boxRef.current);
    } else {
      setVisible(true);
    }
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      io?.disconnect();
    };
  }, []);

  // After sliding onto the copy of the first photo, jump back to the real one unseen.
  useEffect(() => {
    if (index !== n) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 950);
    return () => window.clearTimeout(t);
  }, [index, n]);

  useEffect(() => {
    if (animate) return;
    const raf = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  const goTo = useCallback((k: number) => {
    setAnimate(true);
    setIndex(k);
    setCycle((c) => c + 1);
  }, []);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => (i >= n ? 1 : i + 1));
  }, [n]);

  if (n === 0) return null;
  const real = index % n;
  const paused = !visible || tabHidden;
  const slides = [...photos, photos[0]];

  return (
    // The fade-in class sits on a wrapper React never re-renders, so the site's
    // reveal script can add "in-view" without it being overwritten.
    <div className="reveal-scale">
    <div
      ref={boxRef}
      className={`svc-gallery${paused ? " paused" : ""}${reduceMotion ? " static" : ""}`}
      aria-roledescription="carousel"
      aria-label={label}
      style={{ "--slide-ms": `${interval}ms` } as React.CSSProperties}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 40) goTo(dx < 0 ? (real + 1) % n : (real - 1 + n) % n);
      }}
    >
      <div className="slides-viewport">
        <div
          className={`slides${animate ? "" : " no-anim"}`}
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {slides.map((p, k) => {
            const isCopy = k === n;
            return (
              <figure
                key={k}
                className={`slide${k === index ? " is-active" : ""}`}
                role={isCopy ? undefined : "group"}
                aria-roledescription={isCopy ? undefined : "slide"}
                aria-label={isCopy ? undefined : `${k + 1} of ${n}`}
                aria-hidden={isCopy ? true : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={isCopy ? "" : p.alt}
                  width={1200}
                  height={900}
                  loading={k === 0 || isCopy ? undefined : "lazy"}
                />
              </figure>
            );
          })}
        </div>
      </div>
      <div
        className="slider-dots"
        aria-label="Choose a photo"
        onAnimationEnd={(e) => {
          if (e.animationName === "slide-progress" && !reduceMotion) next();
        }}
      >
        {photos.map((_, k) => (
          <button
            key={k === real ? `on-${k}-${cycle}` : `off-${k}`}
            type="button"
            aria-label={`Show photo ${k + 1} of ${n}`}
            aria-current={k === real ? "true" : undefined}
            onClick={() => goTo(k)}
          />
        ))}
      </div>
    </div>
    </div>
  );
}
