import React, { useEffect, useState } from "react";
import ReraNewsCard from "../components/News/ReraNewsCard";
import FeaturedNewsCard from "../components/News/FeaturedNewsCard";
import AdvertisementCard from "../components/News/AdvertisementCard";
import LatestNewsCard from "../components/News/LatestNewsCard";
import TrendingNowCard from "../components/News/TrendingNowCard";
import CityQuickLinksCard from "../components/News/CityQuickLinksCard";
import CityWiseNews from "../components/News/CityWiseNews";
import RealEstateToolsAndGuides from "../components/News/RealEstateToolsAndGuides";
import NeverMissUpdates from "../components/News/NeverMissUpdates";
import { useAuth } from "../store/auth";
import { getImageURI } from "../utils/helper";
import SEO from "../components/SEO";
import AdComponent from "../components/AdsForFeed";
import AdsForNewsFeed from "../components/News/AdsForNewsFeed";

export default function NewsPage() {
  const { URI } = useAuth();
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const newsTypes = [
    "All",
    ...new Set(news.map((item) => item.type).filter((type) => type !== "All")),
  ];
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "news";
    try {
      const response = await fetch(`${URI}/frontend/seo-data/${page}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch seo data.");
      const data = await response.json();
      console.log(data);
      setSeoData(data);
    } catch (err) {
      console.error("Error fetching Seo Data:", err);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/news/`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs.");
      const data = await response.json();
      console.log(data);
      setNews(data);
    } catch (err) {
      console.error("Error fetching Blogs:", err);
    }
  };

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubscribe = async () => {
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${URI}/admin/subscribers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      setMessage(data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    fetchData();
  }, []);

  const filteredNews = news.filter((item) => {
    const matchTab = activeTab === "All" || item.type === activeTab;
    const matchCity = selectedCity === "All" || item.city === selectedCity;

    return matchTab && matchCity;
  });

  return (
    <>
      <SEO
        title={
          seoData?.title ||
          "Reparv News | Latest Real Estate News, Updates & Market Trends India"
        }
        description={
          seoData?.description ||
          "Stay updated with the latest real estate news, property trends, and market insights on Reparv News. Read trusted updates and explore more today."
        }
        canonical="https://www.reparv.in/news"
      />
      <div className="w-full max-w-[1440px] mx-auto min-h-screen bg-[#F8F7FC] text-gray-800">
        {/* NEWS TABS */}
        <div className="w-full bg-[#F8F7FC] py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div
              className="
        flex
        gap-3
        overflow-x-auto
        whitespace-nowrap
        scrollbar-hide
        pb-1
      "
            >
              {newsTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(type)}
                  className={`
            flex-shrink-0
            px-6
            h-[44px]
            rounded-full
            text-[16px]
            font-semibold
            transition
            ${
              activeTab === type
                ? "bg-[#8A38F5] text-white shadow-md"
                : "bg-white text-black hover:bg-gray-100"
            }
          `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="w-full max-w-[1440px] mx-auto py-6 bg-[#F8F7FC]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 p-4">
            {/* LEFT COLUMN */}
            <div className="max-w-[950px] mx-auto px-4 w-full space-y-6">
              {/* FEATURED NEWS */}
              {filteredNews.length > 0 &&
                [...filteredNews]
                  .sort(
                    (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
                  )
                  .slice(0, 1)
                  .map((item) => (
                    <FeaturedNewsCard
                      key={item.id}
                      image={getImageURI(item?.image)}
                      category={item?.type}
                      title={item?.title}
                      description={item?.description}
                      author="Reparv"
                      time={item?.updated_at}
                      readTime={item?.readTime || "3 min read"}
                      seoSlug={item?.seoSlug}
                    />
                  ))}

              {/* ADVERTISEMENT (FIGMA POSITION) */}
              <AdvertisementCard variant="main" />
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4 px-3">
              {filteredNews.length > 0 &&
                [...filteredNews]
                  .sort(
                    (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
                  )
                  .slice(0, 3)
                  .map((item) => (
                    <ReraNewsCard
                      key={item?.id}
                      image={getImageURI(item?.image)}
                      title={item?.title}
                      category={item?.type}
                      time={item?.updated_at}
                      readTime={item?.readTime || "3 min read"}
                      seoSlug={item?.seoSlug}
                    />
                  ))}
            </div>
          </div>
        </section>

        {/* LATEST NEWS */}
        <section className="w-full bg-[#F8F7FC]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
            {/* LEFT CONTENT */}
            <div className="max-w-[950px] mx-auto p-4 w-full">
              {/* LATEST NEWS TITLE */}
              <div className="flex items-center gap-4 mb-6">
                {/* PURPLE LINE */}
                <div className="w-0 h-[83px] border-l-[6px] border-[#8A38F5]" />

                {/* TITLE */}
                <h1
                  className="text-[36px] font-bold text-black font-segoe"
                  style={{ lineHeight: "100%" }}
                >
                  Latest Real Estate News and Market Updates
                </h1>
              </div>
              <div className="space-y-4">
                {filteredNews.length > 0 &&
                  [...filteredNews]
                    .sort(
                      (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
                    )
                    .slice(0, visibleCount)
                    .map((item, index) => (
                      <React.Fragment key={item.id || index}>
                        <LatestNewsCard
                          image={getImageURI(item?.image)}
                          category={item?.type}
                          title={item?.title}
                          description={item?.description}
                          author="Reparv"
                          time={item?.updated_at}
                          readTime={item?.readTime || "3 min read"}
                          seoSlug={item?.seoSlug}
                        />

                        {/* Ad after every 5 news items */}
                        {(index + 1) % 5 === 0 && (
                          <AdsForNewsFeed key={`ad-${index}`} />
                        )}
                      </React.Fragment>
                    ))}

                {/* Centered Button */}
                {visibleCount < filteredNews.length && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 9)}
                      className="
    w-[314px]
    h-[42px]
    flex
    items-center
    justify-center
    gap-2
    bg-white
    border
    border-[#8A38F5]
    rounded-[8px]
    text-[#8A38F5]
    text-[16px]
    font-bold
    leading-[21px]
    hover:bg-[#8A38F5]/5
    transition
  "
                    >
                      Show More News
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M12 16L6 10H18L12 16Z" fill="#8A38F5" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* RIGHT SIDEBAR */}
            <aside className=" lg:pr-4 p-3 space-y-6">
              <AdvertisementCard variant="sidebar" />

              {/* TRENDING + QUICK LINKS */}
              <div className="flex flex-col gap-4 lg:flex-col sm:flex-row sm:gap-4">
                <TrendingNowCard news={news} />

                <CityQuickLinksCard
                  onCitySelect={(city) => {
                    setSelectedCity(city);
                    console.log("Selected City:", city);
                  }}
                />
              </div>

              <div
                className="
    w-full
    max-w-[431px]
    rounded-[24px]
    p-6
    text-white
    flex flex-col items-center
    bg-[linear-gradient(106.99deg,#5E23DC_1.17%,#8A38F5_98.83%)]
  "
              >
                {/* ICON */}
                <div className="w-12 h-12 mb-4 flex items-center justify-center">
                  <svg
                    width="38"
                    height="30"
                    viewBox="0 0 38 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.83125 1.83125C0 3.66042 0 6.60833 0 12.5V16.6667C0 22.5583 0 25.5063 1.83125 27.3354C3.66042 29.1667 6.60833 29.1667 12.5 29.1667H25C30.8917 29.1667 33.8396 29.1667 35.6688 27.3354C37.5 25.5063 37.5 22.5583 37.5 16.6667V12.5C37.5 6.60833 37.5 3.66042 35.6688 1.83125C33.8396 0 30.8917 0 25 0H12.5C6.60833 0 3.66042 0 1.83125 1.83125ZM7.40625 6.6L18.75 14.1625L30.0937 6.6C30.5535 6.29334 31.1162 6.18187 31.6581 6.29009C32.2 6.39831 32.6767 6.71737 32.9833 7.17708C33.29 7.63679 33.4015 8.19949 33.2932 8.74139C33.185 9.28329 32.866 9.76001 32.4062 10.0667L21.0604 17.6292C20.3761 18.0851 19.5723 18.3284 18.75 18.3284C17.9277 18.3284 17.1239 18.0851 16.4396 17.6292L5.09375 10.0667C4.63404 9.76001 4.31498 9.28329 4.20676 8.74139C4.09853 8.19949 4.21001 7.63679 4.51667 7.17708C4.82332 6.71737 5.30004 6.39831 5.84194 6.29009C6.38384 6.18187 6.94654 6.29334 7.40625 6.6Z"
                      fill="white"
                    />
                  </svg>
                </div>

                {/* TITLE */}
                <h3 className="text-[24px] font-bold text-center leading-none mb-2">
                  Stay Updated
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[14px] text-white/90 text-center mb-6">
                  Get the latest real estate news delivered to your inbox
                </p>

                {/* INPUT */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter Your Email"
                  className="
      w-full
      max-w-[383px]
      h-[59px]
      bg-white
      border
      border-[#D9D9D9]
      rounded-[12px]
      px-4
      text-[16px]
      text-black
      outline-none
      placeholder:text-gray-400
      mb-4
    "
                />

                {/* BUTTON */}
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="
    w-full
    max-w-[383px]
    h-[59px]
    rounded-[12px]
    border
    border-[#5E23DC]
    bg-white
    text-[#5E23DC]
    text-[22px]
    font-bold
    leading-none
    text-center
    hover:bg-gray-100
    transition
  "
                >
                  {loading ? "Subscribing..." : "Subscribe Now"}
                </button>
                {/* MESSAGE */}
                {message && (
                  <p className="mt-3 ml-6 text-xs sm:text-sm font-medium text-white">
                    {message}
                  </p>
                )}
              </div>
              <AdvertisementCard variant="sidebar" />
            </aside>
          </div>
        </section>
        {/* CITY WISE NEWS */}
        <section className="w-full py-6">
          <CityWiseNews />
        </section>
        <section className="w-full ">
          <RealEstateToolsAndGuides />
        </section>
        <section className="w-full mb-10">
          <NeverMissUpdates />
        </section>
      </div>
    </>
  );
}
