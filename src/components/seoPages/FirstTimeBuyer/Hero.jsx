"use client";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import {
  buildStarterPropertiesLink,
  formatBudgetRange,
  formatVerifiedStatValue,
  getHeroImage,
} from "@/utils/firstTimeBuyerPage";

const PAGE_CITY = "Nagpur";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero({ pageData = null }) {
  const affordableHomes = pageData?.stats?.affordableHomes || 0;
  const localityCount = pageData?.stats?.localities || 0;
  const budgetRange = formatBudgetRange(
    pageData?.stats?.minPrice,
    pageData?.stats?.maxPrice,
  );

  return (
    <section className="bg-white py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 bg-gray/50 border border-purple-100 text-[#5323DC] text-xs font-semibold px-3 py-1.5 rounded-full mb-7">
            <BadgeCheck className="w-4 h-4" />
            {affordableHomes
              ? `${formatVerifiedStatValue(affordableHomes)} Starter Homes in ${PAGE_CITY}`
              : "100% Real Buyer Experiences"}
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-950 leading-tight mb-5">
            First-Time Buyer Stories – Real Home Buying Journeys
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-9 max-w-lg">
            Honest experiences of first-time home buyers who started with
            confusion, faced doubts, and found clarity before making confident
            decisions in {PAGE_CITY}
            {localityCount ? ` across ${localityCount} localities` : ""}.
            {affordableHomes ? ` Explore starter homes from ${budgetRange}.` : ""}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("buyer-stories")}
              className="bg-[#5323DC] hover:bg-purple-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
            >
              Read Recent Stories
            </button>
            <Link
              href={buildStarterPropertiesLink(PAGE_CITY)}
              className="border-2 border-[#5323DC] text-[#5323DC] hover:bg-purple-50 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm text-center"
            >
              Browse Starter Homes
            </Link>
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <img
            src={getHeroImage(pageData)}
            alt="First-time buyer exploring homes in Nagpur"
            className="w-full h-[380px] object-cover rounded-2xl"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/assets/seoPages/firstTimeBuyer/hero.svg";
            }}
          />
        </div>
      </div>
    </section>
  );
}
