"use client";

import {
  formatStatValue,
  getCityIcon,
} from "../../../utils/trustedBuilders";

export default function ExploreBuildersByCity({
  cities = [],
  onCitySelect,
}) {
  if (!cities.length) {
    return null;
  }

  return (
    <section className="bg-white py-7 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
          Explore Builders by City
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-3">
          Find trusted builders in your preferred location
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {cities.map((city) => (
            <button
              key={city.name}
              type="button"
              onClick={() => onCitySelect?.(city.name)}
              className="border border-[#D0D0D0] rounded-2xl p-8 bg-white hover:shadow-md transition text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F4EEFF] flex items-center justify-center">
                <img
                  src={getCityIcon(city.name)}
                  alt={city.name}
                  className="w-9 h-9"
                />
              </div>

              <h4 className="text-xl font-bold text-black">{city.name}</h4>

              <p className="text-sm text-gray-500 mt-2">
                {city.builderCount} Builder
                {city.builderCount === 1 ? "" : "s"}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
