import Link from "next/link";
import React from "react";
import { getImageURI } from "../../utils/helper";

function BlogCard({ blogData }) {
  if (!blogData) return null;

  const {
    type,
    image,
    tittle,
    description,
    updated_at,
    readTime,
    seoSlug,
  } = blogData;

  const imageSrc = image ? getImageURI(image) : "/assets/blog/BlogImage.webp";
  const title =
    tittle?.length > 100 ? `${tittle.slice(0, 99)}...` : tittle;
  const summary =
    description?.length > 200
      ? `${description.slice(0, 199)}...`
      : description;

  return (
    <>
      {/* Mobile */}
      <Link
        href={`/blog/${seoSlug}`}
        className="md:hidden w-full bg-white rounded-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.08)] flex items-center gap-4 p-4"
      >
        <div className="relative flex-shrink-0 w-[120px] h-[120px] rounded-[12px] bg-[#F3F0FF] flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={tittle}
            loading="lazy"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/blog/BlogImage.webp";
            }}
          />
          <span className="absolute bottom-1 left-1 bg-[#E53935] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            BLOG
          </span>
        </div>

        <div className="flex flex-col gap-1.5 min-w-0">
          <span className="inline-block w-fit text-xs font-semibold bg-purple-100 text-purple-600 px-2.5 py-0.5 rounded-full">
            {type || "All"}
          </span>
          <h3 className="text-[16px] font-semibold leading-snug text-[#1A1A2E] line-clamp-2">
            {title}
          </h3>
          <span className="text-xs text-gray-500">
            {updated_at} · {readTime || "5 min read"}
          </span>
        </div>
      </Link>

      {/* Desktop */}
      <article className="hidden md:grid md:grid-cols-[400px_1fr] w-full min-h-[280px] bg-white rounded-[16px] shadow-[0px_4px_31px_rgba(0,0,0,0.1)] overflow-hidden">
        <Link
          href={`/blog/${seoSlug}`}
          className="relative flex items-center justify-center bg-[#F3F0FF] min-h-[280px] p-3"
        >
          <img
            src={imageSrc}
            alt={tittle}
            loading="lazy"
            className="w-full h-full max-h-[260px] object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/blog/BlogImage.webp";
            }}
          />
          <span className="absolute bottom-3 left-3 bg-[#E53935] text-white text-[11px] font-bold px-2.5 py-1 rounded">
            BLOG
          </span>
          <img
            src="/assets/reparvLogo.svg"
            alt="Reparv"
            className="absolute top-3 right-3 w-8 h-8 rounded bg-white/90 p-0.5"
          />
        </Link>

        <div className="flex flex-col justify-between p-6 lg:p-7">
          <div>
            <span className="inline-block text-xs font-semibold bg-purple-100 text-purple-600 px-3 py-1 rounded-full mb-3">
              {type || "All"}
            </span>

            <h3 className="font-bold text-[22px] lg:text-[26px] text-[#1A1A2E] leading-snug">
              {title}
            </h3>

            <p className="mt-4 text-[15px] lg:text-[16px] text-gray-600 leading-relaxed line-clamp-3 max-w-[700px]">
              {summary}
            </p>
          </div>

          <div className="flex items-center justify-between mt-5 pt-2">
            <span className="text-sm text-gray-400">
              {updated_at} · {readTime || "5 min read"}
            </span>

            <Link
              href={`/blog/${seoSlug}`}
              className="text-[#7C3AED] text-sm font-semibold hover:text-[#5E23DC] transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default BlogCard;
