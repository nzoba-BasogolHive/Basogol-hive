import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  Lightbulb,
  AlertCircle,
  Zap,
  Compass,
} from "lucide-react";
import groupShape from "../../assets/Group14.png";

const translations = {
  fr: {
    back: "Retour",
    category: "Marketing & Branding",
    sectionLabel: "Vue d'ensemble",
  },
  en: {
    back: "Back",
    category: "Marketing & Branding",
    sectionLabel: "Overview",
  },
};

const defaultIcons = [Lightbulb, AlertCircle, Zap, Compass];

const MarketingBrandServiceOverview = ({
  lang = "fr",
  onBack,
  cards = [],
  category,
  serviceTitle,
}) => {
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f5] py-16 sm:py-20 lg:py-24"
    >
      <style>{`
        .ov-halo {
          background: radial-gradient(
            ellipse 70% 55% at 50% 40%,
            rgba(168,212,232,0.18) 0%,
            transparent 70%
          );
        }

        .ov-header-entry {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.75s ease, transform 0.75s cubic-bezier(0.22,1,0.36,1);
        }
        .ov-header-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        .ov-card-featured {
          background: linear-gradient(135deg, rgba(31,108,140,0.90) 0%, rgba(42,144,184,0.86) 100%);
          backdrop-filter: blur(18px) saturate(155%);
          -webkit-backdrop-filter: blur(18px) saturate(155%);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow:
            0 16px 48px rgba(31,108,140,0.24),
            0 1px 0 rgba(255,255,255,0.18) inset;
          position: relative;
          overflow: hidden;
          transition: all 0.40s cubic-bezier(0.22,1,0.36,1);
        }

        .ov-card-featured::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 80% 20%, rgba(255,255,255,0.10) 0%, transparent 60%);
          pointer-events: none;
        }

        .ov-card-featured:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 60px rgba(31,108,140,0.32), 0 1px 0 rgba(255,255,255,0.22) inset;
        }

        .ov-icon-featured {
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.28);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .ov-card-featured:hover .ov-icon-featured {
          background: rgba(255,255,255,0.24);
          transform: scale(1.08);
        }

        .ov-card-std {
          background: rgba(255,255,255,0.68);
          backdrop-filter: blur(16px) saturate(145%);
          -webkit-backdrop-filter: blur(16px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.62);
          box-shadow:
            0 4px 20px rgba(31,108,140,0.07),
            0 1px 0 rgba(255,255,255,0.80) inset;
          position: relative;
          overflow: hidden;
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }

        .ov-card-std:hover {
          background: rgba(255,255,255,0.90);
          transform: translateY(-5px);
          box-shadow:
            0 14px 40px rgba(31,108,140,0.13),
            0 1px 0 rgba(255,255,255,0.92) inset;
          border-color: rgba(31,108,140,0.14);
        }

        .ov-card-std::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 2px 2px 0 0;
          background: linear-gradient(90deg, #1f6c8c, #a8d4e8);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .ov-card-std:hover::before {
          opacity: 1;
        }

        .ov-icon-std {
          background: rgba(31,108,140,0.08);
          border: 1px solid rgba(31,108,140,0.14);
          transition: all 0.3s ease;
        }

        .ov-card-std:hover .ov-icon-std {
          background: rgba(31,108,140,0.14);
          transform: scale(1.08);
        }

        .ov-card-entry {
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.72s ease, transform 0.72s cubic-bezier(0.22,1,0.36,1);
        }

        .ov-card-entry.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .ov-cat-badge {
          background: linear-gradient(135deg, rgba(31,108,140,0.88), rgba(42,144,184,0.84));
          border: 1px solid rgba(255,255,255,0.20);
          box-shadow: 0 3px 12px rgba(31,108,140,0.28), 0 1px 0 rgba(255,255,255,0.18) inset;
        }

        .ov-back-btn {
          background: rgba(255,255,255,0.70);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.60);
          box-shadow: 0 2px 10px rgba(31,108,140,0.08), 0 1px 0 rgba(255,255,255,0.80) inset;
          transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
        }

        .ov-back-btn:hover {
          background: rgba(255,255,255,0.92);
          transform: translateX(-2px);
          box-shadow: 0 6px 18px rgba(31,108,140,0.12), 0 1px 0 rgba(255,255,255,0.90) inset;
        }

        @keyframes shapeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        .ov-shape {
          animation: shapeFloat 8s ease-in-out infinite;
        }

        .ov-tag-num {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
      `}</style>

      <div className="ov-halo pointer-events-none absolute inset-0 z-0" />

      <img
        src={groupShape}
        alt=""
        aria-hidden="true"
        className="ov-shape pointer-events-none absolute bottom-[20px] left-[-10px] z-0 hidden w-[160px] opacity-15 lg:block"
      />

      <div className="page-container relative z-10">
        <div
          className={`ov-header-entry mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
            visible ? "show" : ""
          }`}
        >
          <div className="flex items-center gap-3">
  <button
    type="button"
    onClick={onBack}
    className="ov-back-btn flex h-9 w-9 items-center justify-center rounded-full text-slate-600"
    aria-label={t.back}
  >
    <ChevronLeft className="h-4 w-4" />
  </button>

  <span
    className="ov-cat-badge inline-flex items-center rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.20em] text-white"
    style={{ fontFamily: "Literata, serif" }}
  >
    {serviceTitle || category || t.category}
  </span>
</div>

          <div className="flex items-center gap-2">
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "rgba(31,108,140,0.30)",
              }}
            />
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

            return (
              <article
                key={index}
                className={`ov-card-entry rounded-[18px] px-6 py-7 ${
                  isFeatured ? "ov-card-featured" : "ov-card-std"
                } ${visible ? "show" : ""}`}
                style={{ transitionDelay: `${index * 0.09}s` }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-[12px] ${
                      isFeatured ? "ov-icon-featured" : "ov-icon-std"
                    }`}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                      style={{ color: isFeatured ? "#fff" : "#1f6c8c" }}
                    />
                  </div>

                  <span
                    className={`ov-tag-num ${
                      isFeatured ? "text-white/45" : "text-slate-300"
                    }`}
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {tag}
                  </span>
                </div>

                <h3
                  className={`mt-6 text-[18px] font-bold leading-tight ${
                    isFeatured ? "text-white" : "text-slate-900"
                  }`}
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {card.title}
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
                  {card.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketingBrandServiceOverview;