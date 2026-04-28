import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import PropertyCard from "../components/property/PropertyCard";

// Icons
import { FaArrowLeft } from "react-icons/fa6";
import { FaHeart, FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";

const BODY_BG =
  "linear-gradient(180deg, #F9F7FF 0%, #F1EBFF 50%, #FFFFFF 100%)";

/* Filter configuration */
const FILTERS = [
  { key: "Wishlist", icon: FaHeart },
  { key: "Enquiries", icon: MdOutlineEventAvailable },
  { key: "Visits", icon: FaRegCalendarCheck },
  { key: "Bookings", icon: BsBookmarkCheckFill },
];

const FILTER_API_MAP = {
  Wishlist: "/user/activity/liked/all-properties",
  Enquiries: "/user/activity/enquiries/all-properties",
  Visits: "/user/activity/visited/all-properties",
  Bookings: "/user/activity/booked/all-properties",
};

export default function Activity() {
  const navigate = useNavigate();
  const { URI } = useAuth();
  
  const [activeFilter, setActiveFilter] = useState("Wishlist");
  const [properties, setProperties] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);

  /* Count for each filter */
  const [counts, setCounts] = useState({
    Wishlist: 0,
    Enquiries: 0,
    Visits: 0,
    Bookings: 0,
  });

  const fetchProperties = async (filter) => {
    try {
      setLoading(true);
      const endpoint = FILTER_API_MAP[filter];
      if (!endpoint) return;

      const res = await fetch(`${URI}${endpoint}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch properties");

      const data = await res.json();

      setProperties(data || []);
      setVisibleCount(12);

      // update count for active filter
      setCounts((prev) => ({
        ...prev,
        [filter]: data?.length || 0,
      }));
    } catch (err) {
      console.error("Activity fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(activeFilter);
  }, [activeFilter]);

  const visibleProperties = properties.slice(0, visibleCount);

  return (
    <div
      className="w-full max-w-[1440px] mx-auto min-h-screen"
      style={{ background: BODY_BG }}
    >
      {/* Back Navigation Section */}
      <div className="md:hidden w-full h-[40px] sm:h-[50px] flex items-center gap-4 py-4 pt-8 px-6 rounded-lg">
        <FaArrowLeft
          onClick={() => {
            navigate(-1);
          }}
          className="w-5 h-5"
        />
        <span className="w-full text-base sm:text-lg font-bold text-center">
          Activities
        </span>
      </div>
      <section className="max-w-[1380px] mx-auto pb-20 pt-4 px-4">
        {/* FILTER TABS */}
        <div className="flex justify-center">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2">
            {FILTERS.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeFilter === key
                      ? "bg-[#7C3AED] text-white shadow"
                      : "bg-white text-black hover:bg-[#F4F1FF]"
                  }`}
              >
                {/* ICON */}
                <Icon
                  size={16}
                  className={
                    activeFilter === key ? "text-white" : "text-[#7C3AED]"
                  }
                />

                {/* LABEL */}
                <span>{key}</span>

                {/* COUNT */}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold
                    ${
                      activeFilter === key
                        ? "bg-white text-[#7C3AED]"
                        : "bg-[#EEE9FF] text-[#5E23DC]"
                    }`}
                >
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
            <p className="col-span-full text-center font-semibold text-gray-700">
              Loading properties...
            </p>
          ) : visibleProperties.length === 0 ? (
            <p className="col-span-full text-center font-semibold text-gray-700">
              No properties found.
            </p>
          ) : (
            visibleProperties.map((property) => (
              <PropertyCard key={property.propertyid} property={property} />
            ))
          )}
        </div>

        {/* LOAD MORE */}
        {visibleCount < properties.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="px-6 py-2 border border-[#5E23DC] font-semibold rounded-full
                         bg-white text-violet-600 hover:bg-violet-50 shadow"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
