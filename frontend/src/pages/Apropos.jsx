import React from "react";
import Navbar from "../components/Navbar";
import AboutHeroSection from "../components/Apropos/AboutHeroSection";
import AboutIntroSection from "../components/Apropos/AboutIntroSection";
import TeamShowcaseSection from "../components/Apropos/TeamShowcaseSection";
import AboutImageQuoteSection from "../components/Apropos/AboutImageQuoteSection";
import FaqSection from "../components/Apropos/FaqSection";
import FooterSection from "../components/FooterSection";


const Apropos = () => {
  return (
    <main className="relative min-h-screen">
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