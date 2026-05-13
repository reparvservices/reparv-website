import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { FiChevronRight } from "react-icons/fi";
import FormatPrice from "../FormatPrice";
import { getImageURI } from "../../utils/helper";
import { motion, AnimatePresence } from "framer-motion";

const TopPicksSlider = () => {
  const router = useRouter();
  const { URI, selectedCity } = useAuth();

  const [properties, setProperties] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const item = properties[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    initial: {
      opacity: 0,
      x: 60,
      scale: 1.04,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      x: -60,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  useEffect(() => {
    if (!properties.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === properties.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [properties, isPaused]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${URI}/frontend/all-properties/top-picks/${selectedCity}`,
          { credentials: "include" }
        );
        const data = await res.json();
        setProperties(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [selectedCity]);

  if (!item) return null;

  return (
    <section className="max-w-[1380px] mx-auto px-4 py-14">
      {/* Outer Container */}
      <div
        style={{
          background: "linear-gradient(153deg, #F1E6FF 15%, #F8F3FF 85%)",
        }}
        className="rounded-[25px] sm:rounded-[40px] border border-[#C8C8C8] shadow-xl lg:p-6"
      >
        {/* Heading */}
        <div className="flex items-center justify-center gap-6 lg:mb-5 p-6 lg:p-0">
          <div className="w-full flex-1 h-[3px] rounded-tl-md rounded-bl-md bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF] " />
          <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide">
            New Launch <span className="text-[#8A38F5]">Showcase</span>
          </h2>
          <div className="w-full flex-1 h-[3px] rounded-tl-md rounded-bl-md bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF] " />
        </div>

        {/* Content */}
        <div
          style={{
            background: "linear-gradient(153deg, #F1E6FF 15%, #F8F3FF 85%)",
          }}
          className="rounded-[32px] sm:p-6 grid grid-cols-5 lg:grid-cols-7 gap-6 lg:gap-4"
        >
          {/* LEFT INFO */}
          <div className="col-span-5 lg:col-span-2 flex flex-col justify-between px-6 sm:px-0">
            <div>
              <div className="flex gap-4 lg:flex-col">
                <div className="w-[120px] overflow-hidden">
                  <img
                    src={"/assets/home/buildingimage.svg"}
                    alt="building"
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
                  <p className="text-[#8A38F5] font-bold">Most Popular</p>
                  New Projects in <br /> {selectedCity}
                </h3>
              </div>
              {/* Company */}
              <div className="flex items-center gap-4 mt-8">
                <div className="w-20 h-20 lg:w-16 lg:h-16 bg-white p-[4px] rounded-xl flex items-center justify-center text-gray-400 font-bold shadow overflow-hidden">
                  <img
                    src={getImageURI(item?.businessLogo) || "/assets/reparvIcon.png"}
                    alt="Logo"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-base lg:text-xl font-bold">
                    {item.projectBy || "Reparv"}
                  </p>
                  <button
                    onClick={() => router.push(`/property-info/${item?.seoSlug}`)}
                    className="hidden lg:block text-[#8A38F5] underline text-sm font-bold"
                  >
                    View Project
                  </button>
                  {/* CTA */}
                  <button
                    onClick={() => router.push(`/property-info/${item?.seoSlug}`)}
                    className="block lg:hidden w-[200px] bg-[#8A38F5] text-white px-6 py-[10px] rounded-lg
                           font-bold active:scale-[0.98] transition"
                  >
                    View Project →
                  </button>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => router.push(`/property-info/${item?.seoSlug}`)}
                className="hidden lg:block w-[200px] mt-10 bg-[#8A38F5] text-white px-8 py-4 rounded-xl
                           font-bold active:scale-[0.98] transition"
              >
                View Project →
              </button>
            </div>
          </div>

          {/* IMAGE CARD */}
          <div
            className="relative col-span-5 group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Depth Layer 2 (farthest) */}
            <div
              className="hidden lg:block absolute top-0 right-[-22px] w-full h-full
               bg-[#1A003D]/20 rounded-[28px]"
            />

            {/* Depth Layer 1 */}
            <div
              className="hidden lg:block absolute top-0 right-[-11px] w-full h-full
               bg-[#1A003D]/30 rounded-[28px]"
            />

            {/* Main Card */}
            <div
              onClick={() => {
                router.push(`/property-info/${item?.seoSlug}`);
              }}
              className="relative z-10 border-t border-t-[#C8C8C8] rounded-[28px] overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={item?.topPicksBanner || "/assets/home/PropertyPicture.png"}
                  alt={item.propertyName}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full lg:h-[450px]
               object-cover rounded-[28px]"
                />
              </AnimatePresence>

              {/* Overlay */}
              <div
                className="absolute inset-0 z-20 rounded-[28px] p-8
                 hidden flex-col justify-end text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(241, 230, 255, 0) 0%, rgba(26, 0, 61, 0.4) 100%)",
                }}
              >
                <h3 className="text-xl sm:text-2xl font-bold">
                  {item.propertyName}
                </h3>
                <p className="text-xs sm:text-sm opacity-90">{item.address}</p>

                <p className="mt-3 font-semibold">
                  <FormatPrice price={item.totalOfferPrice / 100000} /> Lac
                  {" - "}
                  <FormatPrice price={item.totalSalesPrice / 100000} /> Lac
                </p>

                <p className="text-xs sm:text-sm mt-1 opacity-90">
                  {item.propertyType?.join(", ")}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-[20px] lg:right-[-30px] top-1/2 -translate-y-1/2
               w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white border-[#8A38F5] rounded-full shadow-xl
               flex items-center justify-center z-30
               active:scale-95"
            >
              <FiChevronRight size={28} className="text-[#8A38F5] font-bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPicksSlider;
