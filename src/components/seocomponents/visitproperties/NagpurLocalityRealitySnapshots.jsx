"use client";

import Link from "next/link";
import { getLocalityImage } from "../../../utils/weekendVisits";

export default function NagpurLocalityRealitySnapshots({
  city = "Nagpur",
  localities = [],
  loading = false,
}) {
  if (!loading && localities.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            {city} Locality Reality Snapshots
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Real insights from verified listings across popular {city}{" "}
            neighborhoods
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm h-[380px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localities.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <img
                  src={getLocalityImage(item)}
                  alt={item.title}
                  className="w-full h-[180px] object-cover"
                />

                <div className="p-5">
                  <h4 className="font-semibold text-[#1F1F1F] mb-2">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#4B3CC4]">
                      <img
                        src="/assets/seopageassets/visitproperties/profile.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>
                        <strong>Ideal for:</strong> {item.idealFor}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#4B3CC4]">
                      <img
                        src="/assets/seopageassets/visitproperties/clock.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                      <span>
                        <strong>Best visit:</strong> {item.bestTime}
                      </span>
                    </div>
                  </div>

                  {item.sampleSlug ? (
                    <Link
                      href={`/property-info/${item.sampleSlug}`}
                      className="mt-5 w-full h-[40px] rounded-lg bg-[#7C3AED] text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center"
                    >
                      Reality Snapshot
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-5 w-full h-[40px] rounded-lg bg-[#7C3AED]/60 text-white text-sm font-semibold cursor-not-allowed"
                    >
                      Reality Snapshot
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link
            href="/properties"
            className="px-8 h-[44px] rounded-xl border-2 border-[#7C3AED] text-[#7C3AED] font-semibold hover:bg-[#7C3AED]/5 transition flex items-center justify-center"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
