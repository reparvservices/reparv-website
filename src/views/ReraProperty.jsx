"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { MdDone } from "react-icons/md";

import NewsSection from "../components/home/NewsSection";
import RegisterdProjects from "../components/seocomponents/reravprojects/RegisterdProject";
import RERAInfoCards from "../components/seocomponents/reravprojects/RERAInfoCard";
import WhyRERAImportant from "../components/seocomponents/reravprojects/WhyRERAImportant";
import RERAVerificationResult from "../components/seocomponents/reravprojects/ReraVerificationResult";
import NonRERARisks from "../components/seocomponents/reravprojects/NonReraPropertiesRisk";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

const RERAProperty = () => {
  
  return (
    <>
      <section className="w-full bg-white">
        {/* ================= HERO SECTION ================= */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-snug xl:leading-tight">
                <span className="text-[#8A38F5]">RERA</span> Property & Builder
                Verification
                <span className="block text-[#8A38F5]">Powered by Reparv</span>
              </h1>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base xl:text-lg text-gray-700 max-w-xl leading-relaxed">
                Instantly verify builders, projects, and RERA registration
                details through official government records before investing.
              </p>

              {/* FEATURES */}
              <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-sm sm:text-base">
                {["Government Verified", "Secure", "Free Check"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#8A38F5] text-white flex items-center justify-center">
                      <MdDone size={14} />
                    </span>
                    <span className="font-medium text-black">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE – DESKTOP ONLY */}
            <div className="hidden lg:flex justify-end">
              <img
                src="/assets/seopageassets/reparvproperties/banner-image.svg"
                alt="Reparv Property Illustration"
                className="w-full max-w-md xl:max-w-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* ================= PAGE SECTIONS ================= */}
        <RegisterdProjects />
        <RERAVerificationResult />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
        <RERAInfoCards />
        <WhyRERAImportant />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
        <NonRERARisks />
        <FAQSection location={"Reparv Rera Property Page"} />
        <NewsSection />
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
      </section>
    </>
  );
};

export default RERAProperty;
