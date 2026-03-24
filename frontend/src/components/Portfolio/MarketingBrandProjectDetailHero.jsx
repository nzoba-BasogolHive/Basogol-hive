import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import brandIcon from "../../assets/ColorSwatchOutline.png";

const translations = {
  fr: {
    primaryCta: "Découvrir",
    secondaryCta: "Nous contacter",
    fallbackTitle: "Marketing & Brand",
    fallbackDescription:
      "Nous aidons les marques à construire une identité forte, une présence cohérente et une communication capable de créer de l'impact.",
    fallbackImageAlt: "Image du projet marketing",
    brandIconAlt: "Icône marketing et marque",
    badge: "Marketing & Brand",
  },
  en: {
    primaryCta: "Discover",
    secondaryCta: "Contact us",
    fallbackTitle: "Marketing & Brand",
    fallbackDescription:
      "We help brands build a strong identity, a consistent presence and communication that creates real impact.",
    fallbackImageAlt: "Marketing project image",
    brandIconAlt: "Marketing and brand icon",
    badge: "Marketing & Brand",
  },
};

const MarketingBrandProjectDetailHero = ({ project }) => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroImage = project?.heroImage || project?.image || "";
  const heroTitle = project?.heroTitle || project?.projectName || t.fallbackTitle;
  const heroDescription = project?.heroDescription || t.fallbackDescription;
  const heroBadge = project?.projectCategory || t.badge;
  const heroAlt = project?.projectName || t.fallbackImageAlt;

  return (
    <section
      id="marketing-brand-detail-hero"
      data-page-hero
      className="relative min-h-[92vh] overflow-hidden"
    >
      <style>{`
        .mb-overlay {
          background: linear-gradient(
            135deg,
            rgba(0,0,0,0.52) 0%,
            rgba(0,0,0,0.25) 50%,
            rgba(0,0,0,0.08) 100%
          );
        }

        .mb-halo {
          background: radial-gradient(
            ellipse 60% 70% at 15% 60%,
            rgba(31,108,140,0.28) 0%,
            transparent 65%
          );
        }

        .mb-badge {
          background: rgba(255,255,255,0.14);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.30);
          box-shadow: 0 2px 12px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.22) inset;
          color: rgba(255,255,255,0.90);
        }

        .mb-text-entry {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .mb-text-entry.show { opacity: 1; transform: translateX(0); }

        .mb-divider {
          width: 40px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0.80), rgba(255,255,255,0.20));
        }

        .mb-icon-entry {
          opacity: 0;
          transform: translateX(32px) scale(0.92);
          transition: opacity 0.95s ease 0.18s, transform 0.95s cubic-bezier(0.22,1,0.36,1) 0.18s;
        }
        .mb-icon-entry.show { opacity: 1; transform: translateX(0) scale(1); }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          30% { transform: translateY(-14px) rotate(3deg) scale(1.02); }
          60% { transform: translateY(-8px) rotate(-2deg) scale(1.015); }
          80% { transform: translateY(-12px) rotate(1.5deg) scale(1.01); }
        }

        .mb-icon-float {
          animation: iconFloat 7s ease-in-out infinite;
        }

        .mb-bg {
          transition: transform 9s ease;
        }

        section:hover .mb-bg {
          transform: scale(1.04);
        }
      `}</style>

      {heroImage && (
        <img
          src={heroImage}
          alt={heroAlt}
          className="mb-bg absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      <div className="mb-overlay absolute inset-0" />
      <div className="mb-halo pointer-events-none absolute inset-0" />

      <div className="page-container relative z-10 flex min-h-[92vh] items-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div className={`mb-text-entry max-w-[620px] ${visible ? "show" : ""}`}>
            <span
              className="mb-badge inline-flex rounded-full px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] sm:text-[11px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {heroBadge}
            </span>

            <h1
              className="mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[76px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {heroTitle}
            </h1>

            <div className="mb-divider mt-5" />

            <p
              className="mt-5 max-w-[520px] text-sm leading-[1.9] text-[#c7e2ef] sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {heroDescription}
            </p>
          </div>

          <div className={`mb-icon-entry relative flex items-center justify-center lg:justify-end ${visible ? "show" : ""}`}>
            <img
              src={brandIcon}
              alt={t.brandIconAlt}
              className="mb-icon-float relative z-10 w-[200px] object-contain sm:w-[260px] lg:w-[340px] xl:w-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingBrandProjectDetailHero;