import React from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

export default function WhySection() {
  const pillars = [
    {
      icon: "wrench",
      title: "IBM Ecosystem Specialization",
      desc: "Deep technical expertise across IBM Maximo Manage, Health, Monitor, Predict, and TRIRIGA. We configure asset hierarchies, work management, and robust automation scripts instead of fragile custom code.",
    },
    {
      icon: "link",
      title: "Enterprise Integration Architecture",
      desc: "Proven integration pipelines connecting Maximo with SAP, Oracle, Esri GIS, SCADA, and IoT feeds using the Maximo Integration Framework (MIF), REST APIs, and Kafka message brokers.",
    },
    {
      icon: "migrate",
      title: "Zero-Disruption MAS Migration",
      desc: "Systematic methodology for upgrading from Maximo 7.6 to MAS 8 & 9 on Red Hat OpenShift, complete with AppPoints licensing planning, full test rehearsals, and dedicated hypercare.",
    },
    {
      icon: "headset",
      title: "Long-Term Managed Support",
      desc: "SLA-driven L2/L3 application management (AMS), proactive health checks, continuous minor enhancements, performance tuning, and 24/7 monitoring led by certified technical architects.",
    },
  ];

  return (
    <section className="why-section" id="why">
      <div className="container">
        <div className="why-grid">
          <div className="why-intro-column">
            <span className="section-eyebrow">The Go2ways Advantage</span>
            <h2 className="section-title">Enterprise Precision. Proven Engineering.</h2>
            <p className="why-intro-p">
              We bridge the gap between complex software systems and physical asset operations. Our certified
              consultants help organizations modernise infrastructure without operational disruption or vendor lock-in.
            </p>

            <div className="why-stats-grid">
              <div className="why-stat-box">
                <span className="why-stat-num">8</span>
                <span className="why-stat-label">Mission-Critical Sectors</span>
              </div>
              <div className="why-stat-box">
                <span className="why-stat-num">6</span>
                <span className="why-stat-label">Enterprise Capabilities</span>
              </div>
              <div className="why-stat-box">
                <span className="why-stat-num">100%</span>
                <span className="why-stat-label">Certified Consultant Delivery</span>
              </div>
              <div className="why-stat-box">
                <span className="why-stat-num">24/7</span>
                <span className="why-stat-label">Managed AMS Operations</span>
              </div>
            </div>

            <div className="why-cta-row">
              <Link href="/services#how-we-work" className="btn btn-primary">
                How We Deliver
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Discuss Your Requirements
              </Link>
            </div>
          </div>

          <div className="why-pillars-column" data-stagger-children>
            {pillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="why-pillar-card"
              >
                <div className="why-pillar-icon">
                  <Icon name={pillar.icon} />
                </div>
                <div className="why-pillar-copy">
                  <h3 className="why-pillar-title">{pillar.title}</h3>
                  <p className="why-pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
