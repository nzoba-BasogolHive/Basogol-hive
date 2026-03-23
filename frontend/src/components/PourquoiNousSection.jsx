import React, { useEffect, useRef, useState } from "react";
import BlueShape from "./BlueShape";
import whyUsPortraitCards from "../assets/why-us-portrait-cards.png";
import polygonShape from "../assets/Polygon 4.png";
import { useLanguage } from "./LanguageContext";

const translations = {
  fr: {
    badge: "Nos services",
    title: "Pourquoi choisir notre entreprise ?",
    description:
      "Nous accompagnons les entreprises avec une double expertise : la tech et le studio créatif. Nous développons des applications, des logiciels et des solutions d'hébergement, tout en proposant aussi la création de logos, le design graphique, le montage vidéo et la production de contenus visuels professionnels.",
    portraitAlt: "Portrait représentant notre accompagnement",
    faqData: [
      {
        title: "Développement d'applications web et mobile",
        content:
          "Nous concevons des applications web et mobiles modernes, rapides et performantes. Nous créons des solutions sur mesure adaptées à vos besoins, à vos objectifs et à votre image de marque.",
      },
      {
        title: "Création de logiciels sur mesure",
        content:
          "Nous développons des logiciels personnalisés pour automatiser vos processus, améliorer votre organisation interne et vous faire gagner du temps au quotidien.",
      },
      {
        title: "Hébergement, maintenance et sécurité",
        content:
          "Nous prenons en charge l'hébergement, la maintenance, les sauvegardes, la sécurité et l'optimisation technique de vos outils digitaux pour garantir stabilité et performance.",
      },
      {
        title: "Branding, logo et identité visuelle",
        content:
          "Nous créons des logos, chartes graphiques, visuels professionnels et supports de communication pour donner à votre entreprise une image forte, moderne et cohérente.",
      },
      {
        title: "Montage vidéo et production studio",
        content:
          "Nous réalisons le montage vidéo, les contenus promotionnels, les vidéos publicitaires et les visuels créatifs pour valoriser votre activité sur le web et les réseaux sociaux.",
      },
      {
        title: "Une équipe complète pour votre entreprise",
        content:
          "Notre force est de réunir la technologie et la création dans une seule équipe. Vous bénéficiez d'un accompagnement global pour développer votre présence, votre image et vos outils.",
      },
    ],
    highlights: [
      { value: "Tech", label: "Applications, logiciels, hébergement et solutions digitales" },
      { value: "Studio", label: "Logo, design, montage vidéo et contenus de communication" },
      { value: "360°", label: "Un accompagnement complet de l'idée jusqu'à la livraison" },
    ],
  },
  en: {
    badge: "Our services",
    title: "Why choose our company?",
    description:
      "We support businesses with dual expertise: tech and creative studio. We build applications, software and hosting solutions, while also offering logo creation, graphic design, video editing and professional visual content production.",
    portraitAlt: "Portrait representing our support",
    faqData: [
      {
        title: "Web and mobile application development",
        content:
          "We design modern, fast and high-performance web and mobile applications. We create custom solutions tailored to your needs, goals and brand identity.",
      },
      {
        title: "Custom software creation",
        content:
          "We develop personalized software to automate your processes, improve your internal organization and save you time every day.",
      },
      {
        title: "Hosting, maintenance and security",
        content:
          "We handle hosting, maintenance, backups, security and technical optimization of your digital tools to ensure stability and performance.",
      },
      {
        title: "Branding, logo and visual identity",
        content:
          "We create logos, brand guidelines, professional visuals and communication materials to give your business a strong, modern and consistent image.",
      },
      {
        title: "Video editing and studio production",
        content:
          "We produce video editing, promotional content, advertising videos and creative visuals to showcase your business on the web and social media.",
      },
      {
        title: "A complete team for your business",
        content:
          "Our strength is bringing technology and creativity together in one team. You benefit from complete support to grow your presence, image and tools.",
      },
    ],
    highlights: [
      { value: "Tech", label: "Applications, software, hosting and digital solutions" },
      { value: "Studio", label: "Logo, design, video editing and communication content" },
      { value: "360°", label: "Complete support from idea to delivery" },
    ],
  },
};

const PourquoiNousSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section ref={sectionRef} className="section-shell relative overflow-visible">
      <style>{`
        /* ── Entrées scroll ── */
        .pn-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .pn-fade-up.show { opacity: 1; transform: translateY(0); }

        .pn-fade-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.85s ease 0.2s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .pn-fade-right.show { opacity: 1; transform: translateX(0); }

        /* ── Portrait float ── */
        @keyframes portraitFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-10px) scale(1.012); }
        }
        .portrait-float {
          animation: portraitFloat 7s ease-in-out infinite;
        }

        /* ── Polygon décoratif ── */
        @keyframes polygonDrift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(3deg); }
        }
        .polygon-drift {
          animation: polygonDrift 9s ease-in-out infinite;
        }

        /* ── Badge glassmorphisme ── */
        .pn-badge {
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.32);
          box-shadow: 0 2px 10px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.25) inset;
        }

        /* ── Highlight cards glassmorphisme ── */
        .pn-highlight {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.22);
          box-shadow: 0 4px 16px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.18) inset;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .pn-highlight:hover {
          background: rgba(255,255,255,0.20);
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.16), 0 1px 0 rgba(255,255,255,0.25) inset;
        }

        /* ── Items FAQ fond blanc premium ── */
        .pn-faq-item {
          background: #ffffff;
          border: 1px solid rgba(31,108,140,0.08);
          box-shadow: 0 2px 14px rgba(31,108,140,0.07);
          transition: box-shadow 0.32s ease, border-color 0.32s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .pn-faq-item:hover {
          box-shadow: 0 8px 28px rgba(31,108,140,0.13);
          border-color: rgba(31,108,140,0.16);
          transform: translateX(3px);
        }
        .pn-faq-item.open {
          box-shadow: 0 10px_32px rgba(31,108,140,0.15);
          border-color: rgba(31,108,140,0.20);
        }

        /* Barre colorée gauche à l'ouverture */
        .pn-faq-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 0 2px 2px 0;
          background: linear-gradient(to bottom, #0e678f, #58b4da);
          opacity: 0;
          transform: scaleY(0);
          transform-origin: top;
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .pn-faq-item.open .pn-faq-bar {
          opacity: 1;
          transform: scaleY(1);
        }

        /* Numéro décoratif */
        .pn-faq-num {
          font-size: 11px;
          font-weight: 700;
          color: #1f6c8c;
          opacity: 0.45;
          min-width: 22px;
          font-family: Literata, serif;
        }
        .pn-faq-item.open .pn-faq-num {
          opacity: 1;
          color: #0e678f;
        }

        /* Toggle button */
        .pn-toggle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          flex-shrink: 0;
          transition: all 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .pn-toggle.closed {
          background: rgba(31,108,140,0.07);
          color: #1f6c8c;
          border: 1px solid rgba(31,108,140,0.14);
        }
        .pn-toggle.open-btn {
          background: linear-gradient(135deg, #0e678f, #1c7ead);
          color: #fff;
          box-shadow: 0 4px 14px rgba(14,103,143,0.35);
          border: 1px solid rgba(255,255,255,0.20);
        }

        /* Séparateur contenu */
        .pn-faq-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(31,108,140,0.14), transparent);
          margin-bottom: 14px;
        }

        /* Cascade FAQ */
        .pn-faq-list > div {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .pn-faq-list.show > div:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:0.30s; }
        .pn-faq-list.show > div:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:0.38s; }
        .pn-faq-list.show > div:nth-child(3) { opacity:1; transform:translateY(0); transition-delay:0.46s; }
        .pn-faq-list.show > div:nth-child(4) { opacity:1; transform:translateY(0); transition-delay:0.54s; }
        .pn-faq-list.show > div:nth-child(5) { opacity:1; transform:translateY(0); transition-delay:0.62s; }
        .pn-faq-list.show > div:nth-child(6) { opacity:1; transform:translateY(0); transition-delay:0.70s; }
      `}</style>

      <BlueShape />

      <div className="page-container">
        <div className="relative overflow-visible">

          {/* Polygon décoratif animé */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden xl:block">
            <img
              src={polygonShape}
              alt=""
              aria-hidden="true"
              className="polygon-drift absolute bottom-[-70px] right-[-185px] w-[320px] max-w-none object-contain"
            />
          </div>

          {/* Carte bleue principale */}
          <div
            className={`pn-fade-up relative z-10 overflow-hidden rounded-[28px] shadow-[0_20px_70px_rgba(16,95,140,0.18)] ${visible ? "show" : ""}`}
            style={{
              background: "linear-gradient(135deg, #0e678f 0%, #1c7ead 50%, #58b4da 100%)",
            }}
          >
            {/* Halo intérieur */}
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              }}
            />

            <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-14">

              {/* En-tête */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">

                {/* Texte */}
                <div>
                  <span
                    className="pn-badge inline-flex rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.badge}
                  </span>

                  <h2
                    className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.title}
                  </h2>

                  <p
                    className="mt-5 max-w-3xl text-sm leading-7 text-white sm:text-base lg:text-[16px]"
                    style={{ fontFamily: "Literata, serif" }}
                  >
                    {t.description}
                  </p>
                </div>

                {/* Highlights mobile */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:hidden">
                  {t.highlights.map((item, index) => (
                    <div key={index} className="pn-highlight rounded-2xl p-5">
                      <div
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {item.value}
                      </div>
                      <p
                        className="mt-2 text-sm leading-6 text-white/85"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Portrait grand écran */}
                <div className={`pn-fade-right hidden lg:flex lg:items-center lg:justify-center ${visible ? "show" : ""}`}>
                  <img
                    src={whyUsPortraitCards}
                    alt={t.portraitAlt}
                    className="portrait-float w-full max-w-[520px] object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.20)]"
                  />
                </div>
              </div>

              {/* Highlights grand écran */}
              <div className="mt-8 hidden gap-4 lg:grid lg:grid-cols-3">
                {t.highlights.map((item, index) => (
                  <div key={index} className="pn-highlight rounded-2xl p-5">
                    <div
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      {item.value}
                    </div>
                    <p
                      className="mt-1.5 text-sm leading-6 text-white"
                      style={{ fontFamily: "Literata, serif" }}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Séparateur */}
              <div
                className="my-8 h-[1px]"
                style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.18), transparent)" }}
              />

              {/* FAQ */}
              <div className={`pn-faq-list space-y-3 ${visible ? "show" : ""}`}>
                {t.faqData.map((item, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={index}
                      className={`pn-faq-item relative overflow-hidden rounded-[14px] ${isOpen ? "open" : ""}`}
                    >
                      {/* Barre gauche */}
                      <div className="pn-faq-bar" />

                      {/* Question */}
                      <button
                        type="button"
                        onClick={() => toggleItem(index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <div className="flex items-center gap-3">
                          <span className="pn-faq-num">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="text-sm font-semibold text-slate-800 sm:text-[15px] lg:text-base"
                            style={{ fontFamily: "Literata, serif" }}
                          >
                            {item.title}
                          </span>
                        </div>
                        <span className={`pn-toggle ${isOpen ? "open-btn" : "closed"}`}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {/* Réponse */}
                      <div
                        className={`grid transition-all duration-500 ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                            <div className="pn-faq-divider" />
                            <p
                              className="text-sm leading-[1.85] text-slate-500 sm:text-[15px]"
                              style={{ fontFamily: "Literata, serif" }}
                            >
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PourquoiNousSection;