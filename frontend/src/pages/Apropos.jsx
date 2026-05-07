import React from "react";
import Navbar from "../components/Navbar";
import AboutHeroSection from "../components/Apropos/AboutHeroSection";
import AboutIntroSection from "../components/Apropos/AboutIntroSection";
import TeamShowcaseSection from "../components/Apropos/TeamShowcaseSection";
import AboutImageQuoteSection from "../components/Apropos/AboutImageQuoteSection";
import FaqSection from "../components/Apropos/FaqSection";
import FooterSection from "../components/FooterSection";
import { Helmet } from "react-helmet-async";

const Apropos = () => {
  return (
    <main className="relative min-h-screen">
       <Helmet>
        <title>À propos | Basogol-Hive</title>
        <meta
          name="description"
          content="Basogol-Hive accompagne les entreprises en développement web, design, branding et marketing digital."
        />
      </Helmet>
      <Navbar />
      <AboutHeroSection />
      <AboutIntroSection />
       <TeamShowcaseSection/>
       <FaqSection/>
       <AboutImageQuoteSection/>
      <FooterSection />
     
    </main>
  );
};

export default Apropos;