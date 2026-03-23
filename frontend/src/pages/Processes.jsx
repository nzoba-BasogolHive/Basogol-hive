import React from "react";
import Navbar from "../components/Navbar";
import ProcessesHeroCarousel from "../components/Processes/ProcessesHeroCarousel";
import ProcessesSwitcherSection from "../components/Processes/ProcessesSwitcherSection";
import FooterSection from "../components/FooterSection";

const Processes = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <ProcessesHeroCarousel />
      <ProcessesSwitcherSection />
      <FooterSection />
    </main>
  );
};

export default Processes;