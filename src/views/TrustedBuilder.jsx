"use client";

import React from "react";
import TrustedBuilderHero from "../components/seocomponents/trustedbuildercomponent/TrustedBuilderHero";
import LatestArtical from "../components/seocomponents/common/LatestArtical";
import ExploreBuildersPage from "../components/seocomponents/trustedbuildercomponent/ExploreBuildersPage";
import ExploreBuildersByCity from "../components/seocomponents/trustedbuildercomponent/ExploreBuildersByCity";
import GetInTouch from "../components/seocomponents/trustedbuildercomponent/GetInTouch";
import VerifiedBuilders from "../components/seocomponents/trustedbuildercomponent/VerifiedBuilders";
import FeaturedProjects from "../components/seocomponents/trustedbuildercomponent/FeaturedProjects";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

export default function TrustedBuilder() {
  return (
    <>
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
