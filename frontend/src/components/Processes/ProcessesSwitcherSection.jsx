import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Megaphone,
  Cpu,
  ClipboardList,
  Search,
  Lightbulb,
  PenTool,
  Rocket,
  Database,
  Code2,
  Gauge,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

import leftOutlineShape from "../../assets/Union0.png";
import rightSoftShape from "../../assets/Group14.png";
import topRightShape from "../../assets/Union36.png";
import Shape1 from "../../assets/IMG_4534.jpg";
import Shape2 from "../../assets/IMG_4423.jpg";
import Shape3 from "../../assets/IMG_4432.jpg";



const translations = {
  fr: {
    sectionLabel: "Notre processus",
    sectionTitle: "Deux expertises, une méthode claire et maîtrisée",
    sectionDescription:
      "Selon la nature de votre projet, nous adaptons notre méthode de travail pour offrir un accompagnement structuré, cohérent et orienté résultats. Explorez notre approche en marketing ou en technologie.",
    marketingTab: " Pôle Créatif ",
    technologyTab: " Pôle Technologie",
    more: "Voir plus",
    less: "Réduire",
    marketing: {
      introTitle: "Une stratégie de marque pensée pour créer de l’impact",
      introDescription:
        "Nous construisons chaque projet marketing avec une vision claire, de l’analyse initiale à la mise en œuvre. Notre méthode permet d’aligner le positionnement, le message et les actions pour créer une présence forte, cohérente et durable.",
      featureTitle:
        "Une approche structurée pour des marques plus lisibles et plus fortes",
      featureText:
        "Chaque étape est pensée pour clarifier vos objectifs, renforcer votre identité et déployer des actions concrètes qui créent de la valeur dans le temps.",
      backgroundImage:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80",
      steps: [
        {
          id: "marketing-analysis",
          title: "Analyse & compréhension",
          text: "Nous étudions votre marque, votre marché, votre audience et votre contexte afin de poser une base stratégique solide.",
          details:
            "Cette phase permet de révéler les opportunités, comprendre les attentes de votre audience et identifier les éléments qui doivent guider toute la suite du projet. Nous posons ici les bases de la cohérence stratégique.",
        },
        {
          id: "marketing-positioning",
          title: "Positionnement stratégique",
          text: "Nous définissons une direction claire, un territoire de marque pertinent et des axes de différenciation cohérents.",
          details:
            "Nous organisons les éléments clés de votre identité pour construire un positionnement lisible, fort et mémorable. Cette étape donne de la clarté à votre discours et oriente les futures prises de décision.",
        },
        {
          id: "marketing-creation",
          title: "Création & narration",
          text: "Nous développons les messages, les supports et les éléments visuels qui donnent corps à votre image.",
          details:
            "Le travail créatif s’appuie sur la stratégie définie en amont afin de produire un univers de marque cohérent. Nous structurons les messages, les codes visuels et les contenus qui renforcent votre image.",
        },
        {
          id: "marketing-deployment",
          title: "Déploiement & optimisation",
          text: "Nous mettons en œuvre les actions choisies et suivons leur performance pour ajuster, affiner et amplifier les résultats.",
          details:
            "Une fois la stratégie activée, nous observons les retours, analysons les performances et optimisons les actions déployées. L’objectif est d’installer un impact durable et mesurable dans le temps.",
        },
      ],
      stat1: "Analyse",
      stat2: "Positionnement",
      stat3: "Exécution",
      imageTop:
        Shape2,
      imageBottom:
       Shape1,
      bottomTitle:
        "Un process pensé pour renforcer la valeur, la clarté et l’impact de votre marque",
      bottomText:
        "Nous combinons vision, structure et créativité pour donner à chaque projet marketing une direction forte et une exécution cohérente.",
    },
    technology: {
      introTitle: "Une méthode technique conçue pour bâtir des solutions fiables",
      introDescription:
        "Nous accompagnons les projets technologiques avec un process clair, de la phase de cadrage à la mise en production. L’objectif est d’assurer une architecture cohérente, une exécution fluide et un résultat robuste, évolutif et performant.",
      featureTitle:
        "Une logique de production pensée pour la clarté, la qualité et la durabilité",
      featureText:
        "Notre approche technique structure les décisions, réduit les zones d’incertitude et garantit un développement propre, contrôlé et efficace.",
      backgroundImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
      steps: [
        {
          id: "technology-architecture",
          title: "Cadrage & architecture",
          text: "Nous identifions les besoins, les contraintes et l’environnement technique afin de concevoir une base saine et scalable.",
          details:
            "Nous définissons ici les fondations du projet : architecture, logique technique, contraintes d’intégration, choix structurants et feuille de route. Cette étape réduit les risques et sécurise l’exécution.",
        },
        {
          id: "technology-functional-design",
          title: "Conception fonctionnelle",
          text: "Nous organisons les parcours, les flux, les interactions et les priorités pour transformer les besoins en solution claire.",
          details:
            "Nous traduisons les objectifs métier en logique produit. Les parcours utilisateurs, les interactions et les priorités fonctionnelles sont clarifiés afin de rendre le développement plus précis et plus fluide.",
        },
        {
          id: "technology-development",
          title: "Développement & intégration",
          text: "Nous mettons en œuvre la solution avec rigueur, en assurant cohérence du code, performance et qualité d’intégration.",
          details:
            "Le développement s’appuie sur une structure propre, maintenable et évolutive. Nous veillons à la cohérence technique, à la performance de l’ensemble et à la qualité des connexions entre les différentes briques du projet.",
        },
        {
          id: "technology-testing",
          title: "Tests, livraison & suivi",
          text: "Nous validons, optimisons et livrons un produit prêt à évoluer, avec une attention portée à la stabilité et à la pérennité.",
          details:
            "Avant la mise en ligne, nous sécurisons le produit avec des vérifications, des ajustements et une phase de validation. L’objectif est de livrer une solution stable, durable et prête à évoluer dans le temps.",
        },
      ],
      stat1: "Architecture",
      stat2: "Développement",
      stat3: "Livraison",
      imageTop:
        Shape3,
      imageBottom:
        Shape1,
      bottomTitle:
        "Un process technique pensé pour construire des solutions performantes et durables",
      bottomText:
        "Nous combinons cadrage, logique produit et rigueur technique pour faire avancer chaque projet avec maîtrise et efficacité.",
    },
  },

  en: {
    sectionLabel: "Our process",
    sectionTitle: "Two expertises, one clear and controlled method",
    sectionDescription:
      "Depending on the nature of your project, we adapt our workflow to provide structured, consistent and results-driven support. Explore our approach in marketing or technology.",
    marketingTab: "Creative Hub",
    technologyTab: "Technology Hub",
    more: "Read more",
    less: "Reduce",
    marketing: {
      introTitle: "A brand strategy designed to create impact",
      introDescription:
        "We build every marketing project with a clear vision, from initial analysis to execution. Our method aligns positioning, messaging and actions to create a strong, consistent and lasting presence.",
      featureTitle:
        "A structured approach for stronger and more readable brands",
      featureText:
        "Each step is designed to clarify your goals, strengthen your identity and deploy concrete actions that create long-term value.",
      backgroundImage:
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80",
      steps: [
        {
          id: "marketing-analysis",
          title: "Analysis & understanding",
          text: "We study your brand, market, audience and context in order to establish a strong strategic foundation.",
          details:
            "This phase reveals opportunities, clarifies audience expectations and identifies the elements that should guide the rest of the project. It builds the strategic consistency needed for strong execution.",
        },
        {
          id: "marketing-positioning",
          title: "Strategic positioning",
          text: "We define a clear direction, a relevant brand territory and coherent differentiation axes.",
          details:
            "We organize the key dimensions of your identity to create a readable, strong and memorable positioning. This stage brings clarity to your message and helps guide future decisions.",
        },
        {
          id: "marketing-creation",
          title: "Creation & storytelling",
          text: "We develop the messages, assets and visual elements that bring your identity to life.",
          details:
            "Creative production is grounded in the strategy previously defined. We shape the messages, visual codes and supporting materials that strengthen your brand image across every touchpoint.",
        },
        {
          id: "marketing-deployment",
          title: "Deployment & optimization",
          text: "We implement the chosen actions and monitor performance to adjust, refine and amplify the results.",
          details:
            "Once the strategy is activated, we observe outcomes, track performance and optimize actions over time. The objective is to create durable, measurable and scalable impact.",
        },
      ],
      stat1: "Analysis",
      stat2: "Positioning",
      stat3: "Execution",
      imageTop:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
      imageBottom:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1400&q=80",
      bottomTitle:
        "A process designed to strengthen the value, clarity and impact of your brand",
      bottomText:
        "We combine vision, structure and creativity to give every marketing project a strong direction and consistent execution.",
    },
    technology: {
      introTitle: "A technical method built to deliver reliable solutions",
      introDescription:
        "We support technology projects with a clear process, from framing to production. The goal is to ensure coherent architecture, smooth execution and a robust, scalable and high-performing result.",
      featureTitle:
        "A production logic built for clarity, quality and durability",
      featureText:
        "Our technical approach structures decisions, reduces uncertainty and ensures clean, controlled and efficient development.",
      backgroundImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=80",
      steps: [
        {
          id: "technology-architecture",
          title: "Scoping & architecture",
          text: "We identify needs, constraints and the technical environment in order to design a healthy and scalable foundation.",
          details:
            "Here we define the core foundations of the project: architecture, technical logic, integration constraints, structural choices and delivery direction. This stage reduces risk and secures execution.",
        },
        {
          id: "technology-functional-design",
          title: "Functional design",
          text: "We organize flows, interactions and priorities to turn requirements into a clear solution.",
          details:
            "We translate business goals into product logic. User journeys, interactions and functional priorities are clarified to make development more precise and more fluid.",
        },
        {
          id: "technology-development",
          title: "Development & integration",
          text: "We implement the solution with rigor, ensuring code consistency, performance and integration quality.",
          details:
            "Development relies on a clean, maintainable and scalable structure. We ensure technical consistency, overall performance and high-quality integration between all parts of the project.",
        },
        {
          id: "technology-testing",
          title: "Testing, delivery & follow-up",
          text: "We validate, optimize and deliver a product ready to evolve, with strong attention to stability and long-term reliability.",
          details:
            "Before launch, we secure the product through checks, refinements and validation phases. The goal is to deliver a stable, durable solution ready to evolve over time.",
        },
      ],
      stat1: "Architecture",
      stat2: "Development",
      stat3: "Delivery",
      imageTop:
        "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80",
      imageBottom:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
      bottomTitle:
        "A technical process designed to build scalable and durable solutions",
      bottomText:
        "We combine framing, product logic and technical rigor to move every project forward with control and efficiency.",
    },
  },
};

const marketingIcons = [Search, Lightbulb, PenTool, Rocket];
const technologyIcons = [ClipboardList, Database, Code2, Gauge];

const ElegantImageCard = ({ src, alt, rounded = "rounded-[28px]" }) => {
  return (
    <div
      className={`group relative overflow-hidden ${rounded}`}
      style={{ boxShadow: "0 26px 60px rgba(15, 23, 42, 0.12)" }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          border: "1px solid rgba(255,255,255,0.45)",
          borderRadius: "28px",
        }}
      />
    </div>
  );
};

const ProcessCard = ({
  step,
  index,
  visible,
  icon: Icon,
  isOpen,
  onToggle,
  labels,
}) => {
  return (
    <div
      className={`prs-step-card ${visible ? "show" : ""}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        className={`prs-card-shell relative rounded-[22px] ${
          isOpen ? "prs-card-open" : ""
        }`}
      >
        <div className="relative rounded-[22px] px-6 py-6 text-white shadow-[0_20px_38px_rgba(31,108,140,0.18)]">
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`prs-card-icon flex h-10 w-10 items-center justify-center rounded-full bg-white/14 backdrop-blur-sm ${
                isOpen ? "active" : ""
              }`}
            >
              <Icon className="h-4.5 w-4.5 text-white" strokeWidth={1.9} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3
            className="text-[28px] font-bold leading-tight sm:text-[31px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {step.title}
          </h3>

          <p
            className="mt-3 text-[13px] leading-[1.82] text-white/82"
            style={{ fontFamily: "Literata, serif" }}
          >
            {step.text}
          </p>

          <div
            className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isOpen
                ? "mt-4 grid-rows-[1fr] opacity-100"
                : "mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className="rounded-[14px] border border-white/12 bg-white/10 px-4 py-4 text-[13px] leading-[1.82] text-white/86"
                style={{ fontFamily: "Literata, serif" }}
              >
                {step.details}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/52"
              style={{ fontFamily: "Literata, serif" }}
            >
              {isOpen ? labels.less : labels.more}
            </span>

            <button
              type="button"
              onClick={onToggle}
              className={`prs-expand-btn absolute -bottom-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[#f7f7f4] text-[#1f6c8c] shadow-[0_8px_18px_rgba(0,0,0,0.12)] ${
                isOpen ? "open" : ""
              }`}
              aria-expanded={isOpen}
            >
              <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessesSwitcherSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const [active, setActive] = useState("marketing");
  const [visible, setVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [openStep, setOpenStep] = useState(0);

  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);

  const activeData = useMemo(() => t[active], [t, active]);
  const activeIcons = active === "marketing" ? marketingIcons : technologyIcons;

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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleTabChange = (nextTab) => {
    if (nextTab === active) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setContentVisible(false);

    timeoutRef.current = setTimeout(() => {
      setActive(nextTab);
      setOpenStep(0);
      setContentVisible(true);
    }, 220);
  };

  const toggleStep = (index) => {
    setOpenStep((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      id="processes-content"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f4] py-20 sm:py-24 lg:py-28"
    >
      <style>{`
        .prs-bg-sticky {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .prs-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 120%;
          object-fit: cover;
          object-position: center;
          transform: translateY(-6%);
          filter: saturate(0.92) contrast(1.02);
          transition: opacity 0.6s ease, transform 6s ease;
        }

        .prs-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(247,247,244,0.84) 0%,
              rgba(247,247,244,0.68) 18%,
              rgba(247,247,244,0.56) 40%,
              rgba(247,247,244,0.62) 62%,
              rgba(247,247,244,0.82) 100%
            );
        }

        .prs-bg-glass {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(8px) saturate(120%);
          -webkit-backdrop-filter: blur(8px) saturate(120%);
          background:
            radial-gradient(circle at 20% 25%, rgba(255,255,255,0.22), transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(168,212,232,0.16), transparent 28%);
          opacity: 0.9;
        }

        .prs-halo {
          background:
            radial-gradient(ellipse 40% 35% at 15% 22%, rgba(168,212,232,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 36% 30% at 85% 74%, rgba(31,108,140,0.10) 0%, transparent 72%);
        }

        .prs-bg-grid {
          background-image:
            linear-gradient(rgba(31,108,140,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,108,140,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at center, black 55%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, black 55%, transparent 100%);
        }

        .prs-orb {
          filter: blur(28px);
          opacity: 0.38;
          animation: prsOrbFloat 10s ease-in-out infinite;
        }

        .prs-orb.orb-2 {
          animation-delay: 2s;
          animation-duration: 12s;
        }

        @keyframes prsOrbFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-16px) translateX(10px) scale(1.06);
          }
        }

        .prs-header-entry {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.82s ease, transform 0.82s cubic-bezier(0.22,1,0.36,1);
        }

        .prs-header-entry.show {
          opacity: 1;
          transform: translateY(0);
        }

        .prs-content-wrap {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .prs-content-wrap.hidden-state {
          opacity: 0;
          transform: translateY(16px);
        }

        .prs-tab {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.78);
          box-shadow: 0 10px 26px rgba(31,108,140,0.06);
          transition: all 0.34s cubic-bezier(0.22,1,0.36,1);
        }

        .prs-tab:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.92);
        }

        .prs-tab.active {
          background: linear-gradient(135deg, #1f6c8c, #2a90b8);
          color: white;
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 14px 32px rgba(31,108,140,0.24);
        }

        .prs-top-card,
        .prs-soft-panel,
        .prs-mini-stat {
          background: rgba(255,255,255,0.58);
          backdrop-filter: blur(18px) saturate(145%);
          -webkit-backdrop-filter: blur(18px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.72);
        }

        .prs-top-card {
          box-shadow:
            0 18px 42px rgba(31,108,140,0.08),
            0 1px 0 rgba(255,255,255,0.9) inset;
        }

        .prs-badge {
          background: rgba(31,108,140,0.08);
          border: 1px solid rgba(31,108,140,0.12);
          color: #1f6c8c;
        }

        .prs-timeline-line {
          position: relative;
          background: linear-gradient(
            to bottom,
            rgba(31,108,140,0.08),
            rgba(31,108,140,0.78),
            rgba(31,108,140,0.08)
          );
        }

        .prs-timeline-line::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 6px;
          height: 90px;
          border-radius: 999px;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(168,212,232,0.85), rgba(255,255,255,0));
          animation: prsLineMove 2.6s linear infinite;
          opacity: 0.8;
        }

        @keyframes prsLineMove {
          0% { top: 0; opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { top: calc(100% - 90px); opacity: 0; }
        }

        .prs-node {
          background: rgba(247,247,244,0.96);
          border: 1px solid rgba(31,108,140,0.10);
          box-shadow: 0 8px 18px rgba(0,0,0,0.08);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .prs-node.active {
          transform: scale(1.08);
          box-shadow: 0 14px 28px rgba(31,108,140,0.18);
        }

        .prs-node-icon.active {
          animation: prsIconPulse 1.8s ease-in-out infinite;
        }

        @keyframes prsIconPulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.12) rotate(4deg);
            opacity: 0.82;
          }
        }

        .prs-step-card {
          width: 100%;
          max-width: 440px;
          opacity: 0;
          transform: translateY(26px) scale(0.98);
          transition: opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }

        .prs-step-card.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .prs-card-shell {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.35s ease;
          animation: prsCardFloat 6.5s ease-in-out infinite;
        }

        .prs-card-shell:hover {
          transform: translateY(-5px);
        }

        .prs-card-shell.prs-card-open {
          transform: translateY(-6px) scale(1.01);
          filter: saturate(1.05);
        }

        @keyframes prsCardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }

        .prs-card-shell > div {
          background: linear-gradient(
            135deg,
            rgba(31,108,140,0.94) 0%,
            rgba(35,122,158,0.92) 100%
          );
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .prs-card-icon {
          transition: transform 0.35s ease, background 0.35s ease;
        }

        .prs-card-icon.active {
          background: rgba(255,255,255,0.22);
          animation: prsCardIconGlow 1.6s ease-in-out infinite;
        }

        @keyframes prsCardIconGlow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255,255,255,0);
          }
          50% {
            transform: scale(1.08) rotate(4deg);
            box-shadow: 0 0 20px rgba(255,255,255,0.16);
          }
        }

        .prs-expand-btn {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, background 0.35s ease;
        }

        .prs-expand-btn:hover {
          box-shadow: 0 12px 24px rgba(31,108,140,0.16);
          transform: translateX(-50%) scale(1.06);
        }

        .prs-expand-btn.open {
          transform: translateX(-50%) rotate(180deg) scale(1.08);
          background: #ffffff;
        }

        .prs-soft-panel {
          box-shadow: 0 14px 34px rgba(31,108,140,0.08);
        }

        .prs-mini-stat {
          box-shadow: 0 10px 22px rgba(31,108,140,0.08);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .prs-mini-stat:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 34px rgba(31,108,140,0.10);
        }

        .prs-float-soft {
          animation: prsFloatSoft 9s ease-in-out infinite;
        }

        @keyframes prsFloatSoft {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }

        .prs-main-image-entry {
          opacity: 0;
          transform: translateY(26px) scale(0.985);
          transition:
            opacity 0.95s ease,
            transform 0.95s cubic-bezier(0.22,1,0.36,1);
        }

        .prs-small-image-entry {
          opacity: 0;
          transform: translateY(18px) translateX(-12px) scale(0.96);
          transition:
            opacity 0.95s ease 0.12s,
            transform 0.95s cubic-bezier(0.22,1,0.36,1) 0.12s;
        }

        .prs-content-wrap .prs-main-image-entry,
        .prs-content-wrap .prs-small-image-entry {
          opacity: 1;
        }

        .prs-content-wrap:not(.hidden-state) .prs-main-image-entry {
          transform: translateY(0) scale(1);
        }

        .prs-content-wrap:not(.hidden-state) .prs-small-image-entry {
          transform: translateY(0) translateX(0) scale(1);
        }
      `}</style>

      <div className="prs-bg-sticky">
        <img
          src={activeData.backgroundImage}
          alt=""
          aria-hidden="true"
          className="prs-bg-image"
        />
        <div className="prs-bg-overlay" />
        <div className="prs-bg-glass" />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-[32%] z-0 hidden h-[680px] w-[680px] -translate-x-1/2 rounded-full lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.30) 0%, rgba(168,212,232,0.10) 34%, transparent 72%)",
          filter: "blur(20px)",
        }}
      />

      <div className="prs-halo pointer-events-none absolute inset-0 z-0" />
      <div className="prs-bg-grid pointer-events-none absolute inset-0 z-0" />

      <div
        className="prs-orb absolute left-[10%] top-[18%] z-0 h-[180px] w-[180px] rounded-full"
        style={{ background: "rgba(168,212,232,0.28)" }}
      />
      <div
        className="prs-orb orb-2 absolute right-[12%] bottom-[16%] z-0 h-[220px] w-[220px] rounded-full"
        style={{ background: "rgba(31,108,140,0.12)" }}
      />

      <img
        src={leftOutlineShape}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[54px] z-0 hidden h-[980px] opacity-90 xl:block"
      />

      <img
        src={topRightShape}
        alt=""
        aria-hidden="true"
        className="prs-float-soft pointer-events-none absolute right-[70px] top-[255px] z-0 hidden w-[280px] opacity-95 lg:block"
      />

      <img
        src={rightSoftShape}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[145px] right-[-30px] z-0 hidden w-[430px] opacity-70 lg:block"
      />

      <div className="page-container relative z-10">
        <div
          className={`prs-header-entry mx-auto max-w-[880px] text-center ${
            visible ? "show" : ""
          }`}
        >
          <span
            className="prs-badge inline-flex rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em]"
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
            className="mx-auto mt-5 max-w-[740px] text-sm leading-[1.9] text-slate-600 sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.sectionDescription}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleTabChange("marketing")}
              className={`prs-tab inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
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
              className={`prs-tab inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
                active === "technology" ? "active" : "text-slate-700"
              }`}
              style={{ fontFamily: "Literata, serif" }}
            >
              <Cpu className="h-4 w-4" strokeWidth={1.9} />
              {t.technologyTab}
            </button>
          </div>
        </div>

        <div
          key={`${lang}-${active}`}
          className={`prs-content-wrap mt-16 ${
            contentVisible ? "" : "hidden-state"
          }`}
        >
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="max-w-[620px]">
                <span
                  className="prs-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {active === "marketing" ? (
                    <Megaphone className="h-4 w-4" strokeWidth={1.9} />
                  ) : (
                    <Cpu className="h-4 w-4" strokeWidth={1.9} />
                  )}
                  {active === "marketing" ? t.marketingTab : t.technologyTab}
                </span>

                <h3
                  className="mt-5 text-[38px] font-bold leading-[1.06] text-slate-950 sm:text-[48px]"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {activeData.introTitle}
                </h3>

                <p
                  className="mt-5 max-w-[560px] text-[14px] leading-[1.9] text-slate-600"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {activeData.introDescription}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {[activeData.stat1, activeData.stat2, activeData.stat3].map(
                  (item, index) => (
                    <div
                      key={`${active}-${item}`}
                      className="prs-mini-stat rounded-[24px] px-6 py-7 text-center"
                    >
                      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-[#1f6c8c]/12 bg-[#1f6c8c]/6 text-[#1f6c8c]">
                        <span className="text-[12px] font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p
                        className="mt-4 text-[22px] font-bold text-slate-900"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {item}
                      </p>
                    </div>
                  )
                )}
              </div>

              <div className="prs-soft-panel mt-12 rounded-[28px] p-6 sm:p-7">
                <h4
                  className="text-[28px] font-bold leading-tight text-slate-950"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {activeData.featureTitle}
                </h4>

                <p
                  className="mt-4 max-w-[560px] text-[14px] leading-[1.9] text-slate-600"
                  style={{ fontFamily: "Literata, serif" }}
                >
                  {activeData.featureText}
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="prs-main-image-entry ml-auto w-full max-w-[520px]">
                  <ElegantImageCard
                    src={activeData.imageBottom}
                    alt={activeData.introTitle}
                    rounded="rounded-[34px]"
                  />
                </div>

                <div className="prs-small-image-entry absolute -left-2 -top-10 hidden w-[46%] sm:block">
                  <ElegantImageCard
                    src={activeData.imageTop}
                    alt={activeData.featureTitle}
                    rounded="rounded-[24px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="mx-auto mb-12 max-w-[760px] text-center">
              <h3
                className="text-[34px] font-bold leading-tight text-slate-950 sm:text-[42px]"
                style={{ fontFamily: "Literata, serif" }}
              >
                {activeData.featureTitle}
              </h3>

              <p
                className="mx-auto mt-4 max-w-[680px] text-[14px] leading-[1.9] text-slate-600"
                style={{ fontFamily: "Literata, serif" }}
              >
                {activeData.featureText}
              </p>
            </div>

            <div className="space-y-16 lg:space-y-20">
              {activeData.steps.map((step, index) => {
                const Icon = activeIcons[index % activeIcons.length];
                const isRight = index % 2 === 1;
                const isOpen = openStep === index;

                return (
                  <div
                    key={`${lang}-${active}-${step.id}`}
                    className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_80px_1fr]"
                  >
                    <div className={`${isRight ? "lg:invisible" : ""}`}>
                      <div className="hidden lg:block">
                        {!isRight && (
                          <ProcessCard
                            step={step}
                            index={index}
                            visible={contentVisible}
                            icon={Icon}
                            isOpen={isOpen}
                            onToggle={() => toggleStep(index)}
                            labels={{ more: t.more, less: t.less }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="relative flex justify-center">
                      <div className="prs-timeline-line absolute top-0 hidden h-full w-[2px] lg:block" />

                      <div
                        className={`prs-node z-10 flex h-12 w-12 items-center justify-center rounded-full ${
                          isOpen ? "active" : ""
                        }`}
                      >
                        <Icon
                          className={`prs-node-icon h-7 w-7 text-[#1f6c8c] ${
                            isOpen ? "active" : ""
                          }`}
                          strokeWidth={1.9}
                        />
                      </div>
                    </div>

                    <div className={`${!isRight ? "lg:invisible" : ""}`}>
                      <div className="hidden lg:block">
                        {isRight && (
                          <ProcessCard
                            step={step}
                            index={index}
                            visible={contentVisible}
                            icon={Icon}
                            isOpen={isOpen}
                            onToggle={() => toggleStep(index)}
                            labels={{ more: t.more, less: t.less }}
                          />
                        )}
                      </div>
                    </div>

                    <div className="lg:hidden">
                      <ProcessCard
                        step={step}
                        index={index}
                        visible={contentVisible}
                        icon={Icon}
                        isOpen={isOpen}
                        onToggle={() => toggleStep(index)}
                        labels={{ more: t.more, less: t.less }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="prs-soft-panel mt-20 rounded-[28px] px-7 py-8 text-center sm:px-10 sm:py-10">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#1f6c8c]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.sectionLabel}
            </p>

            <h4
              className="mx-auto mt-4 max-w-[760px] text-[30px] font-bold leading-tight text-slate-900 sm:text-[38px]"
              style={{ fontFamily: "Literata, serif" }}
            >
              {activeData.bottomTitle}
            </h4>

            <p
              className="mx-auto mt-4 max-w-[720px] text-[14px] leading-[1.9] text-slate-600"
              style={{ fontFamily: "Literata, serif" }}
            >
              {activeData.bottomText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessesSwitcherSection;