"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Small delay to allow DOM to settle after route change
    const frame = requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
      if (elements.length === 0) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !("IntersectionObserver" in window)) {
        elements.forEach((el) => el.classList.add("revealed"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -30px 0px",
        }
      );

      elements.forEach((el) => {
        // If element is already in the viewport upon mount, reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("revealed");
        } else {
          observer.observe(el);
        }
      });

      // Safety fallback: after 1200ms, force all elements visible so content is NEVER trapped
      const timer = setTimeout(() => {
        elements.forEach((el) => el.classList.add("revealed"));
      }, 1200);

      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
