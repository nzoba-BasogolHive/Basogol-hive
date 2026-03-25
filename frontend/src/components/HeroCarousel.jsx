import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import heroVideo from "../assets/Hirositewebdemo.mp4";

const translations = {
  fr: {
    badge: "Tech & Creative Studio",
    title:
      "Nous créons des expériences digitales et visuelles qui donnent une nouvelle dimension à votre marque.",
    description:
      "De l’idée à l’exécution, nous imaginons des solutions élégantes, utiles et mémorables pour aider votre entreprise à se démarquer, inspirer confiance et attirer les bonnes opportunités.",
    primaryCta: "Demander un devis",
    secondaryCta: "Voir nos réalisations",
    stat1Title: "Tech",
    stat1Text: "Applications, logiciels et hébergement",
    stat2Title: "Studio",
    stat2Text: "Branding, design, vidéo et contenus visuels",
    stat3Title: "Sur mesure",
    stat3Text: "Des solutions adaptées à votre activité",
    videoAriaLabel: "Vidéo de présentation Basogol-Hive",
  },

  en: {
    badge: "Tech & Creative Studio",
    title:
      "We create digital and visual experiences that give a new dimension to your brand.",
    description:
      "From idea to execution, we imagine elegant, useful and memorable solutions to help your business stand out, inspire trust and attract the right opportunities.",
    primaryCta: "Request a quote",
    secondaryCta: "See our work",
    stat1Title: "Tech",
    stat1Text: "Applications, software and hosting",
    stat2Title: "Studio",
    stat2Text: "Branding, design, video and visual content",
    stat3Title: "Custom",
    stat3Text: "Solutions tailored to your business",
    videoAriaLabel: "Basogol-Hive presentation video",
  },
};

const HeroCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.volume = 1;

    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const enableSoundOnFirstInteraction = async () => {
      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
        setHasUserInteracted(true);
      } catch (error) {
        console.error("Impossible d’activer le son :", error);
      }

      window.removeEventListener("click", enableSoundOnFirstInteraction);
      window.removeEventListener("touchstart", enableSoundOnFirstInteraction);
      window.removeEventListener("keydown", enableSoundOnFirstInteraction);
    };

    window.addEventListener("click", enableSoundOnFirstInteraction, {
      once: true,
    });
    window.addEventListener("touchstart", enableSoundOnFirstInteraction, {
      once: true,
    });
    window.addEventListener("keydown", enableSoundOnFirstInteraction, {
      once: true,
    });

    return () => {
      window.removeEventListener("click", enableSoundOnFirstInteraction);
      window.removeEventListener("touchstart", enableSoundOnFirstInteraction);
      window.removeEventListener("keydown", enableSoundOnFirstInteraction);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        try {
          if (entry.isIntersecting) {
            video.muted = !hasUserInteracted;
            await video.play();
          } else {
            video.pause();
          }
        } catch (error) {
          console.error("Erreur vidéo :", error);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasUserInteracted]);

  return (
    <section
  ref={sectionRef}
  id="home"
  data-page-hero
  className="relative min-h-screen overflow-hidden"
>
  <video
    ref={videoRef}
    className="absolute inset-0 h-full w-full object-cover"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    aria-label={t.videoAriaLabel}
  >
    <source src={heroVideo} type="video/mp4" />
  </video>

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-2xl items-center px-4 pb-16 pt-32 sm:px-6 md:pt-36 lg:px-8 lg:pt-40">
        <div className="w-full">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm sm:text-sm">
              {t.badge}
            </span>

            <h1 className="mt-6 max-w-5xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              {t.title}
            </h1>

            <p
              className="mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base md:text-lg lg:text-xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#206687] px-6 py-3 text-base font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {t.primaryCta}
              </a>

              <a
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20"
              >
                {t.secondaryCta}
              </a>
            </div>

            <div className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{t.stat1Title}</p>
                <p className="mt-1 text-sm text-white/75">{t.stat1Text}</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{t.stat2Title}</p>
                <p className="mt-1 text-sm text-white/75">{t.stat2Text}</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{t.stat3Title}</p>
                <p className="mt-1 text-sm text-white/75">{t.stat3Text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
};

export default HeroCarousel;