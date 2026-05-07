import React from "react";
import Navbar from "../components/Navbar";
import ProcessesHeroCarousel from "../components/Processes/ProcessesHeroCarousel";
import ProcessesSwitcherSection from "../components/Processes/ProcessesSwitcherSection";
import FooterSection from "../components/FooterSection";
import { Helmet } from "react-helmet-async";

const Processes = () => {
  return (
    <main className="relative min-h-screen">
        <Helmet>
        <title>Processus | Basogol-Hive</title>
        <meta
          name="description"
          content="Basogol-Hive accompagne les entreprises en développement web, design, branding et marketing digital."
        />
      </Helmet>
      <Navbar />
      <ProcessesHeroCarousel />
      <ProcessesSwitcherSection />
      <FooterSection />
    </main>
  );
};

export default Processes;