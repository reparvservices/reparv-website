"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import LatestArtical from "../components/seocomponents/common/LatestArtical";
import WeekendPropertyVisitHero from "../components/seocomponents/visitproperties/WeekendPropertyVisitHero";
import WhyWeekendSiteVisitsMatter from "../components/seocomponents/visitproperties/WhyWeekendSiteVisitsMatter";
import LocalityRealityCheckFramework from "../components/seocomponents/visitproperties/LocalityRealityCheckFramework";
import NagpurLocalityRealitySnapshots from "../components/seocomponents/visitproperties/NagpurLocalityRealitySnapshots";
import WeekendVisitProcess from "../components/seocomponents/visitproperties/WeekendVisitProcess";
import VerifiedWeekendProperties from "../components/seocomponents/visitproperties/VerifiedWeekendProperties";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";
import { useAuth } from "../store/auth";
import { openAgentAdvisor } from "../utils/openAgentAdvisor";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function VisitPropertiesOnWeekend({
  initialArticles = null,
  initialFaqs = null,
  initialWeekendVisitData = null,
}) {
  const { URI } = useAuth();
  const skipInitialFetch = useRef(!!initialWeekendVisitData);
  const [pageData, setPageData] = useState(initialWeekendVisitData);
  const [activeCity, setActiveCity] = useState(
    initialWeekendVisitData?.city || "Nagpur",
  );
  const [loading, setLoading] = useState(false);

  const fetchPageData = useCallback(
    async (city) => {
      if (!URI || !city) return;

      setLoading(true);
      try {
        const response = await fetch(
          `${URI}/frontend/weekend-visits/${encodeURIComponent(city)}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weekend visit data");
        }

        const data = await response.json();
        setPageData(data);
        setActiveCity(data.city || city);
      } catch (error) {
        console.error("Weekend visit fetch error:", error);
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

  const handlePlanVisit = () => {
    scrollToSection("weekend-properties");
    openAgentAdvisor(
      `I want to plan a weekend property visit in ${pageData?.city || activeCity}.`,
    );
  };

  const handleTalkExpert = () => {
    openAgentAdvisor(
      `I need help choosing properties for a weekend site visit in ${pageData?.city || activeCity}.`,
    );
  };

  return (
    <>
      <WeekendPropertyVisitHero
        city={pageData?.city || activeCity}
        stats={pageData?.stats}
        onPlanVisit={handlePlanVisit}
        onTalkExpert={handleTalkExpert}
      />
      <WhyWeekendSiteVisitsMatter city={pageData?.city || activeCity} />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard variant="seoDisplay" />
      </div>
      <LocalityRealityCheckFramework />
      <NagpurLocalityRealitySnapshots
        city={pageData?.city || activeCity}
        localities={pageData?.localities || []}
        loading={loading}
      />
      <WeekendVisitProcess />
      <VerifiedWeekendProperties
        city={pageData?.city || activeCity}
        properties={pageData?.properties || []}
        loading={loading}
      />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard variant="seoInFeed" />
      </div>
      <FAQSection
        location={"Reparv Visit Properties On Weekend Page"}
        initialFaqs={initialFaqs}
      />
      <LatestArtical initialArticles={initialArticles} />
    </>
  );
}
