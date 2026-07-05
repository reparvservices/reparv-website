"use client";

import Link from "next/link";
import FormatPrice from "../../FormatPrice";
import {
  formatPropertyCategory,
  formatPropertyPrice,
  getPartnerName,
  getPropertyBadge,
  getPropertyImage,
  getPropertyLocationText,
} from "../../../utils/weekendVisits";

export default function VerifiedWeekendProperties({
  city = "Nagpur",
  properties = [],
  loading = false,
}) {
  if (!loading && properties.length === 0) {
    return null;
  }

  return (
    <section id="weekend-properties" className="bg-white py-16">
      <div className="max-w-[1380px] mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-black mb-12">
          Verified Properties Available for Weekend{" "}
          <br className="hidden sm:block" />
          visits in {city}
        </h2>

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
            {properties.map((property) => {
              const price = formatPropertyPrice(property);
              const salesPrice = Number(property?.totalSalesPrice);

              return (
                <div
                  key={property.propertyid}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={getPropertyImage(property)}
                      alt={property.propertyName}
                      className="w-full h-[200px] object-cover"
                    />

                    <span className="absolute top-3 left-3 bg-[#7C3AED] text-white text-xs px-3 py-1 rounded-full">
                      {getPropertyBadge(property)}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <img
                        src="/assets/seopageassets/visitproperties/location.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                      {getPropertyLocationText(property)}
                    </div>

                    <h4 className="font-semibold text-black">
                      {property.propertyName}
                    </h4>

                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-xs bg-[#F3ECFF] text-[#7C3AED] px-3 py-1 rounded-full">
                        {formatPropertyCategory(property.propertyCategory)}
                      </span>

                      <div className="text-right">
                        {salesPrice > price && price ? (
                          <p className="text-xs text-gray-400 line-through">
                            <FormatPrice price={salesPrice} />
                          </p>
                        ) : null}
                        <p className="text-lg font-bold text-black">
                          {price ? (
                            <FormatPrice price={price} />
                          ) : (
                            "Price on request"
                          )}
                        </p>
                      </div>
                    </div>

                    <hr />

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm min-w-0">
                        <img
                          src="/assets/seopageassets/visitproperties/profile.svg"
                          alt=""
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium truncate">
                            {getPartnerName(property)}
                          </p>
                          <p className="text-xs text-gray-500">Partner</p>
                        </div>
                      </div>

                      <Link
                        href={`/property-info/${property.seoSlug}`}
                        className="px-4 py-2 bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition whitespace-nowrap"
                      >
                        View Details
                      </Link>
                    </div>
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
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
