import Head from "next/head";
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
    <>
      <Head>
        <title>
          First-Time Buyer Stories - Real Home Buying Journeys | Reparv
        </title>
        <meta
          name="description"
          content="Honest experiences of first-time home buyers who started with confusion, faced doubts, and found clarity before making confident decisions. Read real stories from Nagpur and across India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="First-Time Buyer Stories - Real Home Buying Journeys | Reparv"
        />
        <meta
          property="og:description"
          content="Read real home buying journeys from first-time buyers who found clarity through honest experiences and guided decision-making."
        />
        <meta property="og:site_name" content="Reparv" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="First-Time Buyer Stories – Real Home Buying Journeys"
        />
        <meta
          name="twitter:description"
          content="Honest first-time home buyer stories. Real confusion, real clarity, real decisions."
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "First-Time Buyer Stories – Real Home Buying Journeys",
              description:
                "Honest experiences of first-time home buyers who started with confusion and found clarity before making confident decisions.",
              publisher: {
                "@type": "Organization",
                name: "Reparv",
              },
            }),
          }}
        />
      </Head>

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
    </>
  );
}
