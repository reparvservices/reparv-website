import Hero from "../components/seoPages/FirstTimeBuyer/Hero.jsx";
import WhyConfused from "../components/seoPages/FirstTimeBuyer/WhyConfused.jsx";
import HowToRead from "@/components/seoPages/FirstTimeBuyer/HowToRead.jsx";
import RealStories from "@/components/seoPages/FirstTimeBuyer/RealStories.jsx";
import CommonPatterns from "../components/seoPages/FirstTimeBuyer/CommonPatterns.jsx";
import HowThisHelps from "../components/seoPages/FirstTimeBuyer/HowThisHelps.jsx";
import WhatNext from "../components/seoPages/FirstTimeBuyer/WhatNext.jsx";
import FAQ from "../components/seoPages/FirstTimeBuyer/Faq.jsx";

export default function FirstTimeBuyerPage() {
  return (
    <main>
      <Hero />
      <WhyConfused />
      <HowToRead />
      <RealStories />
      <CommonPatterns />
      <HowThisHelps />
      <WhatNext />
      <FAQ />
    </main>
  );
}
