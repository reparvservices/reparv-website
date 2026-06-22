"use client";
import { CheckCircle } from "lucide-react";

const points = [
  "Real, Anonymized Journeys",
  "No Paid Promotions",
  "Unfiltered Learning Moments",
];

export default function HowToRead() {
  return (
    <div className="bg-[#4A1FBF] py-5 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0">
        {/* Left label */}
        <span className="text-white font-semibold text-base whitespace-nowrap pr-6 sm:border-r border-white/30">
          How To Read These Stories
        </span>

        {/* Right points */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 sm:pl-6">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-white/80 flex-shrink-0" />
              <span className="text-white/85 text-sm">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}