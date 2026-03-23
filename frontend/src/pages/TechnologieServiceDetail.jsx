import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";
import TechnologyServiceDetailHero from "../components/Technologie/TechnologyServiceDetailHero";
import TechnologyServiceOverview from "../components/Technologie/TechnologyServiceOverview";
import TechnologyServiceResultSection from "../components/Technologie/TechnologyServiceResultSection";
import { technologyServices } from "../data/technologyServices";

const TechnologieServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = technologyServices.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/technology" replace />;
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <TechnologyServiceDetailHero
        service={{
          title: service.title,
          heroTitle: service.heroTitle,
          heroDescription: service.heroDescription,
          image: service.image,
          category: service.category,
          tags: service.tags,
        }}
      />

      <TechnologyServiceOverview
        key={service.slug}
        cards={service.overviewCards}
        category={service.category}
        serviceTitle={service.title}
        onBack={() => navigate(-1)}
      />

      <TechnologyServiceResultSection
        key={`result-${service.slug}`}
        title={service.result.title}
        description={service.result.description}
        mainMedia={service.result.mainMedia}
        gallery={service.result.gallery}
      />

      <FooterSection />
    </main>
  );
};

export default TechnologieServiceDetail;