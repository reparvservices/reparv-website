"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  PlayCircle,
} from "lucide-react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useAuth } from "@/store/auth";
import { getImageURI } from "@/utils/helper";

export default function PropertyImageGallery({ property }) {
  const router = useRouter();
  const scrollRef = useRef(null);

  const { URI, user, setShowLogin, setShowSharePopup, setShowAlert } =
    useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("frontView");
  const [playVideo, setPlayVideo] = useState(false);

  const imageCategories = {
    frontView: "Front View",
    sideView: "Side View",
    hallView: "Hall",
    kitchenView: "Kitchen",
    bathroomView: "Bathroom",
    bedroomView: "Bedroom",
    balconyView: "Balcony",
    nearestLandmark: "Landmark",
    developedAmenities: "Amenities",
  };

  // ── Parse Images ─────────────────────────────────────
  const parseImages = (raw) => {
    if (!raw) return [];

    try {
      let parsed = raw;

      if (
        typeof parsed === "string" &&
        parsed.startsWith("[") &&
        parsed.includes("\\")
      ) {
        parsed = JSON.parse(parsed);

        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
      } else if (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      return Array.isArray(parsed)
        ? parsed.map((img) => img.trim())
        : [];
    } catch (err) {
      return raw.split(",").map((img) => img.trim());
    }
  };

  // ── Images by Category ──────────────────────────────
  const imagesByCategory = {};

  for (const key in imageCategories) {
    imagesByCategory[key] = parseImages(property?.[key]);
  }

  const activeImages = imagesByCategory[activeCategory] || [];

  // ── Image Navigation ────────────────────────────────
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === activeImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  // ── Thumbnail Scroll ────────────────────────────────
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  // ── Youtube Helpers ─────────────────────────────────
  const getEmbedURL = (url) => {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);

    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return null;
  };

  const getYoutubePoster = (url) => {
    if (!url) return null;

    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  const embedURL = getEmbedURL(property?.videoLink);

  const videoPoster = getYoutubePoster(property?.videoLink);

  // ── Like Property ───────────────────────────────────
  const addLike = async () => {
    if (!user?.id) {
      setShowLogin(true);
      return;
    }

    if (!property?.propertyid) return;

    try {
      const response = await fetch(
        `${URI}/user/activity/property-like`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property_id: property.propertyid,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Like failed");
      }

      setShowAlert((prev) => ({
        ...prev,
        show: true,
        type: "success",
        message: data?.message || "Liked successfully",
      }));

      return data;
    } catch (error) {
      setShowAlert((prev) => ({
        ...prev,
        show: true,
        type: "error",
        message: error?.message || "Something went wrong",
      }));

      console.error("Property like error:", error);

      return null;
    }
  };

  // ── Empty State ─────────────────────────────────────
  if (!activeImages.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        No images available.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto space-y-5 rounded-xl">
      {/* Main Image */}
      <div className="relative overflow-hidden">
        <a
          href={`https://www.reparv.in/property-info/${property?.seoSlug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={getImageURI(activeImages[currentIndex])}
            alt={
              property?.seoTittle
                ? property.seoTittle
                : `${property?.propertyName || "Property"} in ${
                    property?.city || ""
                  }`
            }
            loading="lazy"
            className="w-full h-[250px] sm:h-[390px] lg:h-[450px] xl:h-[500px] rounded-2xl object-contain bg-[#00000020]"
          />
        </a>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:border-[#8A38F5] hover:text-[#8A38F5] transition-all active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Like + Share */}
        <div className="absolute top-5 right-5 flex gap-3">
          {/* Like */}
          <button
            onClick={addLike}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:border-[#8A38F5] hover:text-[#8A38F5] transition-all active:scale-95"
          >
            <Heart size={17} />
          </button>

          {/* Share */}
          <button
            onClick={() => setShowSharePopup(true)}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:border-[#8A38F5] hover:text-[#8A38F5] transition-all active:scale-95"
          >
            <Share2 size={17} />
          </button>
        </div>

        {/* Property Video */}
        <div
          className={`absolute bottom-5 right-5 w-[280px] h-[160px] ${
            property?.videoLink ? "hidden lg:block" : "hidden"
          }`}
        >
          {playVideo && embedURL ? (
            <iframe
              src={embedURL}
              title="YouTube Video Player"
              allowFullScreen
              allow="autoplay; encrypted-media"
              className="w-full h-full rounded-xl"
            />
          ) : (
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src={
                  videoPoster ||
                  getImageURI(activeImages[currentIndex])
                }
                alt="Property Video"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5E23DCC2] flex flex-col items-center justify-end gap-4 text-white">
                <PlayCircle
                  size={46}
                  strokeWidth={1.7}
                  onClick={() => {
                    if (!embedURL) return;

                    setPlayVideo(true);
                  }}
                  className="cursor-pointer"
                />

                <span className="mb-6 text-base font-semibold">
                  Property Video
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Previous */}
        <button
          onClick={handlePrev}
          className={`absolute top-1/2 left-5 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-all ${
            activeImages?.length > 1 ? "block" : "hidden"
          }`}
        >
          <FaArrowLeft size={14} />
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          className={`absolute top-1/2 right-5 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-all ${
            activeImages?.length > 1 ? "block" : "hidden"
          }`}
        >
          <FaArrowRight size={14} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide bg-white p-4 rounded-xl"
        >
          {Object.entries(imageCategories).map(([key, label]) => {
            const firstImage = imagesByCategory[key]?.[0];

            if (!firstImage) return null;

            return (
              <div
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`relative flex-shrink-0 overflow-hidden border-2 rounded-xl cursor-pointer group w-[100px] h-[65px] lg:w-[125px] lg:h-[80px] transition-all ${
                  activeCategory === key
                    ? "border-[#8A38F5]"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={getImageURI(firstImage)}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/55 text-white text-[11px] lg:text-[12px] font-medium text-center py-1">
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Left */}
        <button
          onClick={scrollLeft}
          className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow hover:bg-[#8A38F5] hover:text-white hover:border-[#8A38F5] transition-all active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Scroll Right */}
        <button
          onClick={scrollRight}
          className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow hover:bg-[#8A38F5] hover:text-white hover:border-[#8A38F5] transition-all active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}