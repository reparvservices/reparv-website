"use client"

import React, {useState, useEffect} from "react";
import { useAuth } from "../store/auth";
import LatestArtical from "../components/seocomponents/common/LatestArtical";
import WeekendPropertyVisitHero from "../components/seocomponents/visitproperties/WeekendPropertyVisitHero";
import WhyWeekendSiteVisitsMatter from "../components/seocomponents/visitproperties/WhyWeekendSiteVisitsMatter";
import LocalityRealityCheckFramework from "../components/seocomponents/visitproperties/LocalityRealityCheckFramework";
import NagpurLocalityRealitySnapshots from "../components/seocomponents/visitproperties/NagpurLocalityRealitySnapshots";
import WeekendVisitProcess from "../components/seocomponents/visitproperties/WeekendVisitProcess";
import VerifiedWeekendProperties from "../components/seocomponents/visitproperties/VerifiedWeekendProperties";
import SEO from "../components/SEO";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

export default function VisitPropertiesOnWeekend() {
  const { URI } = useAuth();
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "visit-properties-on-week-ends";
    try {
      const response = await fetch(`${URI}/frontend/seo-data/${page}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch seo data.");
      const data = await response.json();
      console.log(data);
      setSeoData(data);
    } catch (err) {
      console.error("Error fetching Seo Data:", err);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);
  return (
    <>
      <SEO
        title={ seoData?.title || 
          "Visit Properties on Weekends - Schedule Property Visits Easily | Reparv"
        }
        description={ seoData?.description || 
          "Schedule weekend property visits easily with Reparv. Explore verified properties, compare options, and make confident real estate decisions with expert support."
        }
        canonical="https://www.reparv.in/visit-properties-on-week-ends"
      />
      <WeekendPropertyVisitHero />
      <WhyWeekendSiteVisitsMatter />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard />
      </div>
      <LocalityRealityCheckFramework />
      <NagpurLocalityRealitySnapshots />
      <WeekendVisitProcess />
      <VerifiedWeekendProperties />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard />
      </div>
      <FAQSection location={"Reparv Visit Properties On Weekend Page"} />
      <LatestArtical />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard />
      </div>
    </>
  );
}
