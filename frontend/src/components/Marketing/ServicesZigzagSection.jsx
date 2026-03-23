import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import group7 from "../../assets/Group7.png";
import group9 from "../../assets/Group9.png";
import polygon1 from "../../assets/Polygon8.png";
import { useLanguage } from "../LanguageContext";
import { marketingBrandServices } from "../../data/marketingBrandServices";

const translations = {
  fr: {
    sectionTitle: "Services",
    sectionDescription:
      "Nous accompagnons les marques avec des solutions créatives, stratégiques et visuelles pensées pour renforcer leur présence et leur impact.",
    serviceLabel: "Service",
    learnMore: "En savoir plus",
    discover: "Découvrir",
    approachLabel: "Notre approche",
    approachTitle:
      "Créativité, stratégie et performance au service de votre marque",
    approachDescription:
      "Chaque projet est une opportunité de construire quelque chose de durable. Nous combinons expertise et créativité pour des résultats qui font vraiment la différence.",
  },
  en: {
    sectionTitle: "Services",
    sectionDescription:
      "We support brands with creative, strategic and visual solutions designed to strengthen their presence and impact.",
    serviceLabel: "Service",
    learnMore: "Learn more",
    discover: "Discover",
    approachLabel: "Our approach",
    approachTitle:
      "Creativity, strategy and performance at the service of your brand",
    approachDescription:
      "Every project is an opportunity to build something lasting. We combine expertise and creativity to deliver results that truly make a difference.",
  },
};

const getLocalizedValue = (value, lang) => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value[lang] || value.fr || "";
  return "";
};

const ServiceCard = ({ service, index, visible, t, lang }) => {
  const reverse = index % 2 === 1;

  const title = getLocalizedValue(service.title, lang);
  const text =
    getLocalizedValue(service.text, lang) ||
    getLocalizedValue(service.heroDescription, lang);

  return (
    <Link
      to={`/marketing-brand/${service.slug}`}
      className="block"
      style={{ textDecoration: "none" }}
    >
      <div
        className={`sz-row relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-0 ${
          reverse ? "lg:flex-row-reverse" : ""
        } ${visible ? "show" : ""}`}
        style={{
          transitionDelay: `${index * 0.08}s`,
          cursor: "pointer",
        }}
      >
        <div className="relative z-10 flex flex-shrink-0 justify-center lg:w-1/2">
          <div className="sz-circle-wrap relative flex h-[280px] w-[280px] items-center justify-center sm:h-[310px] sm:w-[310px]">
            <svg
              className="sz-orbit absolute"
              style={{
                width: "330px",
                height: "330px",
                top: "-10px",
                left: "-10px",
              }}
              viewBox="0 0 330 330"
              fill="none"
            >
              <circle
                cx="165"
                cy="165"
                r="155"
                stroke="#1f6c8c"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="800"
                strokeDashoffset="210"
                opacity="0.28"
              />
              <circle cx="298" cy="96" r="4.5" fill="#1f6c8c" opacity="0.55" />
            </svg>

            <div
              className="absolute rounded-full"
              style={{
                width: "305px",
                height: "305px",
                border: "1px solid rgba(31,108,140,0.08)",
              }}
            />

            <div
              className="sz-img-wrap relative overflow-hidden rounded-full"
              style={{
                width: "260px",
                height: "260px",
                boxShadow:
                  "0 20px 55px rgba(31,108,140,0.16), 0 4px 18px rgba(0,0,0,0.09)",
                border: "3px solid rgba(255,255,255,0.85)",
              }}
            >
              <img
                src={service.image}
                alt={title}
                className="sz-img h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(31,108,140,0.06) 0%, transparent 55%)",
                }}
              />
            </div>

            <div
              className="absolute -right-1 -top-1 z-20 flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #1f6c8c, #2a90b8)",
                boxShadow: "0 4px 12px rgba(31,108,140,0.38)",
                border: "2px solid rgba(255,255,255,0.75)",
              }}
            >
              {service.tag}
            </div>
          </div>
        </div>

        <div
          className={`sz-connector hidden flex-shrink-0 items-center lg:flex ${
            reverse ? "flex-row-reverse" : ""
          }`}
          style={{ width: "70px" }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: `linear-gradient(${
                reverse ? "270deg" : "90deg"
              }, transparent, rgba(31,108,140,0.25))`,
            }}
          />
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#1f6c8c",
              opacity: 0.35,
              flexShrink: 0,
            }}
          />
        </div>

        <div
          className={`relative z-10 max-w-[440px] lg:w-1/2 ${
            reverse ? "lg:pr-8 xl:pr-14" : "lg:pl-8 xl:pl-14"
          }`}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{
              color: "rgba(31,108,140,0.50)",
              fontFamily: "Literata, serif",
            }}
          >
            {t.serviceLabel} {service.tag}
          </span>

          <h3
            className="mt-2 text-[26px] font-bold leading-tight text-slate-900 sm:text-[36px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {title}
          </h3>

          <div
            className="mt-3.5"
            style={{
              width: "32px",
              height: "2px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)",
            }}
          />

          <p
            className="mt-4 text-sm leading-[1.88] text-slate-500 sm:text-[14.5px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {text}
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
                maxWidth: "100px",
                height: "1px",
                background: "rgba(31,108,140,0.18)",
              }}
            />

            <span
              className="sz-btn inline-flex items-center gap-2 rounded-[8px] px-5 py-2.5 text-xs font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #1f6c8c, #2a90b8)",
                boxShadow: "0 4px 14px rgba(31,108,140,0.26)",
                fontFamily: "Literata, serif",
              }}
            >
              {t.discover} <span style={{ fontSize: "13px" }}>→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ServicesZigzagSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const services = marketingBrandServices;

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

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#f5f5f3] py-24 lg:py-28"
      >
        <style>{`
          @keyframes orbitSpin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          .sz-orbit {
            animation: orbitSpin 14s linear infinite;
            transform-origin: center;
          }

          @keyframes circleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-9px); }
          }

          .sz-circle-wrap {
            animation: circleFloat 7s ease-in-out infinite;
          }

          .sz-img-wrap {
            overflow: hidden;
          }

          .sz-img {
            transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
          }

          .sz-img-wrap:hover .sz-img {
            transform: scale(1.07);
          }

          .sz-btn {
            transition: all 0.32s cubic-bezier(0.22,1,0.36,1);
          }

          .sz-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(31,108,140,0.38) !important;
          }

          .sz-row {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1);
          }

          .sz-row.show {
            opacity: 1;
            transform: translateY(0);
          }

          .sz-title-entry {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1);
          }

          .sz-title-entry.show {
            opacity: 1;
            transform: translateY(0);
          }

          .sz-sep {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(31,108,140,0.10), transparent);
          }

          .sz-parallax-block {
            position: relative;
          }

          .sz-parallax-bg {
            position: sticky;
            top: 0;
            height: 60vh;
            overflow: hidden;
            z-index: 0;
            margin-bottom: -60vh;
          }

          .sz-parallax-bg img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }

          .sz-parallax-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to bottom,
              rgba(245,245,243,0.92) 0%,
              rgba(245,245,243,0.60) 40%,
              rgba(245,245,243,0.60) 60%,
              rgba(245,245,243,0.92) 100%
            );
          }

          .sz-parallax-content {
            position: relative;
            z-index: 10;
            background: transparent;
            padding-top: 24px;
            padding-bottom: 24px;
          }
        `}</style>

        <img
          src={group9}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8px] top-[320px] z-0 hidden w-[190px] opacity-60 lg:block"
        />
        <img
          src={group7}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8px] top-[520px] z-0 hidden w-[460px] opacity-50 lg:block"
        />
        <img
          src={polygon1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[60px] top-[980px] z-0 hidden w-[460px] opacity-45 lg:block"
        />

        <div className="page-container relative z-10">
          <div
            className={`sz-title-entry mb-20 text-center ${
              visible ? "show" : ""
            }`}
          >
            <h2
              className="text-4xl font-bold text-slate-900 sm:text-5xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.sectionTitle}
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
              {t.sectionDescription}
            </p>
          </div>
        </div>

        <div className="sz-parallax-block">
          <div className="sz-parallax-bg">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80"
              alt=""
              aria-hidden="true"
            />
            <div className="sz-parallax-overlay" />
          </div>

          <div className="sz-parallax-content page-container">
            <div className="flex flex-col gap-0">
              {services.map((service, index) => (
                <React.Fragment key={service.slug}>
                  <ServiceCard
                    service={service}
                    index={index}
                    visible={visible}
                    t={t}
                    lang={lang}
                  />
                  {index < services.length - 1 && (
                    <div className="sz-sep my-16 lg:my-20" />
                  )}
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
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80')",
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
            background:
              "linear-gradient(135deg, rgba(8,30,50,0.70) 0%, rgba(31,108,140,0.50) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "120px",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1px",
            height: "120px",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)",
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
          <p
            style={{
              fontFamily: "Literata, serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.50)",
              marginBottom: "16px",
            }}
          >
            {t.approachLabel}
          </p>

          <h2
            style={{
              fontFamily: "Literata, serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.12,
              maxWidth: "700px",
              marginBottom: "20px",
            }}
          >
            {t.approachTitle}
          </h2>

          <div
            style={{
              width: "40px",
              height: "2px",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, rgba(168,212,232,0.8), rgba(255,255,255,0.3))",
              marginBottom: "20px",
            }}
          />

          <p
            style={{
              fontFamily: "Literata, serif",
              fontSize: "14px",
              color: "rgba(255,255,255,0.62)",
              maxWidth: "520px",
              lineHeight: 1.85,
            }}
          >
            {t.approachDescription}
          </p>
        </div>
      </div>
    </>
  );
};

export default ServicesZigzagSection;