import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import { getImageURI } from "../../utils/helper";

const reviews = [
  {
    id: 1,
    name: "User Name",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: 2,
    name: "User Name",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    id: 3,
    name: "User Name",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    id: 4,
    name: "User Name",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
];

const CustomerReviewSection = () => {
  const swiperRef = useRef(null);
  const { URI } = useAuth();
  const [reviews, setReviews] = useState([]);

  // **Fetch Data from API**
  const fetchReviews = async () => {
    try {
      const response = await fetch(URI + "/frontend/testimonial", {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch testimonials.");
      const data = await response.json();

      const excludedClients = [
        "reparv",
        "sales partner",
        "territory partner",
        "project partner",
        "onboarding partner",
      ];
      const reparvReviews = data.filter(
        (item) => !excludedClients.includes(item.client.toLowerCase())
      );
      setReviews(reparvReviews);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:py-10">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10 items-end lg:px-8">
        {/* Mobile Heading */}
        <div className="w-full flex lg:hidden items-center justify-center gap-4">
          <div className="flex-1 h-[2px] bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
          <h2 className="text-sm sm:text-xl font-bold text-center">
            See what <span className="text-[#8A38F5]"> Customers </span> are
            saying
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
        </div>

        {/* LEFT CONTENT (DESKTOP) */}
        <div className="hidden lg:flex w-[30%] flex-col gap-30 justify-end">
          <div>
            <h2 className="text-5xl font-bold leading-tight">
              See what <br /> customers are saying
            </h2>
            <div className="w-[70%] h-[3px] mt-6 rounded bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-20 h-20 rounded-full border border-[#8A38F5] text-[#8A38F5] flex items-center justify-center"
            >
              <FiChevronLeft size={26} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-20 h-20 rounded-full bg-[#8A38F5] text-white flex items-center justify-center"
            >
              <FiChevronRight size={26} />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="w-full lg:w-[70%]">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            loop
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 16 },
              480: { slidesPerView: 2.5, spaceBetween: 16},
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 2.1 },
              1280: { slidesPerView: 2.5 },
              1380: { slidesPerView: 2.7 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <Link to={review.url} target="_blank">
                  <div
                    to={review.url}
                    target="_blank"
                    className="
                    relative 
                    rounded-2xl lg:rounded-3xl 
                    overflow-hidden
                  "
                  >
                    <img
                      src={
                        review.clientimage
                          ? getImageURI(review.clientimage)
                          : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                      }
                      alt={review.client || "Client Image"}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20.4%,rgba(138,56,245,0.8)_80.76%)]" />
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="
                        w-10 h-10 sm:w-14 sm:h-14 lg:w-[70px] lg:h-[70px]
                        rounded-full 
                        bg-white 
                        flex items-center justify-center
                      "
                      >
                        <FaPlay className="text-xs sm:text-sm md:text-lg lg:text-xl ml-0.5 text-[#8A38F5]" />
                      </div>
                    </div>

                    {/* name */}
                    <div
                      className="
                      absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6
                      border-l-2 sm:border-l-4 border-white 
                      pl-2 sm:pl-3 
                      text-white 
                      text-xs sm:text-sm lg:text-xl 
                      font-semibold lg:font-bold
                    "
                    >
                      {review.client}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSection;
