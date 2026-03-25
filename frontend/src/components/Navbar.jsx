import React, { useEffect, useState } from "react";
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
      { key: "marketing", label: "Marketing & Marque", href: "/marketing-brand", type: "route" },
      { key: "technology", label: "Technologie", href: "/technology", type: "route" },
      { key: "portfolio", label: "Portfolio", href: "/portfolio", type: "route" },
      { key: "process", label: "Processus", href: "/process",  type: "route"},
      { key: "about", label: "À propos", href: "/about", type: "route" },
    ],
  },
  en: {
    brand: "Technology & Marketing",
    contact: "Contact",
    languageLabel: "Language",
    navItems: [
      { key: "home", label: "Home", href: "/", type: "route"},
      { key: "marketing", label: "Marketing & Brand", href: "/marketing-brand", type: "route" },
      { key: "technology", label: "Technology", href: "/technology", type: "route" },
      { key: "portfolio", label: "Portfolio", href: "/portfolio",  type: "route" },
      { key: "process", label: "Process", href: "/process", type: "route"},
      { key: "about", label: "About", href: "/about", type: "route" },
    ],
  },
};

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBottomNavbar, setShowBottomNavbar] = useState(false);

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
  };

  useEffect(() => {
    const matchedRouteItem = c.navItems.find(
      (item) => item.type === "route" && item.href === location.pathname
    );

    if (matchedRouteItem) {
      setActiveItem(matchedRouteItem.key);
      return;
    }

    if (location.pathname === "/") {
      const hash = location.hash || "#home";
      const matchedAnchorItem = c.navItems.find(
        (item) => item.type === "anchor" && item.href === hash
      );

      setActiveItem(matchedAnchorItem?.key || "home");
      return;
    }

    setActiveItem("");
  }, [location.pathname, location.hash, c.navItems]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("[data-page-hero]");

      if (!heroSection) {
        setShowBottomNavbar(false);
        return;
      }

      const isDesktop = window.innerWidth >= 1280;

      if (!isDesktop) {
        setShowBottomNavbar(false);
        return;
      }

      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const currentScroll = window.scrollY + 100;

      setShowBottomNavbar(currentScroll >= heroBottom);
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
        <Link
          key={item.key}
          to={item.href}
          onClick={() => handleNavClick(item.key)}
          className={finalClassName}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={item.key}
        href={getResolvedHref(item)}
        onClick={() => handleNavClick(item.key)}
        className={finalClassName}
      >
        {item.label}
      </a>
    );
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-4 transition-all duration-500 sm:px-4 sm:pt-5 md:px-6 md:pt-8 lg:px-8 lg:pt-10 ${
          showBottomNavbar
            ? "xl:pointer-events-none xl:-translate-y-10 xl:opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex min-w-0 items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-3 py-3 shadow-xl backdrop-blur-xl sm:px-4 sm:py-3.5 lg:px-6">
            <Link
              to="/"
              className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
              onClick={() => handleNavClick("home")}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f9f9f9] shadow-md sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <img
                  src={logo}
                  alt="Basogol Hive"
                  className="h-8 w-auto object-contain sm:h-10 lg:h-12"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white sm:text-base">
                  Basogol-Hive
                </p>
              </div>
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-2 py-2 xl:mx-6 xl:flex">
              {c.navItems.map((item) =>
                renderNavItem(
                  item,
                  (isActive) =>
                    `rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 text-white shadow-md"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`
                )
              )}
            </nav>

            <div className="hidden shrink-0 items-center gap-3 xl:flex">
              <div className="flex items-center rounded-xl border border-white/20 bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    lang === "fr"
                      ? "bg-white text-slate-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  FR
                </button>

                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    lang === "en"
                      ? "bg-white text-slate-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>

              <Link
                to={contactHref}
                className="rounded-xl border border-white/20 bg-[#206687]/90 px-5 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-xl"
              >
                {c.contact}
              </Link>
            </div>

            <div className="hidden shrink-0 items-center gap-2 md:flex xl:hidden">
              <div className="flex items-center rounded-xl border border-white/20 bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition sm:px-3 sm:text-sm ${
                    lang === "fr"
                      ? "bg-white text-slate-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  FR
                </button>

                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition sm:px-3 sm:text-sm ${
                    lang === "en"
                      ? "bg-white text-slate-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>

              <Link
                to={contactHref}
                className="rounded-xl border border-white/20 bg-[#206687]/90 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-xl lg:px-4 lg:py-2.5 lg:text-sm"
              >
                {c.contact}
              </Link>

              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 lg:h-11 lg:w-11"
                aria-label="Open menu"
              >
                <div className="space-y-1.5">
                  <span className="block h-0.5 w-5 bg-white" />
                  <span className="block h-0.5 w-5 bg-white" />
                  <span className="block h-0.5 w-5 bg-white" />
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:hidden"
              aria-label="Open menu"
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
              </div>
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "mt-3 max-h-[650px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="w-full rounded-2xl border border-white/20 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-xl xl:hidden">
              <nav className="flex flex-col gap-2">
                {c.navItems.map((item) =>
                  renderNavItem(
                    item,
                    (isActive) =>
                      `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "border border-white/15 bg-white/10 text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`
                  )
                )}
              </nav>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                  {c.languageLabel}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLang("fr")}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      lang === "fr"
                        ? "bg-white text-slate-900"
                        : "border border-white/20 text-white"
                    }`}
                  >
                    FR
                  </button>

                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      lang === "en"
                        ? "bg-white text-slate-900"
                        : "border border-white/20 text-white"
                    }`}
                  >
                    EN
                  </button>
                </div>

                <Link
                  to={contactHref}
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 block rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-xl"
                >
                  {c.contact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 xl:block transition-all duration-500 ${
          showBottomNavbar
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-10 opacity-0"
        }`}
      >
        <style>{`
          .bn-wrap {
            background: rgba(12, 42, 62, 0.92);
            backdrop-filter: blur(22px) saturate(165%);
            -webkit-backdrop-filter: blur(22px) saturate(165%);
            border: 1px solid rgba(31,108,140,0.40);
            box-shadow:
              0 8px 32px rgba(0,0,0,0.20),
              0 2px 8px rgba(31,108,140,0.25),
              0 1px 0 rgba(255,255,255,0.06) inset;
          }
          .bn-item {
            position: relative;
            padding: 7px 14px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
            transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
            color: rgba(255,255,255,0.70);
          }
          .bn-item:hover {
            color: #fff;
            background: rgba(255,255,255,0.08);
          }
          .bn-item.active {
            color: #fff;
            background: rgba(255,255,255,0.12);
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
          }
          .bn-item.active::after {
            content: "";
            position: absolute;
            bottom: 3px;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #58b4da;
          }
          .bn-sep {
            width: 1px;
            height: 20px;
            background: rgba(255,255,255,0.12);
            flex-shrink: 0;
          }
          .bn-lang-wrap {
            display: flex;
            align-items: center;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.10);
            border-radius: 9px;
            padding: 3px;
            gap: 2px;
          }
          .bn-lang-btn {
            padding: 4px 10px;
            border-radius: 7px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.06em;
            transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
            color: rgba(255,255,255,0.45);
          }
          .bn-lang-btn:hover {
            color: rgba(255,255,255,0.85);
          }
          .bn-lang-btn.active {
            background: rgba(255,255,255,0.88);
            color: #0e5f82;
            box-shadow: 0 1px 6px rgba(0,0,0,0.15);
          }
          .bn-contact {
            background: linear-gradient(135deg, #1f6c8c, #2a90b8);
            border: 1px solid rgba(255,255,255,0.20);
            box-shadow: 0 4px 14px rgba(31,108,140,0.40), 0 1px 0 rgba(255,255,255,0.15) inset;
            padding: 7px 18px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            white-space: nowrap;
            letter-spacing: 0.04em;
            transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
          }
          .bn-contact:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 22px rgba(31,108,140,0.50), 0 1px 0 rgba(255,255,255,0.20) inset;
          }
        `}</style>

        <div className="bn-wrap flex items-center gap-1 rounded-[16px] px-2.5 py-2">
          {c.navItems.map((item) =>
            renderNavItem(
              item,
              (isActive) => `bn-item ${isActive ? "active" : ""}`
            )
          )}

          <div className="bn-sep mx-1" />

          <div className="bn-lang-wrap">
            <button
              type="button"
              onClick={() => setLang("fr")}
              className={`bn-lang-btn ${lang === "fr" ? "active" : ""}`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`bn-lang-btn ${lang === "en" ? "active" : ""}`}
            >
              EN
            </button>
          </div>

          <div className="bn-sep mx-1" />

          <Link
            to={contactHref}
            className="bn-contact"
            style={{ fontFamily: "Literata, serif" }}
          >
            {c.contact}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;