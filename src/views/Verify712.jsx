"use client"

import React from "react";
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
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

export default function Verify712({
  initialArticles = null,
  initialFaqs = null,
}) {
  

  return (
    <>
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
        <FAQSection
          location={"Reparv Verify 7-12 Page"}
          initialFaqs={initialFaqs}
        />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
        <LatestArtical initialArticles={initialArticles} />
        <VerifyBeforeYouBuyCTA />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
      </div>
    </>
  );
}
