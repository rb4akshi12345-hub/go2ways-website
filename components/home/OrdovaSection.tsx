import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

interface Module {
  name: string;
  icon: string;
  desc: string;
  tag: string;
}

const MODULES: Module[] = [
  {
    name: "Ordova Plan",
    icon: "flow",
    tag: "Network & Scheduling",
    desc: "Network, route, trip and capacity planning designed for transport network efficiency.",
  },
  {
    name: "Ordova Dispatch",
    icon: "bus",
    tag: "Live Operations",
    desc: "Live operational control, real-time crew scheduling, and dynamic vehicle assignment.",
  },
  {
    name: "Ordova Fleet",
    icon: "wrench",
    tag: "Depot & Maintenance",
    desc: "Vehicle telemetry, depot management, preventive maintenance schedules, and asset health.",
  },
  {
    name: "Ordova Insight",
    icon: "chart",
    tag: "Intelligence & Safety",
    desc: "Executive dashboards, on-time performance metrics, safety analytics, and compliance reporting.",
  },
  {
    name: "Ordova Assist",
    icon: "sparkle",
    tag: "Decision Support",
    desc: "Contextual recommendations and AI decision support to assist operational controllers.",
  },
  {
    name: "Ordova Connect",
    icon: "link",
    tag: "Enterprise Integrations",
    desc: "Seamless connectivity with IBM Maximo, GPS/AVL feeds, ticketing, ERP, HR, and passenger apps.",
  },
];

export default function OrdovaSection() {
  return (
    <section className="ordova-section" id="ordova">
      <div className="container">
        <div className="ordova-card">
          <div className="ordova-header">
            <div className="ordova-eyebrow-row">
              <span className="ordova-pill">Proprietary Technology</span>
              <span className="ordova-platform-tag">Enterprise ITMS</span>
            </div>

            <h2 className="ordova-headline">
              Ordova Intelligent Transport Management System
            </h2>

            <p className="ordova-description">
              Our proprietary platform built specifically for bus operators and transport authorities.
              Ordova unites route planning, live dispatching, fleet maintenance, and operational intelligence
              into one integrated system of action.
            </p>

            <div className="ordova-actions">
              <a
                href="https://ordova.go2ways.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary ordova-btn-main"
              >
                <span>Explore Ordova Platform</span>
                <svg
                  className="ordova-ext-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link href="/contact?topic=demo" className="btn btn-secondary ordova-btn-sub">
                Request an Ordova Walkthrough
              </Link>
            </div>
          </div>

          <div className="ordova-modules-grid">
            {MODULES.map((mod, idx) => (
              <div
                key={mod.name}
                className="ordova-module-card"
                style={{ "--stagger": idx + 1 } as React.CSSProperties}
              >
                <div className="ordova-module-head">
                  <div className="ordova-module-icon">
                    <Icon name={mod.icon} />
                  </div>
                  <span className="ordova-module-tag">{mod.tag}</span>
                </div>
                <h3 className="ordova-module-name">{mod.name}</h3>
                <p className="ordova-module-desc">{mod.desc}</p>
              </div>
            ))}
          </div>

          <div className="ordova-integration-bar">
            <span className="ordova-int-label">Native Ecosystem Connectors:</span>
            <div className="ordova-int-chips">
              <span className="ordova-chip">IBM Maximo</span>
              <span className="ordova-chip">GPS / AVL Telemetry</span>
              <span className="ordova-chip">SAP / Oracle ERP</span>
              <span className="ordova-chip">Electronic Ticketing</span>
              <span className="ordova-chip">Fuel &amp; Depot IoT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
