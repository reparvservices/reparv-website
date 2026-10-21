import { useRouter } from "next/navigation";
import ViewAllButton from "./ViewAllButton";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { FiChevronRight } from "react-icons/fi";
import FormatPrice from "../FormatPrice";
import { getImageURI } from "../../utils/helper";
import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_PROPERTY_IMAGE = "/assets/property/propertyPicture.svg";

const getTopPickImage = (property) => {
  if (property?.topPicksBanner) {
    return getImageURI(property.topPicksBanner) || FALLBACK_PROPERTY_IMAGE;
  }

  try {
    const images = JSON.parse(property?.frontView || "[]");
    if (images.length > 0) {
      return getImageURI(images[0]) || FALLBACK_PROPERTY_IMAGE;
    }
  } catch {
    // ignore malformed frontView JSON
  }

  return FALLBACK_PROPERTY_IMAGE;
};

const TopPicksSlider = ({ initialProperties = null }) => {
  const router = useRouter();
  const {
    URI,
    selectedCity,
    setPropertyId,
    setPropertyCategory,
    setPropertyImage,
    setEnquirySource,
    setShowSiteVisitPopup,
  } = useAuth();

  const [properties, setProperties] = useState(initialProperties ?? []);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const item = properties[currentIndex];

  const openSiteVisit = () => {
    setPropertyId(item?.propertyid);
    setPropertyCategory(item?.propertyCategory);
    setPropertyImage(getTopPickImage(item));
    setEnquirySource("Onsite");
    setShowSiteVisitPopup(true);
  };

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
    if (initialProperties !== null) return;
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
  }, [selectedCity, initialProperties, URI]);

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
                    src="/assets/seopageassets/turstedbuilder/building.svg"
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

            {/* Main Card — new launch advertisement */}
            <div
              onClick={() => {
                router.push(`/property-info/${item?.seoSlug}`);
              }}
              className="cursor-pointer relative z-10 h-[420px] sm:h-[440px] lg:h-[450px] border-t border-t-[#C8C8C8] rounded-[28px] overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={getTopPickImage(item)}
                  alt={item.propertyName}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
                  }}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-full object-cover rounded-[28px] transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </AnimatePresence>

              {/* Ad badges */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wide text-[#5E23DC] shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A38F5]" />
                  FEATURED AD
                </span>
                <span className="relative inline-flex items-center rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF2E63] px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-sm font-extrabold tracking-wider text-white shadow-lg">
                  <span className="absolute inset-0 rounded-full bg-[#FF2E63] animate-ping opacity-30" />
                  <span className="relative">🚀 NEW LAUNCH</span>
                </span>
              </div>

              {/* Ad overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`ad-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
                  exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                  className="absolute inset-x-0 bottom-0 z-20 rounded-b-[28px] p-4 sm:p-6 lg:p-8 pt-24 sm:pt-28 text-white"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(26, 0, 61, 0) 0%, rgba(26, 0, 61, 0.75) 45%, rgba(26, 0, 61, 0.95) 100%)",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    {item.propertyType?.slice(0, 3).map((type) => (
                      <span
                        key={type}
                        className="rounded-md bg-white/15 border border-white/25 px-2 py-0.5 text-[11px] sm:text-xs font-semibold"
                      >
                        {type}
                      </span>
                    ))}
                    {item.reraRegistered?.trim() ? (
                      <span className="rounded-md bg-[#00C16A]/90 px-2 py-0.5 text-[11px] sm:text-xs font-semibold">
                        ✓ RERA Registered
                      </span>
                    ) : null}
                    {item.propertyApprovedBy?.trim() ? (
                      <span className="rounded-md bg-white/15 border border-white/25 px-2 py-0.5 text-[11px] sm:text-xs font-semibold">
                        {item.propertyApprovedBy.trim()} Approved
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                    {item.propertyName}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 line-clamp-1">
                    📍 {[item.location, item.city].filter(Boolean).join(", ") || item.address}
                  </p>

                  <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    {Number(item.totalOfferPrice) > 0 ? (
                      <div>
                        <p className="text-[11px] sm:text-xs uppercase tracking-wider opacity-75">
                          Launch Price Starting
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-extrabold">
                            ₹<FormatPrice price={item.totalOfferPrice / 100000} /> L*
                          </span>
                          {Number(item.totalSalesPrice) > Number(item.totalOfferPrice) ? (
                            <span className="text-sm line-through opacity-60">
                              ₹<FormatPrice price={item.totalSalesPrice / 100000} /> L
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <p className="text-lg font-bold">Price on Request</p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openSiteVisit();
                        }}
                        className="flex-1 sm:flex-none rounded-xl bg-white text-[#5E23DC] px-4 sm:px-5 py-2.5 text-sm font-bold shadow active:scale-[0.98] transition hover:bg-[#FAF8FF]"
                      >
                        Book Site Visit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/property-info/${item?.seoSlug}`);
                        }}
                        className="flex-1 sm:flex-none rounded-xl bg-[#8A38F5] border border-white/30 text-white px-4 sm:px-5 py-2.5 text-sm font-bold shadow active:scale-[0.98] transition hover:bg-[#7a2ee0]"
                      >
                        Explore →
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide indicators */}
            {properties.length > 1 ? (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                {properties.map((p, i) => (
                  <button
                    key={p.propertyid ?? i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Show ad ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentIndex ? "w-6 bg-[#8A38F5]" : "w-1.5 bg-[#8A38F5]/30"
                    }`}
                  />
                ))}
              </div>
            ) : null}

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

      {properties?.length > 0 ? (
        <ViewAllButton
          href="/properties/type/new"
          label={`View All New Launches${selectedCity ? ` in ${selectedCity}` : ""}`}
          className="sm:mt-8 pb-4"
        />
      ) : null}
    </section>
  );
};

export default TopPicksSlider;
