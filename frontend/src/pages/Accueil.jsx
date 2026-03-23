import React from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import ServicesSection from "../components/ServicesSection";
import PourquoiNousSection from "../components/PourquoiNousSection";
import RecentProjectsSection from "../components/RecentProjectsSection";
import PartnersSection from  "../components/PartnersSection";
import FooterSection from  "../components/FooterSection";
const Accueil = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroCarousel />
      <ServicesSection />
      <PourquoiNousSection />
      <RecentProjectsSection />
      <PartnersSection/>
      <FooterSection/>
    </main>
  );
};

export default Accueil;