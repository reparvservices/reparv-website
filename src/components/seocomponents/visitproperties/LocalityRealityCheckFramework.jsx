import { useState } from "react";

// ICONS
import trafficIcon from "../../../assets/seopageassets/visitproperties/traffic.svg";
import waterIcon from "../../../assets/seopageassets/visitproperties/water.svg";
import noiseIcon from "../../../assets/seopageassets/visitproperties/noise.svg";
import dailyIcon from "../../../assets/seopageassets/visitproperties/daily.svg";
import safetyIcon from "../../../assets/seopageassets/visitproperties/safety.svg";

// ILLUSTRATION
import localityIllustration from "../../../assets/seopageassets/visitproperties/framwork-image.jpg";

export default function LocalityRealityCheckFramework() {
  const [openIndex, setOpenIndex] = useState(0);

  const items = [
    {
      title: "Traffic & Connectivity",
      icon: trafficIcon,
      content:
        "We analyze real-world traffic congestion, peak-hour delays, public transport access, and last-mile connectivity during weekends.",
    },
    {
      title: "Water & Utilities",
      icon: waterIcon,
      content:
        "Weekend water pressure, electricity reliability, power backup availability, and drainage conditions are carefully checked.",
    },
    {
      title: "Noise & Pollution",
      icon: noiseIcon,
      content:
        "Noise levels, air quality, nearby construction, traffic pollution, and disturbance sources are evaluated during actual living hours.",
    },
    {
      title: "Daily Convenience",
      icon: dailyIcon,
      content:
        "Access to groceries, hospitals, schools, public services, and daily essentials within walking or short driving distance.",
    },
    {
      title: "Safety & Security",
      icon: safetyIcon,
      content:
        "Street lighting, police presence, CCTV coverage, neighborhood safety perception, and emergency access are reviewed.",
    },
  ];

  return (
    <section className="bg-[#F8F5FF] py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Locality Reality Check Framework
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Our experts check these 5 critical factors during every weekend
            visit
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT – ACCORDION */}
          <div className="space-y-4">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#EDE7FF] flex items-center justify-center">
                        <img
                          src={item.icon}
                          alt={item.title}
                          className="w-5 h-5"
                        />
                      </div>
                      <span className="font-semibold text-[#1F1F1F]">
                        {item.title}
                      </span>
                    </div>

                    <span
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT – ILLUSTRATION */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={localityIllustration}
              alt="Locality Reality Check Illustration"
              className="w-full max-w-md lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
