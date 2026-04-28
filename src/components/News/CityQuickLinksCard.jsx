import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";

/**
 * @param {function} onCitySelect - callback to send selected city to parent
 */
export default function CityQuickLinksCard({ onCitySelect }) {
  const { URI } = useAuth();

  const [news, setNews] = useState([]);
  const [activeCity, setActiveCity] = useState("All");

  // 🔹 Extract unique cities (ignore null / empty)
  const cities = [
    "All",
    ...Array.from(
      new Set(
        news
          .map((item) => item.city)
          .filter((city) => city && city.trim() !== "")
      )
    ),
  ];

  // 🔹 Fetch news
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/news/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setNews(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Handle city click
  const handleCityClick = (city) => {
    setActiveCity(city);
    if (onCitySelect) {
      onCitySelect(city); // 🚀 send selected city to parent
    }
  };

  return (
    <div
      className="
        w-full
        sm:max-w-[358px]
        bg-white
        border border-[#E6E6E6]
        rounded-[16px]
        p-4
        flex flex-col
        gap-3
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-0 h-[24px] border-l-[4px] border-[#8A38F5]" />
        <h3 className="text-[16px] sm:text-[18px] font-bold text-black">
          City Quick Links
        </h3>
      </div>

      {/* CITY BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {cities.map((city, index) => {
          const isActive = activeCity === city;

          return (
            <button
              key={index}
              onClick={() => handleCityClick(city)}
              className={`
                px-4 sm:px-5
                py-1.5
                text-[10px] sm:text-[12px]
                font-medium
                rounded-[12px]
                transition
                flex-shrink-0
                border
                ${
                  isActive
                    ? "bg-[#8A38F5] text-white border-[#8A38F5]"
                    : "bg-white text-black border-[#D9D9D9] hover:bg-[#8A38F5] hover:text-white hover:border-[#8A38F5]"
                }
              `}
            >
              {city}
            </button>
          );
        })}
      </div>
    </div>
  );
}
