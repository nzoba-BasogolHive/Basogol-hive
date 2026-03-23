import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setIsVisible(scrollY > 300);
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      <style>{`
        /* ── Bouton principal ── */
        .stt-btn {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.90);
          box-shadow:
            0 8px 32px rgba(31,108,140,0.18),
            0 2px 8px rgba(0,0,0,0.06),
            0 1px 0 rgba(255,255,255,1) inset;
          transition: all 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .stt-btn:hover {
          background: rgba(255,255,255,0.92);
          transform: translateY(-4px) !important;
          box-shadow:
            0 16px 42px rgba(31,108,140,0.26),
            0 4px 12px rgba(0,0,0,0.08),
            0 1px 0 rgba(255,255,255,1) inset;
        }

        /* ── Flèche icône ── */
        .stt-icon {
          color: #1f6c8c;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1);
        }
        .stt-btn:hover .stt-icon {
          transform: translateY(-2px);
        }

        /* ── Anneau SVG progress ── */
        .stt-ring-track {
          stroke: rgba(31,108,140,0.10);
        }
        .stt-ring-progress {
          stroke: url(#sttGradient);
          stroke-linecap: round;
          transition: stroke-dashoffset 0.25s ease;
          filter: drop-shadow(0 0 3px rgba(31,108,140,0.35));
        }

        /* ── Apparition / disparition ── */
        .stt-visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .stt-hidden {
          opacity: 0;
          transform: translateY(16px);
          pointer-events: none;
        }
      `}</style>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Retour en haut"
        className={`stt-btn fixed bottom-6 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500 ${
          isVisible ? "stt-visible" : "stt-hidden"
        }`}
      >
        {/* Anneau de progression SVG */}
        <svg
          className="absolute inset-0"
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          style={{ transform: "rotate(-90deg)" }}
        >
          <defs>
            <linearGradient id="sttGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1f6c8c" />
              <stop offset="100%" stopColor="#58b4da" />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            className="stt-ring-track"
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="2"
            fill="none"
          />

          {/* Progress */}
          <circle
            className="stt-ring-progress"
            cx="28"
            cy="28"
            r={radius}
            strokeWidth="2.5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Icône flèche */}
        <ArrowUp className="stt-icon relative z-10 h-[18px] w-[18px]" />
      </button>
    </>
  );
};

export default ScrollToTopButton;