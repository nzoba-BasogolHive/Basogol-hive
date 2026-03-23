import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MarketingBrandServiceDetailHero from "../components/Marketing/MarketingBrandServiceDetailHero";
import MarketingBrandServiceOverview from "../components/Marketing/MarketingBrandServiceOverview";
import MarketingBrandServiceResultSection from "../components/Marketing/MarketingBrandServiceResultSection";
import FooterSection from "../components/FooterSection";
import { marketingBrandServices } from "../data/marketingBrandServices";

const MarketingBrandServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = marketingBrandServices.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/marketing-brand" replace />;
  }

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <MarketingBrandServiceDetailHero
        service={{
          title: service.title,
          heroTitle: service.heroTitle,
          heroDescription: service.heroDescription,
          image: service.heroImage || service.image,
          category: service.category,
          tags: service.tags,
        }}
      />

      <MarketingBrandServiceOverview
        key={service.slug}
        cards={service.overviewCards}
        category={service.category}
        serviceTitle={service.title}
        onBack={() => navigate(-1)}
      />

      <MarketingBrandServiceResultSection
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

export default MarketingBrandServiceDetail;