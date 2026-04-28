import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PropertyCard from "../../property/PropertyCard";
import { useAuth } from "../../../store/auth";

export default function RERAVerificationResult({ data, loanAmount }) {
  const { URI, selectedCity } = useAuth();
  const [properties, setProperties] = useState([]);

  const budget = useMemo(() => {
    if (!loanAmount) return null;

    const LTV = 0.8;
    const maxPrice = loanAmount / LTV;

    return {
      minBudget: Math.floor(maxPrice * 0.85),
      maxBudget: Math.floor(maxPrice),
    };
  }, [loanAmount]);

  useEffect(() => {
    if (!budget?.minBudget || !budget?.maxBudget || !selectedCity) return;

    const fetchBudgetProperties = async () => {
      try {
        const url = `${URI}/frontend/all-properties/budget/${encodeURIComponent(
          selectedCity,
        )}?minBudget=${budget?.minBudget}&maxBudget=${budget?.maxBudget}`;

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

        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.error("Budget property fetch error:", err);
      }
    };

    fetchBudgetProperties();
  }, [budget?.minBudget, budget?.maxBudget, selectedCity, URI]);

  if (!properties.length) return null;

  return (
    <section className="">
      <div className="max-w-full mx-auto">
        {/* Mobile Scroll */}
        <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4">
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
