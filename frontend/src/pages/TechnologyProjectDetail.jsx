import React from "react";
import { useParams, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import TechnologyProjectDetailHero from "../components/Portfolio/TechnologyProjectDetailHero";
import TechnologyProjectOverview from "../components/Portfolio/TechnologyProjectOverview";
import TechnologyProjectResultSection from "../components/Portfolio/TechnologyProjectResultSection";
import { technologyProjects } from "../data/technologyProjects";
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

const TechnologyProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();

  const project = technologyProjects.find((item) => item.slug === slug);

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
    gallery: (project.result?.gallery || []).map((item) => ({
      ...item,
      alt: getLocalizedValue(item.alt, lang),
    })),
  };

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <TechnologyProjectDetailHero project={localizedProject} />

      <TechnologyProjectOverview
        key={project.slug}
        cards={localizedCards}
        category={localizedProject.projectCategory}
        projectTitle={localizedProject.projectName}
        onBack={() => {
          if (location.state?.portfolioTab) {
            navigate("/portfolio", {
              state: { portfolioTab: location.state.portfolioTab },
            });
            return;
          }

          navigate("/portfolio", {
            state: { portfolioTab: "technology" },
          });
        }}
      />

      <TechnologyProjectResultSection
        key={`result-${project.slug}`}
        badge={localizedResult.badge}
        title={localizedResult.title}
        description={localizedResult.description}
        mainMedia={localizedResult.mainMedia}
        gallery={localizedResult.gallery}
      />

      <FooterSection />
    </main>
  );
};

export default TechnologyProjectDetail;