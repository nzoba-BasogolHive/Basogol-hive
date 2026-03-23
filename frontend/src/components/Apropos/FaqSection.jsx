import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import faqCardsImage from "../../assets/Frame 212.png";
import questionShape from "../../assets/Questio.png";
import leftPolygon from "../../assets/Polygon.png";

const translations = {
  fr: {
    title: "FAQs",
    description:
      "Retrouvez ici les réponses aux questions les plus fréquentes concernant nos services, notre accompagnement et notre manière de collaborer avec les entreprises.",
    faqItems: [
      {
        title: "Quels types de services proposez-vous ?",
        content:
          "Nous proposons des services en technologie, branding, design, communication visuelle, développement web et mobile, logiciels sur mesure, production de contenus et accompagnement stratégique.",
      },
      {
        title: "Travaillez-vous avec les petites entreprises ?",
        content:
          "Oui, nous accompagnons aussi bien les petites entreprises que les marques en croissance et les structures plus établies, avec des solutions adaptées à chaque niveau de maturité.",
      },
      {
        title: "Pouvez-vous gérer un projet de A à Z ?",
        content:
          "Oui, nous pouvons intervenir de la stratégie à l'exécution complète : cadrage, design, développement, production de contenus, mise en ligne et suivi.",
      },
      {
        title: "Comment démarre une collaboration avec vous ?",
        content:
          "Nous commençons généralement par un échange pour comprendre votre besoin, votre objectif et votre contexte, puis nous vous proposons une approche claire avec les étapes du projet.",
      },
    ],
    faqVisualAlt: "Illustration FAQ",
  },
  en: {
    title: "FAQs",
    description:
      "Here you will find answers to the most common questions about our services, our support, and the way we collaborate with businesses.",
    faqItems: [
      {
        title: "What kind of services do you provide?",
        content:
          "We provide services in technology, branding, design, visual communication, web and mobile development, custom software, content production, and strategic support.",
      },
      {
        title: "Do you work with small businesses?",
        content:
          "Yes, we support small businesses, growing brands, and more established organizations with solutions tailored to their level of maturity.",
      },
      {
        title: "Can you handle a project from start to finish?",
        content:
          "Yes, we can support the full process from strategy to execution: scoping, design, development, content production, launch, and follow-up.",
      },
      {
        title: "How does a collaboration start with you?",
        content:
          "We usually begin with a discussion to understand your needs, your goals, and your context, then we propose a clear approach with the project steps.",
      },
    ],
    faqVisualAlt: "FAQ illustration",
  },
};

const FaqSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="section-shell relative overflow-visible bg-[#f7f7f5]"
    >
      <style>{`
        /* Entrée section */
        .faq-entry {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .faq-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Conteneur principal glassmorphisme doux */
        .faq-container {
          background: linear-gradient(135deg, rgba(61,139,181,0.88) 0%, rgba(31,115,155,0.92) 100%);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow:
            0 20px 60px rgba(20,90,130,0.22),
            0 1px 0 rgba(255,255,255,0.18) inset;
        }

        /* Items FAQ fond blanc */
        .faq-item {
          background: #ffffff;
          border: 1px solid rgba(31,108,140,0.07);
          box-shadow: 0 2px 12px rgba(31,108,140,0.07);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .faq-item:hover {
          box-shadow: 0 6px 22px rgba(31,108,140,0.12);
          border-color: rgba(31,108,140,0.14);
        }
        .faq-item.open {
          box-shadow: 0 8px 28px rgba(31,108,140,0.14);
          border-color: rgba(31,108,140,0.18);
        }

        /* Ligne colorée à gauche quand ouvert */
        .faq-item.open .faq-left-bar {
          opacity: 1;
          transform: scaleY(1);
        }
        .faq-left-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background: linear-gradient(to bottom, #3d8bb5, #a8d4e8);
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        /* Bouton toggle */
        .faq-toggle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .faq-toggle.closed {
          background: rgba(31,108,140,0.08);
          color: #1f6c8c;
          border: 1px solid rgba(31,108,140,0.15);
        }
        .faq-toggle.open-btn {
          background: linear-gradient(135deg, #3d8bb5, #2a90b8);
          color: #fff;
          box-shadow: 0 4px 12px rgba(31,108,140,0.30);
          border: 1px solid rgba(255,255,255,0.20);
        }

        /* Séparateur dans l'item ouvert */
        .faq-content-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(31,108,140,0.12), transparent);
          margin-bottom: 14px;
        }

        /* Titre section — séparateur doux */
        .faq-title-divider {
          width: 32px;
          height: 2px;
          border-radius: 999px;
          background: rgba(255,255,255,0.40);
          margin-top: 10px;
        }

        /* ── Animation questionShape ── */
        @keyframes questionFloat {
          0%, 100% {
            transform: translateY(-50%) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(calc(-50% - 10px)) rotate(3deg) scale(1.02);
          }
          50% {
            transform: translateY(calc(-50% - 6px)) rotate(-2deg) scale(1.015);
          }
          75% {
            transform: translateY(calc(-50% - 13px)) rotate(2.5deg) scale(1.01);
          }
        }

        @keyframes questionPulseGlow {
          0%, 100% { filter: drop-shadow(0 4px 12px rgba(31,108,140,0.0)); }
          50%       { filter: drop-shadow(0 8px 22px rgba(31,108,140,0.28)); }
        }

        .question-shape-anim {
          animation:
            questionFloat 6s ease-in-out infinite,
            questionPulseGlow 6s ease-in-out infinite;
        }
      `}</style>

      <div className="page-container">
        <div className="relative">

          {/* Forme gauche */}
          <img
            src={leftPolygon}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-[18px] bottom-50 z-0 hidden h-[260px] w-auto lg:block xl:h-[310px]"
          />

          {/* Conteneur principal */}
          <div className={`faq-entry faq-container relative z-10 overflow-visible rounded-[20px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14 ${visible ? "show" : ""}`}>

            {/* Point d'interrogation animé */}
            <img
              src={questionShape}
              alt=""
              aria-hidden="true"
              className="question-shape-anim pointer-events-none absolute -right-2 top-1/2 hidden w-[84px] lg:block xl:w-[108px]"
              style={{
                opacity: visible ? 0.88 : 0,
                transition: "opacity 1s ease 0.4s",
              }}
            />

            {/* En-tête : titre + image */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px] lg:gap-10 xl:grid-cols-[1fr_340px]">

              {/* Texte */}
              <div className="text-white">
                <h2
                  className="text-4xl font-medium tracking-tight sm:text-5xl"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.title}
                </h2>
                <div className="faq-title-divider" />
                <p
                  className="mt-5 max-w-2xl text-sm leading-7 text-white/85 sm:text-[15px]"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.description}
                </p>
              </div>

              {/* Image */}
              <div className="relative flex items-start justify-center lg:justify-end">
                <img
                  src={faqCardsImage}
                  alt={t.faqVisualAlt}
                  className="w-full max-w-[260px] object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.20)] xl:max-w-[300px]"
                />
              </div>
            </div>

            {/* Accordéon */}
            <div className="mt-10 space-y-3">
              {t.faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`faq-item relative overflow-hidden rounded-[12px] ${isOpen ? "open" : ""}`}
                  >
                    {/* Barre gauche colorée */}
                    <div className="faq-left-bar" />

                    {/* Bouton question */}
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                    >
                      <span
                        className="text-sm font-semibold text-slate-800 sm:text-[15px]"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {item.title}
                      </span>
                      <span className={`faq-toggle ${isOpen ? "open-btn" : "closed"}`}>
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {/* Contenu accordéon */}
                    <div
                      className={`grid transition-all duration-500 ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                          <div className="faq-content-divider" />
                          <p
                            className="text-sm leading-[1.85] text-slate-500"
                            style={{ fontFamily: "Literata, serif" }}
                          >
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;