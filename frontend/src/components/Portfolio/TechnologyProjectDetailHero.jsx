import React, { useEffect, useState } from "react";

const TechnologyProjectDetailHero = ({ project }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!project) return null;

  const heroImage = project.heroImage || project.image || "";
  const heroTitle = project.heroTitle || project.projectName || "";
  const heroDescription = project.heroDescription || "";
  const projectCategory = project.projectCategory || "";
  const projectTags = project.projectTags || [];
  const imageAlt = project.projectName || heroTitle || "Technology project";

  return (
    <section
      id="technology-project-detail-hero"
      data-page-hero
      className="relative min-h-[88vh] overflow-hidden"
    >
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

        .tdh-entry.show {
          opacity: 1;
          transform: translateX(0);
        }

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

      {heroImage && (
        <img
          src={heroImage}
          alt={imageAlt}
          className="tdh-bg absolute inset-0 h-full w-full object-cover object-center"
        />
      )}

      <div className="tdh-overlay absolute inset-0" />
      <div className="tdh-grid pointer-events-none absolute inset-0" />

      <div className="page-container relative z-10 flex min-h-[88vh] items-center px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className={`tdh-entry max-w-[600px] ${visible ? "show" : ""}`}>
          {projectCategory && (
            <span
              className="tdh-badge mb-4 inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.26em]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {projectCategory}
            </span>
          )}

          <h1
            className="text-5xl font-bold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-[72px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {heroTitle}
          </h1>

          <div className="tdh-divider mt-5" />

          <p
            className="mt-5 max-w-[500px] text-sm leading-[1.92] text-[#ebf1f4] sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {heroDescription}
          </p>

          {/* 
          {projectTags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {projectTags.map((tag, i) => (
                <a
                  key={i}
                  href={tag.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tdh-cat-tag inline-flex rounded-full px-6 py-1 text-[14px] font-semibold text-white"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {tag.label}
                </a>
              ))}
            </div>
          )}
          */}

          {/* 
          <div className="mt-9">
            <a
              href="#tech-project-detail-content"
              className="tdh-btn inline-flex items-center gap-2 rounded-[10px] px-7 py-3.5 text-sm"
              style={{ fontFamily: "Literata, serif" }}
            >
              Découvrir le projet
              <span style={{ fontSize: "15px" }}>↓</span>
            </a>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default TechnologyProjectDetailHero;