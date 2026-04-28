import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { TbArrowRightDashed } from "react-icons/tb";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getImageURI } from "../utils/helper";

function BlogSection({ heading, blogs }) {
  const navigate = useNavigate();
  const { URI, selectedCity } = useAuth();

  const [articles, setArticles] = useState([]);

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
      setArticles(data);
    } catch (err) {
      console.error("Error fetching Blogs:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRef = useRef(null);
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -400, // adjust distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section */}
      <div className="flex items-center justify-between gap-6 pb-2 sm:pb-4">
        <div className="flex flex-col gap-2 md:gap-4">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
            {heading || "Property Buying Guides"}
          </h2>
          <h5 className="text-xs md:text-lg lg:xl md:text-[#868686]">
            Expert advice and insights to help you make informed decisions
          </h5>
        </div>
        <div className="hidden md:flex gap-6 xl:gap-8 md:pr-4">
          <button
            onClick={() => {
              scrollLeft();
            }}
            className="w-15 h-15 xl:w-20 xl:h-20 rounded-full border border-[#8A38F5] text-[#8A38F5] flex items-center justify-center"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={() => {
              scrollRight();
            }}
            className="w-15 h-15 xl:w-20 xl:h-20 rounded-full bg-[#8A38F5] text-white flex items-center justify-center"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
      {/* Horizontal Scroll — 3 Cards Visible on Desktop */}
      <div
        ref={scrollRef}
        className="
          w-full 
          overflow-x-auto 
          scrollbar-hide 
          snap-x 
          snap-mandatory 
          flex 
          gap-4
          sm:gap-6 
          py-4
          lg:pb-8
          
        "
      >
        {(articles.length ? articles : []).map((item) => (
          <article
            key={item.id}
            onClick={() => navigate(`/blog/${item.seoSlug}`)}
            className="
              rounded-2xl 
              bg-white
              overflow-hidden 
              cursor-pointer 
              snap-start
              flex-shrink-0
              w-[80%]     /* mobile ≈1 card */
              sm:w-[48%]  /* tablet ≈2 cards */
              lg:w-[31.9%]  /* desktop = exactly 3 cards */
              shadow-[0px_4px_10.1px_0px_#0000001F]
            "
          >
            {/* Image */}
            <div className="w-full max-h-[230px] bg-[#00000015] rounded-tl-2xl rounded-tr-2xl overflow-hidden">
              <img
                src={
                  getImageURI(item?.image) ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                }
                alt={item?.tittle}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 bg-white">
              <span className="text-xs text-[#5E23DC] px-2 py-1 bg-[#DABEFF] rounded-full">
                {item?.type || "Legal Guide"}
              </span>
              <h3 className=" mt-3 text-base sm:text-xl font-semibold text-gray-900 leading-snug">
                {item.tittle.length > 51
                  ? `${item.tittle.slice(0, 50)}...`
                  : item.tittle}
              </h3>
              {/* description */}
              <h3 className="hidden sm:block mt-3 text-[10px] sm:text-xs text-[#868686] leading-snug">
                {item.description.length > 101
                  ? `${item.description.slice(0, 100)}...`
                  : item.description}
              </h3>
              <div className="flex gap-1 items-center mt-1 sm:mt-4 text-sm sm:text-base font-semibold text-[#8A38F5]">
                <span>Read More</span>{" "}
                <TbArrowRightDashed className="w-5 h-5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
