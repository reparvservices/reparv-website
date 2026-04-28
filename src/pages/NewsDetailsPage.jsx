import React, { useEffect, useState } from "react";
import AdvertisementCard from "../components/News/AdvertisementCard";
import TrendingNowCard from "../components/News/TrendingNowCard";
import CityQuickLinksCard from "../components/News/CityQuickLinksCard";
import LatestNewsCard from "../components/News/LatestNewsCard";
import CityWiseNews from "../components/News/CityWiseNews";
import RealEstateToolsAndGuides from "../components/News/RealEstateToolsAndGuides";
import NeverMissUpdates from "../components/News/NeverMissUpdates";
import { useNavigate, useParams } from "react-router-dom";
import ReraNewsCard from "../components/News/ReraNewsCard";
import { LuClock } from "react-icons/lu";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoShareSocialSharp } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { useAuth } from "../store/auth";
import { getImageURI } from "../utils/helper";
import SocialNewsShare from "../components/SocialNewsShare";
import { addNewsVisitor } from "../utils/analytics";
import SEO from "../components/SEO";

export default function NewsDetailsPage() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const { URI, user, setShowLogin, selectedCity, setShowAlert } = useAuth();
  const [news, setNews] = useState({});
  const [newsList, setNewsList] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [newsHeight, setNewsHeight] = useState(true);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email Regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Fetch Property Info
  const fetchNewsList = async () => {
    try {
      const response = await fetch(`${URI}/frontend/news/`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch News.");
      const data = await response.json();
      //console.log(data);
      setNewsList(data);
    } catch (err) {
      console.error("Error fetching News:", err);
    }
  };

  // Fetch news Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/news/details/${newsId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch news info.");
      const data = await response.json();
      console.log(data);

      setNews(data);
    } catch (err) {
      console.error("Error fetching news info:", err);
    }
  };

  // Fetch Property Info
  const fetchRelatedArticals = async () => {
    try {
      const response = await fetch(`${URI}/frontend/news`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs.");
      const data = await response.json();
      console.log(data);
      setRelatedNews(data);
    } catch (err) {
      console.error("Error fetching Blogs:", err);
    }
  };

  const addLike = async () => {
    if (!user?.id) {
      setShowLogin(true);
      return;
    }

    if (!news?.id) return;

    try {
      const response = await fetch(`${URI}/user/activity/news-like`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ news_id: news?.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Like failed");
      }

      setShowAlert((prev) => ({
        ...prev,
        show: true,
        type: "success",
        message: data.message,
      }));
      fetchData();

      return data;
    } catch (error) {
      setShowAlert((prev) => ({
        ...prev,
        show: true,
        type: "error",
        message: error.message || "Something went wrong",
      }));

      console.error("News like error:", error);
      return null;
    }
  };

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
    fetchNewsList();
    fetchRelatedArticals();
  }, [newsId]);

  useEffect(() => {
    fetchRelatedArticals();
  }, []);

  useEffect(() => {
    if (!news?.id) return;

    const sessionKey = `viewed_news_${news.id}`;

    if (!sessionStorage.getItem(sessionKey)) {
      addNewsVisitor({
        URI,
        news_id: news.id,
        source: "view",
      });

      sessionStorage.setItem(sessionKey, "true");
    }
  }, [news?.id, URI]);

  useEffect(() => {
    fetchData();
  }, [newsId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [newsId]);

  return (
    <>
      <SEO
        title={
          news?.seoTitle ||
          "Reparv News | Latest Real Estate News, Updates & Market Trends India"
        }
        description={
          news?.seoDescription ||
          "Stay updated with the latest real estate news, property trends, and market insights on Reparv News. Read trusted updates and explore more today."
        }
        canonical={`https://www.reparv.in/property-info/${newsId || news?.seoSlug}}`}
      />
      <div className="w-full min-h-screen bg-[#F8F7FC] text-gray-800">
        {/* ================= ARTICLE SECTION ================= */}
        <section className="w-full py-6">
          {/* ================= ARTICLE HEADER ================= */}
          <div className="w-full max-w-[1289px] mx-auto px-4 md:px-0 mb-10">
            {/* CATEGORY BADGE */}
            <div className="text-start mb-4">
              <span className="inline-block px-4 py-1 text-sm font-medium font-segoe text-purple-600 bg-purple-100 rounded-full">
                {news?.type}
              </span>
            </div>

            {/* IMAGE */}
            <div className="w-full rounded-[12px] overflow-hidden">
              <img
                src={
                  getImageURI(news?.image) ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                }
                alt={"news"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TITLE */}
            <h1
              className="
      mt-8
      font-bold
      text-gray-900
      text-center
      md:text-[36px]
      max-w-[900px]
      mx-auto
   font-segoe  text-[24px] leading-[100%] tracking-normal 


    "
              style={{ fontFamily: "Segoe UI, sans-serif" }}
            >
              {news?.title}
            </h1>

            {/* SUBTITLE */}
            <p className="mt-4 text-center text-[#000000] text-[14px] md:text-[16px] max-w-[720px] mx-auto">
              {news?.description}
            </p>

            {/* AUTHOR + META */}
            <div className="mt-6 flex justify-center">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">

                {/* DATE */}
                <div className="flex items-center gap-2 text-[#868686] text-[16px]">
                  <FaRegCalendarAlt className="text-black" size={18} />
                  <span style={{ fontFamily: "Segoe UI, sans-serif" }}>
                    {news?.updated_at}
                  </span>
                </div>

                {/* READ TIME */}
                <div className="flex items-center gap-2 text-[#868686] text-[16px]">
                  <LuClock className="text-black" size={18} />
                  <span style={{ fontFamily: "Segoe UI, sans-serif" }}>
                    7 min read
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6  lg:px-0">
            {/* ================= LEFT CONTENT ================= */}
            <article className="bg-white  rounded-[16px] p-4 sm:ml-10 mx-auto  md:p-6">
              {/* HERO IMAGE */}

              <div className="relative">
                <img
                  src={
                    getImageURI(news?.image) ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  }
                  alt="news-image"
                  className="w-full object-cover rounded-[16px]"
                />
                {/* Like Button */}
                <div className="absolute top-5 right-5 flex gap-4">
                  <div
                    onClick={() => {
                      addLike(news?.id);
                    }}
                    className="w-[100px] h-[32px] sm:w-[120px] sm:h-[40px] text-[#8A38F5] bg-[white] border border-[#8A38F5] rounded-lg cursor-pointer relative overflow-hidden active:scale-95"
                  >
                    <div className="overflow-hidden relative z-10 w-full h-full flex gap-2 items-center justify-center ">
                      <FaHeart className="w-5 sm:w-6 h-5 sm:h-6" />
                      <span className="text-sm sm:text-base font-bold text-[black]">
                        Like
                      </span>{" "}
                      <span className="absolute shine-layer"></span>
                    </div>
                  </div>
                </div>
              </div>
              {/* CONTENT */}

              <div
                className="blog-content prose max-w-none mt-4 sm:px-4"
                dangerouslySetInnerHTML={{ __html: news?.content }}
              />
              <div className="w-full sm:p-4">
                <div className="w-full mx-auto py-4 border-b border-y-[#00000033] bg-[white]">
                  <SocialNewsShare
                    label={"Share this article"}
                    url={"https://www.reparv.in/news/" + newsId}
                  ></SocialNewsShare>
                </div>
                <div className="w-full sm:px-4 flex flex-wrap gap-4 sm:gap-6 py-4 bg-white overflow-scroll scrollbar-hide">
                  <div className="flex gap-2 items-center">
                    <div className="!w-10 !h-10 flex items-center justify-center rounded-full bg-[#F1F1F1]">
                      <IoMdEye className="w-5 h-5 text-[10px] text-black " />
                    </div>
                    <span className="text-black font-bold text-xs">
                      {news?.views || 0}
                    </span>
                    <span className="text-[#868686] text-xs">Viewed</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F1F1]">
                      <IoShareSocialSharp className="w-5 h-5 text-[10px] text-black " />
                    </div>
                    <span className="text-black font-bold text-xs">
                      {news?.shares || 0}
                    </span>
                    <span className="text-[#868686] text-xs">Times Shared</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div
                      onClick={() => {
                        addLike(news?.id);
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F1F1] cursor-pointer hover:text-white hover:bg-[#8A38F5]"
                    >
                      <BiLike className="w-5 h-5 text-[10px]" />
                    </div>
                    <span className="text-black font-bold text-xs">
                      {news?.likes || 0}
                    </span>
                    <span className="text-[#868686] text-xs">Likes</span>
                  </div>
                </div>
              </div>
            </article>

            {/* ================= RIGHT SIDEBAR ================= */}
            <aside className="space-y-6 p-2 sm:p-0 sm:pr-4 ">
              <AdvertisementCard variant="sidebar" />
              <div className="flex flex-col gap-4 lg:flex-col sm:flex-row sm:gap-4">
                <TrendingNowCard news={newsList}/>
                <CityQuickLinksCard />
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
            </aside>
          </div>
        </section>

        {/* ================= RELATED ARTICLES ================= */}
        <section className="w-full py-6 max-w-7xl mx-auto px-4">
          <h2 className="text-[24px] font-bold mb-4">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedNews.length > 0 &&
              relatedNews.map((item) => (
                <ReraNewsCard
                  key={item?.id}
                  image={getImageURI(item?.image)}
                  title={item?.title}
                  category={item?.type}
                  time={item?.updated_at}
                  readTime={item?.readTime || "5 min read"}
                  seoSlug={item?.seoSlug}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
