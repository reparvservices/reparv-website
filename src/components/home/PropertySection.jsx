import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useAuth } from "../../store/auth";
import PropertyCard from "../property/PropertyCard";
import { motion } from "framer-motion";

const PropertySection = () => {
  const router = useRouter();
  const { URI, selectedCity } = useAuth();
  const [properties, setProperties] = useState([]);

  const mobileCard = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // fetch Properties
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/all-properties/${selectedCity}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();

      const rentalProperties = data.filter((item) =>
        item.propertyCategory?.startsWith("Rental"),
      );

      setProperties(rentalProperties);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity]);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 lg:py-10">
      {/* Heading */}
      <div className="flex items-center justify-center gap-6 pb-4">
        <div className="flex-1 h-[3px] bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
        <h1 className="text-lg text-center sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          Verified <span className="text-[#8A38F5]">Rental</span> Properties in <span className="hidden sm:block">{" "}{selectedCity}</span><p className="block sm:hidden">{" "}
          {selectedCity}
          </p>
        </h1>
        <div className="flex-1 h-[3px] bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide flex gap-4 px-1 snap-x snap-mandatory">
        {properties.map((property) => (
          <motion.div
            key={property.propertyid}
            variants={mobileCard}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="min-w-[280px] snap-center"
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>

      {/* Deskop Swiper */}
      <div className="hidden sm:block">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={2500}
          slidesPerView={4.4}
          centeredSlides
          loop
          spaceBetween={20}
          grabCursor
          className="property-swiper"
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
            1380: { slidesPerView: 4.3 },
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
};

export default PropertySection;
