import React from "react";
import Navbar from "../components/Navbar";
import PortfolioHeroCarousel from "../components/Portfolio/PortfolioHeroCarousel";
import PortfolioShowcaseSection from "../components/Portfolio/PortfolioShowcaseSection";
import FooterSection from "../components/FooterSection";

const Portfolio = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <PortfolioHeroCarousel />
      <PortfolioShowcaseSection />
      <FooterSection />
    </main>
  );
};

export default Portfolio;