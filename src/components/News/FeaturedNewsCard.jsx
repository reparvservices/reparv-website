import Link from "next/link";
import React from "react";
const FeaturedNewsCard = ({
  image,
  category = "Market Trends",
  title,
  description,
  author = "Reparv",
  time = "4 hours ago",
  readTime = "3 min read",
  seoSlug
}) => {
  return (
    <div
      className="
        w-full
        bg-white
        rounded-[16px]
        shadow-[0px_4px_31px_rgba(0,0,0,0.10)]
        overflow-hidden
        transition-transform duration-300
        hover:scale-[1.01]
      "
    >
      {/* IMAGE */}
      <div
        className="
    w-full
    overflow-hidden
    rounded-tl-[16px]
    rounded-tr-[16px]
  "
      >
        <Link href={`/news/${seoSlug}`}><img src={image} alt={title} loading="lazy" className="w-full object-cover" /></Link>
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        {/* CATEGORY */}
        <span
          className="
    inline-flex items-center justify-center
    h-[29px]
    px-4
    rounded-[22px]
    bg-[#8A38F5]/10
    text-[#8A38F5]
    text-sm
    font-semibold
    whitespace-nowrap
    w-fit
    font-segoe
  "
          
        >
          {category}
        </span>

        {/* TITLE */}
        <h2
          className="text-[22px] sm:text-[36px] font-bold text-gray-900"
        >
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p
          className="text-sm sm:text-[15px] text-[#000000]"
        >
          {description}
        </p>

        {/* META */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold text-purple-700">
              {author.charAt(0)}
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-800">{author}</p>
              <p className="text-xs">
                {time} • {readTime}
              </p>
            </div>
          </div>

          <Link
            href={`/news/${seoSlug}`}
            className="text-purple-600 font-semibold text-sm hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNewsCard;
