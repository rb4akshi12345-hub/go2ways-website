"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FaqItem {
  id: string;
  q: string;
  a: React.ReactNode;
}

const FAQS_COL_1: FaqItem[] = [
  {
    id: "faq-1",
    q: "How can I get started with go2ways?",
    a: (
      <p>
        Send us a message using the form above or book a demo. We’ll set up a short
        call to understand your operation, then propose a pilot scoped to your assets
        and teams.
      </p>
    ),
  },
  {
    id: "faq-3",
    q: "Do you offer custom solutions?",
    a: (
      <p>
        Yes. Every operation is different, so we tailor workflows, integrations and
        dashboards to your systems, whether that’s IBM Maximo, TRIRIGA, spreadsheets or
        in-house tools.
      </p>
    ),
  },
  {
    id: "faq-5",
    q: "What kind of support do you provide?",
    a: (
      <p>
        From onboarding and training to ongoing optimisation, our team stays with you.
        You get a named point of contact plus help-desk support during business hours.
      </p>
    ),
  },
];

const FAQS_COL_2: FaqItem[] = [
  {
    id: "faq-2",
    q: "Where are you located?",
    a: (
      <p>
        Our office is at 314a Sector 102, Gurugram, Haryana. We work with clients
        across India and internationally, on-site and remotely.
      </p>
    ),
  },
  {
    id: "faq-4",
    q: "Can I speak to someone directly?",
    a: (
      <p>
        Of course. Call us on +91 8826949739, Monday to Saturday, 9:00 AM – 6:00 PM, or
        email support@go2ways.com.
      </p>
    ),
  },
  {
    id: "faq-6",
    q: "How can I partner with go2ways?",
    a: (
      <p>
        We partner with system integrators, consultancies and technology vendors.{" "}
        <Link
          href="/contact?topic=partner#contact-form"
          style={{ color: "#2e6ad6", textDecoration: "underline" }}
        >
          Tell us about your company
        </Link>{" "}
        and we’ll be in touch.
      </p>
    ),
  },
];

export default function FaqAccordion() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="faq-grid">
      <div className="faq-col">
        {FAQS_COL_1.map((item) => (
          <div
            key={item.id}
            className={`faq-item reveal ${openIds[item.id] ? "open" : ""}`}
          >
            <button
              className="faq-q"
              type="button"
              aria-expanded={Boolean(openIds[item.id])}
              aria-controls={item.id}
              onClick={() => toggle(item.id)}
            >
              {item.q}
              <span className="plus" aria-hidden="true" />
            </button>
            <div className="faq-a" id={item.id}>
              <div>{item.a}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-col">
        {FAQS_COL_2.map((item) => (
          <div
            key={item.id}
            className={`faq-item reveal ${openIds[item.id] ? "open" : ""}`}
          >
            <button
              className="faq-q"
              type="button"
              aria-expanded={Boolean(openIds[item.id])}
              aria-controls={item.id}
              onClick={() => toggle(item.id)}
            >
              {item.q}
              <span className="plus" aria-hidden="true" />
            </button>
            <div className="faq-a" id={item.id}>
              <div>{item.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

