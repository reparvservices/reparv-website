import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PropertyCard from "../../property/PropertyCard";
import { useAuth } from "../../../store/auth";

export default function BudgetProperty({ data, loanAmount }) {
  const { URI, selectedCity } = useAuth();
  const [properties, setProperties] = useState([]);

  const budget = useMemo(() => {
    if (!loanAmount || isNaN(Number(loanAmount))) return null;

    const LTV = 0.8;
    const maxPrice = Number(loanAmount) / LTV;

    return {
      minBudget: Math.floor(maxPrice * 0.85),
      maxBudget: Math.floor(maxPrice),
    };
  }, [loanAmount]);

  useEffect(() => {
    if (!budget || !selectedCity) return;

    const fetchBudgetProperties = async () => {
      try {
        const url = `${URI}/frontend/all-properties/budget/${encodeURIComponent(
          selectedCity
        )}?minBudget=${budget.minBudget}&maxBudget=${budget.maxBudget}`;

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch budget properties");
        }

        const result = await res.json();
        setProperties(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Budget property fetch error:", err);
      }
    };

    fetchBudgetProperties();
  }, [budget, selectedCity, URI]);

  if (!properties.length || !budget) return null;

  const emiValue = Number(data?.emi);

  return (
    <section className="bg-white pt-10 sm:pt-16">
      <div className="max-w-[1380px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#3D2A5D]">
            Properties You Can Afford Based on Your EMI
          </h2>

          <p className="text-xs sm:text-lg text-gray-500 mt-3">
            Based on your calculated monthly EMI of ₹
            {Number.isFinite(emiValue) ? emiValue.toLocaleString() : "--"}
          </p>

          <p className="hidden lg:block text-[10px] sm:text-xs text-gray-500 mt-2">
            Estimated budget range ₹
            {budget.minBudget.toLocaleString()} – ₹
            {budget.maxBudget.toLocaleString()}
          </p>
        </div>

        {/* Mobile Scroll */}
        <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {properties.map((property) => (
            <div
              key={property.propertyid}
              className="min-w-[280px] snap-center"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Desktop Swiper */}
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
            className="budget-swiper"
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 3.95 },
              1380: { slidesPerView: 4.1 },
            }}
          >
            {properties.map((property) => (
              <SwiperSlide key={property.propertyid} className="my-12">
                <PropertyCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Scoped Swiper Animation */}
        <style>{`
          .budget-swiper .swiper-slide {
            transform: scale(0.9);
            transition: transform 0.4s ease, opacity 0.4s ease;
          }

          .budget-swiper .swiper-slide-active {
            transform: scale(1.1);
            z-index: 10;
          }
        `}</style>
      </div>
    </section>
  );
}
