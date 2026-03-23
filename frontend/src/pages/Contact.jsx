import React from "react";
import Navbar from "../components/Navbar";
import ContactHeroCarousel from "../components/Contact/ContactHeroCarousel";
import ContactSection from "../components/Contact/ContactSection";
import FooterSection from "../components/FooterSection";

const Contact = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <ContactHeroCarousel />
       <ContactSection/>
      <FooterSection />
     
    </main>
  );
};

export default Contact;