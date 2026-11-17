import React from "react";
import Link from "next/link";
import SilkWave from "@/components/SilkWave";

export default function HeroSection() {
  return (
    <section className="enterprise-hero">
      <SilkWave wave="hero" parallax className="silk-wave hero-silk-wave" />

      <div className="hero-content container">
        <h1 className="hero-title reveal" style={{ "--stagger": 1 } as React.CSSProperties}>
          Intelligent AI Bot Assistant
          <br />
          <span className="hero-title-accent">for Modern Businesses</span>
        </h1>

        <p className="hero-description reveal" style={{ "--stagger": 2 } as React.CSSProperties}>
          Connecting data, assets, people and workflows into one intelligent operational view.
        </p>

        <div className="hero-actions reveal" style={{ "--stagger": 3 } as React.CSSProperties}>
          <Link className="btn btn-primary hero-btn-main" href="/services">
            Explore Our Services
            <svg
              className="btn-arrow"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <Link className="btn btn-secondary hero-btn-sub" href="/contact">
            Speak With An Expert
          </Link>
        </div>

        <div className="hero-metric-bar reveal" style={{ "--stagger": 4 } as React.CSSProperties}>
          <div className="metric-chip">
            <span className="metric-dot dot-olive" aria-hidden="true" />
            <div className="metric-text">
              <strong>IBM Maximo &amp; MAS</strong>
              <small>Certified Implementations</small>
            </div>
          </div>
          <div className="metric-chip">
            <span className="metric-dot dot-blue" aria-hidden="true" />
            <div className="metric-text">
              <strong>SAP &amp; Oracle Integration</strong>
              <small>Bidirectional ERP Pipelines</small>
            </div>
          </div>
          <div className="metric-chip">
            <span className="metric-dot dot-purple" aria-hidden="true" />
            <div className="metric-text">
              <strong>8 Critical Sectors</strong>
              <small>Utilities, Transit, Energy</small>
            </div>
          </div>
          <div className="metric-chip">
            <span className="metric-dot dot-navy" aria-hidden="true" />
            <div className="metric-text">
              <strong>24/7 Managed AMS</strong>
              <small>SLA-Governed Support</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
