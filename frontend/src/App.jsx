import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import MarketingBrand from "./pages/MarketingBrand";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Technologie from "./pages/Technologie";
import MarketingBrandProjectDetail from "./pages/MarketingBrandProjectDetail";
import ScrollToTop from "./components/ScrollToTop";
import TechnologyProjectDetail from "./pages/TechnologyProjectDetail";
import Processes from "./pages/Processes";
import Portfolio from "./pages/Portfolio";



function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/about" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/process" element={<Processes />} />
        <Route path="/marketing-brand" element={<MarketingBrand />} />
        <Route path="/technology" element={<Technologie />} />
        <Route path="/technology/:slug" element={<TechnologyProjectDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        
        <Route
          path="/marketing-brand/:slug"
          element={<MarketingBrandProjectDetail />}
        />
      </Routes>

      <ScrollToTopButton />
    </BrowserRouter>
  );
}

export default App;