"use client"

import LatestArtical from "../components/seocomponents/common/LatestArtical";
import WeekendPropertyVisitHero from "../components/seocomponents/visitproperties/WeekendPropertyVisitHero";
import WhyWeekendSiteVisitsMatter from "../components/seocomponents/visitproperties/WhyWeekendSiteVisitsMatter";
import LocalityRealityCheckFramework from "../components/seocomponents/visitproperties/LocalityRealityCheckFramework";
import NagpurLocalityRealitySnapshots from "../components/seocomponents/visitproperties/NagpurLocalityRealitySnapshots";
import WeekendVisitProcess from "../components/seocomponents/visitproperties/WeekendVisitProcess";
import VerifiedWeekendProperties from "../components/seocomponents/visitproperties/VerifiedWeekendProperties";

import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

export default function VisitPropertiesOnWeekend() {
  
  return (
    <>
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
