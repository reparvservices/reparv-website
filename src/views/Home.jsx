"use client"

import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import HomeImage from "../components/home/HomeImage";
import SectionSkeleton from "../components/SectionSkeleton";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import AssociatedWith from "@/components/home/AssociatedWith";

const PropertyOnRentSection = lazy(
  () => import("../components/home/PropertyOnRentSection"),
);
const TrendingPropertySection = lazy(
  () => import("../components/home/TrendingPropertySection"),
);
const PropertySection = lazy(
  () => import("../components/home/PropertySection"),
);
const LoanSection = lazy(() => import("../components/home/LoanSection"));
const CustomerReviewSection = lazy(
  () => import("../components/home/CustomerReviewSection"),
);
const TopPicksSlider = lazy(() => import("../components/home/TopPicksSlider"));
const StepsSection = lazy(() => import("../components/home/StepsSection"));
const NewsSection = lazy(() => import("../components/home/NewsSection"));
const FAQSection = lazy(() => import("../components/home/FAQSection"));
const AppDownloadSection = lazy(
  () => import("../components/home/AppDownloadSection"),
);

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function Home() {
  const { URI } = useAuth();
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "home";
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
        title={
          seoData.title ||
          "Reparv - India’s Trusted Platform for Verified Properties | Buy, Sell, Rent & Invest with Confidence"
        }
        description={
          seoData.description ||
          "Discover 100% verified homes, plots, and commercial properties with Reparv. Buy, sell, rent, or invest confidently visit Reparv today."
        }
        keywords={
          seoData.keywords ||
          "flat on rent in Nagpur, flats in Nagpur, flat for sale in Nagpur, real estate in Nagpur, commercial property in Nagpur, plot for sale in Nagpur, flats for rent in Pune, no broker flats for rent in Pune, property for sale in Pune, commercial property in Pune"
        }
        canonical="https://www.reparv.in/"
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <HomeImage />

        <Suspense fallback={<SectionSkeleton height="260px" />}>
          <motion.div variants={item}>
            <PropertyOnRentSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="320px" />}>
          <motion.div variants={item}>
            <TrendingPropertySection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="240px" />}>
          <motion.div variants={item}>
            <LoanSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="320px" />}>
          <motion.div variants={item}>
            <PropertySection />
          </motion.div>
        </Suspense>


        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <motion.div variants={item}>
            <CustomerReviewSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="350px" />}>
          <motion.div variants={item}>
            <TopPicksSlider />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="280px" />}>
          <motion.div variants={item}>
            <StepsSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="260px" />}>
          <motion.div variants={item}>
            <NewsSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <motion.div variants={item}>
            <FAQSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="220px" />}>
          <motion.div variants={item}>
            <AppDownloadSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="220px" />}>
          <motion.div variants={item}>
            <AssociatedWith />
          </motion.div>
        </Suspense>

      </motion.div>


    </>
  );
}

export default Home;
