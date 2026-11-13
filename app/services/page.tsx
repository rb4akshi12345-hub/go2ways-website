import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import SilkWave from "@/components/SilkWave";

export const metadata: Metadata = {
  title: "Services — go2ways",
  description:
    "We make operations easier to run by connecting data, assets, people and workflows into one intelligent operational view.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="hero">
        <SilkWave wave="hero" parallax />
        <div className="hero-copy">
          <h1 className="display-xl split-words">
            We make Operations
            <br />
            easier to run
          </h1>
          <p className="body-l hero-sub">
            Connecting data, assets, people and workflows into one intelligent
            operational view.
          </p>
        </div>
      </section>

      <section className="panel" id="how-we-work">
        <div className="panel-intro">
          <h2 className="heading-l reveal">How We Work</h2>
          <p className="body-l reveal" style={{ "--stagger": 1 } as any}>
            We combine operational context with technology
            <br />
            so teams can move faster without losing visibility or control.
          </p>
        </div>

        <div className="card-grid" data-stagger-children>
          <article className="feature-card reveal">
            <div className="media" style={{ padding: "8px 12px" }}>
              <div className="media-inner" style={{ borderRadius: "16px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="crop-ops"
                  src="/assets/img/svc-operations.png"
                  alt="Isometric city map with buses, depots and a field engineer, showing how assets and people connect"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text">
              <h3 className="heading-s">Start with the operations</h3>
              <p className="body-m text-slate">
                We map the assets, people, workflows and decisions that keep the
                operation moving.
              </p>
              <p className="body-m text-slate">
                From vehicles and infrastructure to teams, schedules and real-world
                constraints, we build a complete picture of how your operation
                works. By understanding how everything connects, we can identify
                bottlenecks, dependencies and opportunities for improvement.
              </p>
            </div>
          </article>

          <article className="feature-card reveal">
            <div className="media">
              <div
                className="media-inner"
                style={{ background: "url(/assets/img/svc-workflow-bg.png) center/cover" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="crop-together"
                  src="/assets/img/svc-info-together.png"
                  alt="go2ways hub linking fleet, field teams, cloud data, facilities and documents"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text">
              <h3 className="heading-s">Bring Information Together</h3>
              <p className="body-m text-slate">
                We create a shared operational view so teams are not working from
                different versions of the truth.
              </p>
              <p className="body-m text-slate">
                By connecting data across systems, departments and external sources,
                go2ways brings critical information into one up-to-date view.
                Everyone gets the context they need to coordinate faster, reduce
                manual handoffs and stay aligned.
              </p>
            </div>
          </article>

          <article className="feature-card reveal">
            <div className="media">
              <div
                className="media-inner"
                style={{ background: "var(--surface-media)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="crop-action"
                  src="/assets/img/svc-data-action.png"
                  alt="Dashboard that identifies patterns, prioritises work and improves performance"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text">
              <h3 className="heading-s">Turn Data into Action</h3>
              <p className="body-m text-slate">
                Use history and current information to identify patterns, prioritize
                work and improve performance.
              </p>
              <p className="body-m text-slate">
                We turn operational data into clear insights and actionable
                recommendations. Teams can identify recurring issues, prioritize what
                matters most and make faster, better decisions that continuously
                improve performance across the network.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section container" id="why">
        <h2 className="why-logo reveal">
          Why{" "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/footer-logo.png" alt="go2ways" width={144} height={30} />
          <span className="qmark" aria-hidden="true">
            ?
          </span>
        </h2>
        <p className="eyebrow-red reveal" style={{ "--stagger": 1 } as any}>
          The Problem
        </p>

        <div className="problem-row">
          <div className="problem-copy">
            <h3 className="heading-l reveal">
              Critical information
              <br />
              is scattered
            </h3>
            <p className="body-l reveal" style={{ "--stagger": 1 } as any}>
              When an asset breaks down or a vehicle needs attention, teams spend
              valuable time searching across multiple sources.
            </p>
            <span
              className="grad-rule reveal in-view"
              style={{ "--stagger": 2 } as any}
              aria-hidden="true"
            />
          </div>

          <figure
            className="sources-card reveal-scale in-view"
            aria-label="Information is spread across a system, team messages, spreadsheets and phone calls, with no single shared view"
          >
            <figcaption className="card-label">Information spread across sources</figcaption>
            <svg
              className="src-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M28 38 C28 62, 50 62, 50 86" />
              <path d="M72 38 C72 62, 50 62, 50 86" />
              <path d="M28 62 C28 76, 50 74, 50 86" />
              <path d="M72 62 C72 76, 50 74, 50 86" />
            </svg>
            <div className="src-grid">
              <div className="src-tile">
                <span className="src-ico">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8M12 16v4" />
                  </svg>
                </span>
                <span>
                  <b>System A</b>
                  <small>Asset status</small>
                </span>
              </div>
              <div className="src-tile">
                <span className="src-ico">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" />
                  </svg>
                </span>
                <span>
                  <b>Team messages</b>
                  <small>Latest updates</small>
                </span>
              </div>
              <div className="src-tile">
                <span className="src-ico">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M3 15h18M9 3v18" />
                  </svg>
                </span>
                <span>
                  <b>Spreadsheets</b>
                  <small>Operational records</small>
                </span>
              </div>
              <div className="src-tile">
                <span className="src-ico">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <span>
                  <b>Phone calls</b>
                  <small>Verbal handovers</small>
                </span>
              </div>
            </div>
            <div className="no-view">
              <span className="dot" aria-hidden="true" />
              No single shared view
            </div>
          </figure>
        </div>

        <div className="point-row" data-stagger-children>
          <article className="point-card reveal">
            <span className="bang" style={{ "--d": 0 } as any} aria-hidden="true">
              !
            </span>
            <div>
              <h3>
                Teams spend time
                <br />
                searching for context
              </h3>
              <p>Information is spread across sources.</p>
            </div>
          </article>
          <article className="point-card reveal">
            <span className="bang" style={{ "--d": 1 } as any} aria-hidden="true">
              !
            </span>
            <div>
              <h3>
                Conflicting information
                <br />
                has to be reconciled
              </h3>
              <p>Teams must piece together what is true.</p>
            </div>
          </article>
          <article className="point-card reveal">
            <span className="bang" style={{ "--d": 2 } as any} aria-hidden="true">
              !
            </span>
            <div>
              <h3>
                Coordinating the next step
                <br />
                creates delays
              </h3>
              <p>Action waits on calls and handovers.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section container" id="solution">
        <div className="section-header">
          <h2 className="why-logo small reveal">
            The{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/footer-logo.png" alt="go2ways" width={144} height={30} />{" "}
            solution
          </h2>
          <p className="heading-l reveal" style={{ "--stagger": 1 } as any}>
            One connected view
            <br />
            for every operation
          </p>
          <p className="body-l reveal" style={{ "--stagger": 2 } as any}>
            Teams, fleet, data and records come together in one live view, so
            everyone knows what to do next.
          </p>
        </div>

        <div className="org-row">
          <div className="org-inputs">
            <p className="card-label">Connected inputs</p>
            <ul className="in-list">
              <li className="in-pill reveal" style={{ "--stagger": 0 } as any}>
                Teams
              </li>
              <li className="in-pill reveal" style={{ "--stagger": 1 } as any}>
                Fleet
              </li>
              <li className="in-pill reveal" style={{ "--stagger": 2 } as any}>
                Data
              </li>
              <li className="in-pill reveal" style={{ "--stagger": 3 } as any}>
                Records
              </li>
            </ul>
          </div>

          <div className="org-dash">
            <p className="card-label">All organised in go2ways</p>
            <div
              className="dash reveal-scale in-view"
              role="img"
              aria-label="Operations overview"
            >
              <div className="dash-top" aria-hidden="true">
                <span className="dots">
                  <i />
                  <i />
                  <i />
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/img/logo.png" alt="" width={90} height={25} />
                <span className="live">
                  <span className="pulse" />
                  Live overview
                </span>
              </div>
              <div className="dash-body" aria-hidden="true">
                <p className="dash-title">Operations overview</p>
                <p className="dash-sub">Your operation, organised in one place</p>
                <div className="dash-stats">
                  <div>
                    <small>Active assets</small>
                    <b>128</b>
                  </div>
                  <div>
                    <small>On-time status</small>
                    <b>94%</b>
                  </div>
                  <div className="warn">
                    <small>Needs attention</small>
                    <b>
                      03 <em>items</em>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="point-row" data-stagger-children>
          <article className="point-card good reveal">
            <span className="good-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
              </svg>
            </span>
            <div>
              <h3>Faster decisions</h3>
              <p>Everyone works from the same live picture.</p>
            </div>
          </article>
          <article className="point-card good reveal">
            <span className="good-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12.5 2.8 2.8L16.5 9.5" />
              </svg>
            </span>
            <div>
              <h3>Easier coordination</h3>
              <p>Teams, fleet and records stay in step.</p>
            </div>
          </article>
          <article className="point-card good reveal">
            <span className="good-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <h3>Confident action</h3>
              <p>Clear next steps, without chasing calls.</p>
            </div>
          </article>
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
