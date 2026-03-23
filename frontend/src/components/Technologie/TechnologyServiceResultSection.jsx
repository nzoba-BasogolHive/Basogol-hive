import React, { useEffect, useRef, useState } from "react";

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

const TechnologyServiceResultSection = ({
  lang = "fr",
  title,
  description,
  mainMedia,
  gallery = [],
}) => {
  const t = translations[lang] || translations.fr;
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
        <div className={`mb-12 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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
            className="overflow-hidden rounded-[18px]"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.65)",
              boxShadow: "0 12px 48px rgba(31,108,140,0.12)",
            }}
          >
            <div
              style={{
                height: "3px",
                background: "linear-gradient(90deg, #1f6c8c, #58b4da, #a8d4e8)",
              }}
            />
            <img
              src={mainMedia}
              alt={t.mainMediaAlt}
              className="block h-[240px] w-full object-cover sm:h-[340px] lg:h-[440px]"
            />
          </div>

          {sideImage && (
            <div className="relative hidden overflow-hidden rounded-[14px] lg:block">
              <img
                src={sideImage.image}
                alt={sideImage.alt}
                className="h-full w-full object-cover"
                style={{ minHeight: "300px" }}
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
              <div className="relative overflow-hidden rounded-[14px] lg:hidden">
                <img
                  src={sideImage.image}
                  alt={sideImage.alt}
                  className="h-[140px] w-full object-cover"
                />
              </div>
            )}

            {gridGallery.map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-[14px]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-[140px] w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechnologyServiceResultSection;