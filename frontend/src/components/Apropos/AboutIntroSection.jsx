import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import unionVisual from "../../assets/Union1.png";
import polygonShape from "../../assets/Polygon7.png";
import introVideo from "../../assets/mixkit.mp4";
import { useNavigate } from "react-router-dom";


const translations = {
  fr: {
    title: "Une approche fondée sur la stratégie, la création et l'impact",
    description:
      "Chez Basogol Hive, nous accompagnons les entreprises dans la construction de marques fortes, d'expériences utiles et de solutions durables. Notre approche relie réflexion stratégique, identité visuelle, communication et innovation digitale pour donner vie à des projets cohérents, performants et mémorables.",
    topVisualAlt: "Composition visuelle décorative",
    videoLabel: "Vidéo de présentation de Basogol Hive",
    cta1: "Découvrir",
    cta2: "Nous contacter",
  },
  en: {
    title: "An approach built on strategy, creativity and impact",
    description:
      "At Basogol Hive, we help businesses build strong brands, meaningful experiences and lasting solutions. Our approach connects strategic thinking, visual identity, communication and digital innovation to bring projects to life with clarity, performance and long-term value.",
    topVisualAlt: "Decorative visual composition",
    videoLabel: "Basogol Hive presentation video",
    cta1: "Discover",
    cta2: "Contact us",
  },
};

const AboutIntroSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-shell relative overflow-hidden bg-[#f7f7f5]"
    >
      <style>{`
        /* ── halo de fond ── */
        .about-halo {
          background: radial-gradient(
            ellipse 70% 55% at 55% 40%,
            rgba(168,212,232,0.28) 0%,
            transparent 70%
          );
        }

        /* ── bouton glassmorphisme primaire ── */
        .glass-btn-primary {
          background: linear-gradient(135deg, rgba(31,108,140,0.82) 0%, rgba(42,144,184,0.78) 100%);
          backdrop-filter: blur(12px) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.35);
          box-shadow:
            0 4px 18px rgba(31,108,140,0.30),
            0 1px 0 rgba(255,255,255,0.28) inset;
          color: #fff;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .glass-btn-primary:hover {
          background: linear-gradient(135deg, rgba(31,108,140,0.95) 0%, rgba(42,144,184,0.92) 100%);
          transform: translateY(-2px);
          box-shadow:
            0 10px 28px rgba(31,108,140,0.38),
            0 1px 0 rgba(255,255,255,0.35) inset;
        }

        /* ── bouton glassmorphisme secondaire (contour) ── */
        .glass-btn-secondary {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          border: 1px solid rgba(31,108,140,0.35);
          box-shadow:
            0 4px 14px rgba(31,108,140,0.10),
            0 1px 0 rgba(255,255,255,0.50) inset;
          color: #1f6c8c;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .glass-btn-secondary:hover {
          background: rgba(31,108,140,0.10);
          border-color: rgba(31,108,140,0.55);
          transform: translateY(-2px);
          box-shadow:
            0 8px 22px rgba(31,108,140,0.18),
            0 1px 0 rgba(255,255,255,0.55) inset;
        }

        /* ── image décorative ── */
        .union-float {
          animation: unionFloat 5s ease-in-out infinite;
        }
        @keyframes unionFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(1.5deg); }
        }

        /* ── cadre vidéo glassmorphisme ── */
        .video-glass-frame {
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.50);
          box-shadow:
            0 12px 40px rgba(31,108,140,0.16),
            0 1px 0 rgba(255,255,255,0.60) inset;
        }

        /* ── badge lecture ── */
        .play-badge {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255,255,255,0.28);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow: 0 4px 18px rgba(0,0,0,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }
        .play-badge:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 28px rgba(0,0,0,0.24);
        }

        /* ── entrée texte ── */
        .text-entry {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .text-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── entrée image ── */
        .img-entry {
          opacity: 0;
          transform: translateX(30px) scale(0.96);
          transition: opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .img-entry.show {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        /* ── entrée vidéo ── */
        .video-entry {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.9s ease 0.35s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s;
        }
        .video-entry.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Halo de fond */}
      <div className="about-halo pointer-events-none absolute inset-0 z-0" />

      <div className="page-container relative z-10">

        {/* ── Bloc haut ── */}
        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* Guillemet décoratif */}
          <div className="pointer-events-none absolute right-[1060px] top-[-110px] hidden opacity-[0.06] lg:block">
            <div
              className="text-[490px] font-black leading-none text-slate-400 xl:text-[950px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              "
            </div>
          </div>

          {/* Texte + boutons */}
          <div className={`text-entry relative z-10 max-w-xl pt-8 lg:pl-10 lg:pt-12 xl:pl-16 ${visible ? "show" : ""}`}>
            <h2
              className="text-4xl font-bold leading-tight text-black sm:text-5xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h2>

            <p
              className="mt-5 max-w-md text-sm leading-7 text-slate-700 sm:text-base"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            {/* Boutons glassmorphisme */}
            <div className="mt-8 flex flex-wrap gap-3">
              
              <button
               onClick={() => navigate("/")}
                type="button"
                className="glass-btn-primary rounded-[9px] px-6 py-[10px] text-[13px] font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.cta1}
              </button>
              <button
              onClick={() => navigate("/contact")}
                type="button"
                className="glass-btn-secondary rounded-[9px] px-6 py-[10px] text-[13px] font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.cta2}
              </button>
            </div>
          </div>

          {/* Image décorative */}
          <div className={`img-entry relative flex items-center justify-center lg:justify-end ${visible ? "show" : ""}`}>
            <img
              src={unionVisual}
              alt={t.topVisualAlt}
              className="union-float w-[220px] max-w-none object-contain sm:w-[280px] lg:w-[340px] xl:w-[400px]"
            />
          </div>
        </div>

        {/* ── Bloc bas — vidéo ── */}
        <div className={`video-entry relative mt-14 lg:mt-16 min-h-[320px] sm:min-h-[430px] lg:min-h-[560px] ${visible ? "show" : ""}`}>

          {/* Forme polygone derrière */}
          <img
            src={polygonShape}
            alt=""
            aria-hidden="true"
            className="
              pointer-events-none absolute z-0 hidden lg:block
              left-[-150px] bottom-[0px]
              w-[720px] max-w-none
              xl:left-[-190px] xl:bottom-[-40px] xl:w-[780px]
            "
          />

          {/* Cadre vidéo glassmorphisme */}
          <div className="video-glass-frame relative z-10 w-full rounded-[12px] p-[5px]">
            <div className="overflow-hidden rounded-[8px]">
              <video
                className="block h-[280px] w-full object-cover sm:h-[380px] lg:h-[580px] xl:h-[720px]"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={t.videoLabel}
              >
                <source src={introVideo} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>

            {/* Badge play glassmorphisme */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <div className="play-badge pointer-events-auto">
                <div className="ml-1 h-0 w-0 border-b-[11px] border-l-[18px] border-t-[11px] border-b-transparent border-l-white border-t-transparent opacity-90" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutIntroSection;