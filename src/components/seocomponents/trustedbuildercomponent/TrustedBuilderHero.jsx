"use client";

import {
  formatPresenceLabel,
  formatStatValue,
} from "../../../utils/trustedBuilders";

export default function TrustedBuilderHero({ stats, city, onExploreProjects, onViewBuilders }) {
  const heroStats = [
    {
      value: formatStatValue(stats?.verifiedProjects),
      label: "Verified Projects",
      icon: "/assets/seopageassets/turstedbuilder/projects.svg",
    },
    {
      value: formatStatValue(stats?.trustedBuilders),
      label: "Trusted Builders",
      icon: "/assets/seopageassets/turstedbuilder/builders.svg",
    },
    {
      value: formatPresenceLabel(stats?.cityCount, city),
      label: "Presence",
      icon: "/assets/seopageassets/turstedbuilder/pan-india.svg",
    },
    {
      value: "100%",
      label: "Legal & Title Verified",
      icon: "/assets/seopageassets/turstedbuilder/verified.svg",
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black leading-snug sm:leading-tight lg:leading-[1.5]">
              Trusted Builders & Verified Real Estate Projects{" "}
              <span className="text-[#7C3AED]">Across India</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl mx-auto lg:mx-0">
              Discover legally verified properties from trusted builders. Your
              dream home awaits with complete transparency and peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
              <button
                type="button"
                onClick={onExploreProjects}
                className="h-[48px] px-6 rounded-xl bg-[#7C3AED] text-white font-semibold shadow-[0_8px_20px_#8A38F529] hover:opacity-95 transition"
              >
                Explore Projects
              </button>

              <button
                type="button"
                onClick={onViewBuilders}
                className="h-[48px] px-6 rounded-xl border-2 border-[#7C3AED] text-[#7C3AED] font-semibold hover:bg-[#7C3AED]/5 transition"
              >
                View Trusted Builders
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <img
              src="/assets/seopageassets/turstedbuilder/banner-image.svg"
              alt="Trusted builders across India"
              className="w-full max-w-lg"
            />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {heroStats.map((item) => (
            <div
              key={item.label}
              className="bg-white border rounded-2xl p-5 sm:p-6 text-center shadow-sm"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#8A38F5] flex items-center justify-center">
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
              </div>

              <div className="text-2xl sm:text-3xl font-bold text-black">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
