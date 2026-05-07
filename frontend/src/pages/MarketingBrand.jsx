import React from "react";
import Navbar from "../components/Navbar";
import MarketingBrandHeroCarousel from "../components/Marketing/MarketingBrandHeroCarousel";
import ServicesZigzagSection from "../components/Marketing/ServicesZigzagSection";
import FooterSection from "../components/FooterSection";
import { Helmet } from "react-helmet-async";

const MarketingBrand = () => {
  return (
    <main className="relative min-h-screen">
       <Helmet>
        <title>Marketing & Brand | Basogol-Hive</title>
        <meta
          name="description"
          content="Basogol-Hive accompagne les entreprises en développement web, design, branding et marketing digital."
        />
      </Helmet>
      <Navbar />
      <MarketingBrandHeroCarousel />
      <ServicesZigzagSection/>
      <FooterSection />
    </main>
  );
};

export default MarketingBrand;