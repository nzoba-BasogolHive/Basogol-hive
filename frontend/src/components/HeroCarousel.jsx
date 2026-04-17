import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import heroVideo from "../assets/BASOGOL-HIVE_Hero_site_web_Vrs_final.mp4";
import { Link } from "react-router-dom";

const translations = {
  fr: {
    badge: "Tech & studio Créatif",
    title:
      "Nous créons des expériences digitales et visuelles qui donnent une nouvelle dimension à votre marque.",
    description:
      "De l'idée à l'exécution, nous imaginons des solutions élégantes, utiles et mémorables pour aider votre entreprise à se démarquer, inspirer confiance et attirer les bonnes opportunités.",
    primaryCta: "Demander un devis",
    secondaryCta: "Voir nos réalisations",
    stat1Title: "Technologie",
    stat1Text: "Applications, logiciels et hébergement",
    stat2Title: "Studio",
    stat2Text: "Branding, design, vidéo et contenus visuels",
    stat3Title: "Sur mesure",
    stat3Text: "Des solutions adaptées à votre activité",
    videoAriaLabel: "Vidéo de présentation Basogol-Hive",
    mute: "Muet",
    unmute: "Activer le son",
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
    mute: "Mute",
    unmute: "Enable sound",
  },
};

const HeroCarousel = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

const sectionRef = useRef(null);
const videoRef = useRef(null);
const soundButtonRef = useRef(null);
const [hasManualSoundChoice, setHasManualSoundChoice] = useState(false);

  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

  const enableSound = async (event) => {
    try {
      // Si l'utilisateur a déjà choisi manuellement, on ne force plus rien
      if (hasManualSoundChoice) return;

      // Si le clic vient du bouton son, on laisse le bouton gérer
      if (
        soundButtonRef.current &&
        event?.target instanceof Node &&
        soundButtonRef.current.contains(event.target)
      ) {
        return;
      }

      video.muted = false;
      video.volume = 1;
      await video.play();
      setHasUserInteracted(true);
      setIsMuted(false);
    } catch (e) {}
  };

  const enableSoundFromKeyboard = async () => {
    try {
      if (hasManualSoundChoice) return;

      video.muted = false;
      video.volume = 1;
      await video.play();
      setHasUserInteracted(true);
      setIsMuted(false);
    } catch (e) {}
  };

  window.addEventListener("click", enableSound, { once: true });
  window.addEventListener("touchstart", enableSound, { once: true });
  window.addEventListener("keydown", enableSoundFromKeyboard, { once: true });

  return () => {
    window.removeEventListener("click", enableSound);
    window.removeEventListener("touchstart", enableSound);
    window.removeEventListener("keydown", enableSoundFromKeyboard);
  };
}, [hasManualSoundChoice]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

 useEffect(() => {
  const section = sectionRef.current;
  const video = videoRef.current;
  if (!section || !video) return;

  video.playsInline = true;
  video.loop = true;
  video.muted = isMuted;

  const observer = new IntersectionObserver(
    async ([entry]) => {
      try {
        if (entry.isIntersecting) {
          video.muted = isMuted;
          await video.play();
        } else {
          video.pause();
        }
      } catch (e) {}
    },
    {
      threshold: 0.35,
    }
  );

  observer.observe(section);

  return () => observer.disconnect();
}, [isMuted]);

 const handleToggleMute = async (e) => {
  e.stopPropagation();

  const video = videoRef.current;
  if (!video) return;

  try {
    setHasManualSoundChoice(true);

    if (isMuted) {
      video.muted = false;
      video.volume = 1;
      await video.play();
      setIsMuted(false);
      setHasUserInteracted(true);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  } catch (e) {}
};
  return (
    <section
      ref={sectionRef}
      id="home"
      data-page-hero
      className="relative min-h-screen overflow-hidden"
    >
      {/* ── Vidéo fond ── */}
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

      {/* ── Overlay — moins opaque sur mobile pour voir la vidéo ── */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/50" />

      {/* ── Halos décoratifs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl sm:h-72 sm:w-72 sm:bg-cyan-500/20" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-sky-500/15 blur-3xl sm:h-80 sm:w-80 sm:bg-sky-500/20" />
      </div>

      {/* ── Bouton son ── */}
      <div className="absolute bottom-6 right-4 z-20 sm:bottom-8 sm:right-6 lg:bottom-10 lg:right-8">
  <button
    ref={soundButtonRef}
    type="button"
    onClick={handleToggleMute}
    className="group relative overflow-hidden rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/16 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:px-5 sm:py-3"
    style={{ fontFamily: "Literata, serif" }}
    aria-label={isMuted ? t.unmute : t.mute}
    aria-pressed={!isMuted}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-white/8 via-transparent to-white/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    <span className="relative flex items-center gap-3">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
          isMuted
            ? "border-white/15 bg-white/10"
            : "border-cyan-300/40 bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
        }`}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
            <path d="M19 5a10 10 0 0 1 0 14"></path>
          </svg>
        )}
      </span>

      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">
          Audio
        </span>
        <span className="text-[12px] font-semibold sm:text-sm">
          {isMuted ? t.unmute : t.mute}
        </span>
      </span>

      <span
        className={`ml-1 h-2.5 w-2.5 rounded-full transition-all duration-300 ${
          isMuted
            ? "bg-white/35"
            : "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]"
        }`}
      />
    </span>
  </button>
</div>

      {/* ── Contenu ── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-2xl items-center px-5 pb-8 pt-20 sm:px-6 sm:pt-24 md:pt-28 lg:px-8 lg:pt-32 xl:pt-40">
        <div className="w-full">
          <div className="max-w-4xl">
            {/* Badge */}
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs">
              {t.badge}
            </span>

            {/* Titre */}
            <h1
              className="mt-4 max-w-5xl text-[22px] font-bold leading-[1.18] tracking-tight text-white sm:mt-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.title}
            </h1>

            {/* Description */}
            <p
              className="mt-3 max-w-3xl text-[13px] leading-[1.75] text-white/80 sm:mt-5 sm:text-base md:text-lg"
              style={{ fontFamily: "Literata, serif" }}
            >
              {t.description}
            </p>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Link
               to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#206687] px-5 py-2.5 text-sm font-semibold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:px-6 sm:py-3 sm:text-base"
              >
                {t.primaryCta}
              </Link>
            <Link
                to="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20 sm:px-6 sm:py-3 sm:text-base"
              >
                {t.secondaryCta}
             </Link>
            </div>

            {/* Stats cards */}
            <div className="mt-6 grid max-w-3xl grid-cols-3 gap-2 sm:mt-10 sm:gap-4">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                <p className="text-sm font-bold text-white sm:text-xl">{t.stat1Title}</p>
                <p className="mt-0.5 text-[11px] leading-[1.4] text-white/70 sm:mt-1 sm:text-sm">
                  {t.stat1Text}
                </p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                <p className="text-sm font-bold text-white sm:text-xl">{t.stat2Title}</p>
                <p className="mt-0.5 text-[11px] leading-[1.4] text-white/70 sm:mt-1 sm:text-sm">
                  {t.stat2Text}
                </p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                <p className="text-sm font-bold text-white sm:text-xl">{t.stat3Title}</p>
                <p className="mt-0.5 text-[11px] leading-[1.4] text-white/70 sm:mt-1 sm:text-sm">
                  {t.stat3Text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Gradient bas ── */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 to-transparent sm:h-24" />
    </section>
  );
};

export default HeroCarousel;