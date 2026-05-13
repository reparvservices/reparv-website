import Link from "next/link";
import { useRouter } from "next/navigation";
// NewsSection.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { SlCalender } from "react-icons/sl";
import { IoTimeOutline } from "react-icons/io5";
import { getImageURI } from "../../utils/helper";

function BlogSection() {
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

  const ImageUri = import.meta.env.VITE_S3_IMAGE_URL;

  return (
    <section className="w-full">
      {/* Grid Scroll — 1 Column, 3 Rows */}
      <div className="w-full grid place-items-center grid-cols-1 grid-rows-3 gap-6 pb-4">
        {(articles.length ? articles.slice(0, 3) : []).map((item) => (
          <Link href={`/blog/${item.seoSlug}`} className="w-full">
            <article
              key={item.id}
              className="w-full max-w-[400px] min-h-[330px] bg-white rounded-2xl border border-[#E6E6E6] shadow-sm overflow-hidden cursor-pointer "
            >
              {/* Image */}
              <div className="w-full max-h-[200px] lg:h-[200px] bg-[#00000015] overflow-hidden">
                <img
                  src={
                    getImageURI(item?.image) ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  }
                  alt={item?.tittle}
                  className="max-h-[230px] w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-start gap-1">
                  <SlCalender size={10} />
                  <p className="text-sm text-gray-500">{item?.updated_at}</p>
                  <IoTimeOutline size={14} />
                  <p className="text-sm text-gray-500">{"5 min"}</p>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-gray-900 leading-snug">
                  {item.tittle}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/blog/${item.seoSlug}`}
                    className="text-[#00A63E] text-base font-medium flex items-center gap-1"
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
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
