import React from "react";
import Navbar from "../components/Navbar";
import PortfolioHeroCarousel from "../components/Portfolio/PortfolioHeroCarousel";
import PortfolioShowcaseSection from "../components/Portfolio/PortfolioShowcaseSection";
import FooterSection from "../components/FooterSection";
import { Helmet } from "react-helmet-async";

const Portfolio = () => {
  return (
    <main className="relative min-h-screen">
      <Helmet>
        <title>Portfolio | Basogol-Hive</title>
        <meta
          name="description"
          content="Basogol-Hive accompagne les entreprises en développement web, design, branding et marketing digital."
        />
      </Helmet>
      <Navbar />
      <PortfolioHeroCarousel />
      <PortfolioShowcaseSection />
      <FooterSection />
    </main>
  );
};

export default Portfolio;