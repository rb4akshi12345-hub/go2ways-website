import React from "react";

interface ArchitecturalClient {
  id: string;
  name: string;
  industry: string;
  style?: React.CSSProperties;
  renderDefault: React.ReactNode;
  renderHover: React.ReactNode;
}

const CLIENTS: ArchitecturalClient[] = [
  {
    id: "sec",
    name: "Saudi Electricity Company",
    industry: "Power & Utility Operations",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <span className="arch-name">Saudi Electricity Company</span>
        <small className="arch-sub">الشركة السعودية للكهرباء</small>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <span className="arch-name text-sec">Saudi Electricity Company</span>
        <small className="arch-sub">الشركة السعودية للكهرباء</small>
      </div>
    ),
  },
  {
    id: "mhi",
    name: "Mitsubishi Heavy Industries",
    industry: "Heavy Industry & Engineering",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <span className="arch-name">
          <span className="mhi-diamond">◆</span> MITSUBISHI
        </span>
        <small className="arch-sub">HEAVY INDUSTRIES, LTD.</small>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <span className="arch-name">
          <span className="mhi-diamond diamond-red">◆</span> MITSUBISHI
        </span>
        <small className="arch-sub font-bold">HEAVY INDUSTRIES, LTD.</small>
      </div>
    ),
  },
  {
    id: "asahi",
    name: "AsahiKASEI",
    industry: "Materials & Manufacturing",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <span className="asahi-badge asahi-mono">
          Asahi<b>KASEI</b>
        </span>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <span className="asahi-badge asahi-color">
          Asahi<b>KASEI</b>
        </span>
      </div>
    ),
  },
  {
    id: "briwo",
    name: "BRIWO",
    industry: "Energy Infrastructure",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <span className="arch-name font-heavy tracking-wide">BRIWO</span>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <span className="arch-name font-heavy tracking-wide text-briwo">BRIWO</span>
      </div>
    ),
  },
  {
    id: "lti",
    name: "LTI",
    industry: "Enterprise IT & Systems",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <span className="arch-name font-black tracking-tight text-2xl">LTI</span>
        <small className="arch-sub">Larsen &amp; Toubro Infotech</small>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <span className="arch-name font-black tracking-tight text-2xl text-navy">LTI</span>
        <small className="arch-sub">Larsen &amp; Toubro Infotech</small>
      </div>
    ),
  },
  {
    id: "ibm-maximo",
    name: "IBM Maximo",
    industry: "Enterprise Asset Management",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <span className="arch-name font-bold text-xl">IBM Maximo</span>
        <small className="arch-sub">Partner Ecosystem</small>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <span className="arch-name font-bold text-xl text-ibm">IBM Maximo</span>
        <small className="arch-sub">Partner Ecosystem</small>
      </div>
    ),
  },
  {
    id: "connixt",
    name: "CONNIXT",
    industry: "Field Workforce Mobility",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <span className="arch-name font-semibold tracking-widest text-lg">CONNIXT</span>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <span className="arch-name font-semibold tracking-widest text-lg text-dark">CONNIXT</span>
      </div>
    ),
  },
  {
    id: "quantum",
    name: "Quantum Strides LLC",
    industry: "Asset Management Advisory",
    renderDefault: (
      <div className="arch-logo arch-logo-mono">
        <div className="quantum-wrap">
          <span className="q-badge">Q</span>
          <span className="arch-name font-semibold text-sm">QUANTUM STRIDES LLC</span>
        </div>
      </div>
    ),
    renderHover: (
      <div className="arch-logo arch-logo-color">
        <div className="quantum-wrap">
          <span className="q-badge q-green">Q</span>
          <span className="arch-name font-semibold text-sm">QUANTUM STRIDES LLC</span>
        </div>
      </div>
    ),
  },
];

export default function IndustryClientShowcase() {
  return (
    <section className="section container arch-clients-section" id="clients">
      <div className="client-header">
        <div className="client-header-title">
          <span className="industry-eyebrow">Client &amp; Partner Ecosystem</span>
          <h2 className="heading-l">Services Provided To</h2>
          <p className="body-l text-slate">
            Trusted by capital-intensive enterprises and technology leaders across global mission-critical sectors.
          </p>
        </div>
      </div>

      <div className="arch-client-grid">
        {CLIENTS.map((client) => (
          <div key={client.id} className="arch-card" title={client.name}>
            <div className="arch-card-content">
              <div className="arch-logo-wrapper">
                <div className="logo-default">{client.renderDefault}</div>
                <div className="logo-hover">{client.renderHover}</div>
              </div>
              <span className="arch-industry-tag">{client.industry}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="arch-showcase-footer">
        <div className="arch-trust-indicator">
          <span className="indicator-dot" aria-hidden="true" />
          <span>Specialized delivery across utilities, energy, rail, aviation, telecom &amp; manufacturing</span>
        </div>
      </div>
    </section>
  );
}
