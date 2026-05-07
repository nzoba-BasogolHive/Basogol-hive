import React from "react";
import Navbar from "../components/Navbar";
import TechnologyHeroCarousel from "../components/Technologie/TechnologyHeroCarousel";
import TechServicesZigzagSection from "../components/Technologie/TechServicesZigzagSection";
import FooterSection from "../components/FooterSection";
import { Helmet } from "react-helmet-async";

const Technologie = () => {
  return (
    <main className="relative min-h-screen">
       <Helmet>
        <title>Technologie | Basogol-Hive</title>
        <meta
          name="description"
          content="Basogol-Hive accompagne les entreprises en développement web, design, branding et marketing digital."
        />
      </Helmet>
      <Navbar />
      <TechnologyHeroCarousel />
      <TechServicesZigzagSection />
      <FooterSection />
    </main>
  );
};

export default Technologie;