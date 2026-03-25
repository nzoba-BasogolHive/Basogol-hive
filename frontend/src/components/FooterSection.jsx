import React, { useEffect, useRef, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Send,
} from "lucide-react";
import logo from "../assets/basogollogo.png";
import leftTopMain from "../assets/Untitled.png";
import leftBottomShape from "../assets/Untitlevcwevabd.png";
import rightShape from "../assets/Untitlevabd.png";
import { useLanguage } from "./LanguageContext";

const translations = {
  fr: {
    brandSubtitle: "Tech & studio Creatif",
    navLinks: [
      { label: "Accueil", href: "/" },
      { label: "Marketing & Brand", href: "/marketing-brand" },
      { label: "Technologie", href: "/technology" },
      { label: "Processus", href: "/process" },
      { label: "À propos", href: "/about" },
    ],
    marketingTitle: "Marketing & Brand",
    marketingItems: [
      "Stratégie de marque & positionnement",
      "Recherche & insights",
      "Identité visuelle & branding",
      "Design produit & expérience (UI/UX)",
      "Web design & développement",
      "Stratégie de contenu & direction créative",
    ],
    technologyTitle: "Technologie",
    technologyItems: [
      "UX/UI & design systems",
      "Sites web & plateformes",
      "Développement full-stack & applications métier",
      "Solutions transport, logistique & B2B",
      "Audit, optimisation & qualité",
    ],
    inputPlaceholder: "entrez votre email",
    newsletterText: "Abonnez-vous à notre newsletter",
    subscribeButton: "S'abonner",
    socialLinks: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    bottomLinks: [
      { label: "Email", href: "mailto:contact@basogol.com" },
      { label: "WhatsApp", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    copyright: "© 20100 Basogol-Hive. Tous droits réservés.",
  },
  en: {
    brandSubtitle: "Tech & Creative studio",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "Marketing & Brand", href: "/marketing-brand" },
      { label: "Technology", href: "/technology" },
      { label: "Process", href: "/process" },
      { label: "About", href: "/about" },
    ],
    marketingTitle: "Marketing & Brand",
    marketingItems: [
      "Brand strategy & positioning",
      "Research & insights",
      "Visual identity & branding",
      "Product & experience design (UI/UX)",
      "Web design & development",
      "Content strategy & creative direction",
    ],
    technologyTitle: "Technology",
    technologyItems: [
      "UX/UI & design systems",
      "Websites & platforms",
      "Full-stack development & business applications",
      "Transport, logistics & B2B solutions",
      "Audit, optimisation & quality",
    ],
    inputPlaceholder: "enter your email",
    newsletterText: "Subscribe to our newsletter",
    subscribeButton: "Subscribe",
    socialLinks: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
    bottomLinks: [
      { label: "Email", href: "mailto:contact@basogol.com" },
      { label: "WhatsApp", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    copyright: "© 20100 Basogol-Hive. All rights reserved.",
  },
};

const socialIcons = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Email: Mail,
  WhatsApp: Send,
  YouTube: Youtube,
};

const FooterSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const footerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(135deg, #1a5f7a 0%, #1f739b 45%, #1a6688 100%)",
      }}
    >
      <style>{`
        /* ── Animations formes ── */
        @keyframes shapeFloatLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33%       { transform: translateY(-12px) rotate(1.2deg) scale(1.015); }
          66%       { transform: translateY(6px) rotate(-0.8deg) scale(0.988); }
        }
        @keyframes shapeFloatRight {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33%       { transform: translateY(10px) rotate(-1deg) scale(1.012); }
          66%       { transform: translateY(-8px) rotate(0.6deg) scale(0.992); }
        }
        @keyframes shapeFloatBottom {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50%       { transform: translateX(-8px) translateY(-6px); }
        }

        .shape-left-top {
          animation: shapeFloatLeft 9s ease-in-out infinite;
          transform-origin: center center;
        }
        .shape-left-bottom {
          animation: shapeFloatBottom 11s ease-in-out infinite;
          transform-origin: bottom left;
        }
        .shape-right {
          animation: shapeFloatRight 10s ease-in-out infinite;
          transform-origin: bottom right;
        }

        /* Entrée au scroll */
        .footer-entry {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Colonnes avec délai cascade */
        .footer-col-1 { transition-delay: 0.05s; }
        .footer-col-2 { transition-delay: 0.15s; }
        .footer-col-3 { transition-delay: 0.25s; }
        .footer-col-4 { transition-delay: 0.35s; }

        /* Divider dégradé */
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent);
        }

        /* Titre colonne — ligne décorative */
        .footer-col-title {
          position: relative;
          padding-bottom: 10px;
        }
        .footer-col-title::after {
          content: "";
          position: absolute;
          bottom: 0; left: 0;
          width: 28px; height: 2px;
          border-radius: 999px;
          background: rgba(255,255,255,0.45);
        }

        /* Items de liste avec hover */
        .footer-list-item {
          position: relative;
          padding-left: 0;
          transition: padding-left 0.25s ease, color 0.25s ease;
          cursor: default;
        }
        .footer-list-item:hover {
          padding-left: 8px;
          color: rgba(255,255,255,1);
        }
        .footer-list-item::before {
          content: "";
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%) scaleX(0);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.7);
          transition: transform 0.25s ease, opacity 0.25s ease;
          opacity: 0;
        }
        .footer-list-item:hover::before {
          transform: translateY(-50%) scaleX(1);
          opacity: 1;
        }

        /* Input glassmorphisme */
        .footer-input {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.12) inset;
        }
        .footer-input::placeholder { color: rgba(255,255,255,0.50); }
        .footer-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.50);
          background: rgba(255,255,255,0.18);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.10), 0 2px 12px rgba(0,0,0,0.12);
        }

        /* Bouton newsletter glassmorphisme */
        .footer-subscribe-btn {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow: 0 4px 14px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.20) inset;
          transition: all 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-subscribe-btn:hover {
          background: rgba(255,255,255,0.28);
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,0.28) inset;
        }

        /* Logo glassmorphisme */
        .footer-logo-wrap {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: 0 4px 18px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.18) inset;
          transition: all 0.3s ease;
        }
        .footer-logo-wrap:hover {
          background: rgba(255,255,255,0.20);
          box-shadow: 0 8px 26px rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,0.25) inset;
        }

        /* Icônes sociales */
        .footer-social-icon {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.20);
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          transition: all 0.30s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-social-icon:hover {
          background: rgba(255,255,255,0.24);
          border-color: rgba(255,255,255,0.40);
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 20px rgba(0,0,0,0.20);
        }

        /* Liens bas de page */
        .footer-bottom-link {
          transition: all 0.25s ease;
          padding: 6px 12px;
          border-radius: 6px;
        }
        .footer-bottom-link:hover {
          background: rgba(255,255,255,0.10);
          color: #fff;
        }

        /* Halo de fond */
        .footer-halo {
          background: radial-gradient(
            ellipse 70% 60% at 70% 50%,
            rgba(255,255,255,0.04) 0%,
            transparent 70%
          );
        }
      `}</style>

      {/* Halo de fond */}
      <div className="footer-halo pointer-events-none absolute inset-0 z-0" />

      {/* Forme haut gauche */}
      <img
        src={leftTopMain}
        alt=""
        aria-hidden="true"
        className="shape-left-top pointer-events-none absolute -left-2 top-0 z-0 hidden w-[250px] opacity-80 md:block lg:w-[300px] xl:w-[360px]"
      />

      {/* Forme bas gauche */}
      <img
        src={leftBottomShape}
        alt=""
        aria-hidden="true"
        className="shape-left-bottom pointer-events-none absolute bottom-0 left-0 z-0 hidden w-[220px] opacity-80 md:block lg:w-[270px] xl:w-[320px]"
      />

      {/* Forme droite */}
      <img
        src={rightShape}
        alt=""
        aria-hidden="true"
        className="shape-right pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[320px] opacity-80 md:block lg:w-[430px] xl:w-[560px]"
      />

      <div className="page-container relative z-10 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.15fr_1.15fr_1fr] xl:gap-14">

          {/* Colonne 1 — Logo + nav */}
          <div className={`footer-entry footer-col-1 ${visible ? "show" : ""}`}>
            <div className="flex items-center gap-4">
              <div className="footer-logo-wrap flex h-16 w-16 items-center justify-center rounded-xl">
                <img
                  src={logo}
                  alt="Basogol Hive"
                  className="h-11 w-auto object-contain"
                />
              </div>
              <div>
                <h3
                  className="text-xl font-semibold"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  Basogol Hive
                </h3>
                <p className="text-sm text-white/70">{t.brandSubtitle}</p>
              </div>
            </div>

            <ul
              className="mt-8 space-y-3 text-[15px] font-medium text-white/85"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-list-item inline-block transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 2 — Marketing */}
          <div className={`footer-entry footer-col-2 ${visible ? "show" : ""}`}>
            <h4
              className="footer-col-title text-[18px] font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.marketingTitle}
            </h4>
            <ul
              className="mt-5 space-y-3 text-sm leading-6 text-white/80"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.marketingItems.map((item) => (
                <li key={item} className="footer-list-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Technologie */}
          <div className={`footer-entry footer-col-3 ${visible ? "show" : ""}`}>
            <h4
              className="footer-col-title text-[18px] font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.technologyTitle}
            </h4>
            <ul
              className="mt-5 space-y-3 text-sm leading-6 text-white/80"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.technologyItems.map((item) => (
                <li key={item} className="footer-list-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Newsletter + réseaux */}
          <div className={`footer-entry footer-col-4 ${visible ? "show" : ""}`}>

            {/* Titre newsletter */}
            <h4
              className="footer-col-title text-[18px] font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.newsletterText}
            </h4>

            {/* Input + bouton */}
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                placeholder={t.inputPlaceholder}
                className="footer-input h-12 w-full rounded-[10px] px-4 text-sm"
                style={{ fontFamily: "Literata, serif" }}
              />
              <button
                type="button"
                className="footer-subscribe-btn w-full rounded-[10px] py-3 text-sm font-semibold text-white"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.subscribeButton}
              </button>
            </div>

            {/* Séparateur */}
            <div className="footer-divider my-7" />

            {/* Icônes sociales */}
            <div className="flex items-center gap-3">
              {t.socialLinks.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="footer-social-icon flex h-11 w-11 items-center justify-center rounded-full text-white"
                    aria-label={item.label}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-14">
          <div className="footer-divider" />
          <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

            {/* Copyright */}
            <p
              className="text-xs text-white/55"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.copyright}
            </p>

            {/* Liens bas */}
            <div className="flex items-center gap-1">
              {t.bottomLinks.map((item) => {
                const Icon = socialIcons[item.label];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="footer-bottom-link inline-flex items-center gap-2 text-xs text-white/60 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span style={{ fontFamily: "Literata, serif" }}>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;