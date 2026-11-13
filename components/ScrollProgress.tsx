"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("is-loaded");
    }
  }, []);

  useEffect(() => {
    // Reveal elements on scroll / navigation
    const revealEls = document.querySelectorAll(
      ".reveal, .reveal-scale, [data-inview]"
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && !reduceMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealEls.forEach((el) => observer?.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in-view"));
    }

    // Scroll progress bar
    const progressEl = document.querySelector<HTMLElement>(".scroll-progress");
    const onScroll = () => {
      if (progressEl) {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressEl.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div className="scroll-progress" aria-hidden="true" />
  );
}

