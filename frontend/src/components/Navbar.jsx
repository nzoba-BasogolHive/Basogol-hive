import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/icon.png";
import { useLanguage } from "./LanguageContext";

const navContent = {
  fr: {
    brand: "Technologie & Marketing",
    contact: "Contact",
    languageLabel: "Langue",
    navItems: [
      { key: "home", label: "Accueil", href: "/", type: "route" },
      { key: "marketing", label: "Marketing & Brand", href: "/marketing-brand", type: "route" },
      { key: "technology", label: "Technologie", href: "/technology", type: "route" },
      { key: "portfolio", label: "Portfolio", href: "/portfolio", type: "route" },
      { key: "process", label: "Processus", href: "/process", type: "route" },
      { key: "about", label: "À propos", href: "/about", type: "route" },
    ],
  },
  en: {
    brand: "Technology & Marketing",
    contact: "Contact",
    languageLabel: "Language",
    navItems: [
      { key: "home", label: "Home", href: "/", type: "route" },
      { key: "marketing", label: "Marketing & Brand", href: "/marketing-brand", type: "route" },
      { key: "technology", label: "Technology", href: "/technology", type: "route" },
      { key: "portfolio", label: "Portfolio", href: "/portfolio", type: "route" },
      { key: "process", label: "Process", href: "/process", type: "route" },
      { key: "about", label: "About", href: "/about", type: "route" },
    ],
  },
};

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);   // tablette dropdown
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer
  const [showBottomNavbar, setShowBottomNavbar] = useState(false);
  const [triggerPulsed, setTriggerPulsed] = useState(false);
  const drawerRef = useRef(null);

  const { lang, setLang } = useLanguage();
  const c = navContent[lang];
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const contactHref = "/contact";

  const getResolvedHref = (item) => {
    if (item.type === "route") return item.href;
    return isHomePage ? item.href : `/${item.href}`;
  };

  const handleNavClick = (itemKey) => {
    setActiveItem(itemKey);
    setIsMenuOpen(false);
    setIsMobileOpen(false);
  };

  // Pulse au montage
  useEffect(() => {
    const t1 = setTimeout(() => setTriggerPulsed(true), 800);
    const t2 = setTimeout(() => setTriggerPulsed(false), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Fermer drawer mobile si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsMobileOpen(false);
      }
    };
    if (isMobileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileOpen]);

  // Active item selon route
  useEffect(() => {
    const navContext = location.state?.navContext;
    if (navContext === "portfolio") { setActiveItem("portfolio"); return; }

    const matched = c.navItems.find(
      (item) => item.type === "route" && item.href === location.pathname
    );
    if (matched) { setActiveItem(matched.key); return; }

    const matchedPrefix = c.navItems.find(
      (item) => item.type === "route" && item.href !== "/" && location.pathname.startsWith(`${item.href}/`)
    );
    if (matchedPrefix) { setActiveItem(matchedPrefix.key); return; }

    if (location.pathname === "/") {
      const hash = location.hash || "#home";
      const matchedAnchor = c.navItems.find(
        (item) => item.type === "anchor" && item.href === hash
      );
      setActiveItem(matchedAnchor?.key || "home");
      return;
    }
    setActiveItem("");
  }, [location.pathname, location.hash, location.state, c.navItems]);

  // Bottom navbar desktop
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("[data-page-hero]");
      if (!heroSection) { setShowBottomNavbar(false); return; }
      const isDesktop = window.innerWidth >= 1280;
      if (!isDesktop) { setShowBottomNavbar(false); return; }
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      setShowBottomNavbar(window.scrollY + 100 >= heroBottom);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  const renderNavItem = (item, getClassName) => {
    const isActive = item.key === activeItem;
    const finalClassName = getClassName(isActive);
    if (item.type === "route") {
      return (
        <Link key={item.key} to={item.href} onClick={() => handleNavClick(item.key)} className={finalClassName}>
          {item.label}
        </Link>
      );
    }
    return (
      <a key={item.key} href={getResolvedHref(item)} onClick={() => handleNavClick(item.key)} className={finalClassName}>
        {item.label}
      </a>
    );
  };

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════════
           MOBILE DRAWER — uniquement < 768px
        ═══════════════════════════════════════════ */
        @media (max-width: 767px) {
          .nb-mob-trigger {
            position: fixed; top: 18px; left: 18px; z-index: 60;
            display: flex; align-items: center; gap: 10px;
            padding: 8px 14px 8px 10px; border-radius: 999px;
            background: rgba(12, 42, 62, 0.82);
            border: 1px solid rgba(31,108,140,0.55);
            box-shadow: 0 4px 18px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.07) inset;
            backdrop-filter: blur(18px) saturate(160%);
            -webkit-backdrop-filter: blur(18px) saturate(160%);
            cursor: pointer; user-select: none;
            transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .nb-mob-trigger:hover {
            background: rgba(31,108,140,0.75); border-color: rgba(88,180,218,0.60);
            box-shadow: 0 6px 24px rgba(31,108,140,0.35), 0 1px 0 rgba(255,255,255,0.10) inset;
          }
          .nb-mob-trigger:active { transform: scale(0.97); }

          .nb-mob-logo {
            width: 30px; height: 30px; border-radius: 8px; background: #ffffff;
            box-shadow: 0 1px 6px rgba(0,0,0,0.15);
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; flex-shrink: 0;
          }
          .nb-mob-logo img { width: 20px; height: 20px; object-fit: contain; }

          .nb-mob-icon { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
          .nb-mob-icon span {
            display: block; height: 2px; border-radius: 2px;
            background: rgba(255,255,255,0.85);
            transition: all 0.35s cubic-bezier(0.22,1,0.36,1); transform-origin: center;
          }
          .nb-mob-icon span:nth-child(1) { width: 18px; }
          .nb-mob-icon span:nth-child(2) { width: 13px; }
          .nb-mob-icon span:nth-child(3) { width: 18px; }

          @keyframes mobPulse {
            0%   { box-shadow: 0 4px 18px rgba(0,0,0,0.22), 0 0 0 0 rgba(31,108,140,0.70); }
            50%  { box-shadow: 0 4px 18px rgba(0,0,0,0.22), 0 0 0 10px rgba(31,108,140,0); }
            100% { box-shadow: 0 4px 18px rgba(0,0,0,0.22), 0 0 0 0 rgba(31,108,140,0); }
          }
          .nb-mob-trigger.pulsing { animation: mobPulse 0.9s ease-out 2; }

          .nb-mob-backdrop {
            position: fixed; inset: 0; z-index: 55;
            background: rgba(5, 18, 30, 0.55);
            backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
            opacity: 0; pointer-events: none; transition: opacity 0.38s ease;
          }
          .nb-mob-backdrop.open { opacity: 1; pointer-events: all; }

          .nb-mob-drawer {
            position: fixed; top: 0; left: 0; bottom: 0; z-index: 58;
            width: min(82vw, 300px);
            background: rgba(8, 30, 46, 0.96);
            border-right: 1px solid rgba(31,108,140,0.35);
            box-shadow: 6px 0 40px rgba(0,0,0,0.35);
            backdrop-filter: blur(24px) saturate(170%); -webkit-backdrop-filter: blur(24px) saturate(170%);
            transform: translateX(-105%);
            transition: transform 0.42s cubic-bezier(0.22,1,0.36,1);
            display: flex; flex-direction: column; overflow: hidden;
          }
          .nb-mob-drawer.open { transform: translateX(0); }
          .nb-mob-drawer::before {
            content: ""; position: absolute; top: -80px; left: -80px;
            width: 260px; height: 260px; border-radius: 999px;
            background: radial-gradient(circle, rgba(31,108,140,0.22) 0%, transparent 70%);
            pointer-events: none;
          }

          .nb-mob-deco {
            position: absolute; top: 0; left: 0; right: 0; height: 2px;
            background: linear-gradient(90deg, transparent, #1f6c8c, #58b4da, transparent);
            opacity: 0.7;
          }

          .nb-mob-head {
            display: flex; align-items: center; justify-content: space-between;
            gap: 12px; padding: 22px 20px 18px;
            border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0;
          }
          .nb-mob-brand-logo {
            width: 40px; height: 40px; border-radius: 11px; background: #ffffff;
            border: 1px solid rgba(255,255,255,0.20); box-shadow: 0 1px 6px rgba(0,0,0,0.15);
            display: flex; align-items: center; justify-content: center; overflow: hidden;
          }
          .nb-mob-brand-logo img { width: 26px; height: 26px; object-fit: contain; }
          .nb-mob-brand-name { font-size: 15px; font-weight: 700; color: #fff; }
          .nb-mob-brand-sub {
            font-size: 10px; font-weight: 500; color: rgba(255,255,255,0.40);
            letter-spacing: 0.08em; text-transform: uppercase; margin-top: 1px;
          }
          .nb-mob-close {
            width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
            background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.10);
            display: flex; align-items: center; justify-content: center;
            color: rgba(255,255,255,0.60); cursor: pointer; transition: all 0.22s ease;
          }
          .nb-mob-close:hover { background: rgba(255,255,255,0.14); color: #fff; }

          .nb-mob-nav {
            flex: 1; overflow-y: auto; padding: 14px 12px;
            display: flex; flex-direction: column; gap: 3px;
          }
          .nb-mob-nav::-webkit-scrollbar { width: 0; }
          .nb-mob-item {
            display: flex; align-items: center; gap: 12px;
            padding: 11px 14px; border-radius: 12px;
            font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.65);
            transition: all 0.26s cubic-bezier(0.22,1,0.36,1);
            position: relative; text-decoration: none;
          }
          .nb-mob-item:hover { color: #fff; background: rgba(255,255,255,0.07); }
          .nb-mob-item.active {
            color: #fff; background: rgba(31,108,140,0.25);
            border: 1px solid rgba(31,108,140,0.30);
          }
          .nb-mob-item.active::before {
            content: ""; position: absolute; left: 0; top: 50%;
            transform: translateY(-50%); width: 3px; height: 60%;
            border-radius: 0 3px 3px 0;
            background: linear-gradient(to bottom, #58b4da, #1f6c8c);
          }
          .nb-mob-num {
            font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.20);
            letter-spacing: 0.08em; min-width: 18px;
          }
          .nb-mob-item.active .nb-mob-num { color: rgba(88,180,218,0.60); }

          .nb-mob-footer {
            padding: 16px 14px 24px; border-top: 1px solid rgba(255,255,255,0.06);
            display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
          }
          .nb-mob-lang { display: flex; gap: 6px; align-items: center; }
          .nb-mob-lang-label {
            font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.30);
            letter-spacing: 0.12em; text-transform: uppercase; margin-right: 4px;
          }
          .nb-mob-lang-btn {
            padding: 5px 13px; border-radius: 8px; font-size: 11px; font-weight: 700;
            letter-spacing: 0.06em; border: 1px solid rgba(255,255,255,0.12);
            color: rgba(255,255,255,0.45); transition: all 0.24s ease;
            background: transparent; cursor: pointer;
          }
          .nb-mob-lang-btn:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
          .nb-mob-lang-btn.active {
            background: rgba(255,255,255,0.90); color: #0e5f82;
            border-color: transparent; box-shadow: 0 2px 8px rgba(0,0,0,0.18);
          }
          .nb-mob-contact {
            display: block; text-align: center; padding: 12px; border-radius: 12px;
            font-size: 13px; font-weight: 700; color: #fff;
            background: linear-gradient(135deg, #1f6c8c, #2a90b8);
            border: 1px solid rgba(255,255,255,0.18);
            box-shadow: 0 4px 16px rgba(31,108,140,0.35);
            text-decoration: none; letter-spacing: 0.04em;
            transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
          }
          .nb-mob-contact:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(31,108,140,0.50); }
        }

        /* ═══════════════════════════════════════════
           BOTTOM NAVBAR DESKTOP
        ═══════════════════════════════════════════ */
        .bn-wrap {
          background: rgba(12, 42, 62, 0.92);
          backdrop-filter: blur(22px) saturate(165%); -webkit-backdrop-filter: blur(22px) saturate(165%);
          border: 1px solid rgba(31,108,140,0.40);
          box-shadow: 0 8px 32px rgba(0,0,0,0.20), 0 2px 8px rgba(31,108,140,0.25), 0 1px 0 rgba(255,255,255,0.06) inset;
        }
        .bn-item {
          position: relative; padding: 7px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 600; white-space: nowrap;
          transition: all 0.28s cubic-bezier(0.22,1,0.36,1); color: rgba(255,255,255,0.70);
        }
        .bn-item:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .bn-item.active { color: #fff; background: rgba(255,255,255,0.12); box-shadow: 0 2px 10px rgba(0,0,0,0.15); }
        .bn-item.active::after {
          content: ""; position: absolute; bottom: 3px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px; border-radius: 50%; background: #58b4da;
        }
        .bn-sep { width: 1px; height: 20px; background: rgba(255,255,255,0.12); flex-shrink: 0; }
        .bn-lang-wrap {
          display: flex; align-items: center; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10); border-radius: 9px; padding: 3px; gap: 2px;
        }
        .bn-lang-btn {
          padding: 4px 10px; border-radius: 7px; font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          color: rgba(255,255,255,0.45); background: transparent; border: none; cursor: pointer;
        }
        .bn-lang-btn:hover { color: rgba(255,255,255,0.85); }
        .bn-lang-btn.active { background: rgba(255,255,255,0.88); color: #0e5f82; box-shadow: 0 1px 6px rgba(0,0,0,0.15); }
        .bn-contact {
          background: linear-gradient(135deg, #1f6c8c, #2a90b8);
          border: 1px solid rgba(255,255,255,0.20);
          box-shadow: 0 4px 14px rgba(31,108,140,0.40), 0 1px 0 rgba(255,255,255,0.15) inset;
          padding: 7px 18px; border-radius: 10px; font-size: 12px; font-weight: 700; color: #fff;
          white-space: nowrap; letter-spacing: 0.04em; text-decoration: none;
          transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        .bn-contact:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(31,108,140,0.50), 0 1px 0 rgba(255,255,255,0.20) inset; }
      `}</style>

      {/* ══════════════════════════════════
          MOBILE DRAWER (< 768px seulement)
      ══════════════════════════════════ */}
      <button
        type="button"
        aria-label="Ouvrir le menu"
        onClick={() => setIsMobileOpen(true)}
        className={`nb-mob-trigger md:hidden${triggerPulsed && !isMobileOpen ? " pulsing" : ""}`}
        style={{
          opacity: isMobileOpen ? 0 : 1,
          pointerEvents: isMobileOpen ? "none" : "auto",
          transform: isMobileOpen ? "translateX(-24px)" : "translateX(0)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        <div className="nb-mob-logo">
          <img src={logo} alt="Basogol" />
        </div>
        <div className="nb-mob-icon">
          <span /><span /><span />
        </div>
      </button>

      <div
        className={`nb-mob-backdrop md:hidden${isMobileOpen ? " open" : ""}`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div
        ref={drawerRef}
        className={`nb-mob-drawer md:hidden${isMobileOpen ? " open" : ""}`}
      >
        <div className="nb-mob-deco" />
        <div className="nb-mob-head">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
            <div className="nb-mob-brand-logo">
              <img src={logo} alt="Basogol" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="nb-mob-brand-name" translate="no">Basogol-Hive</div>
              <div className="nb-mob-brand-sub">Tech & Studio créatif</div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsMobileOpen(false)}
            className="nb-mob-close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="nb-mob-nav" translate="no">
          {c.navItems.map((item, i) => {
            const isActive = item.key === activeItem;
            if (item.type === "route") {
              return (
                <Link key={item.key} to={item.href} onClick={() => handleNavClick(item.key)}
                  className={`nb-mob-item${isActive ? " active" : ""}`}>
                  <span className="nb-mob-num">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              );
            }
            return (
              <a key={item.key} href={getResolvedHref(item)} onClick={() => handleNavClick(item.key)}
                className={`nb-mob-item${isActive ? " active" : ""}`}>
                <span className="nb-mob-num">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="nb-mob-footer">
          <div className="nb-mob-lang">
            <span className="nb-mob-lang-label">{c.languageLabel}</span>
            <button type="button" onClick={() => setLang("fr")}
              className={`nb-mob-lang-btn${lang === "fr" ? " active" : ""}`}>FR</button>
            <button type="button" onClick={() => setLang("en")}
              className={`nb-mob-lang-btn${lang === "en" ? " active" : ""}`}>EN</button>
          </div>
          <Link to={contactHref} onClick={() => setIsMobileOpen(false)}
            className="nb-mob-contact" style={{ fontFamily: "Literata, serif" }}>
            {c.contact}
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════
          TABLETTE + DESKTOP — 100% original
      ══════════════════════════════════ */}
  

      {/* ══════════════════════════════════
          DESKTOP bottom navbar
      ══════════════════════════════════ */}
      <div
        className={`fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 xl:block transition-all duration-500 notranslate`}
        translate="no"
        style={{
          transform: `translateX(-50%) translateY(${showBottomNavbar ? "0" : "40px"})`,
          opacity: showBottomNavbar ? 1 : 0,
          pointerEvents: showBottomNavbar ? "auto" : "none",
        }}
      >
        <div className="bn-wrap flex items-center gap-1 rounded-[16px] px-2.5 py-2">
          {c.navItems.map((item) =>
            renderNavItem(item, (isActive) => `bn-item ${isActive ? "active" : ""}`)
          )}
          <div className="bn-sep mx-1" />
          <div className="bn-lang-wrap">
            <button type="button" onClick={() => setLang("fr")} className={`bn-lang-btn ${lang === "fr" ? "active" : ""}`}>FR</button>
            <button type="button" onClick={() => setLang("en")} className={`bn-lang-btn ${lang === "en" ? "active" : ""}`}>EN</button>
          </div>
          <div className="bn-sep mx-1" />
          <Link to={contactHref} className="bn-contact" style={{ fontFamily: "Literata, serif" }}>{c.contact}</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
