import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ReraNewsCard = ({
  image,
  category = "RERA Updates",
  title,
  time = "4 hours ago",
  readTime = "3 min read",
  seoSlug,
}) => {
  return (
    <div
      className="
    w-full
    bg-white
    rounded-[16px]
    shadow-[0px_4px_31px_rgba(0,0,0,0.10)]
    overflow-hidden
    transition-transform duration-300 hover:scale-[1.02]
    max-w-full
    sm:max-w-[431px]
  "
    >
      {/* IMAGE */}
      <Link to={`/news/${seoSlug}`} className="w-full overflow-hidden">
        <img src={image} alt={title} loading="lazy" className="w-full object-cover" />
      </Link>

      {/* CONTENT */}
      <div className="p-5 sm:p-4 flex flex-col gap-4">
        {/* CATEGORY */}
        <span
          className="
    inline-flex
    items-center
    justify-center
    text-purple-600
    text-sm
    font-semibold
    rounded-[22px]
    bg-purple-600/10
    w-[123px]
    sm:w-[133px]
    h-[29px]
    px-5
    truncate
    text-center
    whitespace-nowrap
    overflow-hidden
  "
          title={category}
        >
          {category}
        </span>

        {/* TITLE */}
        <h2 className="text-[24px] font-bold text-gray-900">
          {title}
        </h2>

        {/* META + CTA */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-500">
            {time} • {readTime}
          </p>

          <Link
            to={`/news/${seoSlug}`}
            className="flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
          >
            Read More
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReraNewsCard;
