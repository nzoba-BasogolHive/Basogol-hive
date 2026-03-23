import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MarketingBrandServiceDetailHero from "../components/Marketing/MarketingBrandServiceDetailHero";
import MarketingBrandServiceOverview from "../components/Marketing/MarketingBrandServiceOverview";
import MarketingBrandServiceResultSection from "../components/Marketing/MarketingBrandServiceResultSection";
import FooterSection from "../components/FooterSection";
import { marketingBrandServices } from "../data/marketingBrandServices";
import { useLanguage } from "../components/LanguageContext";

const getLocalizedValue = (value, lang) => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return value[lang] || value.fr || "";
  return "";
};

const getLocalizedArray = (value, lang) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return value[lang] || value.fr || [];
  return [];
};

const MarketingBrandServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const service = marketingBrandServices.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/marketing-brand" replace />;
  }

  const localizedService = {
    title: getLocalizedValue(service.title, lang),
    heroTitle: getLocalizedValue(service.heroTitle, lang),
    heroDescription: getLocalizedValue(service.heroDescription, lang),
    image: service.heroImage || service.image,
    category: getLocalizedValue(service.category, lang),
    tags: getLocalizedArray(service.tags, lang),
  };

  const localizedCards = (service.overviewCards || []).map((card) => ({
    ...card,
    title: getLocalizedValue(card.title, lang),
    text: getLocalizedValue(card.text, lang),
  }));

  const localizedResult = {
    title: getLocalizedValue(service.result?.title, lang),
    description: getLocalizedValue(service.result?.description, lang),
    mainMedia: service.result?.mainMedia,
    gallery: (service.result?.gallery || []).map((item) => ({
      ...item,
      alt: getLocalizedValue(item.alt, lang),
    })),
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <MarketingBrandServiceDetailHero service={localizedService} />

      <MarketingBrandServiceOverview
        key={service.slug}
        cards={localizedCards}
        category={localizedService.category}
        serviceTitle={localizedService.title}
        onBack={() => navigate(-1)}
      />

      <MarketingBrandServiceResultSection
        key={`result-${service.slug}`}
        title={localizedResult.title}
        description={localizedResult.description}
        mainMedia={localizedResult.mainMedia}
        gallery={localizedResult.gallery}
      />

      <FooterSection />
    </main>
  );
};

export default MarketingBrandServiceDetail;