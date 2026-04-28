import React, { useEffect, useState } from "react";
import testImage from "../../assets/test.png";
import { getImageURI } from "../../utils/helper";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";

export default function CityWiseNews() {
  const { URI } = useAuth();

  const [activeCity, setActiveCity] = useState("All");
  const [news, setNews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // 🔹 Dynamic city list
  const cities = ["All", ...new Set(news.map((item) => item.city))];

  // 🔹 Filter by city
  const filteredNews =
    activeCity === "All"
      ? news
      : news.filter((item) => item.city === activeCity);

  // 🔹 Show only 3 initially
  const visibleNews = showAll ? filteredNews : filteredNews.slice(0, 3);

  // 🔹 Fetch news
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/news/`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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

  // 🔹 Reset "See more" when city changes
  useEffect(() => {
    setShowAll(false);
  }, [activeCity]);

  return (
    <section
      className="
        w-full
        py-10 sm:py-12 lg:py-14
        bg-[linear-gradient(106.99deg,#5E23DC_1.17%,#8A38F5_98.83%)]
      "
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITLE */}
        <h2 className="text-white text-[22px] sm:text-[24px] lg:text-[26px] font-bold text-center mb-6 sm:mb-8">
          City-wise News
        </h2>

        {/* CITY TABS */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="flex gap-2 bg-white p-2 rounded-full overflow-x-auto scrollbar-hide">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`
                  px-4 sm:px-6
                  py-2 sm:py-3
                  rounded-full
                  text-[13px] sm:text-[14px]
                  font-semibold
                  whitespace-nowrap
                  transition
                  ${
                    activeCity === city
                      ? "bg-[#5E23DC] text-white"
                      : "text-black hover:bg-gray-100"
                  }
                `}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* NEWS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleNews.length > 0 ? (
            visibleNews.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  rounded-[16px]
                  overflow-hidden
                  shadow-md
                  flex
                  flex-col
                  h-full
                "
              >
                {/* IMAGE */}
                <Link to={`/news/${item?.seoSlug}`}>
                  <img
                    src={getImageURI(item.image) || testImage}
                    alt={item.title}
                    loading="lazy"
                    className="
                    w-full
                    object-cover
                  "
                  />
                </Link>

                {/* CONTENT */}
                <div className="p-4 sm:p-5 flex flex-col gap-3 h-full">
                  {/* CITY TAG */}
                  <span
                    className="
                      w-fit
                      px-3
                      py-1
                      text-[12px]
                      font-semibold
                      rounded-full
                      bg-[#F3E8FF]
                      text-[#8A38F5]
                    "
                  >
                    {item.city}
                  </span>

                  {/* TITLE */}
                  <h3
                    className="
                      text-[18px]
                      sm:text-[20px]
                      lg:text-[24px]
                      font-bold
                      text-black
                    
                    "
                  >
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280]">
                    {item.description}
                  </p>

                  {/* LINK */}
                  <Link
                    to={`/news/${item?.seoSlug}`}
                    className="
                      mt-auto
                      text-[#5E23DC]
                      text-[13px]
                      font-bold
                      hover:underline
                      flex
                      items-center
                      gap-1
                      font-segoe
                    "
                  >
                    View News →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white text-sm">
              No news available
            </p>
          )}
        </div>

        {/* SEE MORE */}
        {filteredNews.length > 3 && !showAll && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="text-white text-[14px] font-bold hover:underline"
            >
              See more news →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
