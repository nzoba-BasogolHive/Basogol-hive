import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  Lightbulb,
  AlertCircle,
  Zap,
  Compass,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";
import groupShape from "../../assets/Group14.png";

const translations = {
  fr: {
    back: "Retour",
    category: "Technologie",
    sectionLabel: "Vue d'ensemble",
  },
  en: {
    back: "Back",
    category: "Technology",
    sectionLabel: "Overview",
  },
};

const defaultIcons = [Lightbulb, AlertCircle, Zap, Compass];

const TechnologyProjectOverview = ({
  onBack,
  cards = [],
  category,
  serviceTitle,
}) => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const resolvedTitle =
    serviceTitle?.[lang] || serviceTitle || category?.[lang] || category || t.category;

  return (
    <section
      id="tech-service-detail-content"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f5] py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgba(168,212,232,0.18)_0%,transparent_70%)]" />

      <img
        src={groupShape}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[20px] left-[-10px] z-0 hidden w-[160px] opacity-15 lg:block"
      />

      <div className="page-container relative z-10">
        <div
          className={`mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } transition-all duration-700`}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack || (() => window.history.back())}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/70 text-slate-600 shadow-sm backdrop-blur"
              aria-label={t.back}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span
              className="inline-flex items-center rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.20em] text-white"
              style={{
                fontFamily: "Literata, serif",
                background: "linear-gradient(135deg, rgba(31,108,140,0.88), rgba(42,144,184,0.84))",
              }}
            >
              {resolvedTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div style={{ width: "24px", height: "1px", background: "rgba(31,108,140,0.30)" }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.sectionLabel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon || defaultIcons[index % defaultIcons.length];
            const isFeatured = card.featured;
            const tag = card.tag || String(index + 1).padStart(2, "0");
            const cardTitle = card.title?.[lang] || card.title;
            const cardText = card.text?.[lang] || card.text;

            return (
              <article
                key={index}
                className={`rounded-[18px] px-6 py-7 transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.97]"
                } ${isFeatured ? "text-white" : "text-slate-900"}`}
                style={{
                  transitionDelay: `${index * 0.09}s`,
                  background: isFeatured
                    ? "linear-gradient(135deg, rgba(31,108,140,0.90) 0%, rgba(42,144,184,0.86) 100%)"
                    : "rgba(255,255,255,0.68)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.62)",
                  boxShadow: isFeatured
                    ? "0 16px 48px rgba(31,108,140,0.24)"
                    : "0 4px 20px rgba(31,108,140,0.07)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[12px]"
                    style={{
                      background: isFeatured ? "rgba(255,255,255,0.16)" : "rgba(31,108,140,0.08)",
                      border: isFeatured
                        ? "1px solid rgba(255,255,255,0.28)"
                        : "1px solid rgba(31,108,140,0.14)",
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      style={{ color: isFeatured ? "#fff" : "#1f6c8c" }}
                    />
                  </div>

                  <span
                    className={`text-[10px] font-extrabold tracking-[0.08em] ${
                      isFeatured ? "text-white/45" : "text-slate-300"
                    }`}
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {tag}
                  </span>
                </div>

                <h3
                  className="mt-6 text-[18px] font-bold leading-tight"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {cardTitle}
                </h3>

                <div
                  className="mt-3"
                  style={{
                    width: "28px",
                    height: "2px",
                    borderRadius: "999px",
                    background: isFeatured
                      ? "rgba(255,255,255,0.35)"
                      : "linear-gradient(90deg, #1f6c8c, #a8d4e8)",
                  }}
                />

                <p
                  className={`mt-4 text-[13px] leading-[1.82] ${
                    isFeatured ? "text-white/78" : "text-slate-500"
                  }`}
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {cardText}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologyProjectOverview;