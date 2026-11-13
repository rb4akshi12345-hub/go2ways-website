import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  SERVICES,
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/data/services";
import Icon from "@/components/Icon";
import SilkWave from "@/components/SilkWave";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};

  return {
    title: `${s.name} — go2ways`,
    description: s.sub.replace(/<.*?>/g, " "),
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const relatedServices = s.related
    .map((relSlug) => getServiceBySlug(relSlug))
    .filter(Boolean);

  const contactTopic = `/contact?topic=${s.slug}#contact-form`;

  return (
    <main>
      <section className="hero svc-hero">
        <SilkWave wave="hero" />
        <div className="hero-copy">
          <Link className="pill-tag hero-sub crumb" href="/services">
            <Icon name={s.icon} />
            {s.name}
          </Link>
          <h1
            className="display-xl split-words"
            dangerouslySetInnerHTML={{ __html: s.h1 }}
          />
          <p className="body-l hero-sub">{s.sub}</p>
          <div className="hero-actions hero-sub">
            <Link className="btn btn-primary" href={contactTopic}>
              Talk to an expert
            </Link>
            <a className="btn btn-secondary" href="#included">
              What’s included
            </a>
          </div>
        </div>
      </section>

      <section className="section container" id="overview">
        <div className="split">
          <div className="split-copy">
            <span className="pill-tag reveal">Overview</span>
            <h2
              className="heading-l reveal"
              style={{ "--stagger": 1 } as any}
              dangerouslySetInnerHTML={{ __html: s.ov_title }}
            />
            <p className="body-l reveal" style={{ "--stagger": 2 } as any}>
              {s.ov_body}
            </p>
            <ul className="checklist reveal" style={{ "--stagger": 3 } as any}>
              {s.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <aside className="glance-card reveal-scale" aria-label="At a glance">
            <span className="glance-icon">
              <Icon name={s.icon} />
            </span>
            <div>
              <h3 className="glance-label">Works with</h3>
              <ul className="chip-list">
                {s.works.map((w, i) => (
                  <li key={i} className="chip">
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="glance-label">Typical engagements</h3>
              <ul className="engage-list">
                {s.engage.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section container" id="included">
        <div className="section-header">
          <span className="pill-tag reveal">What we deliver</span>
          <h2 className="heading-l reveal" style={{ "--stagger": 1 } as any}>
            Everything you need,
            <br />
            from one team
          </h2>
        </div>
        <div className="card-grid" data-stagger-children>
          {s.caps.map(([ic, t, d], i) => (
            <article key={i} className="step-card cap-card reveal">
              <span className="cap-icon">
                <Icon name={ic} />
              </span>
              <h3 className="heading-s">{t}</h3>
              <p className="body-m">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container" id="process">
        <div className="section-header">
          <span className="pill-tag reveal">How we deliver</span>
          <h2 className="heading-l reveal" style={{ "--stagger": 1 } as any}>
            Four steps, no surprises
          </h2>
          <p className="body-l reveal" style={{ "--stagger": 2 } as any}>
            Clear stages, regular demos and a named lead from start to finish.
          </p>
        </div>
        <div className="card-grid cols-4" data-stagger-children>
          {s.steps.map(([t, d], i) => (
            <article key={i} className="step-card reveal">
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="heading-s">{t}</h3>
              <p className="body-m">{d}</p>
            </article>
          ))}
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="section container" id="related">
          <div className="section-header" style={{ marginBottom: "32px" }}>
            <span className="pill-tag reveal">Related services</span>
          </div>
          <div className="related-grid" data-stagger-children>
            {relatedServices.map((rel) =>
              rel ? (
                <Link
                  key={rel.slug}
                  className="related-card reveal"
                  href={`/services/${rel.slug}`}
                >
                  <span className="mi-icon">
                    <Icon name={rel.icon} />
                  </span>
                  <span className="mi-text">
                    <span className="mi-title">{rel.name}</span>
                    <span className="mi-desc">{rel.nav}</span>
                  </span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </section>
      )}

      <section className="cta container">
        <div className="cta-card reveal-scale">
          <SilkWave wave="cta" speed={0.8} />
          <h2 className="heading-l">
            Let’s talk about
            <br />
            {s.short}
          </h2>
          <p className="body-l">
            Tell us where you are today and we’ll suggest a practical next step.
          </p>
          <div className="cta-actions">
            <Link className="btn btn-primary" href={contactTopic}>
              Talk to an expert
            </Link>
            <a className="btn btn-secondary" href="tel:+918826949739">
              Call +91 88269 49739
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

