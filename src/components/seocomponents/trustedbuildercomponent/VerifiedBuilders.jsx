"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  formatExperienceYears,
  getBuilderDisplayName,
  getBuilderImage,
  getBuilderLocation,
} from "../../../utils/trustedBuilders";

export default function VerifiedBuilders({
  builders = [],
  filterCities = [],
  city,
  onCityChange,
  loading = false,
}) {
  const [localCity, setLocalCity] = useState(city || "All Cities");

  useEffect(() => {
    setLocalCity(city || "All Cities");
  }, [city]);

  const cityOptions = useMemo(() => {
    const unique = Array.from(new Set(filterCities.filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [filterCities]);

  const handleCityChange = (value) => {
    setLocalCity(value);
    onCityChange?.(value === "All Cities" ? "Nagpur" : value);
  };

  if (!loading && builders.length === 0) {
    return null;
  }

  return (
    <section id="verified-builders" className="bg-[#F7F5FF] py-12 sm:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
              Verified Builders
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Explore our network of trusted and verified construction partners
            </p>
          </div>

          {cityOptions.length > 0 && (
            <select
              value={localCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-[160px] h-[40px] rounded-lg border border-gray-300 px-3 text-sm bg-white"
            >
              {cityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md h-[360px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {builders.map((builder) => {
              const name = getBuilderDisplayName(builder);
              const experience = formatExperienceYears(
                builder.experience,
                builder.created_at,
              );
              const projectLabel = `${builder.projectCount || 0} Project${
                Number(builder.projectCount) === 1 ? "" : "s"
              }`;

              return (
                <div
                  key={builder.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
                >
                  <div className="relative h-[200px]">
                    <img
                      src={getBuilderImage(builder)}
                      alt={name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-3 left-3 bg-[#7C3AED] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <img
                        src="/assets/seopageassets/turstedbuilder/verified-badge.svg"
                        alt=""
                        className="w-3 h-3"
                      />
                      Verified
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <img
                        src="/assets/seopageassets/turstedbuilder/location.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                      {getBuilderLocation(builder, city)}
                    </div>

                    <h4 className="font-semibold text-sm mb-3">{name}</h4>

                    <div className="flex justify-between text-xs text-[#7C3AED] mb-4">
                      {experience ? (
                        <div className="flex items-center gap-1">
                          <img
                            src="/assets/seopageassets/turstedbuilder/calender.svg"
                            alt=""
                            className="w-4 h-4"
                          />
                          {experience}
                        </div>
                      ) : (
                        <span />
                      )}
                      <div className="flex items-center gap-1">
                        <img
                          src="/assets/seopageassets/turstedbuilder/projects.svg"
                          alt=""
                          className="w-4 h-4"
                        />
                        {projectLabel}
                      </div>
                    </div>

                    <Link
                      href={`/project-partner/${builder.contact}`}
                      className="mt-auto w-full h-[40px] bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition flex items-center justify-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            href="/properties"
            className="px-8 h-[44px] border border-[#7C3AED] text-[#7C3AED] rounded-lg font-semibold hover:bg-[#7C3AED] hover:text-white transition flex items-center justify-center"
          >
            View All Builders
          </Link>
        </div>
      </div>
    </section>
  );
}
