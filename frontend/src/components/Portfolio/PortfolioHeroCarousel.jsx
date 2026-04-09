import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Layers3 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const translations = {
  fr: {
    badge: "Notre portfolio",
    title: "Des réalisations pensées pour créer de l’impact, de la clarté et de la valeur",
    description:
      "Nous réunissons stratégie, design et exécution pour créer des projets qui traduisent une vision forte. Explorez nos réalisations marketing et technologiques à travers une sélection construite avec exigence.",
    primaryCta: "Qui somme nous",
    secondaryCta: "Nous contacter",
    floatingLabel: "Sélection",
    cardTitle: "Des projets conçus avec exigence",
    cardText:
      "Chaque réalisation reflète une approche précise, une direction claire et une exécution maîtrisée au service de l’impact.",
    stat1: "Stratégie",
    stat2: "Design",
    stat3: "Exécution",
    imageAlt: "Hero portfolio avec architecture moderne",
    leftMiniTitle: "Vision",
    leftMiniText: "Direction clarifiée",
    rightMiniTitle: "Résultat",
    rightMiniText: "Impact mesurable",
  },
  en: {
    badge: "Our portfolio",
    title: "Projects designed to create impact, clarity and long-term value",
    description:
      "We bring strategy, design and execution together to craft projects that express a strong vision. Explore our marketing and technology work through a curated selection built with high standards.",
    primaryCta: "Who we are",
    secondaryCta: "Contact us",
    floatingLabel: "Selection",
    cardTitle: "Projects crafted with high standards",
    cardText:
      "Each project reflects a precise approach, a clear direction and controlled execution in service of impact.",
    stat1: "Strategy",
    stat2: "Design",
    stat3: "Execution",
    imageAlt: "Portfolio hero with modern architecture",
    leftMiniTitle: "Vision",
    leftMiniText: "Clear direction",
    rightMiniTitle: "Outcome",
    rightMiniText: "Measurable impact",
  },
};

const PortfolioHeroCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="portfolio-hero"
      data-page-hero
      className="relative min-h-[94vh] overflow-hidden bg-[#f4f4f1]"
    >
      <style>{`
        .pfh-bg {
          transition: transform 10s ease;
        }
        section:hover .pfh-bg {
          transform: scale(1.04);
        }

        .pfh-overlay {
          background:
            linear-gradient(
              90deg,
              rgba(244,244,241,0.92) 0%,
              rgba(244,244,241,0.68) 32%,
              rgba(244,244,241,0.24) 60%,
              rgba(244,244,241,0.80) 100%
            );
        }

        .pfh-grid {
          background-image:
            linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px);
          background-size: 54px 54px;
        }

        .pfh-halo-left {
          background: radial-gradient(
            ellipse 46% 56% at 18% 52%,
            rgba(31,108,140,0.10) 0%,
            transparent 68%
          );
        }

        .pfh-halo-right {
          background: radial-gradient(
            ellipse 38% 42% at 80% 30%,
            rgba(168,212,232,0.16) 0%,
            transparent 70%
          );
        }

        .pfh-text-entry {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.95s ease, transform 0.95s cubic-bezier(0.22,1,0.36,1);
        }
        .pfh-text-entry.show {
          opacity: 1;
          transform: translateX(0);
        }

        .pfh-visual-entry {
          opacity: 0;
          transform: translateX(28px) scale(0.96);
          transition: opacity 1s ease 0.16s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.16s;
        }
        .pfh-visual-entry.show {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .pfh-badge {
          background: rgba(255,255,255,0.52);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.72);
          box-shadow: 0 4px 18px rgba(31,108,140,0.08);
          color: #1f6c8c;
        }

        .pfh-divider {
          width: 42px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #1f6c8c, #a8d4e8);
        }

        .pfh-btn-primary {
          background: linear-gradient(135deg, #1f6c8c, #2a90b8);
          border: 1px solid rgba(255,255,255,0.28);
          box-shadow: 0 10px 28px rgba(31,108,140,0.24);
          color: white;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .pfh-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(31,108,140,0.34);
        }

        .pfh-btn-secondary {
          background: rgba(255,255,255,0.68);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.84);
          color: #0f172a;
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .pfh-btn-secondary:hover {
          background: rgba(255,255,255,0.92);
          transform: translateY(-3px);
        }

        .pfh-main-card {
          background: rgba(255,255,255,0.48);
          backdrop-filter: blur(18px) saturate(145%);
          -webkit-backdrop-filter: blur(18px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.66);
          box-shadow:
            0 18px 46px rgba(31,108,140,0.10),
            0 1px 0 rgba(255,255,255,0.82) inset;
        }

        .pfh-mini-card {
          background: rgba(255,255,255,0.62);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.74);
          box-shadow:
            0 12px 30px rgba(31,108,140,0.09),
            0 1px 0 rgba(255,255,255,0.84) inset;
        }

        .pfh-icon-wrap {
          background: linear-gradient(135deg, rgba(31,108,140,0.14), rgba(168,212,232,0.18));
          border: 1px solid rgba(31,108,140,0.12);
        }

        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .pfh-float {
          animation: floatSoft 7s ease-in-out infinite;
        }

        @keyframes pulseHalo {
          0%, 100% { transform: scale(1); opacity: 0.16; }
          50% { transform: scale(1.08); opacity: 0.26; }
        }
        .pfh-pulse {
          animation: pulseHalo 6.5s ease-in-out infinite;
        }

        .pfh-line {
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.16), transparent);
        }

        @keyframes scrollLine {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(7px); opacity: 0.22; }
        }
        .pfh-scroll {
          animation: scrollLine 1.9s ease-in-out infinite;
        }

        .pfh-mini-left {
          z-index: 30;
        }
        .pfh-main-wrap {
          z-index: 20;
        }
        .pfh-mini-right {
          z-index: 30;
        }

        @media (min-width: 1024px) {
          .pfh-mini-left {
            left: 2%;
            top: 11%;
          }
          .pfh-mini-right {
            right: 0%;
            bottom: 10%;
          }
        }
      `}</style>

      <img
        src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80"
        alt={t.imageAlt}
        className="pfh-bg absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="pfh-overlay absolute inset-0" />
      <div className="pfh-grid pointer-events-none absolute inset-0" />
      <div className="pfh-halo-left pointer-events-none absolute inset-0" />
      <div className="pfh-halo-right pointer-events-none absolute inset-0" />

      <div className="pfh-line absolute left-8 top-1/2 hidden h-[150px] w-[1px] -translate-y-1/2 lg:block" />
      <div className="pfh-line absolute right-8 top-1/2 hidden h-[150px] w-[1px] -translate-y-1/2 lg:block" />

      <div className="page-container relative z-10 flex min-h-[94vh] items-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.03fr]">
          <div className={`pfh-text-entry max-w-[660px] ${visible ? "show" : ""}`}>
            <span
              className="pfh-badge inline-flex rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.badge}
            </span>

          <h1
  className="mt-5 text-[30px] font-bold leading-[1.50] tracking-tight text-slate-950 text-md sm:text-[52px] md:text-5xl xl:text-6xl"
  style={{ fontFamily: "Literata, serif" }}
>
              {t.title}
            </h1>

            <div className="pfh-divider mt-5" />

            <p
              className="mt-5 max-w-[570px] text-sm leading-[1.92] text-slate-700 sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/about"
                className="pfh-btn-primary inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-3.5 text-sm font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.primaryCta}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>

              <a
                href="/contact"
                className="pfh-btn-secondary inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-sm font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <div
            className={`pfh-visual-entry relative flex min-h-[470px] items-center justify-center lg:min-h-[580px] ${visible ? "show" : ""}`}
          >
            <div
              className="pfh-pulse pointer-events-none absolute rounded-full"
              style={{
                width: "380px",
                height: "380px",
                background:
                  "radial-gradient(circle, rgba(31,108,140,0.16) 0%, transparent 70%)",
              }}
            />

            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                width: "320px",
                height: "320px",
                border: "1px solid rgba(31,108,140,0.08)",
              }}
            />
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                width: "430px",
                height: "430px",
                border: "1px solid rgba(31,108,140,0.05)",
              }}
            />

            <div className="pfh-mini-card pfh-mini-left absolute hidden rounded-[18px] px-5 py-4 lg:block">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1f6c8c]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.leftMiniTitle}
              </p>
              <p
                className="mt-2 text-[13px] leading-[1.6] text-slate-600"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.leftMiniText}
              </p>
            </div>

            <div className="pfh-main-wrap relative w-full max-w-[440px]">
              <div className="pfh-main-card pfh-float relative rounded-[28px] p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="pfh-icon-wrap flex h-14 w-14 items-center justify-center rounded-[16px]">
                    <Layers3 className="h-6 w-6 text-[#1f6c8c]" strokeWidth={1.8} />
                  </div>

                  <div className="rounded-full bg-white/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.20em] text-slate-500">
                    {t.floatingLabel}
                  </div>
                </div>

                <h3
                  className="mt-7 text-[24px] font-bold leading-tight text-slate-900"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.cardTitle}
                </h3>

                <p
                  className="mt-4 text-[13px] leading-[1.85] text-slate-600"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.cardText}
                </p>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  <div className="pfh-mini-card rounded-[16px] px-4 py-4 text-center">
                    <Sparkles className="mx-auto h-4 w-4 text-[#1f6c8c]" strokeWidth={1.8} />
                    <p className="mt-2 text-[11px] font-semibold text-slate-700">{t.stat1}</p>
                  </div>

                  <div className="pfh-mini-card rounded-[16px] px-4 py-4 text-center">
                    <Sparkles className="mx-auto h-4 w-4 text-[#1f6c8c]" strokeWidth={1.8} />
                    <p className="mt-2 text-[11px] font-semibold text-slate-700">{t.stat2}</p>
                  </div>

                  <div className="pfh-mini-card rounded-[16px] px-4 py-4 text-center">
                    <Sparkles className="mx-auto h-4 w-4 text-[#1f6c8c]" strokeWidth={1.8} />
                    <p className="mt-2 text-[11px] font-semibold text-slate-700">{t.stat3}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pfh-mini-card pfh-mini-right absolute hidden rounded-[18px] px-5 py-4 lg:block">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1f6c8c]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.rightMiniTitle}
              </p>
              <p
                className="mt-2 text-[13px] leading-[1.6] text-slate-600"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.rightMiniText}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <div
          className="pfh-scroll h-[28px] w-[1px] rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(15,23,42,0.8), transparent)",
          }}
        />
      </div>
    </section>
  );
};

export default PortfolioHeroCarousel;