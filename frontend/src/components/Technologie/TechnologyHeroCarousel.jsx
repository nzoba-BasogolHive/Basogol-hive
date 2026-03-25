import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import techIcon from "../../assets/Union1.png";
import sideCardTop from "../../assets/Group14.png";
import sideCardBottom from "../../assets/Group9.png";

const translations = {
  fr: {
    title: "Technologie",
    description:
      "Nous développons des solutions digitales modernes, fiables et évolutives pour transformer les idées en expériences concrètes. De la conception technique au déploiement, nous créons des outils performants adaptés à vos objectifs.",
    primaryCta: "Découvrir",
    secondaryCta: "Nous contacter",
    imageAlt: "Image hero de la page technologie",
    techIconAlt: "Icône technologique",
    topCardAlt: "Visuel technologique secondaire",
    bottomCardAlt: "Visuel technologique complémentaire",
    badge: "Technologie",
  },
  en: {
    title: "Technology",
    description:
      "We build modern, reliable and scalable digital solutions that turn ideas into concrete experiences. From technical design to deployment, we create high-performing tools tailored to your goals.",
    primaryCta: "Discover",
    secondaryCta: "Contact us",
    imageAlt: "Technology page hero image",
    techIconAlt: "Technology icon",
    topCardAlt: "Secondary technology visual",
    bottomCardAlt: "Complementary technology visual",
    badge: "Technology",
  },
};

const TechnologyHeroCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="technology-hero"
      data-page-hero
      className="relative min-h-[92vh] overflow-hidden bg-[#060f1a]"
    >
      <style>{`
        /* ── Image de fond ── */
        .th-bg { transition: transform 9s ease; }
        section:hover .th-bg { transform: scale(1.04); }

        /* ── Overlay ── */
        .th-overlay {
          background: linear-gradient(
            135deg,
            rgba(4,15,28,0.82) 0%,
            rgba(8,28,50,0.65) 50%,
            rgba(4,15,28,0.45) 100%
          );
        }

        /* ── Halo tech bleu ── */
        .th-halo-blue {
          background: radial-gradient(
            ellipse 55% 60% at 75% 55%,
            rgba(31,108,140,0.25) 0%,
            transparent 68%
          );
        }

        /* ── Halo rose accent ── */
        .th-halo-pink {
          background: radial-gradient(
            ellipse 40% 35% at 80% 80%,
            rgba(255,47,146,0.12) 0%,
            transparent 65%
          );
        }

        /* ── Grille décorative ── */
        .th-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ── Entrée texte ── */
        .th-text-entry {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .th-text-entry.show { opacity: 1; transform: translateX(0); }

        /* ── Entrée visuel ── */
        .th-visual-entry {
          opacity: 0;
          transform: translateX(30px) scale(0.94);
          transition: opacity 0.95s ease 0.18s, transform 0.95s cubic-bezier(0.22,1,0.36,1) 0.18s;
        }
        .th-visual-entry.show { opacity: 1; transform: translateX(0) scale(1); }

        /* ── Badge glassmorphisme ── */
        .th-badge {
          background: rgba(31,108,140,0.20);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(31,108,140,0.40);
          box-shadow: 0 2px 12px rgba(31,108,140,0.15), 0 1px 0 rgba(255,255,255,0.08) inset;
          color: rgba(168,212,232,0.95);
        }

        /* ── Séparateur ── */
        .th-divider {
          width: 40px; height: 2px; border-radius: 999px;
          background: linear-gradient(90deg, #58b4da, rgba(255,47,146,0.60));
        }

        /* ── Bouton primaire ── */
        .th-btn-primary {
          background: linear-gradient(135deg, rgba(31,108,140,0.88), rgba(42,144,184,0.84));
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(88,180,218,0.40);
          box-shadow: 0 6px 22px rgba(31,108,140,0.40), 0 1px 0 rgba(255,255,255,0.12) inset;
          color: #fff;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .th-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(31,108,140,0.52), 0 1px 0 rgba(255,255,255,0.16) inset;
        }

        /* ── Bouton secondaire ── */
        .th-btn-secondary {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.82);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .th-btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-3px);
        }

        /* ── Icône float ── */
        @keyframes techFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          30%       { transform: translateY(-14px) rotate(2deg) scale(1.018); }
          65%       { transform: translateY(-7px) rotate(-1.5deg) scale(1.01); }
        }
        @keyframes techGlow {
          0%, 100% { filter: drop-shadow(0 0 0px rgba(31,108,140,0)); }
          50%       { filter: drop-shadow(0 0 28px rgba(31,108,140,0.40)); }
        }
        .th-icon-float {
          animation: techFloat 7s ease-in-out infinite, techGlow 7s ease-in-out infinite;
        }

        /* ── Losange ── */
        @keyframes diamondFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-12px) rotate(3deg); }
        }
        .th-diamond { animation: diamondFloat 8s ease-in-out infinite; }

        /* ── Mini cards ── */
        .th-mini-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.18);
          box-shadow: 0 8px 28px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.10) inset;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .th-mini-card:hover {
          background: rgba(255,255,255,0.14);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 14px 38px rgba(0,0,0,0.30), 0 1px 0 rgba(255,255,255,0.15) inset;
        }

        /* ── Lignes roses bas ── */
        .th-line-1 {
          position: absolute;
          bottom: 16px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #ff2f92, transparent);
          opacity: 0.70;
        }
        .th-line-2 {
          position: absolute;
          bottom: 32px; left: 0;
          width: 65%;
          height: 1.5px;
          background: linear-gradient(90deg, #ff2f92, transparent);
          transform: rotate(5deg);
          transform-origin: left;
          opacity: 0.45;
        }

        /* ── Halo icône ── */
        @keyframes iconHalo {
          0%, 100% { transform: scale(1); opacity: 0.20; }
          50%       { transform: scale(1.10); opacity: 0.35; }
        }
        .th-icon-halo { animation: iconHalo 7s ease-in-out infinite; }

        /* ── Scroll indicator ── */
        @keyframes scrollLine {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(7px); opacity: 0.25; }
        }
        .th-scroll { animation: scrollLine 2s ease-in-out infinite; }

        /* ── Points décoratifs ── */
        @keyframes dotPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.4); }
        }
        .th-dot-1 { animation: dotPulse 3s ease-in-out infinite; }
        .th-dot-2 { animation: dotPulse 3s ease-in-out infinite 0.8s; }
        .th-dot-3 { animation: dotPulse 3s ease-in-out infinite 1.6s; }
      `}</style>

      {/* Image de fond — photo tech circuit/code */}
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80"
        alt={t.imageAlt}
        className="th-bg absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay sombre */}
      <div className="th-overlay absolute inset-0" />

      {/* Grille décorative */}
      <div className="th-grid pointer-events-none absolute inset-0" />

      {/* Halos */}
      <div className="th-halo-blue pointer-events-none absolute inset-0" />
      <div className="th-halo-pink pointer-events-none absolute inset-0" />

      {/* Lignes roses bas */}
      <div className="th-line-1" />
      <div className="th-line-2" />

      {/* Contenu */}
      <div className="page-container relative z-10 flex min-h-[92vh] items-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">

          {/* ── Texte gauche ── */}
          <div className={`th-text-entry max-w-[560px] ${visible ? "show" : ""}`}>

            {/* Badge */}
            <span
              className="th-badge inline-flex rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px]"
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
            <div className="th-divider mt-5" />

            {/* Description */}
            <p
              className="mt-5 max-w-[500px] text-sm leading-[1.9] text-white/65 sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            {/* Boutons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/portfolio"
                className="th-btn-primary inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-sm font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.primaryCta}
              </a>
              <a
                href="/contact"
                className="th-btn-secondary inline-flex items-center justify-center rounded-[10px] px-7 py-3.5 text-sm font-semibold"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.secondaryCta}
              </a>
            </div>

            {/* Points décoratifs */}
            <div className="mt-10 flex items-center gap-3">
              <div className="th-dot-1 h-[6px] w-[6px] rounded-full bg-[#58b4da]" />
              <div className="th-dot-2 h-[6px] w-[6px] rounded-full bg-[#ff2f92]" />
              <div className="th-dot-3 h-[6px] w-[6px] rounded-full bg-[#58b4da]" />
            </div>
          </div>

          {/* ── Visuel droite ── */}
          <div className={`th-visual-entry relative flex min-h-[480px] items-center justify-center lg:min-h-[540px] ${visible ? "show" : ""}`}>

            {/* Halo derrière l'icône */}
            <div
              className="th-icon-halo pointer-events-none absolute rounded-full"
              style={{ width: "360px", height: "360px", background: "radial-gradient(circle, rgba(31,108,140,0.22) 0%, transparent 70%)" }}
            />

            {/* Cercles déco */}
            <div className="pointer-events-none absolute rounded-full" style={{ width: "300px", height: "300px", border: "1px solid rgba(88,180,218,0.12)" }} />
            <div className="pointer-events-none absolute rounded-full" style={{ width: "400px", height: "400px", border: "1px solid rgba(88,180,218,0.06)" }} />

            {/* Losange */}
            <div
              className="th-diamond pointer-events-none absolute left-[12%] top-[8%] z-0 hidden lg:block"
              style={{
                height: "340px", width: "130px",
                background: "linear-gradient(180deg, #c5f6ff 0%, #0c1421 55%, #ff0f7a 100%)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                filter: "drop-shadow(0 20px 36px rgba(0,0,0,0.40))",
                opacity: 0.85,
              }}
            />

            {/* Icône centrale flottante */}
            <img
              src={techIcon}
              alt={t.techIconAlt}
              className="th-icon-float relative z-10 w-[200px] object-contain sm:w-[260px] lg:w-[320px] xl:w-[380px]"
            />

            {/* Mini card haut */}
            <div className="th-mini-card absolute right-[2%] top-[50%] z-20 hidden rounded-[14px] p-3 lg:block">
              <img src={sideCardTop} alt={t.topCardAlt} className="h-[60px] w-[60px] object-contain" />
            </div>

            {/* Mini card bas */}
            <div className="th-mini-card absolute right-[4%] top-[65%] z-20 hidden rounded-[14px] p-3 lg:block">
              <img src={sideCardBottom} alt={t.bottomCardAlt} className="h-[60px] w-[60px] object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div
          className="th-scroll h-[28px] w-[1px] rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)" }}
        />
      </div>

    </section>
  );
};

export default TechnologyHeroCarousel;