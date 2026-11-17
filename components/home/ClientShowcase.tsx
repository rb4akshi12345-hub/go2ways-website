import React from "react";
import Link from "next/link";

interface ClientBrand {
  name: string;
  sub?: string;
  style: React.CSSProperties;
  render: React.ReactNode;
}

const CLIENTS: ClientBrand[] = [
  {
    name: "LTI",
    style: { fontSize: "28px", fontWeight: 800, color: "#0a2540", letterSpacing: "-0.04em" },
    render: (
      <span>
        LTI
        <small style={{ display: "block", fontSize: "10px", fontWeight: 500, letterSpacing: "0.02em", color: "#64748b" }}>
          Larsen &amp; Toubro Infotech
        </small>
      </span>
    ),
  },
  {
    name: "BRIWO",
    style: { fontSize: "24px", fontWeight: 700, color: "#1f66cc", letterSpacing: "0.08em" },
    render: <span>BRIWO</span>,
  },
  {
    name: "IBM Maximo",
    style: { fontSize: "21px", color: "#1a3a8a", fontWeight: 700 },
    render: (
      <span>
        IBM Maximo
        <small style={{ display: "block", fontSize: "10px", fontWeight: 500, color: "#64748b" }}>
          Partner Ecosystem
        </small>
      </span>
    ),
  },
  {
    name: "AsahiKASEI",
    style: { fontSize: "20px" },
    render: (
      <span
        style={{
          background: "#1d3a9e",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "4px",
          fontWeight: 600,
          display: "inline-block",
        }}
      >
        Asahi<b>KASEI</b>
      </span>
    ),
  },
  {
    name: "Saudi Electricity Company",
    style: { fontSize: "13px", color: "#1a3f80", fontWeight: 700, lineHeight: 1.25 },
    render: (
      <span>
        Saudi Electricity Company
        <small style={{ display: "block", fontSize: "9px", color: "#64748b", fontWeight: 500 }}>
          الشركة السعودية للكهرباء
        </small>
      </span>
    ),
  },
  {
    name: "CONNIXT",
    style: { fontSize: "19px", letterSpacing: "0.3em", color: "#222222", fontWeight: 600 },
    render: <span>CONNIXT</span>,
  },
  {
    name: "Mitsubishi Heavy Industries",
    style: { fontSize: "13px", color: "#111111", fontWeight: 600 },
    render: (
      <span>
        <span style={{ color: "#e60012", marginRight: "3px" }}>◆</span> MITSUBISHI
        <small style={{ display: "block", fontSize: "8px", fontWeight: 600, color: "#555" }}>
          HEAVY INDUSTRIES, LTD.
        </small>
      </span>
    ),
  },
  {
    name: "Quantum Strides LLC",
    style: { fontSize: "13px", color: "#555555", fontWeight: 600 },
    render: (
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
        <span style={{ color: "#5cb848", fontSize: "24px", fontWeight: 800 }}>Q</span>
        <span>QUANTUM STRIDES LLC</span>
      </span>
    ),
  },
];

export default function ClientShowcase() {
  return (
    <section className="client-showcase" id="clients">
      <div className="container">
        <div className="client-showcase-header">
          <div className="client-header-copy">
            <span className="section-eyebrow">Enterprise Trust</span>
            <h2 className="section-title">Services Provided To Industry Leaders</h2>
          </div>
        </div>

        <div className="client-logo-grid">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="client-logo-card"
              title={client.name}
            >
              <div className="client-logo-inner" style={client.style}>
                {client.render}
              </div>
            </div>
          ))}
        </div>

        <div className="client-showcase-footer">
          <p className="client-footer-text">
            Trusted by global enterprises for mission-critical asset management and system integration.
          </p>
          <Link href="/industries#clients" className="client-footer-link">
            View all industry engagements <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
