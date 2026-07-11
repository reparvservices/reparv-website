"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import TrustedBuilderHero from "../components/seocomponents/trustedbuildercomponent/TrustedBuilderHero";
import LatestArtical from "../components/seocomponents/common/LatestArtical";
import ExploreBuildersPage from "../components/seocomponents/trustedbuildercomponent/ExploreBuildersPage";
import ExploreBuildersByCity from "../components/seocomponents/trustedbuildercomponent/ExploreBuildersByCity";
import GetInTouch from "../components/seocomponents/trustedbuildercomponent/GetInTouch";
import VerifiedBuilders from "../components/seocomponents/trustedbuildercomponent/VerifiedBuilders";
import FeaturedProjects from "../components/seocomponents/trustedbuildercomponent/FeaturedProjects";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";
import { useAuth } from "../store/auth";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function TrustedBuilder({
  initialArticles = null,
  initialFaqs = null,
  initialTrustedBuildersData = null,
}) {
  const { URI } = useAuth();
  const skipInitialFetch = useRef(!!initialTrustedBuildersData);
  const [pageData, setPageData] = useState(initialTrustedBuildersData);
  const [activeCity, setActiveCity] = useState(
    initialTrustedBuildersData?.city || "Nagpur",
  );
  const [loading, setLoading] = useState(false);

  const fetchPageData = useCallback(
    async (city) => {
      if (!URI || !city) return;

      setLoading(true);
      try {
        const response = await fetch(
          `${URI}/frontend/project-partner/trusted-builders/${encodeURIComponent(city)}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trusted builders data");
        }

        const data = await response.json();
        setPageData(data);
        setActiveCity(data.city || city);
      } catch (error) {
        console.error("Trusted builders fetch error:", error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    },
    [URI],
  );

  useEffect(() => {
    if (!URI || !activeCity) return;

    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    fetchPageData(activeCity);
  }, [activeCity, URI, fetchPageData]);

  const handleCityChange = (city) => {
    setActiveCity(city);
  };

  const handleCitySelect = (city) => {
    setActiveCity(city);
    scrollToSection("verified-builders");
  };

  return (
    <>
      <TrustedBuilderHero
        stats={pageData?.stats}
        city={pageData?.city || activeCity}
        onExploreProjects={() => scrollToSection("featured-projects")}
        onViewBuilders={() => scrollToSection("verified-builders")}
      />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard variant="seoDisplay" />
      </div>
      <VerifiedBuilders
        builders={pageData?.builders || []}
        filterCities={pageData?.filterCities || []}
        city={pageData?.city || activeCity}
        onCityChange={handleCityChange}
        loading={loading}
      />
      <FeaturedProjects
        projects={pageData?.featuredProjects || []}
        loading={loading}
      />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard variant="seoInFeed" />
      </div>
      <ExploreBuildersByCity
        cities={pageData?.cities || []}
        onCitySelect={handleCitySelect}
      />
      <ExploreBuildersPage />
      <GetInTouch preferredCities={pageData?.filterCities || []} />
      <FAQSection
        location={"Reparv Trusted Builder Page"}
        initialFaqs={initialFaqs}
      />
      <LatestArtical initialArticles={initialArticles} />
    </>
  );
}
