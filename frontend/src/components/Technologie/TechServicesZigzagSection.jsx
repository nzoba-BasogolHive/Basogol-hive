import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import group7 from "../../assets/Group7.png";
import group9 from "../../assets/Group9.png";
import polygon1 from "../../assets/Polygon8.png";
import { technologyServices } from "../../data/technologyServices";

const translations = {
  fr: {
    badge: "Technologie",
    title: "Nos services tech",
    description:
      "Nous concevons, développons et maintenons des solutions digitales fiables et performantes adaptées à vos objectifs et à votre croissance.",
    learnMore: "En savoir plus",
    discover: "Nous contacter",
    service: "Service",
    tech: "Tech",
    stats: [
      { num: "7", label: "Services" },
      { num: "100%", label: "Sur mesure" },
      { num: "24/7", label: "Support" },
    ],
    approachBadge: "Notre approche tech",
    approachTitle: "Des solutions techniques pensées pour durer et performer",
    approachDescription:
      "Chaque solution que nous livrons est conçue avec rigueur, testée avec soin et maintenue dans le temps pour accompagner durablement votre activité.",
  },
  en: {
    badge: "Technology",
    title: "Our tech services",
    description:
      "We design, develop and maintain reliable and high-performing digital solutions tailored to your goals and growth.",
    learnMore: "Learn more",
    discover: "Contact us",
    service: "Service",
    tech: "Tech",
    stats: [
      { num: "7", label: "Services" },
      { num: "100%", label: "Custom" },
      { num: "24/7", label: "Support" },
    ],
    approachBadge: "Our tech approach",
    approachTitle: "Technical solutions designed to last and perform",
    approachDescription:
      "Every solution we deliver is built with rigor, carefully tested, and maintained over time to support your business sustainably.",
  },
};

const getLocalizedValue = (value, lang) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value[lang] || value.fr || "";
  return "";
};

const TechServiceCard = ({ service, index, visible, t, lang }) => {
  const reverse = index % 2 === 1;
  const title = getLocalizedValue(service.title, lang);
  const description =
    getLocalizedValue(service.text, lang) ||
    getLocalizedValue(service.heroDescription, lang);
  const tag = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`tz-row relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-0 ${
        reverse ? "lg:flex-row-reverse" : ""
      } ${visible ? "show" : ""}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="relative z-10 flex flex-shrink-0 justify-center lg:w-1/2">
        <div className="tz-circle-wrap relative flex h-[280px] w-[280px] items-center justify-center sm:h-[310px] sm:w-[310px]">
          <svg
            className="tz-orbit absolute"
            style={{ width: "330px", height: "330px", top: "-10px", left: "-10px" }}
            viewBox="0 0 330 330"
            fill="none"
          >
            <defs>
              <linearGradient id={`ring-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={service.accent} stopOpacity="0.6" />
                <stop offset="100%" stopColor="#58b4da" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <circle
              cx="165"
              cy="165"
              r="155"
              stroke={`url(#ring-grad-${index})`}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="800"
              strokeDashoffset="210"
            />
            <circle cx="298" cy="96" r="5" fill={service.accent} opacity="0.65" />
            <circle cx="50" cy="235" r="3" fill="#58b4da" opacity="0.40" />
          </svg>

          <div
            className="absolute rounded-full"
            style={{
              width: "308px",
              height: "308px",
              border: "1px solid rgba(31,108,140,0.09)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "278px",
              height: "278px",
              border: "1px dashed rgba(31,108,140,0.07)",
            }}
          />

          <div
            className="tz-img-wrap relative overflow-hidden rounded-full"
            style={{
              width: "258px",
              height: "258px",
              boxShadow:
                "0 20px 55px rgba(31,108,140,0.18), 0 4px 20px rgba(0,0,0,0.10)",
              border: "3px solid rgba(255,255,255,0.88)",
            }}
          >
            <img src={service.image} alt={title} className="tz-img h-full w-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(145deg, ${service.accent}0d 0%, transparent 50%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%)",
              }}
            />
          </div>

          <div
            className="absolute -right-1 -top-1 z-20 flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${service.accent}, #2a90b8)`,
              boxShadow: `0 4px 14px ${service.accent}60`,
              border: "2px solid rgba(255,255,255,0.80)",
            }}
          >
            {tag}
          </div>

          <div
            className="tz-tech-tag absolute -bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-1 lg:flex"
            style={{
              background: "rgba(31,108,140,0.08)",
              border: "1px solid rgba(31,108,140,0.16)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: service.accent,
                opacity: 0.7,
              }}
            />
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: service.accent,
                opacity: 0.8,
                fontFamily: "Literata, serif",
              }}
            >
              {t.tech}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`tz-connector hidden flex-shrink-0 items-center lg:flex ${reverse ? "flex-row-reverse" : ""}`}
        style={{ width: "70px" }}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            background: `linear-gradient(${reverse ? "270deg" : "90deg"}, transparent, ${service.accent}45)`,
          }}
        />
        <div
          className="tz-connector-dot"
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: service.accent,
            opacity: 0.45,
            flexShrink: 0,
          }}
        />
      </div>

      <div
        className={`relative z-10 max-w-[440px] lg:w-1/2 ${
          reverse ? "lg:pr-8 xl:pr-14" : "lg:pl-8 xl:pl-14"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            style={{
              width: "18px",
              height: "1px",
              background: service.accent,
              opacity: 0.45,
            }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{
              color: `${service.accent}90`,
              fontFamily: "Literata, serif",
            }}
          >
            {t.service} {tag}
          </span>
        </div>

        <h3
          className="mt-2.5 text-[26px] font-bold leading-tight text-slate-900 sm:text-[34px]"
          style={{ fontFamily: "Literata, serif" }}
        >
          {title}
        </h3>

        <div
          className="mt-4"
          style={{
            width: "32px",
            height: "2px",
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${service.accent}, #a8d4e8)`,
          }}
        />

        <p
          className="mt-4 text-sm leading-[1.90] text-slate-500 sm:text-[14.5px]"
          style={{ fontFamily: "Literata, serif" }}
        >
          {description}
        </p>

        <div className="mt-7 flex items-center gap-4">
          <span
            className="text-[10px] uppercase tracking-widest text-slate-400"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.learnMore}
          </span>
          <div
            style={{
              flex: 1,
              maxWidth: "90px",
              height: "1px",
              background: `${service.accent}30`,
            }}
          />
          <Link
            to="/contact"
            className="tz-btn inline-flex items-center gap-2 rounded-[8px] px-5 py-2.5 text-xs font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${service.accent}, #2a90b8)`,
              boxShadow: `0 4px 14px ${service.accent}40`,
              fontFamily: "Literata, serif",
            }}
          >
            {t.discover} <span style={{ fontSize: "13px" }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const TechServicesZigzagSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const services = technologyServices;
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const scrollToTarget = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const timeout = setTimeout(scrollToTarget, 120);
    return () => clearTimeout(timeout);
  }, [location.hash]);

  return (
    <>
      <section
        id="technology-content"
        ref={sectionRef}
        className="relative overflow-hidden bg-[#f5f5f3] py-24 lg:py-28"
      >
        <style>{`
          @keyframes orbitSpin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          .tz-orbit { animation: orbitSpin 14s linear infinite; transform-origin: center; }

          @keyframes circleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-9px); }
          }
          .tz-circle-wrap { animation: circleFloat 7s ease-in-out infinite; }

          .tz-img-wrap { overflow: hidden; }
          .tz-img { transition: transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .tz-img-wrap:hover .tz-img { transform: scale(1.07); }

          .tz-btn { transition: all 0.32s cubic-bezier(0.22,1,0.36,1); }
          .tz-btn:hover { transform: translateY(-2px); filter: brightness(1.08); }

          .tz-row {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1);
          }
          .tz-row.show { opacity: 1; transform: translateY(0); }

          .tz-title-entry {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1);
          }
          .tz-title-entry.show { opacity: 1; transform: translateY(0); }

          .tz-sep {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(31,108,140,0.09), transparent);
          }

          .tz-tech-tag { transition: all 0.3s ease; }
          .tz-circle-wrap:hover .tz-tech-tag { background: rgba(31,108,140,0.14) !important; }

          .tz-bg-grid {
            background-image:
              linear-gradient(rgba(31,108,140,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(31,108,140,0.025) 1px, transparent 1px);
            background-size: 48px 48px;
          }

          .tz-parallax-block { position: relative; }
          .tz-parallax-bg {
            position: sticky; top: 0; height: 60vh;
            overflow: hidden; z-index: 0; margin-bottom: -60vh;
          }
          .tz-parallax-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
          .tz-parallax-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to bottom, rgba(245,245,243,0.93) 0%, rgba(245,245,243,0.58) 40%, rgba(245,245,243,0.58) 60%, rgba(245,245,243,0.93) 100%);
          }
          .tz-parallax-content { position: relative; z-index: 10; background: transparent; padding-top: 24px; padding-bottom: 24px; }
        `}</style>

        <div className="tz-bg-grid pointer-events-none absolute inset-0 z-0" />

        <img
          src={group9}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8px] top-[320px] z-0 hidden w-[190px] opacity-55 lg:block"
        />
        <img
          src={group7}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8px] top-[520px] z-0 hidden w-[460px] opacity-45 lg:block"
        />
        <img
          src={polygon1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[60px] top-[980px] z-0 hidden w-[460px] opacity-40 lg:block"
        />

        <div className="page-container relative z-10">
          <div className={`tz-title-entry mb-20 text-center ${visible ? "show" : ""}`}>
            <span
              className="inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: "rgba(31,108,140,0.08)",
                border: "1px solid rgba(31,108,140,0.16)",
                color: "#1f6c8c",
                fontFamily: "Literata, serif",
              }}
            >
              {t.badge}
            </span>

            <h2
              className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h2>

            <div
              className="mx-auto mt-4"
              style={{
                width: "32px",
                height: "2px",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)",
              }}
            />

            <p
              className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-[15px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            <div className="mt-8 flex items-center justify-center gap-8">
              {t.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-[22px] font-bold text-[#1f6c8c]"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-widest text-slate-400"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tz-parallax-block">
          <div className="tz-parallax-bg">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80"
              alt=""
              aria-hidden="true"
            />
            <div className="tz-parallax-overlay" />
          </div>

          <div className="tz-parallax-content page-container">
            <div className="flex flex-col gap-0">
              {services.map((service, index) => (
                <React.Fragment key={service.slug}>
                  <div id={`service-${service.slug}`}>
                    <TechServiceCard
                      service={service}
                      index={index}
                      visible={visible}
                      t={t}
                      lang={lang}
                    />
                  </div>

                  {index < services.length - 1 && <div className="tz-sep my-16 lg:my-20" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          position: "relative",
          height: "500px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(4,15,28,0.82) 0%, rgba(31,108,140,0.55) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(88,180,218,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(88,180,218,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "130px",
            background:
              "linear-gradient(to bottom, transparent, rgba(88,180,218,0.35), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "130px",
            background:
              "linear-gradient(to bottom, transparent, rgba(88,180,218,0.35), transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(31,108,140,0.22)",
              border: "1px solid rgba(88,180,218,0.35)",
              borderRadius: "999px",
              padding: "5px 14px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#58b4da",
              }}
            />
            <span
              style={{
                fontFamily: "Literata, serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(168,212,232,0.90)",
              }}
            >
              {t.approachBadge}
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Literata, serif",
              fontSize: "clamp(26px, 3.8vw, 50px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.12,
              maxWidth: "680px",
              marginBottom: "18px",
            }}
          >
            {t.approachTitle}
          </h2>

          <div
            style={{
              width: "40px",
              height: "2px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #58b4da, rgba(31,108,140,0.40))",
              marginBottom: "18px",
            }}
          />

          <p
            style={{
              fontFamily: "Literata, serif",
              fontSize: "14px",
              color: "rgba(255,255,255,0.58)",
              maxWidth: "500px",
              lineHeight: 1.88,
            }}
          >
            {t.approachDescription}
          </p>
        </div>
      </div>
    </>
  );
};

export default TechServicesZigzagSection;