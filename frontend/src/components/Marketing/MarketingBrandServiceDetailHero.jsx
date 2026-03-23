import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";

const translations = {
  fr: {
    discoverService: "Découvrir le service",
  },
  en: {
    discoverService: "Discover the service",
  },
};

const MarketingBrandServiceDetailHero = ({ service }) => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!service) return null;

  return (
    <section
      className="relative min-h-[88vh] overflow-hidden"
      id="marketing-brand-service-detail-hero"
      data-page-hero
    >
      <style>{`
        /* ── Image fond ── */
        .sdh-bg { transition: transform 9s ease; }
        section:hover .sdh-bg { transform: scale(1.04); }

        /* ── Overlay dégradé ── */
        .sdh-overlay {
          background: linear-gradient(
            135deg,
            rgba(4,14,26,0.78) 0%,
            rgba(8,28,48,0.55) 50%,
            rgba(4,14,26,0.30) 100%
          );
        }

        /* ── Halo bleu ── */
        .sdh-halo {
          background: radial-gradient(
            ellipse 55% 65% at 15% 65%,
            rgba(31,108,140,0.30) 0%,
            transparent 68%
          );
        }

        /* ── Grille déco ── */
        .sdh-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 55px 55px;
        }

        /* ── Entrée contenu ── */
        .sdh-entry {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.92s ease, transform 0.92s cubic-bezier(0.22,1,0.36,1);
        }
        .sdh-entry.show { opacity: 1; transform: translateX(0); }

        /* ── Badge glassmorphisme ── */
        .sdh-badge {
          background: rgba(31,108,140,0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(88,180,218,0.35);
          color: rgba(168,212,232,0.95);
          box-shadow: 0 2px 10px rgba(31,108,140,0.18);
        }

        /* ── Séparateur ── */
        .sdh-divider {
          width: 40px; height: 2px; border-radius: 999px;
          background: linear-gradient(90deg, #58b4da, rgba(255,255,255,0.25));
        }

        /* ── Bouton glassmorphisme ── */
        .sdh-btn {
          background: rgba(255,255,255,0.90);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.72);
          box-shadow: 0 6px 22px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.85) inset;
          color: #0e4d6a;
          font-weight: 700;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .sdh-btn:hover {
          background: #fff;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,1) inset;
        }

        /* ── Ligne déco gauche ── */
        @keyframes lineGrow {
          from { transform: scaleY(0); opacity: 0; }
          to   { transform: scaleY(1); opacity: 1; }
        }
        .sdh-line {
          transform-origin: top;
          animation: lineGrow 1.1s ease 0.5s both;
        }

        /* ── Scroll indicator ── */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(7px); opacity: 0.25; }
        }
        .sdh-scroll { animation: scrollBounce 1.9s ease-in-out infinite; }

        /* ── Tag catégorie ── */
        .sdh-cat-tag {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.20);
        }
      `}</style>

      {/* Image de fond */}
      <img
        src={
          service.image ||
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1800&q=80"
        }
        alt={service.title}
        className="sdh-bg absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="sdh-overlay absolute inset-0" />

      {/* Grille déco */}
      <div className="sdh-grid pointer-events-none absolute inset-0" />

      {/* Halo bleu */}
      <div className="sdh-halo pointer-events-none absolute inset-0" />

      {/* Ligne déco gauche */}
      <div
        className="sdh-line pointer-events-none absolute left-8 top-36 hidden h-[160px] w-[1px] lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.24), transparent)",
        }}
      />

      <div className="page-container relative z-10 flex min-h-[88vh] items-center px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className={`sdh-entry max-w-[600px] ${visible ? "show" : ""}`}>
          {/* Badge service */}
          {service.category && (
            <span
              className="sdh-badge mb-4 inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.26em]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {service.category}
            </span>
          )}

          {/* Titre */}
          <h1
            className="text-5xl font-bold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-[72px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {service.heroTitle || service.title}
          </h1>

          {/* Séparateur */}
          <div className="sdh-divider mt-5" />

          {/* Description */}
          <p
            className="mt-5 max-w-[500px] text-sm leading-[1.92] text-[#ebf1f4] sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {service.heroDescription}
          </p>

          {/* Tags / highlights */}
          {service.tags && service.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag, i) => (
                <span
                  key={i}
                  className="sdh-cat-tag rounded-full px-3 py-1 text-[11px] font-semibold text-white/78"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bouton */}
          <div className="mt-9">
            <a
              href="#service-detail-content"
              className="sdh-btn inline-flex items-center gap-2 rounded-[10px] px-7 py-3.5 text-sm"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.discoverService}
              <span style={{ fontSize: "15px" }}>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-40">
        <div
          className="sdh-scroll h-[28px] w-[1px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.85), transparent)",
          }}
        />
      </div>
    </section>
  );
};

export default MarketingBrandServiceDetailHero;