"use client";

import Hero from "../components/seoPages/FirstTimeBuyer/Hero.jsx";
import WhyConfused from "../components/seoPages/FirstTimeBuyer/WhyConfused.jsx";
import HowToRead from "@/components/seoPages/FirstTimeBuyer/HowToRead.jsx";
import RealStories from "@/components/seoPages/FirstTimeBuyer/RealStories.jsx";
import CommonPatterns from "../components/seoPages/FirstTimeBuyer/CommonPatterns.jsx";
import HowThisHelps from "../components/seoPages/FirstTimeBuyer/HowThisHelps.jsx";
import WhatNext from "../components/seoPages/FirstTimeBuyer/WhatNext.jsx";
import FAQ from "../components/seoPages/FirstTimeBuyer/Faq.jsx";
import LatestArtical from "../components/seocomponents/common/LatestArtical";

export default function FirstTimeBuyerPage({
  initialPageData = null,
  initialArticles = [],
  initialFaqs = [],
}) {
  return (
    <main>
      <Hero pageData={initialPageData} />
      <WhyConfused />
      <HowToRead />
      <RealStories pageData={initialPageData} />
      <CommonPatterns pageData={initialPageData} />
      <HowThisHelps />
      <WhatNext pageData={initialPageData} guides={initialArticles} />
      <LatestArtical initialArticles={initialArticles} />
      <FAQ initialFaqs={initialFaqs} pageData={initialPageData} />
    </main>
  );
}
