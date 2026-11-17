import React from "react";
import Link from "next/link";
import SilkWave from "@/components/SilkWave";

export default function HomeCta() {
  return (
    <section className="home-closing-cta">
      <div className="container">
        <div className="home-cta-card">
          <SilkWave wave="cta" speed={0.7} className="silk-wave home-cta-wave" />

          <div className="home-cta-inner">
            <span className="section-eyebrow cta-eyebrow">Start the Conversation</span>

            <h2 className="home-cta-title">
              Ready to Modernize Your
              <br />
              Enterprise Asset Operations?
            </h2>

            <p className="home-cta-desc">
              Whether you are planning a migration from Maximo 7.6 to MAS, architecting complex
              ERP integrations, or seeking dedicated 24/7 managed support, our enterprise architects
              are here to help.
            </p>

            <div className="home-cta-actions">
              <Link className="btn btn-primary cta-btn-main" href="/contact">
                Schedule a Consultation
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
              <Link className="btn btn-secondary cta-btn-sub" href="/services">
                Explore All Services
              </Link>
            </div>

            <div className="cta-trust-points">
              <span className="trust-point">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 8.5l3.5 3.5L13 4" />
                </svg>
                Response within 24 hours
              </span>
              <span className="trust-point">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 8.5l3.5 3.5L13 4" />
                </svg>
                Certified IBM Maximo Consultants
              </span>
              <span className="trust-point">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 8.5l3.5 3.5L13 4" />
                </svg>
                Direct architectural advisory
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
