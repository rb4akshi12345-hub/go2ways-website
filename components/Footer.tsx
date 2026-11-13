import React from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";

export default function Footer() {
  const featuredServices = SERVICES.filter((s) =>
    ["ibm-maximo", "mas-migration", "managed-support", "consulting-advisory"].includes(
      s.slug
    )
  );

  return (
    <footer className="site-footer container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" aria-label="go2ways home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/footer-logo.png"
              alt="go2ways"
              width={144}
              height={30}
            />
          </Link>
          <p>Intelligent AI assistants for modern businesses.</p>
        </div>

        <div className="footer-cols">
          <div>
            <h4>Services</h4>
            <ul>
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Product</h4>
            <ul>
              <li>
                <a
                  href="https://ordova.go2ways.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ordova
                </a>
              </li>
              <li>
                <Link href="/#how">How it Works</Link>
              </li>
              <li>
                <Link href="/services#solution">Solution</Link>
              </li>
              <li>
                <Link href="/#features">Integrations</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li>
                <span style={{ cursor: "pointer", color: "inherit" }}>Blog</span>
              </li>
              <li>
                <span style={{ cursor: "pointer", color: "inherit" }}>Docs</span>
              </li>
              <li>
                <Link href="/industries#sectors">Case studies</Link>
              </li>
              <li>
                <Link href="/contact#faq">Help center</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/industries">About</Link>
              </li>
              <li>
                <span style={{ cursor: "pointer", color: "inherit" }}>Careers</span>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <span style={{ cursor: "pointer", color: "inherit" }}>Press</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 go2ways. All rights reserved.</p>
        <ul>
          <li>
            <span style={{ cursor: "pointer", color: "inherit" }}>Privacy</span>
          </li>
          <li>
            <span style={{ cursor: "pointer", color: "inherit" }}>Terms</span>
          </li>
          <li>
            <span style={{ cursor: "pointer", color: "inherit" }}>Cookies</span>
          </li>
        </ul>
      </div>
    </footer>
  );
}

