import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import heroBg from "../../assets/rfYVzjHWWemqX.webp";
import brandIcon from "../../assets/ColorSwatchOutline.png";

const translations = {
  fr: {
    title: "Marketing & Branding",
    description:
      "Nous aidons les marques à construire une identité forte, une présence cohérente et une communication capable de créer de l'impact. De la stratégie au contenu, nous concevons des expériences qui renforcent votre image et votre visibilité.",
    primaryCta: "Découvrir",
    secondaryCta: "Nous contacter",
    imageAlt: "Hero de la page Marketing & Brand",
    brandIconAlt: "Icône marketing et marque",
    badge: "Marketing & Branding",
  },
  en: {
    title: "Marketing & Branding",
    description:
      "We help brands build a strong identity, a consistent presence and communication that creates real impact. From strategy to content, we design experiences that strengthen your image and visibility.",
    primaryCta: "Discover",
    secondaryCta: "Contact us",
    imageAlt: "Marketing & Brand hero image",
    brandIconAlt: "Marketing and brand icon",
    badge: "Marketing & Branding",
  },
};

const MarketingBrandHeroCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="marketing-brand-hero"
      data-page-hero
      className="relative min-h-[92vh] overflow-hidden"
    >
      <style>{`
        /* ── Overlay ── */
        .mb-overlay {
          background: linear-gradient(
            135deg,
            rgba(0,0,0,0.52) 0%,
            rgba(0,0,0,0.25) 50%,
            rgba(0,0,0,0.08) 100%
          );
        }

        /* ── Halo coloré ── */
        .mb-halo {
          background: radial-gradient(
            ellipse 60% 70% at 15% 60%,
            rgba(31,108,140,0.28) 0%,
            transparent 65%
          );
        }

        /* ── Badge glassmorphisme ── */
        .mb-badge {
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.30);
          box-shadow: 0 2px 12px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.22) inset;
          color: rgba(255,255,255,0.90);
        }

        /* ── Entrée texte ── */
        .mb-text-entry {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .mb-text-entry.show { opacity: 1; transform: translateX(0); }

        /* ── Séparateur ── */
        .mb-divider {
          width: 40px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0.80), rgba(255,255,255,0.20));
        }

        /* ── Bouton primaire glassmorphisme ── */
        .mb-btn-primary {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.70);
          box-shadow: 0 6px 20px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.90) inset;
          color: #0e4d6a;
          font-weight: 700;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .mb-btn-primary:hover {
          background: rgba(255,255,255,1);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,1) inset;
        }

        /* ── Bouton secondaire glassmorphisme ── */
        .mb-btn-secondary {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.32);
          box-shadow: 0 4px 16px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.18) inset;
          color: rgba(255,255,255,0.92);
          font-weight: 600;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .mb-btn-secondary:hover {
          background: rgba(255,255,255,0.22);
          transform: translateY(-3px);
          box-shadow: 0 10px 26px rgba(0,0,0,0.16), 0 1px 0 rgba(255,255,255,0.25) inset;
        }

        /* ── Icône entrée ── */
        .mb-icon-entry {
          opacity: 0;
          transform: translateX(32px) scale(0.92);
          transition: opacity 0.95s ease 0.18s, transform 0.95s cubic-bezier(0.22,1,0.36,1) 0.18s;
        }
        .mb-icon-entry.show { opacity: 1; transform: translateX(0) scale(1); }

        /* ── Animations icône ── */
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          30%       { transform: translateY(-14px) rotate(3deg) scale(1.02); }
          60%       { transform: translateY(-8px) rotate(-2deg) scale(1.015); }
          80%       { transform: translateY(-12px) rotate(1.5deg) scale(1.01); }
        }
        @keyframes iconGlow {
          0%, 100% { filter: drop-shadow(0 8px 24px rgba(31,108,140,0.0)); }
          50%       { filter: drop-shadow(0 16px 40px rgba(31,108,140,0.35)); }
        }
        @keyframes iconHalo {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50%       { transform: scale(1.08); opacity: 0.40; }
        }
        .mb-icon-float {
          animation: iconFloat 7s ease-in-out infinite, iconGlow 7s ease-in-out infinite;
        }
        .mb-icon-halo {
          animation: iconHalo 7s ease-in-out infinite;
        }

        /* ── Ligne déco gauche ── */
        @keyframes lineGrow {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }
        .mb-line {
          transform-origin: top;
          animation: lineGrow 1.1s ease 0.5s both;
        }

        /* ── Scroll indicator ── */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%       { transform: translateY(7px); opacity: 0.3; }
        }
        .mb-scroll { animation: scrollBounce 1.9s ease-in-out infinite; }

        /* ── Image parallax hover ── */
        .mb-bg { transition: transform 9s ease; }
        section:hover .mb-bg { transform: scale(1.04); }
      `}</style>

      {/* Fond */}
      <img
        src={heroBg}
        alt={t.imageAlt}
        className="mb-bg absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="mb-overlay absolute inset-0" />

      {/* Halo bleu gauche */}
      <div className="mb-halo pointer-events-none absolute inset-0" />

      {/* Ligne déco gauche */}
      <div
        className="mb-line pointer-events-none absolute left-8 top-36 hidden h-[160px] w-[1px] lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.28), transparent)" }}
      />

      {/* Contenu */}
      <div className="page-container relative z-10 flex min-h-[92vh] items-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">

          {/* ── Texte gauche ── */}
          <div className={`mb-text-entry max-w-[620px] ${visible ? "show" : ""}`}>

            {/* Badge */}
            <span
              className="mb-badge inline-flex rounded-full px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-[11px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.badge}
            </span>

            {/* Titre */}
            <h1
              className="mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[76px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h1>

            {/* Séparateur */}
            <div className="mb-divider mt-5" />

            {/* Description */}
            <p
              className="mt-5 max-w-[520px] text-sm leading-[1.9] text-[#c7e2ef] sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            {/* Boutons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/portfolio"
                className="mb-btn-primary inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-sm"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.primaryCta}
              </a>
              <a
                href="/contact"
                className="mb-btn-secondary inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-sm"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          {/* ── Visuel droite animé ── */}
          <div className={`mb-icon-entry relative flex items-center justify-center lg:justify-end ${visible ? "show" : ""}`}>
            <div className="relative flex items-center justify-center">

              {/* Halo derrière l'icône */}
              <div
                className="mb-icon-halo absolute rounded-full"
                style={{
                  width: "340px",
                  height: "340px",
                  background: "radial-gradient(circle, rgba(31,108,140,0.22) 0%, transparent 70%)",
                }}
              />

              {/* Cercles décoratifs */}
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: "280px", height: "280px",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              />
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  width: "380px", height: "380px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />

              {/* Icône flottante */}
              <img
                src={brandIcon}
                alt={t.brandIconAlt}
                className="mb-icon-float relative z-10 w-[200px] object-contain sm:w-[260px] lg:w-[340px] xl:w-[400px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-45">
        <div
          className="mb-scroll h-[30px] w-[1px] rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.85), transparent)" }}
        />
      </div>

    </section>
  );
};

export default MarketingBrandHeroCarousel;