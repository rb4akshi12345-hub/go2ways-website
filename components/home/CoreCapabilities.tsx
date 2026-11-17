import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

interface Capability {
  slug: string;
  name: string;
  short: string;
  icon: string;
  category: string;
  description: string;
  highlights: string[];
}

const CAPABILITIES: Capability[] = [
  {
    slug: "ibm-maximo",
    name: "IBM Maximo Services & EAM",
    short: "IBM Maximo",
    icon: "wrench",
    category: "Asset Lifecycle Management",
    description:
      "Enterprise asset hierarchies, work management, inventory, purchasing, automation scripting, and version upgrades configured around how your teams actually operate.",
    highlights: ["Maximo Manage & Health", "Automation Scripting", "BIRT & KPI Dashboards", "Db2 / Oracle / SQL Server"],
  },
  {
    slug: "mas-migration",
    name: "MAS Implementation & Migration",
    short: "MAS Migration",
    icon: "migrate",
    category: "Modernization & Cloud",
    description:
      "Structured migration from Maximo 7.6 to IBM Maximo Application Suite (MAS 8 & 9) on Red Hat OpenShift, including AppPoints planning, test rehearsals, and zero-downtime cutover.",
    highlights: ["7.6 to MAS 8 & 9 Path", "Red Hat OpenShift", "AppPoints Licensing Optimization", "Full Rehearsal & Hypercare"],
  },
  {
    slug: "enterprise-integration",
    name: "Enterprise System Integration",
    short: "Enterprise Integration",
    icon: "link",
    category: "Data & Systems Interoperability",
    description:
      "Seamless bidirectional integration connecting Maximo with SAP, Oracle ERP, GIS (Esri), SCADA, IoT sensors, and Kafka messaging pipelines with active monitoring and runbooks.",
    highlights: ["SAP & Oracle ERP Connectors", "Maximo MIF & REST APIs", "Kafka & App Connect Pipelines", "GIS & Real-time IoT Feeds"],
  },
  {
    slug: "tririga",
    name: "IBM TRIRIGA Facilities",
    short: "IBM TRIRIGA",
    icon: "building",
    category: "Real Estate & Facilities",
    description:
      "Integrated workplace management (IWMS), space planning from CAD/BIM floor plans, lease accounting compliance (IFRS 16 / ASC 842), and capital project management.",
    highlights: ["Space & Desk Planning", "IFRS 16 & ASC 842 Lease Mgmt", "CAD & BIM Floorplan Sync", "Facilities Work Orders"],
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud & Infrastructure Operations",
    short: "Cloud & Infrastructure",
    icon: "cloud",
    category: "Hybrid Cloud Architecture",
    description:
      "Enterprise cloud deployments across AWS, Azure, and OpenShift with 24/7 infrastructure observability, security hardening, container orchestration, and disaster recovery.",
    highlights: ["Red Hat OpenShift Orchestration", "AWS & Azure Architectures", "Disaster Recovery Protocols", "Hardened Security & Patching"],
  },
  {
    slug: "managed-support",
    name: "24/7 Managed Support & AMS",
    short: "Managed Support",
    icon: "headset",
    category: "Continuous Application Operations",
    description:
      "SLA-backed L2/L3 application support, proactive system health monitoring, monthly enhancements, performance tuning, and incident resolution with named technical leadership.",
    highlights: ["24/7 Observability & Alerting", "L2 / L3 Technical Support", "Proactive Health Checks", "Performance Optimization"],
  },
];

export default function CoreCapabilities() {
  return (
    <section className="core-capabilities-section" id="features">
      <div className="container">
        <div className="section-head-center">
          <span className="section-eyebrow">Enterprise Capabilities</span>
          <h2 className="section-title">End-to-End Enterprise Technology &amp; Asset Solutions</h2>
          <p className="section-subtitle">
            From greenfield Maximo rollouts to MAS migrations, complex ERP integrations, and round-the-clock
            managed operations delivered by certified specialists.
          </p>
        </div>

        <div className="capabilities-grid">
          {CAPABILITIES.map((cap) => (
            <article
              key={cap.slug}
              className="capability-card"
            >
              <div className="capability-card-top">
                <div className="capability-icon-badge">
                  <Icon name={cap.icon} className="cap-icon" />
                </div>
                <span className="capability-category">{cap.category}</span>
              </div>

              <div className="capability-card-body">
                <h3 className="capability-title">
                  <Link href={`/services/${cap.slug}`} className="capability-title-link">
                    {cap.name}
                  </Link>
                </h3>
                <p className="capability-desc">{cap.description}</p>

                <div className="capability-tags">
                  {cap.highlights.map((h, i) => (
                    <span key={i} className="capability-tag">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="capability-card-footer">
                <Link href={`/services/${cap.slug}`} className="capability-link" aria-label={`Explore ${cap.name}`}>
                  <span>Explore service</span>
                  <svg
                    className="cap-arrow"
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
              </div>
            </article>
          ))}
        </div>

        <div className="capabilities-banner">
          <div className="capabilities-banner-text">
            <strong>Looking for Mobile Field Development or Architectural Consulting?</strong>
            <span>We also provide Maximo Mobile field enablement, inspections, and enterprise advisory.</span>
          </div>
          <Link href="/services" className="btn btn-secondary capabilities-banner-btn">
            View All Services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
