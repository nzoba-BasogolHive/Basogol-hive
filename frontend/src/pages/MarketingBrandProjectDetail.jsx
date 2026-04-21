import React from "react";
import { useParams, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import MarketingBrandProjectDetailHero from "../components/Portfolio/MarketingBrandProjectDetailHero";
import MarketingBrandProjectOverview from "../components/Portfolio/MarketingBrandProjectOverview";
import MarketingBrandProjectResultSection from "../components/Portfolio/MarketingBrandProjectResultSection";
import FooterSection from "../components/FooterSection";
import { marketingBrandProjects } from "../data/marketingBrandProjects";
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

const MarketingBrandProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();

  const project = marketingBrandProjects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const localizedProject = {
    projectName: getLocalizedValue(project.projectName, lang),
    heroTitle: getLocalizedValue(project.heroTitle, lang),
    heroDescription: getLocalizedValue(project.heroDescription, lang),
    heroImage: project.heroImage || project.image,
    projectCategory: getLocalizedValue(project.projectCategory, lang),
    projectTags: getLocalizedArray(project.projectTags, lang),
  };

  const localizedCards = (project.overviewCards || []).map((card) => ({
    ...card,
    title: getLocalizedValue(card.title, lang),
    text: getLocalizedValue(card.text, lang),
  }));

  const localizedResult = {
    badge: getLocalizedValue(project.result?.badge, lang),
    title: getLocalizedValue(project.result?.title, lang),
    description: getLocalizedValue(project.result?.description, lang),
    mainMedia: project.result?.mainMedia,
    isVideo: project.result?.isVideo || false,
    videoSrc: project.result?.videoSrc || "",
    gallery: (project.result?.gallery || []).map((item) => ({
      ...item,
      alt: getLocalizedValue(item.alt, lang),
    })),
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <MarketingBrandProjectDetailHero project={localizedProject} />

      <MarketingBrandProjectOverview
        key={project.slug}
        cards={localizedCards}
        category={localizedProject.projectCategory}
        serviceTitle={localizedProject.projectName}
        onBack={() => {
          if (location.state?.portfolioTab) {
            navigate("/portfolio", {
              state: { portfolioTab: location.state.portfolioTab },
            });
            return;
          }

          navigate("/portfolio", {
            state: { portfolioTab: "marketing" },
          });
        }}
      />

      <MarketingBrandProjectResultSection
        key={`result-${project.slug}`}
        badge={localizedResult.badge}
        title={localizedResult.title}
        description={localizedResult.description}
        mainMedia={localizedResult.mainMedia}
        isVideo={localizedResult.isVideo}
        videoSrc={localizedResult.videoSrc}
        gallery={localizedResult.gallery}
      />

      <FooterSection />
    </main>
  );
};

export default MarketingBrandProjectDetail;