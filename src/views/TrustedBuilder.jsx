"use client"

import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import TrustedBuilderHero from "../components/seocomponents/trustedbuildercomponent/TrustedBuilderHero";
import LatestArtical from "../components/seocomponents/common/LatestArtical";
import ExploreBuildersPage from "../components/seocomponents/trustedbuildercomponent/ExploreBuildersPage";
import ExploreBuildersByCity from "../components/seocomponents/trustedbuildercomponent/ExploreBuildersByCity";
import GetInTouch from "../components/seocomponents/trustedbuildercomponent/GetInTouch";
import VerifiedBuilders from "../components/seocomponents/trustedbuildercomponent/VerifiedBuilders";
import FeaturedProjects from "../components/seocomponents/trustedbuildercomponent/FeaturedProjects";
import SEO from "../components/SEO";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

export default function TrustedBuilder() {
  const { URI } = useAuth();
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "trusted-builders";
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
        title={ seoData?.title || "Trusted Builders in India - Verified Real Estate Projects | Reparv"
        }
        description={ seoData?.description || 
          "Explore trusted and verified real estate builders in India. View builder profiles, past projects, and make safe property decisions with Reparv's verified network."
        }
        canonical="https://www.reparv.in/trusted-builders"
      />
      <TrustedBuilderHero />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard />
      </div>
      <VerifiedBuilders />
      <FeaturedProjects />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard />
      </div>
      <ExploreBuildersByCity />
      <ExploreBuildersPage />
      <GetInTouch />
      <FAQSection location={"Reparv Trusted Builder Page"} />
      <LatestArtical />
      <div className="max-w-[1380px] mx-auto my-5">
        <AdvertisementCard />
      </div>
    </>
  );
}
