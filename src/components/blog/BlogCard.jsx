import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../store/auth";
import BlogImage from "../../assets/blog/BlogImage.webp";
import { getImageURI } from "../../utils/helper";

function BlogCard({ blogData }) {
  const navigate = useNavigate();
  if (!blogData) return null;

  const { URI } = useAuth();
  const {
    id,
    type,
    image,
    tittle,
    description,
    updated_at,
    readTime,
    seoSlug,
  } = blogData;

  return (
    <motion.article
      key={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, boxShadow: "0px 12px 28px rgba(0,0,0,0.12)" }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1], // premium easing curve
      }}
      className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <Link to={`/blog/${seoSlug}`}>
      <div
        
        className="max-h-[240px] w-full overflow-hidden bg-gray-50 cursor-pointer"
      >
        <motion.img
          src={image ? getImageURI(image) : BlogImage}
          alt={tittle}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = BlogImage;
          }}
        />
      </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs bg-[#d8ffe9] font-bold text-[#04972B]">
          {type}
        </span>

        <div className="flex items-center text-xs text-gray-500 gap-3">
          <span>{updated_at}</span>
          <span>•</span>
          <span>{readTime || "5 min"}</span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-[#3F2D62] leading-snug">
          {tittle.length > 71 ? `${tittle.slice(0, 70)}...` : tittle}
        </h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {description.length > 151
            ? `${description.slice(0, 150)}...`
            : description}
        </p>

        <div className="mt-4 flex items-center justify-end">
          <Link
            to={`/blog/${seoSlug}`}
            className="inline-flex text-xs items-center gap-2 bg-[#5323DC] text-white px-5 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Read More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default BlogCard;
