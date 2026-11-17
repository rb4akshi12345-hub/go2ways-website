import React from "react";
import Link from "next/link";

const PRINCIPLES = [
  {
    num: "01",
    title: "Technical Precision Over Shortcuts",
    desc: "Robust asset hierarchies, clean automation scripts, and vendor-aligned configurations instead of fragile customizations that break on upgrade.",
  },
  {
    num: "02",
    title: "Zero-Disruption Migration Philosophy",
    desc: "Every MAS 8/9 migration is rehearsed in mirrored test environments with automated data reconciliation and strict rollback contingencies.",
  },
  {
    num: "03",
    title: "Enterprise System Interoperability",
    desc: "Bidirectional integration pipelines connecting Maximo with SAP, Oracle ERP, Esri GIS, SCADA, and IoT telematics via MIF, Kafka, and REST.",
  },
  {
    num: "04",
    title: "Long-Term SLA Governance",
    desc: "Certified technical architects delivering 24/7 SLA-backed managed AMS, continuous health tuning, and structured release governance.",
  },
];

export default function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="about-header">
          <div className="about-badge-pill">
            <span className="about-badge-dot" aria-hidden="true" />
            <span>About go2ways</span>
          </div>
          <h2 className="about-title">
            Engineering Long-Term Operational Resilience
          </h2>
          <p className="about-subtitle">
            Go2ways is an enterprise technology solutions provider specializing in IBM Maximo,
            MAS migration, mission-critical integrations, and intelligent asset operations for
            capital-intensive organizations worldwide.
          </p>
        </div>

        {/* Mission & Overview Grid */}
        <div className="about-main-grid">
          {/* Left Column: Who We Are & Mission */}
          <div className="about-overview-card">
            <span className="about-card-eyebrow">Our Mission &amp; Foundation</span>
            <h3 className="about-card-title">
              Empowering Enterprises to Operate with Total Asset Confidence
            </h3>
            <p className="about-card-body">
              We bridge heavy physical asset operations with modern enterprise software.
              Whether modernizing power generation utilities, rail networks, or high-throughput manufacturing plants,
              our certified consultants deliver technical precision, regulatory compliance, and maximum reliability across every critical system.
            </p>

            <div className="about-highlights-list">
              <div className="about-highlight-item">
                <div className="highlight-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <strong>Gurugram Technology Center</strong>
                  <p>Global delivery hub at Sector 102, Gurugram, Haryana — housing certified architects and product engineers.</p>
                </div>
              </div>

              <div className="about-highlight-item">
                <div className="highlight-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <strong>Certified Maximo &amp; MAS Leadership</strong>
                  <p>Specialists in Maximo 7.6, MAS 8/9 on Red Hat OpenShift, MIF integrations, and TRIRIGA.</p>
                </div>
              </div>

              <div className="about-highlight-item">
                <div className="highlight-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <strong>24/7 SLA-Governed Managed Support</strong>
                  <p>Round-the-clock enterprise support desk ensuring continuous uptime and rapid incident response.</p>
                </div>
              </div>
            </div>

            <div className="about-actions">
              <Link href="/contact" className="btn btn-primary">
                Consult With Our Team
              </Link>
              <Link href="/services" className="btn btn-secondary">
                View Practice Areas
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Core Principles */}
          <div className="about-principles-card">
            <span className="about-card-eyebrow">Delivery Standards</span>
            <h3 className="about-card-title">How We Deliver Results</h3>

            <div className="about-principles-list">
              {PRINCIPLES.map((item) => (
                <div key={item.num} className="about-principle-item">
                  <span className="principle-number">{item.num}</span>
                  <div className="principle-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-hub-note">
              <span className="hub-note-icon" aria-hidden="true">📍</span>
              <p>
                <strong>Visit or Contact Us:</strong> 314a Sector 102, Gurugram, Haryana &bull;{" "}
                <a href="tel:+918826949739">+91 8826949739</a> &bull;{" "}
                <a href="mailto:support@go2ways.com">support@go2ways.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
