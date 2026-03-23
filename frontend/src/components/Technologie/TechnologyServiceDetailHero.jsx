import React, { useEffect, useState } from "react";

const TechnologyServiceDetailHero = ({ service }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!service) return null;

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <style>{`
        .tdh-bg { transition: transform 9s ease; }
        section:hover .tdh-bg { transform: scale(1.04); }

        .tdh-overlay {
          background: linear-gradient(
            135deg,
            rgba(4,14,26,0.82) 0%,
            rgba(8,28,48,0.58) 50%,
            rgba(4,14,26,0.32) 100%
          );
        }

        .tdh-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 55px 55px;
        }

        .tdh-entry {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.92s ease, transform 0.92s cubic-bezier(0.22,1,0.36,1);
        }
        .tdh-entry.show { opacity: 1; transform: translateX(0); }

        .tdh-badge {
          background: rgba(31,108,140,0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(88,180,218,0.35);
          color: rgba(168,212,232,0.95);
        }

        .tdh-divider {
          width: 40px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #58b4da, rgba(255,255,255,0.25));
        }

        .tdh-btn {
          background: rgba(255,255,255,0.90);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.72);
          color: #0e4d6a;
          font-weight: 700;
        }

        .tdh-cat-tag {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.20);
        }
      `}</style>

      <img
        src={service.image}
        alt={service.title}
        className="tdh-bg absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="tdh-overlay absolute inset-0" />
      <div className="tdh-grid pointer-events-none absolute inset-0" />

      <div className="page-container relative z-10 flex min-h-[88vh] items-center px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className={`tdh-entry max-w-[600px] ${visible ? "show" : ""}`}>
          {service.category && (
            <span
              className="tdh-badge mb-4 inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.26em]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {service.category}
            </span>
          )}

          <h1
            className="text-5xl font-bold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-[72px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {service.heroTitle || service.title}
          </h1>

          <div className="tdh-divider mt-5" />

          <p
            className="mt-5 max-w-[500px] text-sm leading-[1.92] text-[#ebf1f4] sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {service.heroDescription}
          </p>

          {service.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag, i) => (
                <span
                  key={i}
                  className="tdh-cat-tag rounded-full px-3 py-1 text-[11px] font-semibold text-white/78"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-9">
            <a
              href="tech-service-detail-content"
              className="tdh-btn inline-flex items-center gap-2 rounded-[10px] px-7 py-3.5 text-sm"
              style={{ fontFamily: "Literata, serif" }}
            >
              Découvrir le service
              <span style={{ fontSize: "15px" }}>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyServiceDetailHero;