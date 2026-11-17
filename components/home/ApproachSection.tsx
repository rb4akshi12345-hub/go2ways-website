import React from "react";
import Link from "next/link";

interface Step {
  step: string;
  title: string;
  summary: string;
  details: string;
  badge: string;
  badgeTone: "olive" | "blue" | "purple" | "navy";
}

const STEPS: Step[] = [
  {
    step: "01",
    badge: "Phase 1: Discovery",
    badgeTone: "olive",
    title: "Assess & Map Operations",
    summary: "Map the assets, workflows, and operational constraints that keep the enterprise moving.",
    details:
      "We audit asset hierarchies, locations, existing custom code, ERP touchpoints, and user constraints to design a resilient target architecture before writing configuration.",
  },
  {
    step: "02",
    badge: "Phase 2: Engineering",
    badgeTone: "blue",
    title: "Architect & Connect",
    summary: "Standardize platform capabilities and establish reliable bidirectional system pipelines.",
    details:
      "We configure Maximo and TRIRIGA, replace fragile Java customisations with maintainable automation scripts, and build hardened REST and Kafka integrations with SAP and Oracle.",
  },
  {
    step: "03",
    badge: "Phase 3: Validation",
    badgeTone: "purple",
    title: "Rehearse & Cutover",
    summary: "Full dress rehearsal in mirrored test environments with automated data reconciliation.",
    details:
      "We run complete cutover rehearsals, validate data integrity, train operations teams with real scenarios, and execute cutover with rollback plans and zero unplanned downtime.",
  },
  {
    step: "04",
    badge: "Phase 4: Operations",
    badgeTone: "navy",
    title: "Hypercare & Managed AMS",
    summary: "Immediate post-launch hypercare transitioning into ongoing SLA-governed support.",
    details:
      "Our certified engineering leads provide dedicated hypercare through initial operational cycles, followed by 24/7 L2/L3 application management, continuous releases, and health tuning.",
  },
];

export default function ApproachSection() {
  return (
    <section className="approach-section" id="how">
      <div className="container">
        <div className="section-head-center">
          <span className="section-eyebrow">Delivery Methodology</span>
          <h2 className="section-title">A Structured Approach to Enterprise Modernization</h2>
          <p className="section-subtitle">
            Every engagement follows clear, measurable stages with regular demonstrations, transparent progress,
            and a named technical lead.
          </p>
        </div>

        <div className="approach-timeline">
          <div className="timeline-connecting-line" aria-hidden="true" />
          <div className="approach-grid">
            {STEPS.map((step, index) => (
              <div
                key={step.step}
                className="approach-step-card"
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <div className="step-header">
                  <div className="step-number-bubble">
                    <span>{step.step}</span>
                  </div>
                  <span className={`step-phase-badge badge-${step.badgeTone}`}>{step.badge}</span>
                </div>

                <div className="step-body">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-summary">{step.summary}</p>
                  <p className="step-details">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="approach-footer">
          <span>Want to explore our operational framework in depth?</span>
          <Link href="/services#how-we-work" className="approach-footer-link">
            See how go2ways works <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
