import React, { useEffect, useMemo, useRef, useState } from "react";
import shapeLeft from "../assets/Group14.png";
import shapeRight from "../assets/Group13.png";
import { useLanguage } from "./LanguageContext";

const translations = {
  fr: {
    projects: [
      { id: 1, title: "Application analytics", category: "Tech", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
      { id: 2, title: "Identité visuelle premium", category: "Branding", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80" },
      { id: 3, title: "Dashboard web moderne", category: "Tech", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" },
      { id: 4, title: "Campagne marque", category: "Branding", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
      { id: 5, title: "Application mobile UX", category: "Tech", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80" },
      { id: 6, title: "Direction artistique", category: "Branding", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" },
    ],
    tabs: [
      { key: "All", label: "Tous les projets" },
      { key: "Tech", label: "Tech" },
      { key: "Branding", label: "Branding" },
    ],
    title: "Projets récents",
    description: "Découvrez une sélection de projets récents réalisés en technologie et en branding. Nous créons des solutions modernes qui renforcent l'image, l'impact et la performance des entreprises.",
    cta: "Voir tout",
    dotLabel: "Aller au projet",
    categoryLabel: "Catégorie",
  },
  en: {
    projects: [
      { id: 1, title: "Analytics application", category: "Tech", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" },
      { id: 2, title: "Premium visual identity", category: "Branding", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80" },
      { id: 3, title: "Modern web dashboard", category: "Tech", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" },
      { id: 4, title: "Brand campaign", category: "Branding", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
      { id: 5, title: "Mobile UX application", category: "Tech", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80" },
      { id: 6, title: "Art direction", category: "Branding", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" },
    ],
    tabs: [
      { key: "All", label: "All projects" },
      { key: "Tech", label: "Tech" },
      { key: "Branding", label: "Branding" },
    ],
    title: "Recent projects",
    description: "Discover a selection of recent projects completed in technology and branding. We create modern solutions that strengthen the image, impact and performance of businesses.",
    cta: "View all",
    dotLabel: "Go to project",
    categoryLabel: "Category",
  },
};

const RecentProjectsSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevTab, setPrevTab] = useState("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return t.projects;
    return t.projects.filter((p) => p.category === activeTab);
  }, [activeTab, t]);

  useEffect(() => { setCurrentIndex(0); }, [activeTab, lang]);

  useEffect(() => {
    if (filteredProjects.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredProjects]);

  const handleTabChange = (key) => {
    if (key === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(key);
      setIsTransitioning(false);
    }, 250);
  };

  const currentProject = filteredProjects[currentIndex];

  return (
    <section ref={sectionRef} className="section-shell relative overflow-hidden">
      <style>{`
        /* ── Titre entrée ── */
        .rp-title-entry {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .rp-title-entry.show { opacity: 1; transform: translateY(0); }

        /* ── Tabs glassmorphisme ── */
        .rp-tabs-wrap {
          background: rgba(255,255,255,0.70);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255,255,255,0.60);
          box-shadow: 0 4px 20px rgba(15,23,42,0.08), 0 1px 0 rgba(255,255,255,0.80) inset;
        }
        .rp-tab {
          position: relative;
          transition: color 0.3s ease;
          color: #64748b;
        }
        .rp-tab:hover { color: #0e678f; }
        .rp-tab.active { color: #0e678f; font-weight: 700; }
        .rp-tab.active::after {
          content: "";
          position: absolute;
          bottom: 0; left: 12px; right: 12px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #0e678f, #58b4da);
        }

        /* ── Bande carrousel ── */
        .rp-stage {
          background: linear-gradient(160deg, #e8f0f5 0%, #dde8ee 40%, #e4edf2 100%);
          box-shadow: 0 0 0 1px rgba(31,108,140,0.06) inset;
        }

        /* ── Formes décoratives ── */
        @keyframes shapeLeftDrift {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
          50%       { transform: translate(-50%, -50%) rotate(4deg) scale(1.03) translateY(-10px); }
        }
        @keyframes shapeRightDrift {
          0%, 100% { transform: translate(50%, -50%) rotate(0deg) scale(1); }
          50%       { transform: translate(50%, -50%) rotate(-3deg) scale(1.02) translateY(8px); }
        }
        .shape-left-anim  { animation: shapeLeftDrift  10s ease-in-out infinite; }
        .shape-right-anim { animation: shapeRightDrift 11s ease-in-out infinite; }

        /* ── Carte centrale ── */
        .rp-card-center {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 30px 70px rgba(15,23,42,0.28),
            0 0 0 1px rgba(31,108,140,0.08);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .rp-card-center:hover { transform: scale(1.015) translateY(-4px); }

        /* Overlay info sur la carte centrale */
        .rp-card-overlay {
          background: linear-gradient(to top, rgba(10,30,50,0.75) 0%, transparent 55%);
          transition: opacity 0.4s ease;
        }

        /* ── Cartes latérales ── */
        .rp-card-side {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 14px_36px rgba(15,23,42,0.16);
          transition: all 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .rp-card-side:hover { transform: scale(1.04) translateY(-6px); }

        /* ── Dots navigation ── */
        .rp-dot {
          border-radius: 999px;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
        }
        .rp-dot.active {
          background: linear-gradient(90deg, #0e678f, #58b4da);
          box-shadow: 0 2px 10px rgba(14,103,143,0.40);
        }
        .rp-dot.inactive {
          background: rgba(31,108,140,0.18);
        }
        .rp-dot.inactive:hover { background: rgba(31,108,140,0.35); }

        /* ── Bouton CTA glassmorphisme ── */
        .rp-cta {
          background: linear-gradient(135deg, rgba(14,103,143,0.90), rgba(88,180,218,0.85));
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.30);
          box-shadow: 0 6px 22px rgba(14,103,143,0.35), 0 1px 0 rgba(255,255,255,0.25) inset;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .rp-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(14,103,143,0.45), 0 1px 0 rgba(255,255,255,0.30) inset;
        }

        /* ── Transition filtre ── */
        .rp-carousel-wrap {
          transition: opacity 0.25s ease;
        }
        .rp-carousel-wrap.fading { opacity: 0; }

        /* ── Badge catégorie sur carte ── */
        .rp-cat-badge {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.35);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fff;
          padding: 3px 10px;
          border-radius: 999px;
        }

        /* ── Numéro projet ── */
        .rp-project-num {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.12em;
        }
      `}</style>

      <div className="page-container">

        {/* ── En-tête ── */}
        <div className={`rp-title-entry mx-auto max-w-3xl text-center ${visible ? "show" : ""}`}>
          <h2
            className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-[56px] lg:leading-tight"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.description}
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className={`rp-title-entry mt-8 flex justify-center ${visible ? "show" : ""}`}
          style={{ transitionDelay: "0.12s" }}
        >
          <div className="rp-tabs-wrap inline-flex rounded-[12px] p-1 gap-1">
            {t.tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={`rp-tab relative rounded-[9px] px-5 py-2.5 text-xs sm:text-sm ${
                  activeTab === tab.key ? "active" : ""
                }`}
                style={{ fontFamily: "Literata, serif" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bande carrousel pleine largeur ── */}
      <div className="relative left-1/2 right-1/2 mt-10 w-screen -translate-x-1/2 rp-stage px-4 py-14 sm:px-8 lg:py-20">

        {/* Formes décoratives animées */}
        <img
          src={shapeLeft}
          alt="" aria-hidden="true"
          className="shape-left-anim pointer-events-none absolute hidden lg:block"
          style={{ left: "18%", top: "50%", width: "340px", opacity: 0.35 }}
        />
        <img
          src={shapeRight}
          alt="" aria-hidden="true"
          className="shape-right-anim pointer-events-none absolute hidden lg:block"
          style={{ right: "17%", top: "50%", width: "340px", opacity: 0.35 }}
        />

        {/* Halo lumineux central */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(31,108,140,0.10) 0%, transparent 70%)",
          }}
        />

        <div className={`rp-carousel-wrap relative z-10 ${isTransitioning ? "fading" : ""}`}>

          {/* ── Desktop carousel 3D ── */}
          <div className="relative hidden h-[520px] items-center justify-center md:flex">
            {filteredProjects.map((project, index) => {
              const total = filteredProjects.length;
              let offset = index - currentIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              let translateX = 0, rotateY = 0, scale = 1, opacity = 1, zIndex = 30;

              if      (offset === -3) { translateX = -370; rotateY = 28; scale = 0.82; opacity = 0.12; zIndex = 5; }
              else if (offset === -2) { translateX = -255; rotateY = 20; scale = 0.87; opacity = 0.25; zIndex = 10; }
              else if (offset === -1) { translateX = -135; rotateY = 12; scale = 0.93; opacity = 0.52; zIndex = 20; }
              else if (offset === 0)  { translateX = 0;    rotateY = 0;  scale = 1;    opacity = 1;    zIndex = 30; }
              else if (offset === 1)  { translateX = 135;  rotateY = -12; scale = 0.93; opacity = 0.52; zIndex = 20; }
              else if (offset === 2)  { translateX = 255;  rotateY = -20; scale = 0.87; opacity = 0.25; zIndex = 10; }
              else if (offset === 3)  { translateX = 370;  rotateY = -28; scale = 0.82; opacity = 0.12; zIndex = 5; }
              else                    { opacity = 0; scale = 0.75; zIndex = 0; }

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className="absolute"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale}) perspective(1200px) rotateY(${rotateY}deg)`,
                    opacity,
                    zIndex,
                    transition: "all 0.65s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <div className={isCenter ? "rp-card-center" : "rp-card-side"}>
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover"
                        style={{
                          width: isCenter ? "270px" : "220px",
                          height: isCenter ? "420px" : "360px",
                          transition: "all 0.65s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />
                      {/* Overlay info — uniquement sur la carte centrale */}
                      {isCenter && (
                        <div className="rp-card-overlay absolute inset-0 flex flex-col justify-end p-5">
                          <span className="rp-project-num mb-1">
                            {String(index + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                          </span>
                          <h3
                            className="text-[15px] font-bold leading-tight text-white"
                            style={{ fontFamily: "Literata, serif" }}
                          >
                            {project.title}
                          </h3>
                          <div className="mt-2">
                            <span className="rp-cat-badge">{project.category}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Mobile ── */}
          <div className="md:hidden">
            <div className="rp-card-center mx-auto" style={{ maxWidth: "260px" }}>
              <div className="relative">
                <img
                  src={filteredProjects[currentIndex]?.image}
                  alt={filteredProjects[currentIndex]?.title}
                  className="h-[360px] w-full object-cover"
                />
                <div className="rp-card-overlay absolute inset-0 flex flex-col justify-end p-5">
                  <h3
                    className="text-[15px] font-bold text-white"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {filteredProjects[currentIndex]?.title}
                  </h3>
                  <div className="mt-1.5">
                    <span className="rp-cat-badge">{filteredProjects[currentIndex]?.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Dots ── */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {filteredProjects.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`rp-dot ${currentIndex === index ? "active" : "inactive"}`}
                style={{
                  width: currentIndex === index ? "28px" : "10px",
                  height: "10px",
                }}
                aria-label={`${t.dotLabel} ${index + 1}`}
              />
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="mt-8 flex justify-end pr-2 sm:pr-6">
            <a
              href="#portfolio"
              className="rp-cta inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold text-white"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.cta}
              <span className="text-base">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RecentProjectsSection;