import React from "react";
import Navbar from "../components/Navbar";
import MarketingBrandHeroCarousel from "../components/Marketing/MarketingBrandHeroCarousel";
import ServicesZigzagSection from "../components/Marketing/ServicesZigzagSection";
import FooterSection from "../components/FooterSection";

const MarketingBrand = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <MarketingBrandHeroCarousel />
      <ServicesZigzagSection/>
      <FooterSection />
    </main>
  );
};

export default MarketingBrand;