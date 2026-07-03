"use client"

import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import HomeImage from "../components/home/HomeImage";
import SectionSkeleton from "../components/SectionSkeleton";
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

function Home({
  initialRentalProperties = null,
  initialTrendingProperties = null,
  initialTopPicks = null,
  initialBlogs = null,
  initialTestimonials = null,
  initialFaqs = null,
}) {
  return (
    <>
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
            <TrendingPropertySection
              initialProperties={initialTrendingProperties}
            />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="240px" />}>
          <motion.div variants={item}>
            <LoanSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="320px" />}>
          <motion.div variants={item}>
            <PropertySection initialProperties={initialRentalProperties} />
          </motion.div>
        </Suspense>


        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <motion.div variants={item}>
            <CustomerReviewSection initialReviews={initialTestimonials} />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="350px" />}>
          <motion.div variants={item}>
            <TopPicksSlider initialProperties={initialTopPicks} />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="280px" />}>
          <motion.div variants={item}>
            <StepsSection />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="260px" />}>
          <motion.div variants={item}>
            <NewsSection initialArticles={initialBlogs} />
          </motion.div>
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <motion.div variants={item}>
            <FAQSection initialFaqs={initialFaqs} />
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
