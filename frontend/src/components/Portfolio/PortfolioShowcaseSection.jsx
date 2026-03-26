import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Megaphone,
  Cpu,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import leftOutlineShape from "../../assets/Union0.png";
import rightSoftShape from "../../assets/Group14.png";
import topRightShape from "../../assets/Union_03.png";

const translations = {
  fr: {
    sectionLabel: "Réalisations",
    sectionTitle: "Une sélection de projets entre identité, stratégie et technologie",
    sectionDescription:
      "Nous concevons des réalisations qui associent direction créative, logique d’usage et qualité d’exécution. Explorez nos projets marketing et technologiques à travers une lecture claire et immersive.",
    marketingTab: "Marketing & Brand",
    technologyTab: "Technology",
    viewProject: "Voir le projet",
    featuredLabel: "Projet en avant",
    metricLabel: "Impact",
    marketing: {
      introTitle:
        "Des projets marketing pensés pour renforcer la présence et la perception d’une marque",
      introDescription:
        "Nous construisons des univers, des récits et des dispositifs visuels capables de traduire une vision claire. Chaque projet cherche l’équilibre entre cohérence stratégique, force esthétique et lisibilité.",
      featured: {
        slug: "strategie-marketing",
        type: "marketing-brand",
        category: "Brand Strategy",
        title: "Repositionnement global d’une marque lifestyle",
        description:
          "Une refonte pensée pour clarifier le positionnement, renforcer la cohérence visuelle et créer une expression de marque plus forte sur l’ensemble des supports.",
        metric: "+38% de clarté perçue",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
      },
      projects: [
        {
          slug: "strategie-marketing",
          type: "marketing-brand",
          category: "Campaign",
          title: "Lancement éditorial et identité de campagne",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "marketing-contenu",
          type: "marketing-brand",
          category: "Brand Content",
          title: "Système visuel pour contenu de marque",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "reseaux-sociaux",
          type: "marketing-brand",
          category: "Social Direction",
          title: "Direction créative pour présence sociale",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "identite-de-marque",
          type: "marketing-brand",
          category: "Visual Identity",
          title: "Refonte d’identité pour marque premium",
          image:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80",
        },
      ],
    },
    technology: {
      introTitle:
        "Des solutions technologiques conçues pour la fluidité, la performance et la durabilité",
      introDescription:
        "Nous développons des expériences et des produits qui allient structure technique, précision fonctionnelle et qualité visuelle. Chaque projet vise une exécution fiable, claire et évolutive.",
      featured: {
        slug: "developpement-web",
        type: "technology",
        category: "Platform Design",
        title: "Conception d’une plateforme digitale orientée performance",
        description:
          "Une approche centrée sur les usages, l’architecture et l’expérience afin de créer une solution plus fluide, plus lisible et prête à évoluer.",
        metric: "+42% d’efficacité perçue",
        image:
          "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80",
      },
      projects: [
        {
          slug: "developpement-web",
          type: "technology",
          category: "Web Platform",
          title: "Interface produit pensée pour l’usage",
          image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "dashboard-analytique",
          type: "technology",
          category: "Dashboard",
          title: "Système de pilotage et visualisation",
          image:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "ux-architecture",
          type: "technology",
          category: "UX Architecture",
          title: "Parcours structurés pour service digital",
          image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "product-build",
          type: "technology",
          category: "Product Build",
          title: "Développement d’un environnement sur mesure",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
        },
      ],
    },
  },
  en: {
    sectionLabel: "Work",
    sectionTitle: "A curated selection of projects across identity, strategy and technology",
    sectionDescription:
      "We design projects that combine creative direction, product logic and execution quality. Explore our marketing and technology work through a clear and immersive showcase.",
    marketingTab: "Marketing & Brand",
    technologyTab: "Technology",
    viewProject: "View project",
    featuredLabel: "Featured project",
    metricLabel: "Impact",
    marketing: {
      introTitle:
        "Marketing projects designed to strengthen a brand’s presence and perception",
      introDescription:
        "We build worlds, narratives and visual systems capable of expressing a clear vision. Each project seeks the balance between strategic consistency, aesthetic strength and readability.",
      featured: {
        slug: "strategie-marketing",
        type: "marketing-brand",
        category: "Brand Strategy",
        title: "Global repositioning for a lifestyle brand",
        description:
          "A redesign crafted to clarify positioning, strengthen visual consistency and create a stronger brand expression across every touchpoint.",
        metric: "+38% perceived clarity",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
      },
      projects: [
        {
          slug: "strategie-marketing",
          type: "marketing-brand",
          category: "Campaign",
          title: "Editorial launch and campaign identity",
          image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "marketing-contenu",
          type: "marketing-brand",
          category: "Brand Content",
          title: "Visual system for brand content",
          image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "reseaux-sociaux",
          type: "marketing-brand",
          category: "Social Direction",
          title: "Creative direction for social presence",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "identite-de-marque",
          type: "marketing-brand",
          category: "Visual Identity",
          title: "Premium brand identity redesign",
          image:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80",
        },
      ],
    },
    technology: {
      introTitle:
        "Technology solutions designed for fluidity, performance and durability",
      introDescription:
        "We build experiences and products that combine technical structure, functional precision and visual quality. Each project aims for reliable, clear and scalable execution.",
      featured: {
        slug: "developpement-web",
        type: "technology",
        category: "Platform Design",
        title: "Design of a performance-oriented digital platform",
        description:
          "A method centered on usage, architecture and experience to create a solution that is clearer, smoother and ready to evolve.",
        metric: "+42% perceived efficiency",
        image:
          "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80",
      },
      projects: [
        {
          slug: "developpement-web",
          type: "technology",
          category: "Web Platform",
          title: "Product interface designed for usage",
          image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "dashboard-analytique",
          type: "technology",
          category: "Dashboard",
          title: "Monitoring and visualization system",
          image:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "ux-architecture",
          type: "technology",
          category: "UX Architecture",
          title: "Structured journeys for a digital service",
          image:
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
        },
        {
          slug: "product-build",
          type: "technology",
          category: "Product Build",
          title: "Custom digital environment development",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=80",
        },
      ],
    },
  },
};

const ProjectCard = ({ project, t }) => {
  return (
    <Link
      to={`/${project.type}/${project.slug}`}
      state={{ navContext: "portfolio" }}
      className="group relative block overflow-hidden rounded-[24px] border border-white/60 bg-white/55 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-[12px]"
    >
      <div className="relative h-[290px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08131b]/44 via-transparent to-transparent" />
      </div>

      <div className="relative p-6">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#1f6c8c]"
          style={{ fontFamily: "Literata, serif" }}
        >
          {project.category}
        </p>

        <h3
          className="mt-3 text-[28px] font-bold leading-tight text-slate-900"
          style={{ fontFamily: "Literata, serif" }}
        >
          {project.title}
        </h3>

        <div className="mt-6 flex items-center justify-between">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.viewProject}
          </span>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f6c8c] text-white shadow-[0_10px_24px_rgba(31,108,140,0.24)] transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const PortfolioShowcaseSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const [active, setActive] = useState("marketing");
  const [visible, setVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const sectionRef = useRef(null);

  const activeData = useMemo(() => t[active], [t, active]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (nextTab) => {
    if (nextTab === active) return;
    setContentVisible(false);
    setTimeout(() => {
      setActive(nextTab);
      setContentVisible(true);
    }, 220);
  };

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f4] py-20 sm:py-24 lg:py-28"
    >
      <style>{`
        .pfs-halo {
          background:
            radial-gradient(ellipse 40% 35% at 16% 22%, rgba(168,212,232,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 36% 30% at 84% 74%, rgba(31,108,140,0.10) 0%, transparent 72%);
        }

        .pfs-header-entry {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.82s ease, transform 0.82s cubic-bezier(0.22,1,0.36,1);
        }

        .pfs-header-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        .pfs-content-wrap {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .pfs-content-wrap.hidden-state {
          opacity: 0;
          transform: translateY(16px);
        }

        .pfs-tab {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.78);
          box-shadow: 0 10px 26px rgba(31,108,140,0.06);
          transition: all 0.34s cubic-bezier(0.22,1,0.36,1);
        }

        .pfs-tab:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.92);
        }

        .pfs-tab.active {
          background: linear-gradient(135deg, #1f6c8c, #2a90b8);
          color: white;
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 14px 32px rgba(31,108,140,0.24);
        }

        .pfs-featured {
          background: rgba(255,255,255,0.56);
          backdrop-filter: blur(18px) saturate(145%);
          -webkit-backdrop-filter: blur(18px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.72);
          box-shadow: 0 18px 42px rgba(31,108,140,0.08);
        }

        .pfs-float-shape {
          animation: pfsFloat 9s ease-in-out infinite;
        }

        @keyframes pfsFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>

      <div className="pfs-halo pointer-events-none absolute inset-0 z-0" />

      <img
        src={leftOutlineShape}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[60px] z-0 hidden h-[940px] opacity-70 xl:block"
      />

      <img
        src={topRightShape}
        alt=""
        aria-hidden="true"
        className="pfs-float-shape pointer-events-none absolute right-[7%] top-[210px] z-0 hidden w-[260px] opacity-85 lg:block"
      />

      <img
        src={rightSoftShape}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[120px] right-[-30px] z-0 hidden w-[400px] opacity-55 lg:block"
      />

      <div className="page-container relative z-10">
        <div
          className={`pfs-header-entry mx-auto max-w-[920px] text-center ${
            visible ? "show" : ""
          }`}
        >
          <span
            className="inline-flex rounded-full border border-[#1f6c8c]/12 bg-[#1f6c8c]/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1f6c8c]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.sectionLabel}
          </span>

          <h2
            className="mt-5 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-[58px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.sectionTitle}
          </h2>

          <div
            className="mx-auto mt-5 h-[2px] w-[42px] rounded-full"
            style={{ background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)" }}
          />

          <p
            className="mx-auto mt-5 max-w-[760px] text-sm leading-[1.9] text-slate-600 sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.sectionDescription}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleTabChange("marketing")}
              className={`pfs-tab inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
                active === "marketing" ? "active" : "text-slate-700"
              }`}
              style={{ fontFamily: "Literata, serif" }}
            >
              <Megaphone className="h-4 w-4" strokeWidth={1.9} />
              {t.marketingTab}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("technology")}
              className={`pfs-tab inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
                active === "technology" ? "active" : "text-slate-700"
              }`}
              style={{ fontFamily: "Literata, serif" }}
            >
              <Cpu className="h-4 w-4" strokeWidth={1.9} />
              {t.technologyTab}
            </button>
          </div>
        </div>

        <div className={`pfs-content-wrap mt-16 ${contentVisible ? "" : "hidden-state"}`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border border-[#1f6c8c]/12 bg-[#1f6c8c]/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1f6c8c]"
                style={{ fontFamily: "Literata, serif" }}
              >
                <LayoutGrid className="h-4 w-4" strokeWidth={1.9} />
                {active === "marketing" ? t.marketingTab : t.technologyTab}
              </span>

              <h3
                className="mt-5 max-w-[760px] text-[38px] font-bold leading-[1.06] text-slate-950 sm:text-[48px]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {activeData.introTitle}
              </h3>

              <p
                className="mt-5 max-w-[650px] text-[14px] leading-[1.9] text-slate-600"
                style={{ fontFamily: "Literata, serif" }}
              >
                {activeData.introDescription}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                {activeData.projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} t={t} />
                ))}
              </div>
            </div>

            <div>
              <div className="pfs-featured sticky top-28 overflow-hidden rounded-[28px]">
                <div className="relative h-[360px] overflow-hidden">
                  <img
                    src={activeData.featured.image}
                    alt={activeData.featured.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08131b]/52 via-transparent to-transparent" />
                </div>

                <div className="p-7 sm:p-8">
                  <span
                    className="inline-flex rounded-full border border-[#1f6c8c]/12 bg-[#1f6c8c]/8 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.20em] text-[#1f6c8c]"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.featuredLabel}
                  </span>

                  <p
                    className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1f6c8c]"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {activeData.featured.category}
                  </p>

                  <h3
                    className="mt-3 text-[34px] font-bold leading-[1.06] text-slate-950"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {activeData.featured.title}
                  </h3>

                  <p
                    className="mt-4 text-[14px] leading-[1.9] text-slate-600"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {activeData.featured.description}
                  </p>

                  <div className="mt-7 flex items-center justify-between rounded-[20px] bg-white/65 px-5 py-5 backdrop-blur-[12px]">
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {t.metricLabel}
                      </p>
                      <p
                        className="mt-2 text-[22px] font-bold text-slate-900"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {activeData.featured.metric}
                      </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f6c8c] text-white shadow-[0_12px_28px_rgba(31,108,140,0.24)]">
                      <Sparkles className="h-5 w-5" strokeWidth={1.9} />
                    </div>
                  </div>

                  <div className="mt-7">
                    <Link
                      to={`/${activeData.featured.type}/${activeData.featured.slug}`}
                      className="inline-flex items-center gap-2 rounded-[12px] bg-[#1f6c8c] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(31,108,140,0.24)] transition-transform duration-300 hover:translate-y-[-2px]"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      {t.viewProject}
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;