import React from "react";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import ServicesSection from "../components/ServicesSection";
import PourquoiNousSection from "../components/PourquoiNousSection";
import RecentProjectsSection from "../components/RecentProjectsSection";
import PartnersSection from  "../components/PartnersSection";
import FooterSection from  "../components/FooterSection";
import { Helmet } from "react-helmet-async";
const Accueil = () => {
  return (
    <main className="relative min-h-screen">
       <Helmet>
        <title>Basogol-Hive | Agence web, design, branding et marketing digital</title>
        <meta
          name="description"
          content="Basogol-Hive accompagne les entreprises en développement web, design, branding et marketing digital."
        />
      </Helmet>
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