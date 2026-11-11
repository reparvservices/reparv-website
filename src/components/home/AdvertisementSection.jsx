"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiPhone, FiExternalLink } from "react-icons/fi";
import { useAuth } from "../../store/auth";

// Real-estate related advertisements (furniture, interiors, home loans, ...)
// managed from Admin → Promotions → Advertisements.

const SSR_CITY = "Nagpur";

const trackClick = (URI, id) => {
  try {
    fetch(`${URI}/frontend/advertisements/click/${id}`, {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* tracking must never block the visitor */
  }
};

function AdCard({ ad, URI }) {
  const hasLink = Boolean(ad.targetUrl);
  const hasPhone = Boolean(ad.contactPhone);

  return (
    <article className="h-full flex flex-col bg-white rounded-2xl border border-[#E9E3FB] shadow-[0_4px_20px_rgba(94,35,220,0.08)] overflow-hidden">
      <a
        href={hasLink ? ad.targetUrl : `tel:${ad.contactPhone}`}
        target={hasLink ? "_blank" : undefined}
        rel={hasLink ? "sponsored noopener noreferrer" : undefined}
        onClick={() => trackClick(URI, ad.id)}
        className="relative block w-full aspect-[1200/630] overflow-hidden bg-[#F4F0FF]"
        aria-label={`${ad.title} by ${ad.advertiserName}`}
      >
        <img
          src={ad.imageUrl}
          alt={ad.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 text-[10px] font-semibold uppercase tracking-wide bg-black/60 text-white px-2 py-[2px] rounded">
          Sponsored
        </span>
      </a>

      <div className="flex flex-col flex-1 gap-2 p-4">
        <span className="self-start text-[11px] font-semibold text-[#5E23DC] bg-[#F1EBFF] px-2 py-[2px] rounded-full">
          {ad.category}
        </span>
        <h3 className="text-base sm:text-lg font-bold leading-snug line-clamp-2">
          {ad.title}
        </h3>
        <p className="text-xs text-gray-500 font-medium">{ad.advertiserName}</p>
        {ad.description ? (
          <p className="text-sm text-gray-600 line-clamp-2">{ad.description}</p>
        ) : null}

        <div className="mt-auto pt-2 flex gap-2">
          {hasLink ? (
            <a
              href={ad.targetUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => trackClick(URI, ad.id)}
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#5E23DC] hover:bg-[#4b1bb3] rounded-lg px-3 py-2 transition"
            >
              {ad.ctaLabel || "Know More"} <FiExternalLink />
            </a>
          ) : null}
          {hasPhone ? (
            <a
              href={`tel:${ad.contactPhone}`}
              onClick={() => trackClick(URI, ad.id)}
              className={`${hasLink ? "" : "flex-1"} inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#5E23DC] border border-[#5E23DC] hover:bg-[#F1EBFF] rounded-lg px-3 py-2 transition`}
              aria-label={`Call ${ad.advertiserName}`}
            >
              <FiPhone /> {hasLink ? "" : ad.ctaLabel || "Call Now"}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const AdvertisementSection = ({ initialAds = null }) => {
  const { URI, selectedCity } = useAuth();
  const [ads, setAds] = useState(initialAds ?? []);

  useEffect(() => {
    const city = selectedCity || SSR_CITY;
    // Server already rendered Nagpur's ads; only refetch for another city.
    if (initialAds !== null && city === SSR_CITY) {
      setAds(initialAds);
      return;
    }
    let cancelled = false;
    fetch(`${URI}/frontend/advertisements?city=${encodeURIComponent(city)}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled) setAds(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setAds([]);
      });
    return () => {
      cancelled = true;
    };
  }, [URI, selectedCity, initialAds]);

  if (!ads.length) return null;

  const useSlider = ads.length > 3;

  return (
    <section
      className="w-full max-w-[1440px] mx-auto px-4 py-6 lg:py-10"
      aria-label="Sponsored home services"
    >
      <div className="flex items-center justify-center gap-6 pb-2">
        <div className="flex-1 h-[3px] bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
        <h2 className="text-lg text-center sm:text-2xl md:text-4xl lg:text-5xl font-bold">
          Home <span className="text-[#8A38F5]">Essentials</span> &amp; Services
        </h2>
        <div className="flex-1 h-[3px] bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
      </div>
      <p className="text-center text-xs sm:text-sm text-gray-500 pb-6">
        Furniture, interiors, loans and more for your new home · Sponsored
      </p>

      {/* Mobile: horizontal scroll */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide flex gap-4 px-1 pb-2 snap-x snap-mandatory">
        {ads.map((ad) => (
          <div key={ad.id} className="min-w-[280px] max-w-[300px] snap-center">
            <AdCard ad={ad} URI={URI} />
          </div>
        ))}
      </div>

      {/* Tablet / desktop */}
      <div className="hidden sm:block">
        {useSlider ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{ 1024: { slidesPerView: 3 }, 1380: { slidesPerView: 4 } }}
            className="ads-swiper !pb-10"
          >
            {ads.map((ad) => (
              <SwiperSlide key={ad.id} className="!h-auto">
                <AdCard ad={ad} URI={URI} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className={`grid gap-5 ${
              ads.length === 1
                ? "grid-cols-1 max-w-[520px] mx-auto"
                : ads.length === 2
                  ? "grid-cols-2 max-w-[960px] mx-auto"
                  : "grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} URI={URI} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .ads-swiper .swiper-pagination-bullet-active { background: #5E23DC; }
      `}</style>
    </section>
  );
};

export default AdvertisementSection;
