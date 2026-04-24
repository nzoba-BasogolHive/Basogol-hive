import React, { useEffect, useRef, useMemo, useState } from "react";
import partnerLogo from "../assets/basogollogo.png";
import christlandLogo from "../assets/apple-touch-icon.png";
import lengbeLogo from "../assets/LOGO1.png";
import eyeleLogo from "../assets/logo12.png";
import dibiyeLogo from "../assets/1 1.png";
import tf from "../assets/tf.png";
import va from "../assets/va.png";
import leftTopOverflow from "../assets/Untitled_2.png";
import { useLanguage } from "./LanguageContext";
import TBG1 from "../assets/TBG1.png";
import TBG2 from "../assets/Image36.webp";


const translations = {
  fr: {
    title: "Nos partenaires",
    description: "Nous collaborons avec des partenaires et des marques qui nous font confiance pour concevoir des expériences digitales, créatives et stratégiques de qualité.",
  partners: [
  {
    id: 1,
    name: "Christland Tech",
    logo: christlandLogo,
    url: "https://christland.tech/",
  },
  {
    id: 2,
    name: "Lengbe Africa",
    logo: lengbeLogo,
    url: "https://www.tiktok.com/@lengbe.africa/photo/7624463851299294482",
  },
  {
    id: 3,
    name: "Eyélé",
    logo: eyeleLogo,
    url: "#",
  },
  {
    id: 4,
    name: "Dibiye",
    logo: dibiyeLogo,
    url: "https://dibiye.com/",
  },
  {
    id: 5,
    name: "va",
    logo: va,
    url: "https://va-studiio.de/",
  },
  {
    id: 6,
    name: "tf",
    logo: tf,
    url: "https://tanka-fonta.com/",
    
  },
    {
    id: 7,
    name: "tbg",
    logo: TBG1,
    url: "https://thebest-group.com/",
    
  },
      {
    id: 8,
    name: "Chefferie Bamougoum",
    logo: TBG2,
    url: "https://www.youtube.com/watch?v=p94H1vpTDf8&t=21s",
    
  },
],
    trusted: "Ils nous font confiance",
  },

  en: {
    title: "Our partners",
    description: "We collaborate with partners and brands who trust us to design high-quality digital, creative and strategic experiences.",
partners: [
  { id: 1, name: "Christland Tech", logo: christlandLogo },
  { id: 2, name: "Lengbe Africa", logo: lengbeLogo },
  { id: 3, name: "Eyélé", logo: eyeleLogo },
  { id: 4, name: "Dibiye", logo: dibiyeLogo },
  { id: 5, name: "va", logo:va },
  { id: 6, name: "tf", logo:tf },
  { id: 7, name: "TBG1", logo:TBG1},
  { id: 8, name: "TBG2", logo:TBG2},
  
],
    trusted: "They trust us",
  },
};

const PartnersSection = () => {
  const { lang } = useLanguage();
  const t = useMemo(() => translations[lang] || translations.fr, [lang]);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.10 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const marqueePartners = [...t.partners, ...t.partners, ...t.partners];

  return (
    <section
      ref={sectionRef}
      className="relative mb-10 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <style>{`
        .pt-title-entry {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .pt-title-entry.show { opacity: 1; transform: translateY(0); }

        .pt-band-entry {
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.85s ease 0.18s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.18s;
        }
        .pt-band-entry.show { opacity: 1; transform: translateY(0); }

        /* ── Bande ── */
        .pt-band {
          background: linear-gradient(135deg, #f0f6fa 0%, #e6f0f6 50%, #edf4f8 100%);
          border-top: 1px solid rgba(31,108,140,0.10);
          border-bottom: 1px solid rgba(31,108,140,0.10);
          box-shadow: 0 8px 40px rgba(31,108,140,0.08);
        }
        .pt-band-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #1f6c8c, #58b4da, #1f6c8c, transparent);
          opacity: 0.35;
        }

        /* ── Carte logo ── */
        .pt-card {
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(255,255,255,0.75);
          box-shadow: 0 4px 18px rgba(31,108,140,0.08);
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0;
        }
        .pt-card:hover {
          background: rgba(255,255,255,0.98);
          transform: translateY(-5px) scale(1.04);
          box-shadow: 0 14px 36px rgba(31,108,140,0.16);
        }

        /* ── Marquee desktop ── */
        .pt-marquee-wrap {
          overflow: hidden;
          flex: 1;
          mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%);
        }
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .pt-marquee-track {
          display: flex; gap: 16px; width: max-content;
          animation: marqueeScroll 28s linear infinite;
          padding: 14px 0;
        }
        .pt-marquee-track:hover { animation-play-state: paused; }

        /* ── Label colonne gauche ── */
        .pt-label-col {
          flex-shrink: 0; width: 200px; padding: 0 28px;
          display: flex; flex-direction: column;
          justify-content: center; gap: 10px;
          border-right: 1px solid rgba(31,108,140,0.12);
        }
        .pt-label-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg, #1f6c8c, #58b4da);
          animation: dotPulse 2.4s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(31,108,140,0.4); }
          50%       { transform: scale(1.3); box-shadow: 0 0 0 5px rgba(31,108,140,0); }
        }

        /* ── Grille mobile ── */
        .pt-mobile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .pt-mobile-card {
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(31,108,140,0.08);
          box-shadow: 0 2px 10px rgba(31,108,140,0.07);
          border-radius: 12px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Stats ── */
        .pt-stat {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .pt-stat.show { opacity: 1; transform: translateY(0); }

        @keyframes overflowShapeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(2deg); }
        }
        .pt-overflow-shape { animation: overflowShapeFloat 8s ease-in-out infinite; }
      `}</style>

      {/* Forme déco */}
      <img
        src={leftTopOverflow}
        alt="" aria-hidden="true"
        className="pt-overflow-shape pointer-events-none absolute -bottom-[42px] left-2 z-10 hidden w-[180px] opacity-90 md:block lg:w-[220px] xl:w-[270px]"
      />

      {/* ── Tout dans page-container ── */}
      <div className="page-container relative z-20">

        {/* En-tête */}
        <div className={`pt-title-entry flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${visible ? "show" : ""}`}>
          <div className="max-w-2xl">
            <h2
              className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-[52px] lg:leading-tight"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h2>
            <p
              className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>
          </div>

          <div className="flex gap-8">
            {[{ num: "8+", label: "Partenaires" }, { num: "100%", label: "Confiance" }].map((s, i) => (
              <div key={i} className={`pt-stat text-right ${visible ? "show" : ""}`} style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                <div className="text-3xl font-bold text-[#1f6c8c]" style={{ fontFamily: "Literata, serif" }}>{s.num}</div>
                <div className="mt-0.5 text-xs uppercase tracking-widest text-slate-400" style={{ fontFamily: "Literata, serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile : grille dans page-container ── */}
        <div className={`pt-band-entry mt-10 lg:hidden ${visible ? "show" : ""}`}>
          <div className="pt-band-line" />
          <div className="pt-band rounded-[14px] p-5 mt-0">
            <div className="pt-mobile-grid">
              {t.partners.map((partner) => (
                <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-mobile-card"
                aria-label={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{
                    height: "36px",
                    width: "auto",
                    maxWidth: "80px",
                    objectFit: "contain",
                    opacity: 0.70,
                  }}
                />
              </a>
              ))}
            </div>
          </div>
          <div className="pt-band-line mt-0" />
        </div>

      </div>

      {/* ── Desktop : bande pleine largeur (uniquement lg+) ── */}
      <div className={`pt-band-entry relative left-1/2 mt-10 hidden w-screen -translate-x-1/2 lg:block ${visible ? "show" : ""}`}>
        <div className="pt-band-line" />
        <div className="pt-band py-10">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="pt-label-col">
              <div className="pt-label-dot" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#1f6c8c]/65" style={{ fontFamily: "Literata, serif" }}>
                {t.trusted}
              </p>
              <div style={{ width: "28px", height: "2px", borderRadius: "999px", background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)", opacity: 0.45 }} />
              <div className="text-[26px] font-bold text-[#1f6c8c]" style={{ fontFamily: "Literata, serif" }}>
                {t.partners.length}<span className="ml-1 text-[13px] font-medium text-slate-400">logos</span>
              </div>
            </div>
            <div className="pt-marquee-wrap">
              <div className="pt-marquee-track">
                {marqueePartners.map((partner, i) => (
                  <a
                    key={i}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-card flex h-[100px] w-[160px] items-center justify-center rounded-[16px] px-5"
                    aria-label={partner.name}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      style={{
                        maxHeight: "42px",
                        width: "auto",
                        objectFit: "contain",
                        opacity: 0.70,
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-band-line" />
      </div>

    </section>
  );
};

export default PartnersSection;