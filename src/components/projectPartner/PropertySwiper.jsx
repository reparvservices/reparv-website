import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  FreeMode,
  Mousewheel,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { usePropertyFilter } from "../../store/propertyFilter";
import FormatPrice from "../FormatPrice";
import { getImageURI } from "../../utils/helper";

export default function PropertySwiper({ projectPartner }) {
  const router = useRouter();
  const { URI, selectedCity, setEnquirySource } = useAuth();
  const { selectedType } = usePropertyFilter();

  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/project-partner/premium-properties`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyCategory: selectedType,
            projectPartnerId: projectPartner?.id,
            selectedCity: selectedCity,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching:", err);
      setProperties([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity, projectPartner, selectedType]);

  return (
    <div
      className={`${
        properties?.length > 0 ? "block" : "hidden"
      } w-full md:max-w-[1050px] mx-auto px-4 p-4`}
    >
      <div className="mb-6">
        <h2 className="text-[18px] sm:text-[24px] md:text-[28px] font-semibold text-[#43435D] mb-1">
          Prominent propertys to explore
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Best propertys to look out for
        </p>
      </div>

      <div className="relative">
        {/* Prev / Next buttons (visible md and up) */}
        <button
          className="swiper-button-prev-custom  cursor-pointer hidden md:flex absolute left-[20px] top-1/2 -translate-y-1/2 z-30 bg-white shadow rounded-full p-4 items-center justify-center"
          aria-label="previous"
        >
          <FaArrowLeft size={20} />
        </button>

        <button
          className="swiper-button-next-custom cursor-pointer hidden md:flex absolute right-[20px] top-1/2 -translate-y-1/2 z-30 bg-white shadow rounded-full p-4 items-center justify-center"
          aria-label="next"
        >
          <FaArrowRight size={20} />
        </button>

        <Swiper
          modules={[Navigation, Pagination, FreeMode, Mousewheel, Autoplay]}
          slidesPerView={1.02}
          spaceBetween={16}
          centeredSlides={true}
          freeMode={false}
          mousewheel={{ forceToAxis: true }}
          grabCursor={true}
          autoplay={{
            delay: 3000, // auto slide every 3 seconds
            disableOnInteraction: false, // keep autoplay after user swipes
            pauseOnMouseEnter: true, // pause when user hovers
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            el: ".swiper-pagination-custom",
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
              centeredSlides: true,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 28,
            },
          }}
          className="w-full"
        >
          {properties?.map((property) => (
            <SwiperSlide key={property.propertyid} className="py-2">
              <article
                onClick={() => {
                  setEnquirySource("Landing Page");
                  router.push(`/property-info/${property.seoSlug} `);
                }}
                className="bg-white rounded-xl shadow-sm border border-[#E6E6E6] overflow-hidden flex flex-col h-full"
              >
                {/* Image */}
                <div
                  onClick={() => {
                    setEnquirySource("Landing Page");
                    router.push(`/property-info/${property.seoSlug} `);
                  }}
                  className="w-full h-[220px] sm:h-[260px] md:h-[260px] lg:h-[300px] cursor-pointer"
                >
                  <img
                    src={(() => {
                      try {
                        const images = JSON.parse(property.frontView || "[]");
                        return images.length > 0
                          ? `${getImageURI(images[0])}`
                          : `/assets/property/propertyPicture.svg`;
                      } catch {
                        return `/assets/property/propertyPicture.svg`;
                      }
                    })()}
                    alt={property.propertyName}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#222]">
                        {property.propertyName}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        by {property.projectBy}
                      </p>
                    </div>

                    <div className="text-right ml-4">
                      <p className="font-semibold text-[13px] sm:text-[14px]">
                        <FormatPrice
                          price={parseFloat(property.totalOfferPrice / 100000)}
                        ></FormatPrice>
                        {" Lac - "}
                        <FormatPrice
                          price={parseFloat(property.totalSalesPrice / 100000)}
                        ></FormatPrice>{" "}
                        {"Lac"}
                      </p>
                      <p className="text-gray-400 text-[10px] sm:text-xs">
                        Price
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="text-[12px] sm:text-[13px] text-black font-semibold">
                      {property.propertyType?.map((type, index) => (
                        <span className="mr-2" key={index}>
                          {type.length > 18 ? `${type.slice(0, 17)}...` : type}
                          {index < property.propertyType.length - 1 && ""}
                        </span>
                      ))}
                    </div>

                    <p className="text-[11px] sm:text-[12px] text-[#9E9E9E] mt-1">
                      {property.address}
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* pagination dots */}
        <div className="swiper-pagination-custom mt-4 flex items-center justify-center gap-2"></div>
      </div>
    </div>
  );
}
