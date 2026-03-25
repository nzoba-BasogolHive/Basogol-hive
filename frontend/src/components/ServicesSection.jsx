import React, { useEffect, useRef, useState } from "react";
import deviceMockup from "../assets/Frame 220.png";
import unionShape from "../assets/Union.png";
import BlueShape from "./BlueShape";
import FloatingCards from "./FloatingCards";
import { useLanguage } from "./LanguageContext";
import logoAnimation from "../assets/logoanimation.webm";

const translations = {
  fr: {
    badge: "Nos services",
    title:
      "Nous créons des expériences digitales et visuelles qui donnent de la valeur à votre entreprise",
    description:
      "De la technologie au studio créatif, nous accompagnons les entreprises avec des solutions complètes : développement web et mobile, logiciels sur mesure, branding, design, vidéo et contenus de communication.",
    cta: "Voir  nos processus",
    globalBadge: "Accompagnement global",
    globalTitle:
      "Une approche stratégique pour transformer vos idées en projets solides",
    globalDescription:
      "Nous ne faisons pas seulement de l'exécution. Nous vous aidons aussi à structurer votre vision, à clarifier vos besoins et à construire des solutions cohérentes, performantes et adaptées à votre marché.",
    techBadge: "Tech",
    techTitle: "Développement, logiciels et solutions digitales",
    techDescription:
      "Nous concevons des sites web, applications mobiles, plateformes, logiciels sur mesure et solutions d'hébergement. Notre objectif est de créer des outils performants, fiables et pensés pour accompagner la croissance de votre activité.",
    studioBadge: "Studio",
    studioTitle: "Branding, design et production de contenus visuels",
    studioDescription:
      "Nous réalisons des logos, identités visuelles, visuels de communication, montages vidéo et contenus créatifs pour aider votre entreprise à mieux communiquer, mieux se positionner et marquer durablement les esprits.",
    learnMore: "En savoir plus",
    mockupAlt: "Ordinateur et téléphone présentant les services Basogol",
    globalAlt: "Équipe en réunion autour d'un projet digital",
    techAlt: "Développement technologique et solutions digitales",
    studioVideoAlt: "Branding, design et contenus visuels",
    logoAnimationAlt: "Animation du logo Basogol",
    stat1: "Projets livrés",
    stat1Val: "80+",
    stat2: "Satisfaction",
    stat2Val: "100%",
    stat3: "Années",
    stat3Val: "5+",
  },
  en: {
    badge: "Our services",
    title:
      "We create digital and visual experiences that bring value to your business",
    description:
      "From technology to creative studio services, we support businesses with complete solutions: web and mobile development, custom software, branding, design, video, and communication content.",
    cta: "See our process",
    globalBadge: "Global support",
    globalTitle: "A strategic approach to turn your ideas into strong projects",
    globalDescription:
      "We do more than execution. We also help you structure your vision, clarify your needs, and build coherent, high-performing solutions tailored to your market.",
    techBadge: "Tech",
    techTitle: "Development, software and digital solutions",
    techDescription:
      "We design websites, mobile apps, platforms, custom software, and hosting solutions. Our goal is to create reliable, high-performance tools built to support your business growth.",
    studioBadge: "Studio",
    studioTitle: "Branding, design and visual content production",
    studioDescription:
      "We create logos, visual identities, communication assets, video editing, and creative content to help your company communicate better, position itself more clearly, and leave a lasting impression.",
    learnMore: "Learn more",
    mockupAlt: "Computer and phone showcasing Basogol services",
    globalAlt: "Team meeting around a digital project",
    techAlt: "Technology development and digital solutions",
    studioVideoAlt: "Branding, design and visual content production",
    logoAnimationAlt: "Basogol logo animation",
    stat1: "Projects",
    stat1Val: "80+",
    stat2: "Satisfaction",
    stat2Val: "100%",
    stat3: "Years",
    stat3Val: "5+",
  },
};

const ServicesSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-shell overflow-x-hidden overflow-y-visible"
    >
      <style>{`
        /* ── Entrées ── */
        .sv-fade-up {
          opacity: 0; transform: translateY(32px);
          transition: opacity 0.82s ease, transform 0.82s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-fade-up.show { opacity: 1; transform: translateY(0); }

        .sv-fade-left {
          opacity: 0; transform: translateX(-36px);
          transition: opacity 0.88s ease, transform 0.88s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-fade-left.show { opacity: 1; transform: translateX(0); }

        .sv-fade-right {
          opacity: 0; transform: translateX(36px);
          transition: opacity 0.88s ease, transform 0.88s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-fade-right.show { opacity: 1; transform: translateX(0); }

        .sv-d0 { transition-delay: 0s; }
        .sv-d1 { transition-delay: 0.10s; }
        .sv-d2 { transition-delay: 0.20s; }
        .sv-d3 { transition-delay: 0.32s; }
        .sv-d4 { transition-delay: 0.44s; }

        /* ── Mockup float ── */
        @keyframes mockupFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(-12px) rotate(0.5deg); }
          70% { transform: translateY(-6px) rotate(-0.3deg); }
        }
        .mockup-float { animation: mockupFloat 7s ease-in-out infinite; }

        /* ── Union float ── */
        @keyframes unionFloat {
          0%, 100% { transform: scaleX(-1) translateY(0px); }
          50% { transform: scaleX(-1) translateY(-14px); }
        }
        .union-float { animation: unionFloat 9s ease-in-out infinite; }

        /* ── Badge section ── */
        .sv-badge {
          background: rgba(186,230,255,0.32);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(125,200,240,0.28);
          color: #0e5f82;
        }

        /* ── CTA ── */
        .sv-cta {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.72);
          box-shadow: 0 6px 22px rgba(15,23,42,0.11), 0 1px 0 rgba(255,255,255,0.82) inset;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-cta:hover {
          background: #fff;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(15,23,42,0.17), 0 1px 0 rgba(255,255,255,0.92) inset;
        }

        /* ── Stat pills ── */
        .sv-stat {
          background: rgba(255,255,255,0.70);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(31,108,140,0.12);
          box-shadow: 0 2px 10px rgba(31,108,140,0.07);
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-stat:hover {
          background: rgba(255,255,255,0.95);
          transform: translateY(-3px);
          box-shadow: 0 8px 22px rgba(31,108,140,0.13);
        }

        /* ── Carte globale glassmorphisme ── */
        .sv-card-global {
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.65);
          box-shadow: 0 8px 32px rgba(31,108,140,0.10), 0 1px 0 rgba(255,255,255,0.80) inset;
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-card-global:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 48px rgba(31,108,140,0.16), 0 1px 0 rgba(255,255,255,0.88) inset;
        }

        /* ── Cartes petites ── */
        .sv-card-small {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(16px) saturate(145%);
          -webkit-backdrop-filter: blur(16px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.60);
          box-shadow: 0 4px 20px rgba(31,108,140,0.08), 0 1px 0 rgba(255,255,255,0.75) inset;
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-card-small:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 42px rgba(31,108,140,0.15), 0 1px 0 rgba(255,255,255,0.85) inset;
          border-color: rgba(31,108,140,0.16);
        }

        /* Zoom image hover */
        .sv-card-img { overflow: hidden; }
        .sv-card-img img, .sv-card-img video {
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-card-global:hover .sv-card-img img,
        .sv-card-small:hover .sv-card-img img,
        .sv-card-small:hover .sv-card-img video {
          transform: scale(1.05);
        }

        /* ── Badges cartes ── */
        .sv-badge-blue {
          background: rgba(224,242,254,0.85);
          color: #0e6e96;
          border: 1px solid rgba(125,200,240,0.28);
        }
        .sv-badge-slate {
          background: rgba(241,245,249,0.90);
          color: #475569;
          border: 1px solid rgba(203,213,225,0.40);
        }

        /* ── Barre colorée haut carte ── */
        .sv-card-bar {
          height: 3px;
          border-radius: 999px;
          background: linear-gradient(90deg, #1f6c8c, #a8d4e8);
          width: 0;
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-card-global:hover .sv-card-bar,
        .sv-card-small:hover .sv-card-bar {
          width: 100%;
        }

        /* ── Lien learn more ── */
        .sv-learn-more {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 13px;
          color: #1f6c8c;
          transition: gap 0.25s ease, color 0.25s ease;
        }
        .sv-learn-more:hover { gap: 10px; color: #155870; }
        .sv-learn-more::after {
          content: "";
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .sv-learn-more:hover::after { transform: scaleX(1); }

        /* ══════════════════════════════════════════
           LOGO — Repositionné & impactant
           Centré verticalement dans la zone droite
           de l'en-tête, entre les stats et le titre
        ══════════════════════════════════════════ */
        .sv-logo-stage {
          /* Prend toute la colonne droite de l'en-tête */
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 24px;
        }

        /* Conteneur isolé du logo */
        .sv-logo-wrap {
          position: relative;
          width: min(42vw, 340px);
          height: min(42vw, 340px);
          flex-shrink: 0;
          pointer-events: none;
        }

        /* Halo lumineux derrière le logo */
        .sv-logo-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(31,108,140,0.18) 0%,
            rgba(168,212,232,0.10) 45%,
            transparent 72%
          );
          filter: blur(28px);
          animation: svHaloPulse 5s ease-in-out infinite;
        }

        /* Second halo — anneau externe */
        .sv-logo-wrap::after {
          content: "";
          position: absolute;
          inset: -14%;
          border-radius: 999px;
          border: 1.5px solid rgba(31,108,140,0.10);
          animation: svRingExpand 5s ease-in-out infinite;
        }

        /* Vidéo elle-même */
        .sv-logo-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0;
          transform: scale(0.80) translateY(10px);
          transition:
            opacity 1.1s cubic-bezier(0.22,1,0.36,1),
            transform 1.1s cubic-bezier(0.22,1,0.36,1);
          transition-delay: 0.18s;
          filter:
            drop-shadow(0 24px 48px rgba(31,108,140,0.22))
            drop-shadow(0 6px 16px rgba(31,108,140,0.14));
          animation: svLogoFloat 7s ease-in-out infinite;
        }

        .sv-logo-video.show {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        @keyframes svHaloPulse {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%       { transform: scale(1.12); opacity: 1; }
        }

        @keyframes svRingExpand {
          0%, 100% { transform: scale(1);    opacity: 0.55; }
          50%       { transform: scale(1.06); opacity: 0.25; }
        }

        @keyframes svLogoFloat {
          0%, 100% { transform: scale(1)    translateY(0px);  }
          50%       { transform: scale(1)    translateY(-10px); }
        }

        /* Masquer sur mobile / tablette — le logo
           prend de la place, on garde la lisibilité */
      @media (max-width: 1023px) {
  .sv-logo-stage {
    align-items: center;
    gap: 16px;
  }

  .sv-logo-wrap {
    display: block;
    width: min(52vw, 180px);
    height: min(52vw, 180px);
    margin: 0 auto;
  }

  .sv-logo-video {
    filter:
      drop-shadow(0 14px 28px rgba(31,108,140,0.18))
      drop-shadow(0 4px 10px rgba(31,108,140,0.10));
  }
}
      `}</style>

      <BlueShape />

      <div className="page-container relative z-10">

        {/* ── En-tête ── */}
        <div className="mb-14 flex flex-col gap-8 lg:mb-18 lg:flex-row lg:items-start lg:justify-between">

          {/* Gauche — badge + titre + desc */}
          <div className={`sv-fade-up sv-d0 max-w-2xl ${visible ? "show" : ""}`}>
            <span
              className="sv-badge inline-flex rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.badge}
            </span>

            <h2
              className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-[52px] lg:leading-[1.06]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h2>

            <div
              className="mt-5"
              style={{
                width: "36px",
                height: "2px",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)",
              }}
            />

            <p
              className="mt-5 max-w-xl text-sm leading-8 text-slate-500 sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>
          </div>

          {/* Droite — logo CENTRÉ + stats + CTA */}
          <div
            className={`sv-fade-up sv-d2 sv-logo-stage ${visible ? "show" : ""}`}
          >

            {/* ★ LOGO — pièce maîtresse de la colonne droite ★ */}
            <div className="sv-logo-wrap" aria-hidden="true">
              <video
                className={`sv-logo-video ${visible ? "show" : ""}`}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={logoAnimation} type="video/mp4" />
              </video>
            </div>

            {/* Stats */}
            <div className="flex gap-3">
              {[
                { val: t.stat1Val, label: t.stat1 },
                { val: t.stat2Val, label: t.stat2 },
                { val: t.stat3Val, label: t.stat3 },
              ].map((s, i) => (
                <div key={i} className="sv-stat rounded-[12px] px-4 py-3 text-center">
                  <div
                    className="text-[18px] font-bold text-[#1f6c8c]"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-400"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/process"
              className="sv-cta inline-flex items-center justify-center rounded-[10px] px-6 py-3 text-sm font-semibold text-slate-900"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.cta} <span className="ml-2">→</span>
            </a>
          </div>
        </div>

        {/* ── Grille principale ── */}
        <div className="relative grid grid-cols-1 gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:gap-10">
          {/* Mockup */}
          <div
            className={`sv-fade-left sv-d1 relative z-10 flex items-center justify-center ${
              visible ? "show" : ""
            }`}
          >
            <div className="relative w-full max-w-3xl">
              <img
                src={deviceMockup}
                alt={t.mockupAlt}
                className="mockup-float relative z-10 w-full object-contain drop-shadow-[0_25px_60px_rgba(15,23,42,0.17)]"
              />
              <img
                src={unionShape}
                alt=""
                aria-hidden="true"
                className="union-float pointer-events-none absolute bottom-[-260px] left-[-180px] z-0 hidden w-[460px] object-contain lg:block xl:left-[-220px] xl:w-[520px]"
              />
            </div>
          </div>

          {/* Cartes */}
          <div className="relative z-10 flex flex-col gap-5 pl-0 xl:pl-8">
            {/* Carte globale */}
            <div
              className={`sv-fade-right sv-d2 sv-card-global overflow-hidden rounded-[22px] ${
                visible ? "show" : ""
              }`}
            >
              <div className="sv-card-bar" />
              <div className="sv-card-img h-[240px] sm:h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80"
                  alt={t.globalAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-7">
                <span
                  className="sv-badge-blue inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.globalBadge}
                </span>
                <h3
                  className="mt-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.globalTitle}
                </h3>
                <p
                  className="mt-3 text-sm leading-7 text-slate-500 sm:text-[14.5px]"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.globalDescription}
                </p>
              </div>
            </div>

            {/* 2 petites cartes */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Tech */}
              <div
                className={`sv-fade-up sv-d3 sv-card-small overflow-hidden rounded-[22px] ${
                  visible ? "show" : ""
                }`}
              >
                <div className="sv-card-bar" />
                <div className="sv-card-img h-52">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                    alt={t.techAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <span
                    className="sv-badge-slate inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.techBadge}
                  </span>
                  <h4
                    className="mt-3 text-lg font-bold leading-snug text-slate-900"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.techTitle}
                  </h4>
                  <p
                    className="mt-3 text-sm leading-6 text-slate-500"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.techDescription}
                  </p>
                  <a href="#technology" className="sv-learn-more mt-4 block">
                    {t.learnMore} <span>→</span>
                  </a>
                </div>
              </div>

              {/* Studio */}
              <div
                className={`sv-fade-up sv-d4 sv-card-small overflow-hidden rounded-[22px] ${
                  visible ? "show" : ""
                }`}
              >
                <div className="sv-card-bar" />
                <div className="sv-card-img h-52 bg-black">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80"
                    aria-label={t.studioVideoAlt}
                  >
                    <source
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="p-5">
                  <span
                    className="sv-badge-slate inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.studioBadge}
                  </span>
                  <h4
                    className="mt-3 text-lg font-bold leading-snug text-slate-900"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.studioTitle}
                  </h4>
                  <p
                    className="mt-3 text-sm leading-6 text-slate-500"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.studioDescription}
                  </p>
                  <a href="#marketing-brand" className="sv-learn-more mt-4 block">
                    {t.learnMore} <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
