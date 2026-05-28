import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { TbArrowRightDashed } from "react-icons/tb";
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

  const ImageUri = import.meta.env.VITE_S3_IMAGE_URL;

  return (
    <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-6 pb-2 sm:pb-8">
        <div className="flex-1 h-[3px] bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
        <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          Top <span className="text-[#8A38F5]"> Articles </span> on Real estate
        </h2>
        <div className="flex-1 h-[3px] bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
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
          gap-2
          sm:gap-6 
          py-4
          lg:pb-8

        "
      >
        {(articles.length ? articles : []).map((item) => (
          <article
            key={item.id}
            onClick={() => router.push(`/blog/${item.seoSlug}`)}
            className="
              rounded-2xl 
              overflow-hidden 
              cursor-pointer 
              snap-start 
              flex-shrink-0
              p-2
              w-[50%]     /* mobile ≈1 card */
              sm:w-[48%]  /* tablet ≈2 cards */
              lg:w-[31.9%]  /* desktop = exactly 3 cards */
            "
          >
            {/* Image */}
            <div className="w-full max-h-[60%] bg-[#00000015] rounded-2xl overflow-hidden">
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
            <div className="">
              <h3 className="block sm:hidden mt-1 text-xs sm:text-xl font-semibold text-gray-900 leading-snug">
                {item.tittle.length > 41
                  ? `${item.tittle.slice(0, 40)}...`
                  : item.tittle}
              </h3>
              <h3 className="hidden sm:block mt-3 text-base sm:text-xl font-semibold text-gray-900 leading-snug">
                {item.tittle.length > 51
                  ? `${item.tittle.slice(0, 50)}...`
                  : item.tittle}
              </h3>
              <div className="mt-1 sm:mt-4 flex text-[10px] sm:text-sm text-[#868686]">
                By Author Name - {"Reparv"}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div
        onClick={() => router.push(`/blogs`)}
        className="max-w-[300px] flex gap-2 items-center justify-center mx-auto px-6 py-2 text-sm sm:text-base text-white font-semibold bg-[#5E23DC] rounded-lg hover:scale-102 active:scale-99 cursor-pointer"
      >
        Read More Articles{" "}
        <TbArrowRightDashed className="sm:w-5 sm:h-5"></TbArrowRightDashed>
      </div>
    </section>
  );
}

export default NewsSection;
