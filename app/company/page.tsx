import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SilkWave from "@/components/SilkWave";

export const metadata: Metadata = {
  title: "Company — go2ways | Enterprise Asset Management & Technology Solutions",
  description:
    "Learn about go2ways — our mission, certified IBM Maximo engineering leadership, delivery principles, and global operational presence.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Technical Precision Over Shortcuts",
    desc: "We configure robust asset hierarchies, work management workflows, and maintainable automation scripts instead of fragile custom code that breaks on upgrade.",
  },
  {
    num: "02",
    title: "Zero-Disruption Migration Philosophy",
    desc: "Every upgrade from Maximo 7.6 to MAS 8 and 9 is thoroughly rehearsed in mirrored environments with automated data reconciliation and roll-back contingencies.",
  },
  {
    num: "03",
    title: "Enterprise System Interoperability",
    desc: "We build bidirectional pipelines connecting Maximo with SAP, Oracle ERP, Esri GIS, SCADA, and IoT telematics via MIF, Kafka, and secure REST APIs.",
  },
  {
    num: "04",
    title: "Long-Term Partnership & Governance",
    desc: "Beyond initial deployment, our certified technical architects provide 24/7 SLA-backed managed AMS, continuous health tuning, and release governance.",
  },
];

const TEAMS = [
  {
    title: "IBM Maximo & MAS Architects",
    tag: "EAM & Cloud",
    desc: "Certified specialists across IBM Maximo Manage, Health, Monitor, Predict, and MAS 8/9 on Red Hat OpenShift, guiding enterprises through complex infrastructure transitions.",
  },
  {
    title: "Enterprise Integration Engineers",
    tag: "Integration & MIF",
    desc: "Engineers specializing in bidirectional ERP integrations with SAP S/4HANA, Oracle Cloud, GIS mapping systems, and industrial IoT data pipelines.",
  },
  {
    title: "Facilities & Real Estate Consultants",
    tag: "IBM TRIRIGA",
    desc: "Advisors helping real estate and campus leaders modernize space planning, lease accounting, capital projects, and portfolio operations with TRIRIGA.",
  },
  {
    title: "Ordova Product Engineering",
    tag: "Proprietary ITMS",
    desc: "The product team engineering Ordova, our Intelligent Transport Management System, delivering automated dispatch, fleet telemetry, and operational visibility.",
  },
];

export default function CompanyPage() {
  return (
    <main id="main-content" className="company-page">
      {/* Hero Section */}
      <section className="company-hero">
        <SilkWave wave="hero" parallax className="company-silk-wave" />

        <div className="container company-hero-content">
          <div className="company-badge">
            <span className="pulse-indicator" aria-hidden="true" />
            <span>About go2ways</span>
          </div>

          <h1 className="company-hero-title">
            Engineering Long-Term
            <br />
            <span className="company-title-accent">Operational Resilience</span>
          </h1>

          <p className="company-hero-sub">
            Go2ways is an enterprise technology solutions provider specializing in IBM Maximo,
            MAS migration, mission-critical integrations, and intelligent asset operations for
            capital-intensive organizations worldwide.
          </p>

          <div className="company-hero-chips">
            <span className="company-chip">Gurugram Technology Center</span>
            <span className="company-chip">Certified Maximo &amp; MAS Engineers</span>
            <span className="company-chip">SLA-Governed 24/7 Delivery</span>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section container">
        <div className="company-mission-grid">
          <div className="mission-card mission-primary">
            <span className="mission-eyebrow">Our Mission</span>
            <h2 className="mission-title">Empowering Enterprises to Operate with Total Asset Confidence</h2>
            <p className="mission-text">
              We bridge the gap between heavy physical asset operations and modern enterprise software. Our mission is
              to give organizations complete visibility, regulatory compliance, and maximum reliability across their critical
              machinery, facilities, and fleets.
            </p>
          </div>

          <div className="mission-card mission-secondary">
            <span className="mission-eyebrow">Our Vision</span>
            <h2 className="mission-title">The Global Benchmark in Asset Management Engineering</h2>
            <p className="mission-text">
              To be the most trusted enterprise technology partner for capital-intensive industries — delivering technical
              precision, vendor independence, and durable architectures that outlast technological shifts.
            </p>
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="section container">
        <div className="section-head-center">
          <span className="section-eyebrow">Our Foundation</span>
          <h2 className="section-title">Core Engineering Principles</h2>
          <p className="section-subtitle">
            Every implementation, integration, and managed service engagement is anchored in four foundational principles.
          </p>
        </div>

        <div className="principles-grid">
          {PRINCIPLES.map((item) => (
            <article key={item.num} className="principle-card">
              <span className="principle-num">{item.num}</span>
              <h3 className="principle-title">{item.title}</h3>
              <p className="principle-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Engineering Capabilities & Teams */}
      <section className="section container">
        <div className="section-head-center">
          <span className="section-eyebrow">Technical Capability</span>
          <h2 className="section-title">Multidisciplinary Engineering Excellence</h2>
          <p className="section-subtitle">
            Our practice brings together certified system architects, enterprise integration specialists, and reliability engineers.
          </p>
        </div>

        <div className="teams-grid">
          {TEAMS.map((team) => (
            <div key={team.title} className="team-card">
              <div className="team-card-head">
                <span className="team-tag">{team.tag}</span>
              </div>
              <h3 className="team-title">{team.title}</h3>
              <p className="team-desc">{team.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Delivery Hub & Office */}
      <section className="section container">
        <div className="delivery-hub-card">
          <div className="hub-info">
            <span className="section-eyebrow">Global Delivery Hub</span>
            <h2 className="hub-title">Gurugram Technology Center</h2>
            <p className="hub-desc">
              Our engineering center in Gurugram serves as the nerve center for certified Maximo implementations,
              MAS cloud transitions, 24/7 AMS operations, and Ordova product development.
            </p>

            <div className="hub-details-list">
              <div className="hub-detail-item">
                <strong className="hub-label">Address:</strong>
                <span>314a Sector 102, Gurugram, Haryana, India</span>
              </div>
              <div className="hub-detail-item">
                <strong className="hub-label">Operational Hours:</strong>
                <span>Monday – Saturday, 9:00 AM – 6:00 PM IST (24/7 for Managed AMS)</span>
              </div>
              <div className="hub-detail-item">
                <strong className="hub-label">Direct Contact:</strong>
                <span>+91 8826949739 &bull; support@go2ways.com</span>
              </div>
            </div>

            <div className="hub-actions">
              <Link href="/contact" className="btn btn-primary">
                Contact Our Team
              </Link>
              <a
                href="https://www.google.com/maps/search/?api=1&query=314a+Sector+102+Gurugram+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                View on Map <span aria-hidden="true">&nearr;</span>
              </a>
            </div>
          </div>

          <div className="hub-badges-panel">
            <div className="hub-metric-box">
              <span className="hub-metric-val">100%</span>
              <span className="hub-metric-lbl">Certified Consultant Delivery</span>
            </div>
            <div className="hub-metric-box">
              <span className="hub-metric-val">24/7</span>
              <span className="hub-metric-lbl">Global AMS Coverage</span>
            </div>
            <div className="hub-metric-box">
              <span className="hub-metric-val">8</span>
              <span className="hub-metric-lbl">Mission-Critical Sectors</span>
            </div>
            <div className="hub-metric-box">
              <span className="hub-metric-val">MAS 9</span>
              <span className="hub-metric-lbl">Ready Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="cta container">
        <div className="cta-card">
          <SilkWave wave="cta" speed={0.8} />
          <h2 className="heading-l">
            Partner With Go2ways for
            <br />
            Your Technology Initiatives
          </h2>
          <p className="body-l">
            Connect with our certified architects to discuss Maximo implementations, MAS upgrades, or enterprise integrations.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/contact?topic=consultation">
              Schedule a Consultation
            </Link>
            <Link className="btn btn-secondary" href="/services">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
