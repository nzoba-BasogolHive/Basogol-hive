import React from "react";
import floatingCards from "../assets/floating-cards.png";

const FloatingCards = () => {
  return (
    <>
      <style>{`
        @keyframes cardsFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          30%       { transform: translateY(-14px) rotate(1.5deg) scale(1.015); }
          60%       { transform: translateY(-7px) rotate(-1deg) scale(1.008); }
          80%       { transform: translateY(-11px) rotate(0.8deg) scale(1.01); }
        }
        @keyframes cardsGlow {
          0%, 100% { filter: drop-shadow(0 8px 20px rgba(31,108,140,0.0)); }
          50%       { filter: drop-shadow(0 16px 32px rgba(31,108,140,0.22)); }
        }
        .cards-float {
          animation:
            cardsFloat 6s ease-in-out infinite,
            cardsGlow 6s ease-in-out infinite;
        }
      `}</style>

      <img
        src={floatingCards}
        alt="Illustration de cartes flottantes"
        className="cards-float w-[400px] object-contain drop-shadow-2xl"
      />
    </>
  );
};

export default FloatingCards;