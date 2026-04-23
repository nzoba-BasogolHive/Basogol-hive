import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import unionVisual from "../../assets/Union1.png";
import polygonShape from "../../assets/Polygon7.png";
import { useNavigate } from "react-router-dom";

const introVideoFr = "/videos/IntroBASOGOL-HIVEfrançais.mp4";
const introVideoEn  = "/videos/IntroBASOGOL-HIVEPréviewanglaise.mp4";

const translations = {
  fr: {
    title: "Là où la Technologie, le Marketing et le Branding se relient avec cohérence",
    paragraphs: [
      "Basogol-Hive est un studio créatif & tech. Nés des racines, tournés vers le futur, nous avançons à travers des cellules agiles, spécialisées, parfaitement alignées.",
      "Parce qu’une idée ne vaut que si elle tient, nous construisons la technologie à travers des produits web & mobile, plateformes, expériences digitales.",
      "Parce qu’un produit ne marque que s’il est compris et désiré, nous donnons forme à la marque en articulant stratégie, identité, UI/UX, contenus, motion & vidéo.",
      "Chez nous, tout se relie. De l’idée au produit. Du produit à l’image.",
      "One Hive. Many skills.",
    ],
    topVisualAlt: "Composition visuelle décorative",
    videoLabel: "Vidéo de présentation de Basogol Hive",
    cta1: "Découvrir",
    cta2: "Nous contacter",
  },
  en: {
    title: "Where Technology, Marketing and Branding connect with clarity",
    paragraphs: [
      "Basogol-Hive is a creative & tech studio. Rooted in our origins and oriented toward the future, we move forward through agile, specialized and perfectly aligned cells.",
      "Because an idea only matters if it holds, we build technology through web & mobile products, platforms and digital experiences.",
      "Because a product only leaves a mark if it is understood and desired, we shape the brand through strategy, identity, UI/UX, content, motion and video.",
      "Everything connects here. From idea to product. From product to image.",
      "One Hive. Many skills.",
    ],
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
  const videoRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideo = lang === "fr" ? introVideoFr : introVideoEn;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [lang]);

  const handlePlayVideo = async () => {
    if (!videoRef.current) return;

    try {
      await videoRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Impossible de lancer la vidéo :", error);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-shell relative overflow-hidden bg-[#f7f7f5]"
    >
      <style>{`
        .about-halo {
          background: radial-gradient(
            ellipse 70% 55% at 55% 40%,
            rgba(168,212,232,0.28) 0%,
            transparent 70%
          );
        }

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

        .union-float {
          animation: unionFloat 5s ease-in-out infinite;
        }
        @keyframes unionFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
        }

        .video-glass-frame {
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.50);
          box-shadow:
            0 12px 40px rgba(31,108,140,0.16),
            0 1px 0 rgba(255,255,255,0.60) inset;
        }

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

        .text-entry {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .text-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        .img-entry {
          opacity: 0;
          transform: translateX(30px) scale(0.96);
          transition: opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .img-entry.show {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

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

      <div className="about-halo pointer-events-none absolute inset-0 z-0" />

      <div className="page-container relative z-10">
       <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24 xl:gap-28">
          <div className="pointer-events-none absolute right-[1060px] top-[-110px] hidden opacity-[0.06] lg:block">
            <div
              className="text-[490px] font-black leading-none text-slate-400 xl:text-[950px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              "
            </div>
          </div>

         <div
          className={`text-entry relative z-10 max-w-[860px] pt-8 lg:pl-14 lg:pt-12 xl:pl-20 ${
            visible ? "show" : ""
          }`}
        >
            <h2
              className="text-xl font-bold leading-tight text-black sm:text-4xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h2>

            <div className="mt-6 max-w-[760px] space-y-5">
              {t.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-[15px] leading-[2] text-slate-700 sm:text-[16px] ${
                    index === t.paragraphs.length - 1
                      ? "font-bold text-[#0b2530]"
                      : ""
                  }`}
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

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

          <div
            className={`img-entry relative flex items-center justify-center lg:justify-end ${
              visible ? "show" : ""
            }`}
          >
            <img
              src={unionVisual}
              alt={t.topVisualAlt}
              className="union-float w-[220px] max-w-none object-contain sm:w-[280px] lg:w-[340px] xl:w-[400px]"
            />
          </div>
        </div>

        <div
          className={`video-entry relative mt-14 min-h-[320px] sm:min-h-[430px] lg:mt-16 lg:min-h-[560px] ${
            visible ? "show" : ""
          }`}
        >
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

          <div className="video-glass-frame relative z-10 w-full rounded-[12px] p-[5px]">
            <div className="relative overflow-hidden rounded-[8px]">
              <video
                ref={videoRef}
                className="block h-[280px] w-full object-cover sm:h-[380px] lg:h-[580px] xl:h-[720px]"
                controls={isPlaying}
                playsInline
                preload="metadata"
                aria-label={t.videoLabel}
              >
                <source src={currentVideo} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>

              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlayVideo}
                  className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                  aria-label={t.videoLabel}
                >
                  <div className="play-badge">
                    <div className="ml-1 h-0 w-0 border-b-[11px] border-l-[18px] border-t-[11px] border-b-transparent border-l-white border-t-transparent opacity-90" />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntroSection;