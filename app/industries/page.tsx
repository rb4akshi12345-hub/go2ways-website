import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import RibbonCanvas from "@/components/RibbonCanvas";
import SilkWave from "@/components/SilkWave";

export const metadata: Metadata = {
  title: "Industries — go2ways",
  description: "go2ways transforms physical assets across 8 mission-critical sectors.",
};

const SECTORS = [
  {
    name: "Manufacturing",
    desc: "Predictive maintenance & plant automation",
    img: "/assets/img/photos/manufacturing.jpg",
    alt: "CNC machines on a modern factory floor",
  },
  {
    name: "Utilities",
    desc: "Grid reliability & field workforce mobility",
    img: "/assets/img/photos/utilities.jpg",
    alt: "Electrical substation with transformers and power lines",
  },
  {
    name: "Oil & Gas",
    desc: "Upstream & downstream safety compliance",
    img: "/assets/img/photos/oil-gas.jpg",
    alt: "Oil refinery with storage tanks at sunset",
  },
  {
    name: "Government",
    desc: "Public infrastructure & municipal asset lifecycle",
    img: "/assets/img/photos/government.jpg",
    alt: "Aerial view of a city highway interchange",
  },
  {
    name: "Healthcare",
    desc: "Biomedical equipment & hospital facility uptime",
    img: "/assets/img/photos/healthcare.jpg",
    alt: "Hospital operating room with medical equipment",
  },
  {
    name: "Infrastructure",
    desc: "Large-scale capital projects & civil engineering",
    img: "/assets/img/photos/infrastructure.jpg",
    alt: "Crane lifting a bridge section into place",
  },
  {
    name: "Transportation",
    desc: "Rail, transit & fleet maintenance intelligence",
    img: "/assets/img/photos/transportation.jpg",
    alt: "City buses parked at a depot",
  },
  {
    name: "Real Estate",
    desc: "TRIRIGA space planning & portfolio operations",
    img: "/assets/img/photos/real-estate.jpg",
    alt: "Modern glass office building",
  },
];

export default function IndustriesPage() {
  return (
    <main>
      <section className="hero industries-hero">
        <RibbonCanvas />
        <div className="hero-copy">
          <h1 className="display-xl split-words">
            Transforming Physical Assets
            <br />
            across Mission-Critical Sectors
          </h1>
          <p className="body-l hero-sub">
            Proven enterprise asset solutions delivered for global leaders across
            energy, rail, utilities, manufacturing and infrastructure.
          </p>
        </div>
      </section>

      <section className="section container" id="clients">
        <div className="client-header">
          <div className="client-header-title">
            <h2 className="heading-l reveal">Services Provided To</h2>
            <p className="body-l text-slate reveal" style={{ "--stagger": 1 } as any}>
              Trusted by enterprise leaders worldwide.
            </p>
          </div>
          <div className="client-header-badge reveal" style={{ "--stagger": 2 } as any}>
            <span className="dot" aria-hidden="true" />
            Active engagements across 12 countries
          </div>
        </div>

        <ul className="logo-grid logo-row-1" data-stagger-children>
          <li className="logo-tile reveal-scale">
            <span
              className="wm"
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#0a2540",
                letterSpacing: "-0.04em",
              }}
            >
              LTI
            </span>
          </li>
          <li className="logo-tile reveal-scale">
            <span
              className="wm"
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1f66cc",
                letterSpacing: "0.08em",
              }}
            >
              BRIWO
            </span>
          </li>
          <li className="logo-tile reveal-scale">
            <span className="wm" style={{ fontSize: "22px", color: "#1a3a8a" }}>
              IBM Maximo
            </span>
          </li>
          <li className="logo-tile reveal-scale">
            <span
              className="wm"
              style={{
                fontSize: "22px",
                background: "#1d3a9e",
                color: "#fff",
                padding: "6px 10px",
                fontWeight: 600,
              }}
            >
              Asahi<b>KASEI</b>
            </span>
          </li>
        </ul>

        <ul className="logo-grid logo-row-2" data-stagger-children>
          <li className="logo-tile reveal-scale">
            <span
              className="wm"
              style={{ fontSize: "12px", color: "#1a3f80", fontWeight: 700 }}
            >
              Saudi Electricity Company
            </span>
          </li>
          <li className="logo-tile reveal-scale">
            <span
              className="wm"
              style={{
                fontSize: "20px",
                letterSpacing: "0.35em",
                color: "#222",
                fontWeight: 500,
              }}
            >
              CONNIXT
            </span>
          </li>
          <li className="logo-tile reveal-scale">
            <span className="wm" style={{ fontSize: "14px", color: "#111" }}>
              <span style={{ color: "#e60012" }}>◆</span> MITSUBISHI
              <small style={{ display: "block", fontSize: "7px" }}>
                HEAVY INDUSTRIES, LTD.
              </small>
            </span>
          </li>
          <li className="logo-tile reveal-scale">
            <span
              className="wm"
              style={{ fontSize: "15px", color: "#8a8a8a", fontWeight: 600 }}
            >
              <span
                style={{
                  color: "#5cb848",
                  fontSize: "30px",
                  verticalAlign: "middle",
                }}
              >
                Q
              </span>{" "}
              QUANTUM STRIDES LLC
            </span>
          </li>
          <li className="logo-tile reveal-scale">
            <span className="wm" style={{ fontSize: "28px", color: "#555" }}>
              &amp; more....
            </span>
          </li>
        </ul>
      </section>

      <section className="section container" id="sectors">
        <h2
          className="display-xl center reveal"
          style={{
            fontSize: "clamp(34px, 3.9vw, 56px)",
            marginBottom: "56px",
            textAlign: "center",
          }}
        >
          Sectors We Work In
        </h2>
        <div className="sector-grid last-two" data-stagger-children>
          {SECTORS.map((sec, i) => (
            <article key={i} className="feature-card sector reveal">
              <div className="media">
                <div className="media-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="photo-fill"
                    src={sec.img}
                    alt={sec.alt}
                    width={880}
                    height={1010}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="text">
                <h3 className="heading-s">{sec.name}</h3>
                <p className="muted">{sec.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta container">
        <div className="cta-card reveal-scale">
          <SilkWave wave="cta" speed={0.8} />
          <h2 className="heading-l">
            Ready to modernise your
            <br />
            asset operations?
          </h2>
          <p className="body-l">
            Talk to our certified consultants about Maximo implementations, MAS
            migrations, and TRIRIGA.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href="/contact?topic=trial">
              Start free trial
            </Link>
            <Link className="btn btn-secondary" href="/contact?topic=demo">
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
