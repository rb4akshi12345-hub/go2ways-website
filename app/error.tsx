"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy" style={{ textAlign: "center", padding: "120px 20px" }}>
          <h1 className="display-xl" style={{ fontSize: "clamp(36px, 5vw, 64px)", marginBottom: "16px" }}>
            Something went wrong
          </h1>
          <p className="body-l" style={{ color: "#64748b", marginBottom: "28px" }}>
            An unexpected error occurred. Please try again or return to the homepage.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={() => reset()}>
              Try again
            </button>
            <Link className="btn btn-secondary" href="/">
              Go to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
