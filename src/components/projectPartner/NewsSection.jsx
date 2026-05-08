import Link from "next/link";
import { useRouter } from "next/navigation";
// NewsSection.jsx
import React, { useState, useEffect } from "react";
import propertyImg from "../../assets/projectPartner/property1.png";
import { useAuth } from "../../store/auth";
import { getImageURI } from "../../utils/helper";

function NewsSection() {
  const router = useRouter();
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

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-[18px] sm:text-[24px] md:text-[28px] font-semibold text-[#43435D] mb-1">
          News and Articles
        </h2>
        <p className="text-xs sm:text-sm text-[#000000CC]">
          Read what's happening in Real Estate
        </p>
      </div>

      {/* Horizontal Scroll — 3 Cards Visible on Desktop */}
      <div
        className="
          w-full 
          overflow-x-auto 
          scrollbar-hide 
          snap-x 
          snap-mandatory 
          flex 
          gap-6 
          py-4
          lg:pb-8

        "
      >
        {(articles.length ? articles : []).map((item) => (
          <article
            key={item.id}
            onClick={() => router.push(`/blog/${item.seoSlug}`)}
            className="
              bg-white 
              rounded-2xl 
              border 
              border-[#E6E6E6] 
              shadow-sm 
              overflow-hidden 
              cursor-pointer 
              snap-start 
              flex-shrink-0

              w-[85%]     /* mobile ≈1 card */
              sm:w-[48%]  /* tablet ≈2 cards */
              lg:w-[31.9%]  /* desktop = exactly 3 cards */
              hover:shadow-lg hover:-translate-y-1 hover:scale-101 transition-all duration-300
            "
          >
            {/* Image */}
            <div className="w-full max-h-[200px] bg-[#00000015] overflow-hidden">
              <img
                src={
                  getImageURI(item?.image) ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                }
                alt={item?.tittle}
                loading="lazy"
                className="max-h-50 w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center text-xs text-gray-500 gap-3">
                <span>{item.updated_at}</span>
                <span>•</span>
                <span>{item.readTime || "5 min"}</span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">
                {item.tittle}
              </h3>

              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {item.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/blog/${item.seoSlug}`}
                  className="text-[#5E23DC] text-base font-medium flex items-center gap-1"
                >
                  Read More
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
