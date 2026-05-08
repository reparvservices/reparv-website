import { useRouter } from "next/navigation";
import React from "react";
import { TiLocationOutline } from "react-icons/ti";
import { PiUserCircleFill } from "react-icons/pi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useEffect } from "react";
import propertyPicture from "../../assets/property/propertyPicture.svg";
import populerTag from "../../assets/property/populerTag.svg";
import FormatPrice from "../FormatPrice";
import { useAuth } from "../../store/auth";
import { FaFire } from "react-icons/fa6";
import PropertyCard from "./PropertyCard";

function SimilarProperties({
  propertyCity,
  propertyCategory,
  propertyPrice,
  propertyId,
}) {
  const router = useRouter();
  const { URI } = useAuth();
  const [properties, setProperties] = useState([]);

  let minBudget;
  let maxBudget;
  // Finding Budget From PropertyPrice
  if (["RentalFlat", "RentalShop", "RentalOffice"].includes(propertyCategory)) {
    minBudget = parseInt(propertyPrice) - 10000;
    maxBudget = parseInt(propertyPrice) + 10000;
  } else {
    minBudget = parseInt(propertyPrice) - 1000000;
    maxBudget = parseInt(propertyPrice) + 1000000;
  }

  const fetchData = async () => {
    try {
      let url = `${URI}/frontend/properties?`;
      const params = [];

      if (propertyCity && propertyCity.trim() !== "") {
        params.push(`city=${encodeURIComponent(propertyCity)}`);
      }

      if (propertyCategory && propertyCategory.trim() !== "") {
        params.push(`propertyCategory=${encodeURIComponent(propertyCategory)}`);
      }

      // Add minBudget and maxBudget to query params
      if (minBudget !== undefined && maxBudget !== undefined) {
        params.push(`minBudget=${minBudget}`);
        params.push(`maxBudget=${maxBudget}`);
      }

      url += params.join("&");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();

      // Filter out the current property by seoSlug
      const filtered = data.filter((p) => p.seoSlug !== propertyId);
      //console.log("Category :", filtered);
      setProperties(filtered);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [propertyCategory]);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 py-10">
      {/* Heading */}
      <div className="flex items-center justify-center gap-6 pb-4">
        <div className="flex-1 h-[3px] bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
        <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          <span>Similar Properties</span>
        </h2>
        <div className="flex-1 h-[3px] bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
      </div>

      {/* Horizontal Carousel */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide flex gap-4 px-1 snap-x snap-mandatory">
        {properties?.map((property) => (
          <div
            key={property.propertyid}
            className="min-w-[280px] snap-center"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      {/* Deskop Swiper */}
      <div className="hidden sm:block">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={2500}
          slidesPerView={4.2}
          centeredSlides
          loop
          spaceBetween={20}
          grabCursor
          className="property-swiper"
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 3.95 },
            1380: { slidesPerView: 4.1 },
          }}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.propertyid} className="my-15">
              <PropertyCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Scoped CSS */}
      <style>{`
            .property-swiper .swiper-slide {
              transform: scale(0.90);
              transition: transform 0.4s ease, opacity 0.4s ease;
            }
    
            .property-swiper .swiper-slide-active {
              transform: scale(1.1);
              z-index: 10;
            }
          `}</style>
    </section>
  );
}

export default SimilarProperties;
