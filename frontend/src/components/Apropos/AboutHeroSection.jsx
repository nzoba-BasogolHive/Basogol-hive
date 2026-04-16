import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import aboutHeroBg from "../../assets/0.webp";
import { Link } from "react-router-dom";
const translations = {
  fr: {
    badge: "À propos",
    title: "Nous construisons des marques, des expériences et des solutions durables.",
    description:
      "Basogol Hive accompagne les entreprises avec une vision qui relie stratégie, design et technologie. Nous créons des solutions élégantes, utiles et mémorables pour renforcer votre image et votre performance.",
    primaryCta: "Découvrir notre univers",
    secondaryCta: "Nous contacter",
    imageAlt: "Image de présentation de la page à propos",
  },
  en: {
    badge: "About",
    title: "We build brands, experiences and lasting solutions.",
    description:
      "Basogol Hive supports businesses with a vision that connects strategy, design and technology. We create elegant, useful and memorable solutions to strengthen your image and performance.",
    primaryCta: "Discover our world",
    secondaryCta: "Contact us",
    imageAlt: "Presentation image for the about page",
  },
};

const AboutHeroSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about-hero"
      data-page-hero
      className="relative min-h-[92vh] overflow-hidden bg-[#f4efe7]"
    >
      <style>{`
        .hero-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.10) 0%,
            rgba(10,30,45,0.52) 70%,
            rgba(10,30,45,0.72) 100%
          );
        }

        .hero-badge {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.38);
          box-shadow: 0 2px 12px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.30) inset;
          color: #fff;
        }

        .hero-btn-primary {
          background: linear-gradient(135deg, rgba(31,108,140,0.88) 0%, rgba(42,144,184,0.84) 100%);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.32);
          box-shadow:
            0 6px 22px rgba(31,108,140,0.38),
            0 1px 0 rgba(255,255,255,0.28) inset;
          color: #fff;
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow:
            0 12px 32px rgba(31,108,140,0.48),
            0 1px 0 rgba(255,255,255,0.35) inset;
        }

        .hero-btn-secondary {
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.38);
          box-shadow:
            0 4px 16px rgba(0,0,0,0.12),
            0 1px 0 rgba(255,255,255,0.28) inset;
          color: #fff;
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.24);
          transform: translateY(-3px);
          box-shadow:
            0 10px 26px rgba(0,0,0,0.18),
            0 1px 0 rgba(255,255,255,0.38) inset;
        }

        .hero-content {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-content.show {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-divider {
          width: 48px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(168,212,232,0.9), rgba(255,255,255,0.3));
          margin: 0 auto;
        }

        .hero-glow {
          background: radial-gradient(
            ellipse 60% 50% at 50% 80%,
            rgba(31,108,140,0.38) 0%,
            transparent 70%
          );
        }
      `}</style>

      {/* Image de fond */}
      <img
        src={aboutHeroBg}
        alt={t.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay dégradé */}
      <div className="hero-overlay absolute inset-0" />

      {/* Halo lumineux bas */}
      <div className="hero-glow pointer-events-none absolute inset-0" />

      {/* Contenu */}
      <div className="page-container relative z-10 flex min-h-[92vh] items-center justify-center px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:pt-40">
        <div className={`hero-content mx-auto flex max-w-[920px] flex-col items-center text-center ${visible ? "show" : ""}`}>

          {/* Badge */}
          <span
            className="hero-badge inline-flex rounded-full px-5 py-2 text-[8px] font-semibold uppercase tracking-[0.28em] shadow-sm sm:text-[10px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.badge}
          </span>

          {/* Titre */}
          <h1
            className="mt-7 max-w-[820px] text-2xl font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.title}
          </h1>

          {/* Séparateur */}
          <div className="hero-divider mt-6" />

          {/* Description */}
          <p
            className="mt-5 max-w-[680px] text-sm leading-8 text-white/75 sm:text-base"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.description}
          </p>

          {/* Boutons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/portfolio"
              className="hero-btn-primary inline-flex min-w-[220px] items-center justify-center rounded-[10px] px-7 py-3.5 text-sm font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.primaryCta}
            </Link>
           <Link
              to="/contact"
              className="hero-btn-secondary inline-flex min-w-[170px] items-center justify-center rounded-[10px] px-7 py-3.5 text-sm font-semibold"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.secondaryCta}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;