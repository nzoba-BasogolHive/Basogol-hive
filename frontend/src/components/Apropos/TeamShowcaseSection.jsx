import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import polygonOutline from "../../assets/Polygon8.png";
import unionHex from "../../assets/Union3.png";

const translations = {
  fr: {
    title: "Une équipe créative au service de votre croissance",
    intro:
      "Chez Basogol-Hive, nous réunissons des profils complémentaires en stratégie, design, marketing et technologie pour concevoir des solutions utiles, élégantes et performantes. Chaque projet est pensé avec méthode, créativité et exigence pour accompagner durablement votre développement.",
    button: "Équipe",
    members: [
      {
        name: "Sop",
        role: "CEO — Chief Executive Officer",
        text: "Sop définit la vision globale de Basogol-Hive, pilote les orientations stratégiques de l’entreprise et veille à la cohérence entre ambition, innovation et qualité d’exécution sur chaque projet.",
        image: "https://ui-avatars.com/api/?name=Sop&background=1f6c8c&color=ffffff&size=600",
      },
      {
        name: "Mongoue",
        role: "CTO — Chief Technology Officer",
        text: "Mongoue supervise l’architecture technique, le développement des plateformes et la qualité des solutions digitales afin de garantir des produits fiables, performants et évolutifs.",
        image: "https://ui-avatars.com/api/?name=Mongoue&background=1f6c8c&color=ffffff&size=600",
      },
      {
        name: "Bangsi",
        role: "CCO — Chief Creative Officer",
        text: "Bangsi dirige la vision créative de la marque, de l’identité visuelle aux contenus de communication, pour construire des expériences fortes, cohérentes et mémorables.",
        image: "https://ui-avatars.com/api/?name=Bangsi&background=1f6c8c&color=ffffff&size=600",
      },
      {
        name: "Noyou",
        role: "CSO — Chief Sales Officer",
        text: "Noyou pilote la stratégie commerciale, le développement des opportunités et la relation client afin de transformer la visibilité de l’entreprise en croissance concrète et durable.",
        image: "https://ui-avatars.com/api/?name=Noyou&background=1f6c8c&color=ffffff&size=600",
      },
    ],
  },

  en: {
    title: "A creative team dedicated to your growth",
    intro:
      "At Basogol-Hive, we bring together complementary talents in strategy, design, marketing and technology to create useful, elegant and high-performing solutions. Every project is approached with clarity, creativity and high standards to support your growth over time.",
    button: "Team",
    members: [
      {
        name: "Sop",
        role: "CEO — Chief Executive Officer",
        text: "Sop defines Basogol-Hive’s overall vision, leads the company’s strategic direction, and ensures strong alignment between ambition, innovation, and execution quality across every project.",
        image: "https://ui-avatars.com/api/?name=Sop&background=1f6c8c&color=ffffff&size=600",
      },
      {
        name: "Mongoue",
        role: "CTO — Chief Technology Officer",
        text: "Mongoue oversees technical architecture, platform development, and the quality of digital solutions to ensure reliable, scalable, and high-performing products.",
        image: "https://ui-avatars.com/api/?name=Mongoue&background=1f6c8c&color=ffffff&size=600",
      },
      {
        name: "Bangsi",
        role: "CCO — Chief Creative Officer",
        text: "Bangsi leads the brand’s creative vision, from visual identity to communication content, in order to build strong, consistent, and memorable experiences.",
        image: "https://ui-avatars.com/api/?name=Bangsi&background=1f6c8c&color=ffffff&size=600",
      },
      {
        name: "Noyou",
        role: "CSO — Chief Sales Officer",
        text: "Noyou leads the commercial strategy, business development, and client relationships to turn the company’s visibility into concrete and sustainable growth.",
        image: "https://ui-avatars.com/api/?name=Noyou&background=1f6c8c&color=ffffff&size=600",
      },
    ],
  },
};

// Rotation finale de chaque carte (position de repos)
const cardFinalRotations = [-5, 7, -3, 6];

// Point de départ de l'animation (hors écran)
const cardEntryOrigins = [
  { x: -200, y: 100, rotate: -30 },
  { x: -100, y: 180, rotate: 25  },
  { x: 100,  y: 180, rotate: -22 },
  { x: 200,  y: 100, rotate: 28  },
];

const TeamShowcaseSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false, false]);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => setTitleVisible(true), 0);
            [0, 1, 2, 3].forEach((i) => {
              setTimeout(() => {
                setCardsVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, 300 + i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f5f3] py-20 lg:py-24"
    >
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow:
            0 8px 32px rgba(31, 108, 140, 0.18),
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 -1px 0 rgba(31,108,140,0.08) inset;
        }

        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(
            140deg,
            rgba(255,255,255,0.45) 0%,
            rgba(255,255,255,0.0) 55%
          );
          pointer-events: none;
          z-index: 1;
        }

        .glass-card::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 15px;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.7),
            rgba(31,108,140,0.25)
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }

        .glass-card:hover::after {
          opacity: 1;
        }

        .glass-card:hover {
          box-shadow:
            0 20px 50px rgba(31, 108, 140, 0.28),
            0 1px 0 rgba(255,255,255,0.7) inset;
        }

        .avatar-ring {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, #ffffff 0%, #a8d4e8 50%, #1f6c8c 100%);
          box-shadow: 0 4px 16px rgba(31,108,140,0.30);
        }
        .avatar-ring img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: block;
        }

        .card-badge {
          position: absolute;
          top: -10px;
          right: 18px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1f6c8c, #2d9cbb);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(31,108,140,0.40);
          z-index: 10;
        }

        .card-divider {
          width: 36px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #1f6c8c, #a8d4e8);
          margin: 8px auto 0;
        }

        .glass-btn {
          background: linear-gradient(135deg, #1f6c8c 0%, #2a90b8 100%);
          border: 1px solid rgba(255,255,255,0.30);
          box-shadow:
            0 4px 14px rgba(31,108,140,0.35),
            0 1px 0 rgba(255,255,255,0.25) inset;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .glass-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 22px rgba(31,108,140,0.45),
            0 1px 0 rgba(255,255,255,0.30) inset;
        }
      `}</style>

      {/* Halo de fond */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(168,212,232,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Forme contour à gauche */}
      <img
        src={polygonOutline}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block z-0 left-[1px] top-[18px] w-[720px] max-w-none"
      />

      {/* Hexagones à droite */}
      <img
        src={unionHex}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute hidden lg:block z-0 right-[-6px] top-[300px] w-[450px] max-w-none"
      />

      <div className="page-container relative z-10">

        {/* Titre + intro */}
        <div
          className="mx-auto max-w-[900px] text-center"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-[56px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-[760px] text-sm leading-6 text-slate-800 sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.intro}
          </p>
        </div>

        {/* Cartes */}
        <div className="cards-row relative mx-auto mt-16 flex max-w-[1180px] flex-wrap items-end justify-center gap-6 lg:gap-0">
          {t.members.map((member, index) => {
            const origin = cardEntryOrigins[index];
            const finalRot = cardFinalRotations[index];
            const visible = cardsVisible[index];

            // Transform finale = rotation de repos de la carte
            const transformFinal = `rotate(${finalRot}deg)`;
            // Transform de départ = hors écran, rotation exagérée
            const transformStart = `translateX(${origin.x}px) translateY(${origin.y}px) rotate(${origin.rotate}deg) scale(0.82)`;

            return (
              <div
                key={index}
                className={`group relative min-h-[450px] w-[295px] rounded-[14px] px-5 pb-7 pt-8 glass-card ${
                  index !== 0 ? "lg:-ml-4" : ""
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? transformFinal : transformStart,
                  transition: [
                    `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
                    `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
                  ].join(", "),
                  // Hover géré en JS pour ne pas écraser le transform
                  willChange: "transform, opacity",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `rotate(${finalRot}deg) translateY(-6px) scale(1.04)`;
                  e.currentTarget.style.transition = "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = transformFinal;
                  e.currentTarget.style.transition = "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease";
                }}
              >
                {/* Badge numéro */}
                <span className="card-badge">{index + 1}</span>

                {/* Contenu */}
                <div className="relative z-[2]">

                  <div className="flex justify-center">
                    <div className="avatar-ring">
                      <img src={member.image} alt={member.name} />
                    </div>
                  </div>

                 <h3
                className="mt-5 text-center text-[15px] font-semibold text-[#0f3d52]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {member.name}
              </h3>

              <p
                className="mt-1 text-center text-[11px] font-medium text-[#1f6c8c]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {member.role}
              </p>

              <div className="card-divider" />

                 <p
                  className="mx-auto mt-5 max-w-[220px] text-center text-[12px] leading-[2] text-slate-700"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {member.text}
                </p>

                 <span
                  className="mt-8 text-center text-[12px] font-semibold uppercase tracking-[0.28em] text-slate-400"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.button}
                  </span>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TeamShowcaseSection;