import React from "react";
import Navbar from "../components/Navbar";
import ContactHeroCarousel from "../components/Contact/ContactHeroCarousel";
import ContactSection from "../components/Contact/ContactSection";
import FooterSection from "../components/FooterSection";
import { Helmet } from "react-helmet-async";
const Contact = () => {
  return (
    <main className="relative min-h-screen">
      <Helmet>
        <title>Contact | Basogol-Hive</title>
        <meta
          name="description"
          content="Basogol-Hive accompagne les entreprises en développement web, design, branding et marketing digital."
        />
      </Helmet>
      <Navbar />
      <ContactHeroCarousel />
       <ContactSection/>
      <FooterSection />
     
    </main>
  );
};

export default Contact;