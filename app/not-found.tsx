import React from "react";
import Link from "next/link";
import SilkWave from "@/components/SilkWave";

export default function NotFound() {
  return (
    <main>
      <section className="hero">
        <SilkWave wave="hero" />
        <div className="hero-copy" style={{ textAlign: "center" }}>
          <h1 className="display-xl" style={{ fontSize: "clamp(64px, 10vw, 120px)" }}>
            404
          </h1>
          <p className="body-l hero-sub">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div
            className="hero-actions hero-sub"
            style={{ justifyContent: "center", marginTop: "24px" }}
          >
            <Link className="btn btn-primary" href="/">
              Go to the homepage
            </Link>
            <Link className="btn btn-secondary" href="/services">
              See our services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

