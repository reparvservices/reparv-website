import React, { useState, useEffect, useMemo } from "react";
import { IoSearch } from "react-icons/io5";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import BlogBack from "../assets/blog/BlogBack.svg";
import BlogImage from "../assets/blog/BlogImage.webp";
import { IoMdTrendingUp } from "react-icons/io";
import BlogCard from "../components/blog/BlogCard";
import NewsLetterBanner from "../components/blog/NewsLetterBanner";
import { getImageURI } from "../utils/helper";
import SEO from "../components/SEO";
import AdvertisementCard from "../components/AdvertisementCard";
import AdComponent from "../components/AdsForFeed";

const HERO_BG = "linear-gradient(180deg,#F2FDF6 0%,#FFFFFF 50%,#F2FDF6 100%)";
// subtle body background
const BODY_BG =
  "linear-gradient(180deg, #F9F7FF 0%, #F1EBFF 50%, #FFFFFF 100%)";
const FILTERS = [
  "All",
  "Mobile Apps",
  "Properties",
  "Guides",
  "Sales",
  "How to",
  "Rules & Laws",
  "Marketing",
];

export default function NewBlogs() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const { URI } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "blog";
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

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/blog`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs.");
      const data = await response.json();
      //console.log(data);
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching Blogs:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSeoData();
  }, []);

  const filtered = blogs?.filter((b) => {
    const type = (b?.type || "").toLowerCase();
    const title = (b?.tittle || "").toLowerCase();
    const description = (b?.description || "").toLowerCase();

    const filter = (activeFilter || "").toLowerCase();
    const search = (query || "").toLowerCase().trim();

    if (filter && !type.includes(filter)) {
      return false;
    }

    if (search) {
      return (
        type.includes(search) ||
        title.includes(search) ||
        description.includes(search)
      );
    }

    return true;
  });

  const visible = filtered?.slice(0, visibleCount);

  return (
    <>
      <SEO
        title={
          seoData?.title ||
          "Reparv Insights | Smart Real Estate Knowledge for Confident Property Decisions"
        }
        description={
          seoData?.description ||
          "Read 100+ expert real estate insights, buying guides, and investment tips on Reparv Insights. Make smarter property decisions. Start reading today"
        }
        canonical="https://www.reparv.in/blogs"
      />
      <div
        className="w-full max-w-[1440px] mx-auto min-h-screen"
        style={{ background: BODY_BG }}
      >
        {/* HERO */}
        <section className="relative w-full h-[250px] sm:h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden">
          {/* Background Image */}
          <img
            src={BlogBack}
            alt="Blog Hero"
            className="absolute inset-0 w-full h-full object-cover rounded-bl-4xl rounded-br-4xl sm:rounded-bl-none sm:rounded-br-none"
          />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto h-full px-4 flex flex-col justify-center text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">
              Reparv Real Estate Blog
            </h1>

            <p className="text-xs md:text-base text-white font-bold max-w-2xl mx-auto mb-8 sm:mb-10">
              Your trusted source for property insights, market trends, and
              expert advice to make informed real estate decisions.
            </p>

            {/* Search */}
            <div className="flex justify-center">
              <div className="flex w-full max-w-3xl bg-white rounded-full overflow-hidden shadow-lg p-2 sm:p-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, Topic, guides...."
                  className="flex-1 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-gray-700 outline-none"
                />
                <button
                  onClick={() => {
                    const isMobile = window.innerWidth < 768;

                    window.scrollTo({
                      top: isMobile ? 1800 : 1550,
                      behavior: "smooth",
                    });
                  }}
                  className="bg-[#7C3AED] px-4 sm:px-6 text-white font-medium flex items-center gap-2 cursor-pointer rounded-full  "
                >
                  <IoSearch className="w-5 h-5" />
                  <span className="hidden sm:block">Search</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Body - filters + cards */}
        <section className="max-w-[1380px] mx-auto pb-20 pt-8 px-4">
          <div className="bg-transparent rounded-lg">
            {/* Top filter buttons centered horizontally
              NOTE: default buttons are neutral (transparent/unstyled).
              Only the active one gets the green background.
          */}
            {/* FILTER TABS */}
            <div className="flex justify-center">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`${
                      activeFilter === f
                        ? "bg-[#7C3AED] text-white shadow"
                        : "bg-[#fcfcfc] text-[#000000] hover:bg-[#FFFFFF]"
                    } px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURED ARTICLES */}
            <section className="w-full mx-auto py-6 sm:py-14">
              <p className="text-center sm:text-left text-sm text-violet-600 mb-1 sm:mb-2 ml-1">
                # Latest From Our Blog
              </p>

              <h2 className="text-center sm:text-left text-3xl md:text-4xl font-extrabold text-[#2D1A4A] mb-4 sm:mb-10 ml-1">
                Featured Articles
              </h2>

              {blogs?.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* LEFT BIG CARD */}
                  <article className="lg:col-span-2 bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden">
                    <img
                      src={getImageURI(blogs[0]?.image) || BlogImage}
                      alt={blogs[0]?.tittle}
                      loading="lazy"
                      className="w-full max-h-[500px] object-cover"
                    />

                    <div className="p-4 sm:p-6">
                      <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs bg-violet-100 text-[#5323DC]">
                        {blogs[0]?.type}
                      </span>

                      <h3 className="text-lg sm:text-4xl font-bold mb-5 text-[#3F2D62]">
                        {blogs[0].tittle.length > 71
                          ? `${blogs[0].tittle.slice(0, 70)}...`
                          : blogs[0].tittle}
                      </h3>

                      <p className="text-gray-600 mb-5">
                        {blogs[0].description.length > 201
                          ? `${blogs[0].description.slice(0, 200)}...`
                          : blogs[0].description}
                      </p>

                      <Link
                        to={`/blog/${blogs[0]?.seoSlug}`}
                        className="inline-flex items-center gap-2 bg-[#5323DC] text-white px-5 py-2 rounded-lg font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>

                  {/* RIGHT STACKED CARDS */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-6">
                    {blogs?.slice(1, 3).map((b) => (
                      <article
                        key={b.id}
                        className="w-full bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-101 transition-all duration-300 cursor-default"
                      >
                        <div className="w-full max-h-[230px] overflow-hidden bg-gray-50">
                          <img
                            src={getImageURI(b?.image) || BlogImage}
                            alt={b?.tittle || "Blog Image"}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-xs text-gray-500 gap-3">
                            <span>{b.updated_at}</span>
                            <span>•</span>
                            <span>{b.readTime || "5 min"}</span>
                          </div>

                          <h3 className="mt-3 text-lg text-[#3F2D62] font-semibold leading-snug break-words">
                            {b.tittle.length > 71
                              ? `${b.tittle.slice(0, 70)}...`
                              : b.tittle}
                          </h3>

                          <div className="mt-4 flex items-center justify-end">
                            <Link
                              to={`/blog/${b?.seoSlug}`}
                              className="inline-flex text-xs items-center gap-2 bg-[#5323DC] text-white px-5 py-2 rounded-lg font-medium"
                            >
                              Read More →
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <AdvertisementCard />

            <h2 className="text-center sm:text-left text-3xl md:text-4xl font-extrabold text-[#2D1A4A] sm:mb-10">
              Latest Articles
            </h2>

            <div className="max-w-[1380px] mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {visible?.slice(3).map((b, index) => (
                <React.Fragment key={b?.id || index}>
                  {/* Ad after first blog */}
                  {index === 0 && <AdComponent key="first-ad" />}

                  <BlogCard blogData={b} />

                  {/* Ad after every 4 blogs */}
                  {(index + 1) % 4 === 0 && <AdComponent key={`ad-${index}`} />}
                </React.Fragment>
              ))}
            </div>

            {/* Load more center */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="px-6 py-2 border border-[#5E23DC] font-semibold rounded-full bg-white text-violet-600 hover:bg-violet-50 shadow cursor-pointer"
              >
                Load More Articles
              </button>
            </div>
          </div>
          <NewsLetterBanner />
        </section>
      </div>
    </>
  );
}
