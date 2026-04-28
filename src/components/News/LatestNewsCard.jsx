import React from "react";
import { Link } from "react-router-dom";

export default function LatestNewsCard({
  image,
  category = "Market Trends",
  title,
  description,
  author = "Reparv",
  time = "4 hours ago",
  readTime = "3 min read",
  seoSlug,
}) {
  return (
    <>
      {/* MOBILE CARD (NEW)  */}
      <Link
        to={`/news/${seoSlug}`}
        className="
          md:hidden
          w-full
          bg-white
          rounded-[20px]
          shadow-[0px_8px_32px_rgba(0,0,0,0.12)]
          flex
          items-center
          gap-4
          py-1
        px-2
        "
      >
        <img
          src={image}
          alt="Bengaluru skyline"
          className="w-[96px] h-[96px] rounded-[14px] object-cover flex-shrink-0"
        />

        <div className="flex flex-col gap-2">
          <span className="inline-block w-fit text-xs font-poppins font-semibold  bg-purple-100 text-purple-600 px-3 py-1  rounded-full">
            {category}
          </span>

          <h3 className="text-[16px] font-semibold leading-snug text-gray-900 line-clamp-2">
            {title}
          </h3>

          <span className="text-xs text-gray-500">
            {time} · {readTime || "5 min read"}
          </span>
        </div>
      </Link>

      {/* DESKTOP CARD */}
      <div
        className="
          hidden
          md:grid
          md:grid-cols-3
          w-full
          max-w-6xl
          bg-white
          rounded-[16px]
          shadow-[0px_4px_31px_rgba(0,0,0,0.1)]
          flex-col
          sm:flex-row
          overflow-hidden
        "
      >
        {/* IMAGE */}
        <Link to={`/news/${seoSlug}`}>
          <img
            src={image}
            alt="news image"
            loading="lazy"
            className="
            h-full
            object-contain
            sm:rounded-l-[16px]
          "
          />
        </Link>
        {/* CONTENT */}
        <div className="md:col-span-2 flex flex-col justify-between p-5 flex-1">
          <div>
            <span className="inline-block font-poppins font-semibold text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full mb-3">
              {category}
            </span>

            <h3
              className="
                font-segoe
                font-bold
                text-[20px]
                sm:text-[24px]
              "
            >
              {title}
            </h3>

            <p
              className="
                font-segoe
                font-normal
                text-[14px]
                sm:text-[16px]
                text-[#000000]
                mt-3
                max-w-[520px]

              "
            >
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-400">
              {time} · {readTime || "5 min read"}
            </span>

            <Link
              to={`/news/${seoSlug}`}
              className="text-purple-600 text-sm font-medium"
            >
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
