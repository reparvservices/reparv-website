import Link from "next/link";
import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../store/auth";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";
import { getImageURI } from "../../utils/helper";

const PropertyImageGallery = ({ property }) => {
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

  // Helper to parse stringified image arrays
  const parseImages = (raw) => {
    if (!raw) return [];

    try {
      let parsed = raw;

      // If double-stringified
      if (
        typeof parsed === "string" &&
        parsed.startsWith("[") &&
        parsed.includes("\\")
      ) {
        parsed = JSON.parse(parsed); // Remove first layer
        if (typeof parsed === "string") parsed = JSON.parse(parsed);
      } else if (typeof parsed === "string") {
        parsed = JSON.parse(parsed); // If normal JSON string
      }

      return Array.isArray(parsed) ? parsed.map((img) => img.trim()) : [];
    } catch (err) {
      return raw.split(",").map((img) => img.trim()); // fallback
    }
  };

  const imagesByCategory = {};
  for (const key in imageCategories) {
    imagesByCategory[key] = parseImages(property[key]);
  }

  const activeImages = imagesByCategory[activeCategory] || [];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeImages.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === activeImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  if (!activeImages.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No images available.
      </div>
    );
  }

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200, // adjust distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const getEmbedURL = (url) => {
    if (!url) return null;

    // Detect all YouTube formats including shorts
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);

    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return null;
  };

  const embedURL = getEmbedURL(property?.videoLink);

  const getYoutubePoster = (url) => {
    if (!url) return null;

    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );

    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  const videoPoster = getYoutubePoster(property?.videoLink);

  const addLike = async () => {
    if (!user?.id) {
      setShowLogin(true);
      return;
    }

    if (!property?.propertyid) return;

    try {
      const response = await fetch(`${URI}/user/activity/property-like`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ property_id: property.propertyid }),
      });

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

  return (
    <div className="w-full mx-auto bg-white rounded-xl">
      {/* Main image */}
      <div className="relative overflow-hidden">
        <a
          href={`https://www.reparv.in/property-info/${property?.seoSlug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${getImageURI(activeImages[currentIndex])}`}
            alt={
              property?.seoTittle
                ? property.seoTittle
                : `${property?.propertyName || "Property"} in ${
                    property?.city || ""
                  }`
            }
            loading="lazy"
            className="w-full h-[250px] sm:h-[390px] lg:h-[450px] xl:h-[500px] rounded-tl-xl rounded-tr-xl object-contain bg-[#00000020]"
          />
        </a>
        {/* Like and Share Button */}
        <div className="absolute top-5 right-5 flex gap-4">
          <div
            onClick={() => {
              addLike(property.propertyid);
            }}
            className="w-[100px] h-[32px] sm:w-[120px] sm:h-[40px] text-[#8A38F5] bg-[white] border border-[#8A38F5] rounded-lg cursor-pointer relative overflow-hidden active:scale-95"
          >
            <div className="overflow-hidden relative z-10 w-full h-full flex gap-2 items-center justify-center ">
              <FaHeart className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-sm sm:text-base font-bold text-[black]">
                Like
              </span>{" "}
              <span className="absolute shine-layer"></span>
            </div>
          </div>
          <div
            onClick={() => {
              setShowSharePopup(true);
            }}
            className="w-[100px] h-[32px] sm:w-[120px] sm:h-[40px] text-[#8A38F5] bg-[white] border border-[#8A38F5] rounded-lg cursor-pointer relative overflow-hidden active:scale-95"
          >
            <div className="overflow-hidden relative z-10 w-full h-full flex gap-2 items-center justify-center ">
              <IoShareSocial className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-sm sm:text-base font-bold text-[black]">
                Share
              </span>{" "}
              <span className="absolute shine-layer"></span>
            </div>
          </div>
        </div>
        {/* Property Video */}
        <div
          className={`hidden ${
            property?.videoLink ? "lg:block" : "hidden"
          } absolute bottom-5 right-5 w-[280px] h-[160px]`}
        >
          {/* Play Video */}
          <div className="flex w-full items-center justify-center">
            {playVideo && embedURL ? (
              <div className="relative w-full h-full">
                <iframe
                  src={embedURL}
                  title="YouTube Video Player"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                  className="w-full h-full rounded-lg"
                />
              </div>
            ) : (
              <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
                <img
                  src={videoPoster || getImageURI(activeImages[currentIndex])}
                  alt={
                    property?.seoTittle
                      ? property.seoTittle
                      : `${property?.propertyName || "Property"} in ${
                          property?.city || ""
                        }`
                  }
                  loading="lazy"
                  className="w-full h-[160px] rounded-xl object-cover bg-[#00000020]"
                />

                {/* Gradient Overlay */}
                <div className="w-full h-full flex gap-4 flex-col absolute rounded-xl inset-0 bg-gradient-to-b from-transparent to-[#5E23DCC2]">
                  <div className="w-full h-full flex gap-4 flex-col items-center justify-end text-white">
                    <FaRegCirclePlay
                      onClick={() => {
                        if (!embedURL) return; // block invalid first click
                        setPlayVideo(true);
                      }}
                      className="w-10 h-10 cursor-pointer"
                    />
                    <span className="text-base font-semibold mb-6">
                      Property Video
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handlePrev}
          className={`${
            activeImages?.length > 1 ? "block" : "hidden"
          } cursor-pointer absolute top-1/2 left-5 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white`}
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={handleNext}
          className={`${
            activeImages?.length > 1 ? "block" : "hidden"
          } cursor-pointer absolute top-1/2 right-5 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white`}
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="w-full bg-white flex flex-nowrap overflow-x-auto overflow-y-hidden scrollbar-hide gap-3 p-4 sm:p-6 rounded-lg"
        >
          {Object.entries(imageCategories).map(([key, label]) => {
            const firstImage = imagesByCategory[key]?.[0];
            if (!firstImage) return null;

            return (
              <div
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`flex-shrink-0 w-[100px] h-[65px] lg:w-[125px] lg:h-[80px] cursor-pointer border-2 rounded-lg overflow-hidden relative group ${
                  activeCategory === key
                    ? "border-[#8A38F5]"
                    : "border-gray-200"
                }`}
              >
                {/* Image */}
                <img
                  src={`${getImageURI(firstImage)}`}
                  alt={label}
                  className="w-[100px] h-[65px] lg:w-[125px] lg:h-[80px] object-cover transition-transform duration-200 group-hover:scale-105"
                />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[12px] font-semibold p-[2px] text-center">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={scrollLeft}
          className={`cursor-pointer absolute border top-1/2 left-2 text-[#8A38F5] transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-[#8A38F5] hover:text-white hover:border-0 active:scale-95`}
        >
          <FiChevronLeft />
        </button>

        <button
          onClick={scrollRight}
          className={`cursor-pointer absolute border top-1/2 right-2 text-[#8A38F5] transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-[#8A38F5] hover:text-white hover:border-0 active:scale-95`}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PropertyImageGallery;
