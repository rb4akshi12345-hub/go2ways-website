import React from "react";
import Link from "next/link";
import { assetPath } from "@/lib/assetPath";

interface Sector {
  name: string;
  desc: string;
  tag: string;
  img: string;
  alt: string;
}

const SECTORS: Sector[] = [
  {
    name: "Manufacturing",
    desc: "Predictive maintenance, shop-floor instrumentation, and plant automation.",
    tag: "Plant Reliability",
    img: "/assets/img/photos/manufacturing.jpg",
    alt: "CNC machines on a modern factory floor",
  },
  {
    name: "Utilities",
    desc: "Substation grid reliability, transmission assets, and mobile field crew workflows.",
    tag: "Grid Operations",
    img: "/assets/img/photos/utilities.jpg",
    alt: "Electrical substation with transformers and power lines",
  },
  {
    name: "Oil & Gas",
    desc: "Upstream and downstream asset lifecycle, process safety, and regulatory compliance.",
    tag: "Energy Assets",
    img: "/assets/img/photos/oil-gas.jpg",
    alt: "Oil refinery with storage tanks at sunset",
  },
  {
    name: "Transportation",
    desc: "Rail rolling stock, bus transit networks, and automated fleet maintenance intelligence.",
    tag: "Transit & Fleet",
    img: "/assets/img/photos/transportation.jpg",
    alt: "City buses parked at a depot",
  },
  {
    name: "Infrastructure",
    desc: "Large-scale capital project delivery, bridge and road monitoring, and civil engineering.",
    tag: "Civil Assets",
    img: "/assets/img/photos/infrastructure.jpg",
    alt: "Crane lifting a bridge section into place",
  },
  {
    name: "Government",
    desc: "Public sector infrastructure, municipal facility management, and transparent reporting.",
    tag: "Public Sector",
    img: "/assets/img/photos/government.jpg",
    alt: "Aerial view of a city highway interchange",
  },
  {
    name: "Healthcare",
    desc: "Biomedical device tracking, hospital facility uptime, and clinical compliance.",
    tag: "Healthcare Facilities",
    img: "/assets/img/photos/healthcare.jpg",
    alt: "Hospital operating room with medical equipment",
  },
  {
    name: "Real Estate",
    desc: "TRIRIGA workplace management, space utilization, and portfolio lease accounting.",
    tag: "Commercial IWMS",
    img: "/assets/img/photos/real-estate.jpg",
    alt: "Modern glass office building",
  },
];

export default function IndustriesSection() {
  return (
    <section className="industries-section" id="industries">
      <div className="container">
        <div className="industries-head">
          <div className="industries-head-copy">
            <span className="section-eyebrow">Industry Focus</span>
            <h2 className="section-title">Engineered for Mission-Critical Sectors</h2>
            <p className="section-subtitle">
              Delivering operational reliability, regulatory compliance, and total asset visibility across
              capital-intensive industries worldwide.
            </p>
          </div>
          <Link href="/industries#sectors" className="btn btn-secondary industries-head-link">
            Explore All Sectors <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="industries-grid">
          {SECTORS.map((sector) => (
            <article
              key={sector.name}
              className="industry-card"
            >
              <div className="industry-image-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetPath(sector.img)}
                  alt={sector.alt}
                  width={640}
                  height={480}
                  loading="lazy"
                  className="industry-image"
                />
                <div className="industry-overlay" />
                <span className="industry-tag">{sector.tag}</span>
              </div>

              <div className="industry-content">
                <h3 className="industry-title">
                  <Link href="/industries#sectors" className="industry-title-link">
                    {sector.name}
                  </Link>
                </h3>
                <p className="industry-desc">{sector.desc}</p>
                <Link href="/industries#sectors" className="industry-arrow-link" aria-label={`View ${sector.name} solutions`}>
                  <span>Explore sector</span>
                  <svg
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
      </div>
    </section>
  );
}
