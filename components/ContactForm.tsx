"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [topic, setTopic] = useState("");
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
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const t = searchParams.get("topic") || "";
    setTopic(t);

    const presets: Record<string, string> = {
      demo: "Hi go2ways team, I'd like to book a demo for my team.",
      trial: "Hi go2ways team, I'd like to start a free trial.",
      partner: "Hi go2ways team, I'm interested in partnering with you.",
      "ibm-maximo": "Hi go2ways team, I'd like to talk about IBM Maximo Services.",
      "mas-migration": "Hi go2ways team, I'd like to talk about MAS Migration.",
      "enterprise-integration":
        "Hi go2ways team, I'd like to talk about Enterprise Integration.",
      "cloud-infrastructure":
        "Hi go2ways team, I'd like to talk about Cloud & Infrastructure.",
      "managed-support": "Hi go2ways team, I'd like to talk about Managed Support.",
      tririga: "Hi go2ways team, I'd like to talk about TRIRIGA Services.",
      "mobile-development":
        "Hi go2ways team, I'd like to talk about Mobile Development & Enablement.",
      "consulting-advisory":
        "Hi go2ways team, I'd like to talk about Consulting & Architectural Advisory.",
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
      errs.message = "Tell us a little more (at least 10 characters).";
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, topic }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSubmitted(true);
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(
            data.error || "Could not send message. Please email support@go2ways.com."
          );
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
    <div className="form-card reveal-scale">
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
              <label htmlFor="f-name">Name *</label>
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
              <label htmlFor="f-company">Company</label>
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
              <label htmlFor="f-message">Your Message *</label>
              <span className="err" aria-live="polite">
                {errors.message}
              </span>
            </div>
          </div>

          {serverError && (
            <div
              style={{
                color: "#e33b5c",
                fontSize: "14px",
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              {serverError}
            </div>
          )}

          <button
            className={`btn btn-gradient ${loading ? "loading" : ""}`}
            type="submit"
            disabled={loading}
          >
            <span className="spinner" aria-hidden="true" />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      ) : (
        <div className="form-success show" role="status" aria-live="polite">
          <div>
            <svg
              className="tick"
              viewBox="0 0 72 72"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="36" cy="36" r="33" stroke="#a9cb32" />
              <path d="M22 37l9 9 19-20" stroke="#2f6aa6" />
            </svg>
            <h3>Thanks, {formData.name.split(" ")[0]}!</h3>
            <p>Your message is on its way. We’ll reply within 24 hours on business days.</p>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleReset}
            >
              Send another message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
