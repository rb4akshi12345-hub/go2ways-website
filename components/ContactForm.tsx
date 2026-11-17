"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState("");
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    website: "", // Honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const t = searchParams.get("topic") || "";
    setTopic(t);

    const presets: Record<string, string> = {
      demo: "Hi go2ways team, I'd like to book a demo for my team.",
      trial: "Hi go2ways team, I'd like to start a free trial.",
      partner: "Hi go2ways team, I'm interested in partnering with you.",
      "ibm-maximo": "Hi go2ways team, I'd like to discuss IBM Maximo implementation & support.",
      "mas-migration": "Hi go2ways team, I'd like to discuss MAS 8 / 9 migration options.",
      "enterprise-integration":
        "Hi go2ways team, I'd like to discuss Enterprise Integration & Orchestration.",
      "cloud-infrastructure":
        "Hi go2ways team, I'd like to discuss Cloud & Infrastructure Operations.",
      "managed-support": "Hi go2ways team, I'd like to discuss 24/7 Managed AMS & Support.",
      tririga: "Hi go2ways team, I'd like to discuss TRIRIGA Real Estate & Facilities.",
      "mobile-development":
        "Hi go2ways team, I'd like to discuss Mobile Enablement & Ordova.",
      "consulting-advisory":
        "Hi go2ways team, I'd like to discuss Consulting & Architectural Advisory.",
    };

    if (t && presets[t]) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? prev.message : presets[t],
      }));
    }
  }, [searchParams]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (formData.name.trim().length < 2) {
      errs.name = "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid work email.";
    }
    if (
      formData.phone.trim() &&
      !/^[+()\d\s-]{7,}$/.test(formData.phone.trim())
    ) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (formData.message.trim().length < 10) {
      errs.message = "Tell us a little more about your requirements (at least 10 characters).";
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCopyRef = async () => {
    if (!referenceId) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(referenceId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      // Clipboard fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

      if (accessKey) {
        // Direct static dispatch via Web3Forms (ideal for GitHub Pages)
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            from_name: "go2ways Website Consultation Lead",
            subject: `New Lead: ${formData.name}${formData.company ? ` (${formData.company})` : ""}`,
            name: formData.name,
            email: formData.email,
            company: formData.company || "Not specified",
            phone: formData.phone || "Not specified",
            topic: topic || "General Enterprise Inquiry",
            message: formData.message,
            botcheck: formData.website, // Honeypot spam trap
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (data.success || res.ok) {
          setReferenceId(`G2W-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
          setSubmitted(true);
        } else {
          setServerError(
            data.message ||
              "Could not dispatch inquiry. Please email support@go2ways.com."
          );
        }
      } else {
        // Fallback to internal API route if running on Node/Vercel
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, topic }),
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setReferenceId(`G2W-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
          setSubmitted(true);
        } else {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setServerError(
              data.error ||
                "Could not dispatch inquiry. Please email support@go2ways.com."
            );
          }
        }
      }
    } catch {
      setServerError("Network error. Please try again or email support@go2ways.com.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCopied(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      website: "",
    });
    setErrors({});
  };

  return (
    <div className="form-card">
      {!submitted ? (
        <form id="contact-form" noValidate onSubmit={handleSubmit}>
          {/* Honeypot field for bot suppression */}
          <div className="hp" aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="f-website">Website</label>
            <input
              id="f-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-card-header">
            <h3 className="form-card-title">Schedule a Consultation</h3>
            <p className="form-card-subtitle">
              Fill out the details below and an enterprise architect will get back to you within 24 hours.
            </p>
          </div>

          <div className="form-grid">
            <div className={`field ${errors.name ? "invalid" : ""}`}>
              <input
                id="f-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder=" "
                required
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
              />
              <label htmlFor="f-name">Your Full Name *</label>
              <span className="err" aria-live="polite">
                {errors.name}
              </span>
            </div>

            <div className={`field ${errors.email ? "invalid" : ""}`}>
              <input
                id="f-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder=" "
                required
                value={formData.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
              />
              <label htmlFor="f-email">Work Email *</label>
              <span className="err" aria-live="polite">
                {errors.email}
              </span>
            </div>

            <div className="field">
              <input
                id="f-company"
                name="company"
                type="text"
                autoComplete="organization"
                placeholder=" "
                value={formData.company}
                onChange={handleChange}
              />
              <label htmlFor="f-company">Company / Organization</label>
            </div>

            <div className={`field ${errors.phone ? "invalid" : ""}`}>
              <input
                id="f-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={Boolean(errors.phone)}
              />
              <label htmlFor="f-phone">Phone Number</label>
              <span className="err" aria-live="polite">
                {errors.phone}
              </span>
            </div>

            <div className="field full field-select">
              <select
                id="f-topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                aria-label="Practice Area or Topic"
              >
                <option value="">Select Area of Interest (Optional)</option>
                <option value="mas-migration">MAS Migration (MAS 8 / 9)</option>
                <option value="ibm-maximo">IBM Maximo Implementation &amp; Upgrades</option>
                <option value="enterprise-integration">Enterprise Integration &amp; Orchestration</option>
                <option value="tririga">TRIRIGA Real Estate &amp; Facilities</option>
                <option value="managed-support">24/7 Managed Support &amp; SLA AMS</option>
                <option value="cloud-infrastructure">Cloud &amp; Infrastructure Operations</option>
                <option value="mobile-development">Mobile Workforce Enablement (Ordova)</option>
                <option value="consulting-advisory">Consulting &amp; Architectural Advisory</option>
              </select>
              <label htmlFor="f-topic" className="select-label">Area of Interest</label>
            </div>

            <div className={`field full ${errors.message ? "invalid" : ""}`}>
              <textarea
                id="f-message"
                name="message"
                rows={4}
                placeholder=" "
                required
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
              />
              <label htmlFor="f-message">Project Requirements / Scope *</label>
              <span className="err" aria-live="polite">
                {errors.message}
              </span>
            </div>
          </div>

          {serverError && (
            <div className="form-server-error" role="alert">
              {serverError}
            </div>
          )}

          <button
            className={`btn-contact-submit ${loading ? "loading" : ""}`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span>Logging Consultation Request...</span>
              </>
            ) : (
              <>
                <span>Submit Consultation Request</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="contact-confirmation-panel" role="status" aria-live="polite">
          <div className="confirmation-header">
            <div className="confirmation-icon-wrap" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="confirmation-check-svg"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <span className="confirmation-badge">Inquiry Successfully Logged</span>
            <h3 className="confirmation-title">
              Thank You, {formData.name.split(" ")[0]}!
            </h3>
            <p className="confirmation-lead">
              Your inquiry has been received and prioritized by our enterprise practice team.
            </p>
            <div className="confirmation-ref-pill">
              <span className="ref-lbl">Tracking Reference:</span>
              <code className="ref-val">{referenceId}</code>
              <button
                type="button"
                className="ref-copy-btn"
                onClick={handleCopyRef}
                title="Copy reference ID to clipboard"
                aria-label="Copy reference ID"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="confirmation-next-steps">
            <h4 className="next-steps-heading">What Happens Next</h4>
            <div className="next-steps-timeline">
              <div className="timeline-step">
                <div className="step-marker">
                  <span className="marker-num">1</span>
                </div>
                <div className="step-content">
                  <strong>Technical Triage &amp; Architect Assignment</strong>
                  <p>Your requirements are assigned to a certified IBM Maximo or Enterprise Integration practice architect.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-marker">
                  <span className="marker-num">2</span>
                </div>
                <div className="step-content">
                  <strong>Operational &amp; Systems Review</strong>
                  <p>We review your environment, versions, ERP integration touchpoints, and timeline.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-marker">
                  <span className="marker-num">3</span>
                </div>
                <div className="step-content">
                  <strong>Consultation &amp; Roadmap Session</strong>
                  <p>Our senior consultant reaches out with structured available slots for an architecture discussion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-sla-bar">
            <span className="sla-icon" aria-hidden="true">⏱</span>
            <span>
              <strong>Guaranteed Response SLA:</strong> Under 24 business hours (Mon – Sat, 9:00 AM – 6:00 PM IST)
            </span>
          </div>

          <div className="confirmation-actions">
            <Link href="/services" className="btn btn-primary confirmation-btn-main">
              Explore Our Services
            </Link>
            <button
              className="btn btn-secondary confirmation-btn-sub"
              type="button"
              onClick={handleReset}
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

