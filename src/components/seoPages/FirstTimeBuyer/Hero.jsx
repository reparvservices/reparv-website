"use client";
import { BadgeCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left content */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gray/50 border border-purple-100 text-[#5323DC] text-xs font-semibold px-3 py-1.5 rounded-full mb-7">
            <BadgeCheck className="w-4 h-4" />
            100% Real Buyer Experiences
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-950 leading-tight mb-5">
            First-Time Buyer Stories – Real Home Buying Journeys
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-9 max-w-lg">
            Honest experiences of first-time home buyers who started with
            confusion, faced doubts, and found clarity before making confident
            decisions.
          </p>

          <button className="bg-[#5323DC] hover:bg-purple-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm">
            Read Recent Stories
          </button>
        </div>

        {/* Right image */}
        <div className="flex-1 min-w-0 w-full">
          <img
            src="/assets/seoPages/firstTimeBuyer/hero.svg"
            alt="Happy family standing in front of their new home"
            className="w-full h-[380px] object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}