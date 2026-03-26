import React, { useEffect, useState } from "react";
import { ArrowRight, Layers3, Sparkles } from "lucide-react";
import { useLanguage } from "../LanguageContext";

const translations = {
  fr: {
    badge: "Notre Processus",
    title: "Une méthode claire pour concevoir, structurer et faire avancer chaque projet",
    description:
      "Nous accompagnons chaque mission avec une approche rigoureuse et fluide. De l’analyse initiale à la livraison finale, notre process garantit une vision claire, des choix cohérents et une exécution pensée pour durer.",
    primaryCta: "Découvrir le process",
    secondaryCta: "Nous contacter",
    imageAlt: "Hero process avec architecture lumineuse",
    floatingTop: "Méthode",
    stat1: "Analyse",
    stat2: "Stratégie",
    stat3: "Exécution",
  },
  en: {
    badge: "Our process",
    title: "A clear method to design, structure and move every project forward",
    description:
      "We guide every mission with a rigorous and fluid approach. From initial analysis to final delivery, our process ensures a clear vision, consistent choices and execution built to last.",
    primaryCta: "Discover the process",
    secondaryCta: "Contact us",
    imageAlt: "Process hero with bright architectural background",
    floatingTop: "Method",
    stat1: "Analysis",
    stat2: "Strategy",
    stat3: "Execution",
  },
};

const ProcessesHeroCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="processes-hero"
      data-page-hero
      className="relative min-h-[94vh] overflow-hidden bg-[#f5f5f2]"
    >
      <style>{`
        .prh-bg {
          transition: transform 9s ease;
        }
        section:hover .prh-bg {
          transform: scale(1.04);
        }

        .prh-overlay {
          background: linear-gradient(
            90deg,
            rgba(245,245,242,0.88) 0%,
            rgba(245,245,242,0.58) 34%,
            rgba(245,245,242,0.18) 62%,
            rgba(245,245,242,0.78) 100%
          );
        }

        .prh-grid {
          background-image:
            linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        .prh-halo-left {
          background: radial-gradient(
            ellipse 46% 56% at 18% 50%,
            rgba(31,108,140,0.12) 0%,
            transparent 68%
          );
        }

        .prh-halo-right {
          background: radial-gradient(
            ellipse 38% 42% at 80% 30%,
            rgba(168,212,232,0.16) 0%,
            transparent 70%
          );
        }

        .prh-text-entry {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.95s ease, transform 0.95s cubic-bezier(0.22,1,0.36,1);
        }
        .prh-text-entry.show {
          opacity: 1;
          transform: translateX(0);
        }

        .prh-visual-entry {
          opacity: 0;
          transform: translateX(30px) scale(0.96);
          transition: opacity 1s ease 0.18s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.18s;
        }
        .prh-visual-entry.show {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .prh-badge {
          background: rgba(255,255,255,0.52);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.72);
          box-shadow: 0 4px 18px rgba(31,108,140,0.08);
          color: #1f6c8c;
        }

        .prh-divider {
          width: 42px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #1f6c8c, #a8d4e8);
        }

        .prh-btn-primary {
          background: linear-gradient(135deg, #1f6c8c, #2a90b8);
          border: 1px solid rgba(255,255,255,0.28);
          box-shadow: 0 10px 28px rgba(31,108,140,0.24);
          color: white;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .prh-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(31,108,140,0.34);
        }

        .prh-btn-secondary {
          background: rgba(255,255,255,0.68);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.84);
          color: #0f172a;
          box-shadow: 0 8px 24px rgba(0,0,0,0.07);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .prh-btn-secondary:hover {
          background: rgba(255,255,255,0.92);
          transform: translateY(-3px);
        }

        .prh-floating-card {
          background: rgba(255,255,255,0.58);
          backdrop-filter: blur(16px) saturate(145%);
          -webkit-backdrop-filter: blur(16px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.68);
          box-shadow:
            0 12px 34px rgba(31,108,140,0.10),
            0 1px 0 rgba(255,255,255,0.82) inset;
        }

        .prh-main-card {
          background: rgba(255,255,255,0.42);
          backdrop-filter: blur(18px) saturate(145%);
          -webkit-backdrop-filter: blur(18px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.60);
          box-shadow:
            0 18px 46px rgba(31,108,140,0.10),
            0 1px 0 rgba(255,255,255,0.80) inset;
        }

        .prh-icon-wrap {
          background: linear-gradient(135deg, rgba(31,108,140,0.14), rgba(168,212,232,0.18));
          border: 1px solid rgba(31,108,140,0.12);
        }

        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .prh-float {
          animation: floatSoft 7s ease-in-out infinite;
        }

        @keyframes pulseHalo {
          0%, 100% { transform: scale(1); opacity: 0.16; }
          50% { transform: scale(1.08); opacity: 0.26; }
        }
        .prh-pulse {
          animation: pulseHalo 6.5s ease-in-out infinite;
        }

        .prh-line {
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.16), transparent);
        }

        @keyframes scrollLine {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(7px); opacity: 0.22; }
        }
        .prh-scroll {
          animation: scrollLine 1.9s ease-in-out infinite;
        }

        /* NOUVEAU: meilleur layering */
        .prh-side-card {
          z-index: 30;
        }

        .prh-main-card-wrap {
          z-index: 20;
        }

        @media (min-width: 1024px) {
          .prh-side-card-left {
            left: -2%;
            top: 10%;
          }

          .prh-side-card-right {
            right: -4%;
            bottom: 10%;
          }
        }
      `}</style>

      <img
        src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=80"
        alt={t.imageAlt}
        className="prh-bg absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="prh-overlay absolute inset-0" />
      <div className="prh-grid pointer-events-none absolute inset-0" />
      <div className="prh-halo-left pointer-events-none absolute inset-0" />
      <div className="prh-halo-right pointer-events-none absolute inset-0" />

      <div className="prh-line absolute left-8 top-1/2 hidden h-[150px] w-[1px] -translate-y-1/2 lg:block" />
      <div className="prh-line absolute right-8 top-1/2 hidden h-[150px] w-[1px] -translate-y-1/2 lg:block" />

      <div className="page-container relative z-10 flex min-h-[94vh] items-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div className={`prh-text-entry max-w-[620px] ${visible ? "show" : ""}`}>
            <span
              className="prh-badge inline-flex rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.badge}
            </span>

            <h1
              className="mt-5  font-bold leading-[0.96] tracking-tight text-slate-950 text-2xl sm:text-[52px] md:text-5xl xl:text-6xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h1>

            <div className="prh-divider mt-5" />

            <p
              className="mt-5 max-w-[540px] text-sm leading-[1.92] text-slate-700 sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#processes-content"
                className="prh-btn-primary inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-3.5 text-sm font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.primaryCta}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>

              <a
                href="/contact"
                className="prh-btn-secondary inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-sm font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          <div
            className={`prh-visual-entry relative flex min-h-[460px] items-center justify-center lg:min-h-[560px] ${visible ? "show" : ""}`}
          >
            <div
              className="prh-pulse pointer-events-none absolute rounded-full"
              style={{
                width: "360px",
                height: "360px",
                background:
                  "radial-gradient(circle, rgba(31,108,140,0.16) 0%, transparent 70%)",
              }}
            />

            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                width: "300px",
                height: "300px",
                border: "1px solid rgba(31,108,140,0.08)",
              }}
            />
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                width: "410px",
                height: "410px",
                border: "1px solid rgba(31,108,140,0.05)",
              }}
            />

            {/* PETITE CARTE GAUCHE -> AU-DESSUS */}
            <div className="prh-floating-card prh-side-card prh-side-card-left absolute hidden rounded-[18px] px-5 py-4 lg:block">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1f6c8c]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {lang === "fr" ? "Vision" : "Vision"}
              </p>
              <p
                className="mt-2 text-[13px] leading-[1.6] text-slate-600"
                style={{ fontFamily: "Literata, serif" }}
              >
                {lang === "fr" ? "Objectifs clarifiés" : "Clear objectives"}
              </p>
            </div>

            {/* GRANDE CARTE */}
            <div className="prh-main-card-wrap relative w-full max-w-[430px]">
              <div className="prh-main-card prh-float relative rounded-[26px] p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="prh-icon-wrap flex h-14 w-14 items-center justify-center rounded-[16px]">
                    <Layers3 className="h-6 w-6 text-[#1f6c8c]" strokeWidth={1.8} />
                  </div>

                  <div className="rounded-full bg-white/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.20em] text-slate-500">
                    {t.floatingTop}
                  </div>
                </div>

                <h3
                  className="mt-7 text-[24px] font-bold leading-tight text-slate-900"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {lang === "fr"
                    ? "Un déroulé simple, lisible et maîtrisé"
                    : "A simple, readable and controlled workflow"}
                </h3>

                <p
                  className="mt-4 text-[13px] leading-[1.85] text-slate-600"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {lang === "fr"
                    ? "Chaque étape est pensée pour avancer avec clarté, aligner les décisions et garantir une exécution cohérente du début à la fin."
                    : "Each stage is designed to move forward with clarity, align decisions and ensure consistent execution from start to finish."}
                </p>

                <div className="mt-7 grid grid-cols-3 gap-3">
                  <div className="prh-floating-card rounded-[16px] px-4 py-4 text-center">
                    <Sparkles className="mx-auto h-4 w-4 text-[#1f6c8c]" strokeWidth={1.8} />
                    <p className="mt-2 text-[11px] font-semibold text-slate-700">{t.stat1}</p>
                  </div>

                  <div className="prh-floating-card rounded-[16px] px-4 py-4 text-center">
                    <Sparkles className="mx-auto h-4 w-4 text-[#1f6c8c]" strokeWidth={1.8} />
                    <p className="mt-2 text-[11px] font-semibold text-slate-700">{t.stat2}</p>
                  </div>

                  <div className="prh-floating-card rounded-[16px] px-4 py-4 text-center">
                    <Sparkles className="mx-auto h-4 w-4 text-[#1f6c8c]" strokeWidth={1.8} />
                    <p className="mt-2 text-[11px] font-semibold text-slate-700">{t.stat3}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PETITE CARTE DROITE -> AU-DESSUS */}
            <div className="prh-floating-card prh-side-card prh-side-card-right absolute hidden rounded-[18px] px-5 py-4 lg:block">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1f6c8c]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {lang === "fr" ? "Résultat" : "Outcome"}
              </p>
              <p
                className="mt-2 text-[13px] leading-[1.6] text-slate-600"
                style={{ fontFamily: "Literata, serif" }}
              >
                {lang === "fr" ? "Livraison cohérente" : "Consistent delivery"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <div
          className="prh-scroll h-[28px] w-[1px] rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(15,23,42,0.8), transparent)",
          }}
        />
      </div>
    </section>
  );
};

export default ProcessesHeroCarousel;