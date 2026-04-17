import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import heroBg from "../../assets/mars.png";

const translations = {
  fr: {
    badge: "Contact",
    title: "Parlons de votre projet",
    description:
      "Que vous ayez besoin d'une identité forte, d'une stratégie claire ou d'une solution digitale sur mesure, notre équipe est prête à vous accompagner. Échangeons sur vos objectifs et construisons ensemble une réponse adaptée à vos ambitions.",
    imageAlt: "Image d'en-tête de la page contact",
    scrollLabel: "Défiler",
    stats: [
      { num: "5+", label: "Années d'expérience" },
      { num: "20+", label: "Projets livrés" },
      { num: "100%", label: "Satisfaction client" },
    ],
  },
  en: {
    badge: "Contact",
    title: "Let's talk about your project",
    description:
      "Whether you need a stronger brand, a clearer strategy or a tailored digital solution, our team is ready to support you. Let's discuss your goals and build the right response for your ambitions.",
    imageAlt: "Contact page hero image",
    scrollLabel: "Scroll",
    stats: [
      { num: "5+", label: "Years of experience" },
      { num: "20+", label: "Projects delivered" },
      { num: "100%", label: "Client satisfaction" },
    ],
  },
};

const ContactHeroCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="contact-hero"
       data-page-hero
      className="relative min-h-[92vh] overflow-hidden"
    >
      <style>{`
        .ch-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.08) 0%,
            rgba(8,25,40,0.48) 60%,
            rgba(8,25,40,0.72) 100%
          );
        }

        .ch-glow {
          background: radial-gradient(
            ellipse 65% 55% at 50% 75%,
            rgba(31,108,140,0.32) 0%,
            transparent 70%
          );
        }

        .ch-content {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.95s ease, transform 0.95s cubic-bezier(0.22,1,0.36,1);
        }
        .ch-content.show { opacity: 1; transform: translateY(0); }

        .ch-badge {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow: 0 2px 12px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.28) inset;
          color: rgba(255,255,255,0.92);
        }

        .ch-divider {
          width: 44px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(168,212,232,0.9), rgba(255,255,255,0.25));
          margin: 0 auto;
        }

        .ch-stat-card {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(16px) saturate(145%);
          -webkit-backdrop-filter: blur(16px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.25);
          box-shadow:
            0 6px 24px rgba(0,0,0,0.16),
            0 1px 0 rgba(255,255,255,0.22) inset;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .ch-stat-card:hover {
          background: rgba(255,255,255,0.20);
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.30) inset;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(6px); opacity: 0.5; }
        }
        .ch-scroll-dot {
          animation: scrollBounce 1.8s ease-in-out infinite;
        }

        @keyframes lineGrow {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }
        .ch-line-left {
          transform-origin: top;
          animation: lineGrow 1.2s ease 0.6s both;
        }

        .ch-bg-img {
          transition: transform 8s ease;
        }
        section:hover .ch-bg-img {
          transform: scale(1.04);
        }
      `}</style>

      {/* Image de fond */}
      <img
        src={heroBg}
        alt={t.imageAlt}
        className="ch-bg-img absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="ch-overlay absolute inset-0" />

      {/* Halo bleu */}
      <div className="ch-glow pointer-events-none absolute inset-0" />

      {/* Ligne décorative gauche */}
      <div
        className="ch-line-left pointer-events-none absolute left-8 top-32 hidden h-[180px] w-[1px] lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.30), transparent)" }}
      />

      {/* Contenu */}
      <div className="page-container relative z-10 flex min-h-[92vh] flex-col items-center justify-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:pt-40">

        <div className={`ch-content mx-auto flex max-w-3xl flex-col items-center text-center ${visible ? "show" : ""}`}>

          {/* Badge */}
          <span
            className="ch-badge inline-flex rounded-full px-5 py-2 text-[9px] font-semibold uppercase tracking-[0.30em] sm:text-[11px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.badge}
          </span>

          {/* Titre */}
          <h1
            className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[58px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.title}
          </h1>

          {/* Séparateur */}
          <div className="ch-divider mt-5" />

          {/* Description — plus d'espace maintenant que les boutons sont retirés */}
          <p
            className="mt-6 max-w-xl text-sm leading-[2] text-white/72 sm:text-[15px] lg:text-base"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.description}
          </p>

          {/* Cartes stats — remontent pour occuper l'espace des boutons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {t.stats.map((stat, i) => (
              <div
                key={i}
                className="ch-stat-card rounded-[12px] px-7 py-5 text-center"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className="text-[24px] font-bold text-white"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {stat.num}
                </div>
                <div
                  className="mt-1 text-[11px] uppercase tracking-widest text-white/55"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span
            className="text-[10px] uppercase tracking-[0.22em] text-white"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.scrollLabel}
          </span>
          <div
            className="ch-scroll-dot h-[28px] w-[1px] rounded-full"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)" }}
          />
        </div>

      </div>
    </section>
  );
};

export default ContactHeroCarousel;