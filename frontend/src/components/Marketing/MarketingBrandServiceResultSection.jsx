import React, { useEffect, useRef, useState } from "react";

const translations = {
  fr: {
    badge: "Livrables",
    mainMediaAlt: "Visuel principal du résultat",
    playing: "En lecture",
    clickToPlay: "Appuyez pour lire",
  },
  en: {
    badge: "Deliverables",
    mainMediaAlt: "Main result visual",
    playing: "Playing",
    clickToPlay: "Click to play",
  },
};

const MarketingBrandServiceResultSection = ({
  lang = "fr",
  title,
  description,
  mainMedia = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
  gallery = [],
  isVideo = false,
  videoSrc = "https://www.w3schools.com/html/mov_bbb.mp4",
}) => {
  const t = translations[lang] || translations.fr;
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

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

  const handlePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const displayTitle = title || "Résultat";
  const displayDescription = description || "";
  const displayGallery = Array.isArray(gallery) ? gallery : [];

  const sideImage = displayGallery[0];
  const gridGallery = displayGallery.slice(1, 5);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f5] py-16 sm:py-20 lg:py-24"
    >
      <style>{`
        .rs-halo {
          background: radial-gradient(ellipse 70% 55% at 50% 30%, rgba(168,212,232,0.16) 0%, transparent 70%);
        }
        .rs-fade-up {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.82s ease, transform 0.82s cubic-bezier(0.22,1,0.36,1);
        }
        .rs-fade-up.show {
          opacity: 1;
          transform: translateY(0);
        }

        .rs-badge {
          background: rgba(31,108,140,0.08);
          border: 1px solid rgba(31,108,140,0.16);
          color: #1f6c8c;
        }

        .rs-video-frame {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(16px) saturate(145%);
          -webkit-backdrop-filter: blur(16px) saturate(145%);
          border: 1px solid rgba(255,255,255,0.65);
          box-shadow: 0 12px 48px rgba(31,108,140,0.12), 0 1px 0 rgba(255,255,255,0.80) inset;
        }

        .rs-main-bar {
          height: 3px;
          background: linear-gradient(90deg, #1f6c8c, #58b4da, #a8d4e8);
        }

        .rs-play-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255,255,255,0.90);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 2px solid rgba(255,255,255,0.80);
          box-shadow: 0 8px 28px rgba(0,0,0,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.32s cubic-bezier(0.22,1,0.36,1);
        }

        .rs-play-btn:hover {
          background: #fff;
          transform: scale(1.10);
          box-shadow: 0 14px 38px rgba(0,0,0,0.28);
        }

        .rs-progress-bar {
          height: 3px;
          background: rgba(255,255,255,0.25);
          border-radius: 999px;
          overflow: hidden;
        }

        .rs-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #fff, rgba(255,255,255,0.60));
          width: 0%;
          transition: width 0.1s linear;
        }

        .rs-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,25,42,0.55) 0%, transparent 45%);
          transition: opacity 0.35s ease;
        }

        .rs-video-overlay.hidden-overlay {
          opacity: 0;
        }

        .rs-gal-card {
          overflow: hidden;
          border-radius: 14px;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.65);
          box-shadow: 0 4px 16px rgba(31,108,140,0.08), 0 1px 0 rgba(255,255,255,0.80) inset;
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }

        .rs-gal-card:hover {
          transform: translateY(-5px) scale(1.015);
          box-shadow: 0 14px 38px rgba(31,108,140,0.16);
          border-color: rgba(31,108,140,0.14);
        }

        .rs-gal-card img {
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }

        .rs-gal-card:hover img {
          transform: scale(1.07);
        }

        .rs-gal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(31,108,140,0.18) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .rs-gal-card:hover .rs-gal-overlay {
          opacity: 1;
        }
      `}</style>

      <div className="rs-halo pointer-events-none absolute inset-0 z-0" />

      <div className="page-container relative z-10">
        <div className={`rs-fade-up mb-12 text-center ${visible ? "show" : ""}`}>
          <span
            className="rs-badge mb-4 inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {t.badge}
          </span>

          <h2
            className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Literata, serif" }}
          >
            {displayTitle}
          </h2>

          <div
            className="mx-auto mt-4"
            style={{
              width: "32px",
              height: "2px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #1f6c8c, #a8d4e8)",
            }}
          />

          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-[15px]"
            style={{ fontFamily: "Literata, serif" }}
          >
            {displayDescription}
          </p>
        </div>

        <div
          className={`rs-fade-up grid w-full grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] ${
            visible ? "show" : ""
          }`}
          style={{ transitionDelay: "0.12s" }}
        >
          <div className="rs-video-frame overflow-hidden rounded-[18px]">
            <div className="rs-main-bar" />
            <div className="relative" style={{ background: "#000" }}>
              {isVideo ? (
                <>
                  <video
                    ref={videoRef}
                    className="block h-[240px] w-full object-cover sm:h-[340px] lg:h-[440px]"
                    style={{ display: "block" }}
                    loop
                    playsInline
                    muted
                    poster={mainMedia}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onTimeUpdate={(e) => {
                      const el = e.target;
                      const fill = el
                        .closest(".rs-video-wrap")
                        ?.querySelector(".rs-progress-fill");

                      if (fill && el.duration) {
                        fill.style.width = `${(el.currentTime / el.duration) * 100}%`;
                      }
                    }}
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>

                  <div
                    className={`rs-video-overlay ${
                      playing ? "hidden-overlay" : ""
                    }`}
                  />

                  <div
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                    onClick={handlePlay}
                  >
                    <div className="rs-play-btn">
                      {playing ? (
                        <div className="flex gap-[5px]">
                          <div
                            style={{
                              width: "4px",
                              height: "18px",
                              background: "#1f6c8c",
                              borderRadius: "2px",
                            }}
                          />
                          <div
                            style={{
                              width: "4px",
                              height: "18px",
                              background: "#1f6c8c",
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="ml-1 h-0 w-0 border-b-[11px] border-l-[18px] border-t-[11px] border-b-transparent border-l-[#1f6c8c] border-t-transparent" />
                      )}
                    </div>
                  </div>

                  <div className="rs-video-wrap absolute bottom-0 left-0 right-0 z-10 px-4 pb-4">
                    <div className="rs-progress-bar">
                      <div className="rs-progress-fill" />
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className="text-[10px] font-semibold text-white/70"
                        style={{ fontFamily: "Literata, serif" }}
                      >
                        {playing ? t.playing : t.clickToPlay}
                      </span>

                      <div
                        className="cursor-pointer rounded-full px-3 py-1 text-[10px] font-bold text-white/80"
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          border: "1px solid rgba(255,255,255,0.25)",
                        }}
                        onClick={handlePlay}
                      >
                        {playing ? "⏸" : "▶"}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={mainMedia}
                  alt={t.mainMediaAlt}
                  className="block h-[240px] w-full object-cover sm:h-[340px] lg:h-[440px]"
                />
              )}
            </div>
          </div>

          {sideImage && (
            <div className="rs-gal-card relative hidden lg:block">
              <img
                src={sideImage.image}
                alt={sideImage.alt}
                className="h-full w-full object-cover"
                style={{ minHeight: "300px" }}
              />
              <div className="rs-gal-overlay" />
            </div>
          )}
        </div>

        {displayGallery.length > 0 && (
          <div
            className={`rs-fade-up mt-4 grid w-full grid-cols-2 gap-4 md:grid-cols-4 ${
              visible ? "show" : ""
            }`}
            style={{ transitionDelay: "0.24s" }}
          >
            {sideImage && (
              <div className="rs-gal-card relative lg:hidden">
                <img
                  src={sideImage.image}
                  alt={sideImage.alt}
                  className="h-[140px] w-full object-cover"
                />
                <div className="rs-gal-overlay" />
              </div>
            )}

            {gridGallery.map((item, index) => (
              <div key={index} className="rs-gal-card relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-[140px] w-full object-cover"
                />
                <div className="rs-gal-overlay" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketingBrandServiceResultSection;