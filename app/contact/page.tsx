import React, { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import RibbonCanvas from "@/components/RibbonCanvas";
import SilkWave from "@/components/SilkWave";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Get in Touch — go2ways",
  description:
    "Talk to go2ways. Share your requirements, ask questions, or book a demo.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="hero contact-hero">
        <RibbonCanvas />
        <div className="hero-copy">
          <h1 className="display-xl split-words">Get in Touch</h1>
          <p className="body-l hero-sub">
            Let’s start a conversation. Share your requirements, ask questions.
          </p>
        </div>

        <div className="container">
          <div className="info-cards" data-stagger-children>
            <a className="info-card reveal" href="mailto:support@go2ways.com">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3.5 6.5 12 13l8.5-6.5" />
              </svg>
              <h2>Email Us</h2>
              <span style={{ fontSize: "14px", color: "#1f66cc" }}>
                support@go2ways.com
              </span>
            </a>

            <a className="info-card reveal" href="tel:+918826949739">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              <h2>Call Us</h2>
              <p>+91 8826949739</p>
            </a>

            <a
              className="info-card reveal"
              href="https://www.google.com/maps/search/?api=1&query=314a+Sector+102+Gurugram+Haryana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h2>Our Office</h2>
              <p>314a Sector 102, Gurugram, Haryana</p>
            </a>

            <div className="info-card reveal">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 6.5V12l3.5 2" />
              </svg>
              <h2>Business Hours</h2>
              <p>Mon – Sat, 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="contact-grid">
          <div className="contact-intro reveal in-view">
            <h2 className="contact-headline">
              Let&apos;s Architect Your Next Operational Milestone
            </h2>
            <p className="contact-description">
              Whether you are planning a zero-downtime IBM Maximo / MAS 8/9 migration, scoping TRIRIGA facility workflows, or seeking 24/7 SLA-governed managed services, our enterprise team is ready to assist.
            </p>

            <div className="contact-value-props">
              <div className="value-prop-item">
                <div className="prop-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="prop-text">
                  <strong>Direct Architect Assignment</strong>
                  <p>Your scope is triaged directly by certified IBM Maximo &amp; MAS practice specialists, never lost in junior queues.</p>
                </div>
              </div>

              <div className="value-prop-item">
                <div className="prop-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="prop-text">
                  <strong>Under-24h Response SLA</strong>
                  <p>Guaranteed response within 24 business hours with initial architectural assessment and available consultation slots.</p>
                </div>
              </div>

              <div className="value-prop-item">
                <div className="prop-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="prop-text">
                  <strong>Mutual NDA &amp; Enterprise Confidentiality</strong>
                  <p>All shared architecture diagrams, system topologies, and asset data are governed under strict enterprise confidentiality.</p>
                </div>
              </div>
            </div>

            <div className="direct-channels-card">
              <div className="channel-item">
                <span className="channel-lbl">Priority Inquiries</span>
                <a href="mailto:support@go2ways.com" className="channel-val">support@go2ways.com</a>
              </div>
              <div className="channel-item">
                <span className="channel-lbl">Direct Desk</span>
                <a href="tel:+918826949739" className="channel-val">+91 8826949739</a>
              </div>
            </div>
          </div>

          <Suspense fallback={<div>Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <section className="section container" id="faq">
        <div
          className="section-header"
          style={{ maxWidth: "820px", marginBottom: "24px", gap: "16px" }}
        >
          <p className="faq-eyebrow reveal">FAQ</p>
          <h2 className="faq-title reveal" style={{ "--stagger": 1 } as any}>
            Common Questions
          </h2>
          <p
            className="faq-sub reveal"
            style={{ "--stagger": 2, marginTop: "16px" } as any}
          >
            Find answers to frequently asked questions about our products,
            services and more.
          </p>
        </div>

        <FaqAccordion />
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
            <Link className="btn btn-primary" href="/services">
              Explore Our Services
            </Link>
            <Link className="btn btn-secondary" href="/company">
              About go2ways
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

