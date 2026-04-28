import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import Verify712Hero from "../components/seocomponents/verify712/Verify712Hero";
import VerifyLandRecord from "../components/seocomponents/verify712/VerifyLandRecord";
import WhatIs712Utara from "../components/seocomponents/verify712/WhatIs712Utara";
import LatestArtical from "../components/seocomponents/common/LatestArtical";
import StepByStep712Guide from "../components/seocomponents/verify712/StepByStep712Guide";
import WhoShouldVerify712Utara from "../components/seocomponents/verify712/WhoShouldVerify712Utara";
import ExpertVerificationServices from "../components/seocomponents/verify712/ExpertVerificationServices";
import UtaraVsPropertyCard from "../components/seocomponents/verify712/UtaraVsPropertyCard";
import RiskWithout712Verification from "../components/seocomponents/verify712/RiskWithout712Verification";
import VerifyBeforeYouBuyCTA from "../components/seocomponents/verify712/VerifyBeforeYouBuyCTA";
import SEO from "../components/SEO";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

export default function Verify712() {
  const { URI } = useAuth();
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "verify-7-12";
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
          "Verify 7/12 Utara Online – Check Land Records Maharashtra | Reparv"
        }
        description={ seoData?.description || 
          "Verify 7/12 Utara online and check Maharashtra land records, ownership details, and property information easily using Reparv’s secure land verification tool."
        }
        canonical="https://www.reparv.in/verify-7-12"
      />
      <div>
        <Verify712Hero />
        <VerifyLandRecord />
        <WhatIs712Utara />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
        <StepByStep712Guide />
        <WhoShouldVerify712Utara />
        <ExpertVerificationServices />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
        <UtaraVsPropertyCard />
        <RiskWithout712Verification />
        <FAQSection location={"Reparv Verify 7-12 Page"} />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
        <LatestArtical />
        <VerifyBeforeYouBuyCTA />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
      </div>
    </>
  );
}
