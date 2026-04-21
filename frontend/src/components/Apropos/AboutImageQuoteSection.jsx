import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";
import unionImage from "../../assets/Union_01.png";

const translations = {
  fr: {
    tag: "Notre vision",
    imageAlt: "Illustration architecturale en noir et blanc",
    quote:
      "Nous croyons que chaque marque mérite une vision claire, une identité forte et des solutions à la hauteur de ses ambitions.",
    brand: "Basogol-Hive",
    stats: [
      { number: "02+", label: "Années d'expérience" },
      { number: "09+", label: "Projets livrés" },
    ],
  },
  en: {
    tag: "Our vision",
    imageAlt: "Black and white architectural illustration",
    quote:
      "We believe that every brand deserves a clear vision, a strong identity, and solutions that match its ambitions.",
    brand: "Basogol-Hive",
    stats: [
      { number: "02+", label: "Years of experience" },
      { number: "09+", label: "Projects delivered" },
    ],
  },
};

const AboutImageQuoteSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.18 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-shell relative overflow-hidden bg-[#f7f7f5]"
    >
      <style>{`
        .iq-halo {
          background: radial-gradient(
            ellipse 65% 55% at 50% 50%,
            rgba(168,212,232,0.22) 0%,
            transparent 70%
          );
        }

        .iq-glass-frame {
          background: rgba(255,255,255,0.28);
          backdrop-filter: blur(16px) saturate(155%);
          -webkit-backdrop-filter: blur(16px) saturate(155%);
          border: 1px solid rgba(255,255,255,0.55);
          box-shadow:
            0 12px 40px rgba(31,108,140,0.14),
            0 1px 0 rgba(255,255,255,0.65) inset;
        }

        .iq-glass-frame::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(90deg, #1f6c8c, #a8d4e8, transparent);
        }

        .iq-img-entry {
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .iq-img-entry.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .iq-quote-entry {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.85s ease 0.25s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.25s;
        }
        .iq-quote-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        .iq-tag {
          background: rgba(31,108,140,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(31,108,140,0.20);
          box-shadow: 0 2px 8px rgba(31,108,140,0.08), 0 1px 0 rgba(255,255,255,0.50) inset;
        }

        .iq-bg-quote {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          font-size: 520px;
          font-weight: 900;
          line-height: 1;
          color: rgba(31,108,140,0.04);
          pointer-events: none;
          user-select: none;
          font-family: Literata, serif;
        }
      `}</style>

      <div className="iq-halo pointer-events-none absolute inset-0 z-0" />
      <div className="iq-bg-quote hidden lg:block">"</div>

      <div className="page-container relative z-10">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className={`iq-img-entry w-full lg:w-[55%] ${visible ? "show" : ""}`}>
            <div className="mb-3 inline-flex">
              <span
                className="iq-tag rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1f6c8c]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.tag}
              </span>
            </div>

            <div className="iq-glass-frame relative overflow-hidden rounded-[14px] p-[5px]">
              <div className="overflow-hidden rounded-[10px]">
                <img
                  src={unionImage}
                  alt={t.imageAlt}
                  className="h-[220px] w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-[280px] lg:h-[340px]"
                />
              </div>
            </div>
          </div>

          <div className={`iq-quote-entry flex w-full flex-col justify-center lg:w-[45%] lg:pt-14 ${visible ? "show" : ""}`}>
            <div
              className="mb-4 text-[72px] font-black leading-none text-[#1f6c8c]/20"
              style={{ fontFamily: "Literata, serif" }}
            >
              "
            </div>

            <div
              className="iq-glass-frame relative rounded-[14px] px-6 py-6"
              style={{ background: "rgba(255,255,255,0.30)" }}
            >
              <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-[#1f6c8c] to-[#a8d4e8]" />

              <p
                className="pl-4 text-[14px] italic leading-[1.85] text-slate-600 sm:text-[15px]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {t.quote}
              </p>

              <div className="mt-5 flex items-center gap-3 pl-4">
                <div className="h-[2px] w-8 rounded-full bg-gradient-to-r from-[#1f6c8c] to-[#a8d4e8]" />
                <span
                  className="text-[12px] font-semibold text-[#1f6c8c]"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {t.brand}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-6">
              {t.stats.map((stat, i) => (
                <div
                  key={i}
                  className="iq-glass-frame relative rounded-[10px] px-5 py-4 text-center"
                  style={{ background: "rgba(255,255,255,0.22)", flex: 1 }}
                >
                  <div
                    className="text-[22px] font-bold text-[#1f6c8c]"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="mt-1 text-[11px] text-slate-500"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutImageQuoteSection;