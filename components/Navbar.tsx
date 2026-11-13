"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES, PRODUCTS } from "@/data/services";
import Icon from "./Icon";

export default function Navbar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);

  // Close menus on route change
  useEffect(() => {
    setNavOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Scroll listener for header shadow & auto-hide
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);
      const goingDown = y > lastYRef.current + 4;
      const goingUp = y < lastYRef.current - 4;

      if (goingDown && y > 420 && !navOpen && !openMenu) {
        setIsHidden(true);
      } else if (goingUp || y < 420) {
        setIsHidden(false);
      }
      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navOpen, openMenu]);

  // Escape key listener to close menus
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const isServicesActive = pathname.startsWith("/services");
  const isCompanyActive = pathname === "/industries";
  const isHomeActive = pathname === "/";

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : ""} ${
        isHidden ? "is-hidden" : ""
      }`}
    >
      <div className="bar">
        <Link className="brand" href="/" aria-label="go2ways home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/logo.png" alt="go2ways" width={125} height={35} />
        </Link>

        <nav className="main-nav" aria-label="Main">
          <ul className="nav-list">
            <li>
              <Link href="/" aria-current={isHomeActive ? "page" : undefined}>
                Software
              </Link>
            </li>
            <li>
              <Link href="/services#how-we-work">Consulting</Link>
            </li>
            <li>
              <Link href="/contact#faq">Support</Link>
            </li>
            <li>
              <Link
                href="/industries"
                aria-current={isCompanyActive ? "page" : undefined}
              >
                Company
              </Link>
            </li>

            {/* Services Dropdown */}
            <li className={`has-menu ${openMenu === "services" ? "open" : ""}`}>
              <button
                className="menu-btn"
                type="button"
                aria-expanded={openMenu === "services"}
                aria-controls="menu-services"
                data-current={isServicesActive ? "" : undefined}
                onClick={() => toggleMenu("services")}
              >
                Services
                <svg
                  className="chev"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 4.5 6 7.5 9 4.5" />
                </svg>
              </button>
              <div className="menu-panel menu-wide" id="menu-services">
                <div className="menu-inner">
                  <ul className="menu-grid">
                    {SERVICES.map((s, i) => (
                      <li key={s.slug} style={{ "--i": i } as React.CSSProperties}>
                        <Link
                          className="menu-item"
                          href={`/services/${s.slug}`}
                          aria-current={
                            pathname === `/services/${s.slug}` ? "page" : undefined
                          }
                        >
                          <span className="mi-icon">
                            <Icon name={s.icon} />
                          </span>
                          <span className="mi-text">
                            <span className="mi-title">{s.name}</span>
                            <span className="mi-desc">{s.nav}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="menu-foot" href="/services">
                    See how we work <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </li>

            {/* Products Dropdown */}
            <li className={`has-menu ${openMenu === "products" ? "open" : ""}`}>
              <button
                className="menu-btn"
                type="button"
                aria-expanded={openMenu === "products"}
                aria-controls="menu-products"
                onClick={() => toggleMenu("products")}
              >
                Products
                <svg
                  className="chev"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 4.5 6 7.5 9 4.5" />
                </svg>
              </button>
              <div className="menu-panel" id="menu-products">
                <div className="menu-inner">
                  <ul className="menu-grid">
                    {PRODUCTS.map((p, i) => (
                      <li key={p.name} style={{ "--i": i } as React.CSSProperties}>
                        {p.href ? (
                          <a
                            className="menu-item"
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="mi-icon">
                              <Icon name={p.icon} />
                            </span>
                            <span className="mi-text">
                              <span className="mi-title">
                                {p.name}
                                <svg
                                  className="ext"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d="M14 4h6v6M20 4l-9 9" />
                                  <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                                </svg>
                              </span>
                              <span className="mi-desc">{p.desc}</span>
                            </span>
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <span className="menu-item is-soon" aria-disabled="true">
                            <span className="mi-icon">
                              <Icon name={p.icon} />
                            </span>
                            <span className="mi-text">
                              <span className="mi-title">
                                {p.name}
                                <span className="soon-badge">Coming soon</span>
                              </span>
                              <span className="mi-desc">{p.desc}</span>
                            </span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            <li className="mobile-cta">
              <Link href="/contact">Get In Touch</Link>
            </li>
          </ul>
        </nav>

        <Link className="btn btn-primary header-cta" href="/contact">
          Get In Touch
        </Link>

        <button
          className="nav-toggle"
          aria-label="Menu"
          aria-expanded={navOpen}
          onClick={() => {
            setNavOpen((prev) => !prev);
            document.documentElement.classList.toggle("nav-open", !navOpen);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
