import React from "react";
import Navbar from "../components/Navbar";
import TechnologyHeroCarousel from "../components/Technologie/TechnologyHeroCarousel";
import TechServicesZigzagSection from "../components/Technologie/TechServicesZigzagSection";
import FooterSection from "../components/FooterSection";

const Technologie = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <TechnologyHeroCarousel />
      <TechServicesZigzagSection />
      <FooterSection />
    </main>
  );
};

export default Technologie;