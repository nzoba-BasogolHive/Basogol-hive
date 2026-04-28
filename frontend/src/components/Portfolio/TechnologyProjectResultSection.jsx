import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../LanguageContext";

const translations = {
  fr: {
    badge: "Livrables",
    mainMediaAlt: "Visuel principal du résultat",
  },
  en: {
    badge: "Deliverables",
    mainMediaAlt: "Main result visual",
  },
};

const TechnologyProjectResultSection = ({
  title,
  description,
  mainMedia,
  gallery = [],
  projectTags = [],
}) => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const sideImage = gallery[0];
  const gridGallery = gallery.slice(1, 5);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f7f7f5] py-16 sm:py-20 lg:py-24"
    >
      <div className="page-container relative z-10">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span
            className="mb-4 inline-flex rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{
              fontFamily: "Literata, serif",
              background: "rgba(31,108,140,0.08)",
              border: "1px solid rgba(31,108,140,0.16)",
              color: "#1f6c8c",
            }}
          >
            {t.badge}
          </span>

          <h2
            className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "Literata, serif" }}
          >
            {title}
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
            {description}
          </p>
        </div>

        <div
          className={`grid w-full grid-cols-1 gap-4 transition-all duration-700 lg:grid-cols-[1.6fr_1fr] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div
            className="overflow-hidden rounded-[18px] bg-white"
            style={{
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 12px 48px rgba(31,108,140,0.12)",
            }}
          >
            <div
              style={{
                height: "3px",
                background:
                  "linear-gradient(90deg, #1f6c8c, #58b4da, #a8d4e8)",
              }}
            />

            <img
              src={mainMedia}
              alt={t.mainMediaAlt}
              onClick={() =>
                setSelectedImage({
                  image: mainMedia,
                  alt: t.mainMediaAlt,
                })
              }
              className="block h-[260px] w-full cursor-zoom-in object-contain p-2 sm:h-[360px] lg:h-[460px]"
            />
          </div>

          {sideImage && (
            <div className="relative hidden overflow-hidden rounded-[14px] bg-white lg:block">
              <img
                src={sideImage.image}
                alt={sideImage.alt}
                onClick={() => setSelectedImage(sideImage)}
                className="h-full w-full cursor-zoom-in object-contain p-2"
                style={{ minHeight: "460px" }}
              />
            </div>
          )}
        </div>

        {gallery.length > 0 && (
          <div
            className={`mt-4 grid w-full grid-cols-2 gap-4 transition-all duration-700 md:grid-cols-4 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {sideImage && (
              <div className="relative overflow-hidden rounded-[14px] bg-white lg:hidden">
                <img
                  src={sideImage.image}
                  alt={sideImage.alt}
                  onClick={() => setSelectedImage(sideImage)}
                  className="h-[240px] w-full cursor-zoom-in object-contain p-2"
                />
              </div>
            )}

            {gridGallery.map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-[14px] bg-white">
                <img
                  src={item.image}
                  alt={item.alt}
                  onClick={() => setSelectedImage(item)}
                  className="h-[240px] w-full cursor-zoom-in object-contain p-2"
                />
              </div>
            ))}
          </div>
        )}

       {projectTags.length > 0 && (
  <div className="mt-12 flex justify-center">
    {projectTags.map((tag, i) => (
      <a
        key={i}
        href={tag.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#1f6c8c]/20 bg-white/80 px-7 py-3.5 text-sm font-bold text-[#1f6c8c] shadow-[0_14px_35px_rgba(31,108,140,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#1f6c8c] hover:text-white hover:shadow-[0_18px_45px_rgba(31,108,140,0.26)]"
        style={{ fontFamily: "Literata, serif" }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative z-10">{tag.label}</span>

        <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#1f6c8c]/10 text-[#1f6c8c] transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:translate-x-1">
          →
        </span>
      </a>
    ))}
  </div>
)}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-5 top-5 text-4xl font-bold text-white"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            src={selectedImage.image}
            alt={selectedImage.alt}
            className="max-h-[92vh] max-w-[96vw] rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default TechnologyProjectResultSection;