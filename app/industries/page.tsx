import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SilkWave from "@/components/SilkWave";
import IndustryClientShowcase from "@/components/industries/IndustryClientShowcase";
import { assetPath } from "@/lib/assetPath";

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
        <SilkWave wave="hero" parallax className="silk-wave hero-silk-wave" />
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

      <IndustryClientShowcase />

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
                    src={assetPath(sec.img)}
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
            <Link className="btn btn-primary" href="/contact?topic=consultation">
              Schedule a Consultation
            </Link>
            <Link className="btn btn-secondary" href="/contact?topic=expert">
              Speak With An Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

