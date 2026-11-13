"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES } from "@/data/services";

interface Message {
  from: "user" | "bot";
  html?: string;
  text?: string;
  chips?: string[];
}

export default function Chatbot() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chips, setChips] = useState<string[]>([
    "What services do you offer?",
    "Tell me about Ordova",
    "How do I contact you?",
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const slug = pathname.split("/").pop();
      const currentService = SERVICES.find((s) => s.slug === slug);

      let welcomeHtml =
        "Hi, I’m the go2ways assistant. I can help you find the right service, learn about our products, or get in touch with the team.";
      let initialChips = [
        "What services do you offer?",
        "Tell me about Ordova",
        "How do I contact you?",
      ];

      if (currentService) {
        welcomeHtml += ` You’re on the <b>${currentService.name}</b> page. Want a quick summary?`;
        initialChips = [
          "About this service",
          "Talk to an expert",
          "What services do you offer?",
        ];
      }

      setMessages([{ from: "bot", html: welcomeHtml, chips: initialChips }]);
      setChips(initialChips);
    }
  }, [pathname, messages.length]);

  // Teaser bubble timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setTeaserVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const localAnswers = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("service") || t.includes("offer")) {
      return {
        html: `We offer 8 specialized enterprise services:
<ul>
  <li><a href="/services/ibm-maximo">IBM Maximo Services</a></li>
  <li><a href="/services/mas-migration">MAS Migration (7.6 to MAS 9)</a></li>
  <li><a href="/services/enterprise-integration">Enterprise Integration</a></li>
  <li><a href="/services/cloud-infrastructure">Cloud & Infrastructure</a></li>
  <li><a href="/services/managed-support">Managed Support & AMS</a></li>
  <li><a href="/services/tririga">TRIRIGA Services</a></li>
  <li><a href="/services/mobile-development">Mobile Enablement</a></li>
  <li><a href="/services/consulting-advisory">Consulting & Advisory</a></li>
</ul>
Which one would you like to explore?`,
        chips: ["MAS migration", "Managed support", "Book a demo"],
      };
    }
    if (t.includes("ordova") || t.includes("transport") || t.includes("bus")) {
      return {
        html: `Ordova is go2ways’ intelligent transport management system for bus operators and transport authorities. It covers network and trip planning, live dispatch, depot maintenance, and AI recommendations. <a href="https://ordova.go2ways.com/" target="_blank" rel="noopener">Visit Ordova</a>.`,
        chips: ["Book a demo", "What services do you offer?"],
      };
    }
    if (t.includes("contact") || t.includes("phone") || t.includes("email") || t.includes("reach")) {
      return {
        html: `You can reach our team via:
<ul>
  <li>Email: <a href="mailto:support@go2ways.com">support@go2ways.com</a></li>
  <li>Phone: <a href="tel:+918826949739">+91 88269 49739</a></li>
  <li>Our <a href="/contact">Contact Form</a></li>
</ul>
We respond within 24 hours on business days.`,
        chips: ["Where is your office?", "What are your hours?", "Book a demo"],
      };
    }
    if (t.includes("location") || t.includes("address") || t.includes("office") || t.includes("where")) {
      return {
        html: `Our office is at 314a Sector 102, Gurugram, Haryana. <a href="https://www.google.com/maps/search/?api=1&query=314a+Sector+102+Gurugram+Haryana" target="_blank" rel="noopener">View on Google Maps</a>.`,
        chips: ["What are your hours?", "How do I contact you?"],
      };
    }
    if (t.includes("hour") || t.includes("time") || t.includes("open")) {
      return {
        html: `We are open Monday to Saturday, 9:00 AM – 6:00 PM (IST). Inquiries sent after hours are answered on the next business day.`,
        chips: ["How do I contact you?", "Book a demo"],
      };
    }
    if (t.includes("about") || t.includes("company") || t.includes("go2ways")) {
      return {
        html: `go2ways is an enterprise technology partner specializing in asset-intensive operations, IBM Maximo, MAS 9 migrations, TRIRIGA, and intelligent transport platforms.`,
        chips: ["What services do you offer?", "Who have you worked with?"],
      };
    }

    return {
      html: `I can help you with questions about our Maximo & MAS services, Ordova, industries, and contact details. For detailed inquiries, feel free to <a href="/contact">send us a message</a>!`,
      chips: ["What services do you offer?", "Tell me about Ordova", "How do I contact you?"],
    };
  };

  const handleSend = async (userText: string) => {
    const text = userText.trim();
    if (!text || isTyping) return;

    setInputVal("");
    setTeaserVisible(false);
    setChips([]);

    setMessages((prev) => [...prev, { from: "user", text }]);
    setIsTyping(true);

    try {
      const history = messages.slice(-8).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text || (m.html ? m.html.replace(/<[^>]+>/g, " ") : ""),
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, page: pathname }),
      });

      if (!res.ok) throw new Error("Fallback to local");

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data.reply, html: data.reply, chips: ["Book a demo", "What services do you offer?"] },
        ]);
        setChips(["Book a demo", "What services do you offer?"]);
      } else {
        throw new Error("Empty reply");
      }
    } catch {
      // Local fallback
      setTimeout(() => {
        const local = localAnswers(text);
        setMessages((prev) => [
          ...prev,
          { from: "bot", html: local.html, chips: local.chips },
        ]);
        setChips(local.chips);
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setChips([
      "What services do you offer?",
      "Tell me about Ordova",
      "How do I contact you?",
    ]);
  };

  if (!mounted) return null;

  return (
    <div className={`g2w-chat ${isOpen ? "is-open is-visible" : ""}`}>
      {teaserVisible && !isOpen && (
        <div className="chat-teaser show">
          <p onClick={() => setIsOpen(true)}>Questions about go2ways? Ask me.</p>
          <button
            type="button"
            className="chat-teaser-x"
            aria-label="Dismiss"
            onClick={() => setTeaserVisible(false)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}

      {isOpen && (
        <section
          className="chat-panel"
          id="g2w-chat-panel"
          role="dialog"
          aria-label="go2ways assistant"
        >
          <header className="chat-head">
            <span className="chat-avatar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
              </svg>
            </span>
            <div className="chat-title">
              <p className="chat-name">go2ways assistant</p>
              <p className="chat-status">
                <span className="dot" aria-hidden="true" />
                Answers instantly
              </p>
            </div>
            <button
              type="button"
              className="chat-icon-btn chat-reset"
              aria-label="Start a new conversation"
              title="New conversation"
              onClick={resetChat}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              type="button"
              className="chat-icon-btn chat-close"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div
            ref={logRef}
            className="chat-log"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-msg from-${m.from} is-new`}>
                <div
                  className="bubble"
                  dangerouslySetInnerHTML={{
                    __html: m.html || m.text || "",
                  }}
                />
              </div>
            ))}
            {isTyping && (
              <div className="chat-msg from-bot is-new chat-typing">
                <div className="bubble" aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <div className="chat-chips" aria-label="Suggested questions">
            {chips.map((chip, i) => (
              <button
                key={chip}
                type="button"
                className="chat-chip"
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => handleSend(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <form
            className="chat-form"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
          >
            <label className="sr-only" htmlFor="g2w-chat-input">
              Ask a question
            </label>
            <input
              id="g2w-chat-input"
              type="text"
              maxLength={300}
              placeholder="Ask about services, products, contact…"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" className="chat-send" aria-label="Send">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </form>

          <p className="chat-note">
            AI assistant. For urgent inquiries,{" "}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              contact our team
            </Link>
            .
          </p>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        aria-label={isOpen ? "Close chat" : "Open chat with the go2ways assistant"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="chat-launcher-avatar">
          <span className="ic ic-open">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
              <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
            </svg>
          </span>
          <span className="ic ic-close">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </span>
        </span>
        <span className="chat-launcher-label" aria-hidden="true">
          Ask go2ways
        </span>
      </button>
    </div>
  );
}

