import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowRight } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { usePropertyFilter } from "../../store/propertyFilter";
import FormatPrice from "../FormatPrice";
import { getImageURI } from "../../utils/helper";

export default function PropertySlider({ projectPartner }) {
  const router = useRouter();
  const {
    URI,
    setPropertyId,
    setEnquirySource,
    selectedCity,
    setShowSiteVisitPopup,
  } = useAuth();
  const { selectedType } = usePropertyFilter();

  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/project-partner/hot-deal-properties`,
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

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    containScroll: false,
  });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || properties.length <= 1) return;

    const AUTOPLAY_DELAY = 3500;
    let timer;

    const play = () => {
      stop();
      timer = setInterval(() => {
        emblaApi.scrollNext();
      }, AUTOPLAY_DELAY);
    };

    const stop = () => {
      if (timer) clearInterval(timer);
    };

    play();

    emblaApi.on("pointerDown", stop);
    emblaApi.on("mouseenter", stop);
    emblaApi.on("mouseleave", play);
    emblaApi.on("reInit", play);

    return () => {
      stop();
      emblaApi.off("pointerDown", stop);
      emblaApi.off("mouseenter", stop);
      emblaApi.off("mouseleave", play);
      emblaApi.off("reInit", play);
    };
  }, [emblaApi, properties.length]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // FIXED: take index as argument
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <>
      <div
        className={`${properties?.length > 0 ? "flex" : "hidden"} w-full max-w-5xl xl:max-w-[1050px] mx-auto p-4 pt-10 md:py-16 flex-col gap-6`}
      >
        {/* Header + Thumbnails */}
        <div className="w-full flex gap-4 md:gap-6 flex-col md:flex-row justify-between">
          <div className="flex flex-col gap-1 sm:gap-2">
            <h2 className="text-base sm:text-lg md:text-2xl text-[#43435D] font-semibold">
              {properties?.[0]?.company_name || "Reparv"}&apos;s Top Picks
            </h2>
            <p className="hidden md:block text-sm text-[#656575]">
              Explore top living options with us
            </p>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 md:gap-4 justify-start md:justify-end sm:overflow-x-auto scrollbar-hide pb-1 md:pb-2">
            {properties?.slice(0, 3).map((p, index) => (
              <button
                key={p.propertyid}
                type="button"
                onClick={() => handleThumbnailClick(index)}
                className="cursor-pointer flex flex-col min-w-[96px] max-w-[150px]"
              >
                <img
                  src={(() => {
                    try {
                      const images = JSON.parse(p.frontView || "[]");
                      return images.length > 0
                        ? `${getImageURI(images[0])}`
                        : `/assets/property/propertyPicture.svg`;
                    } catch {
                      return `/assets/property/propertyPicture.svg`;
                    }
                  })()}
                  alt={p.propertyName}
                  loading="lazy"
                  className={`w-full h-[60px] sm:h-[56px] md:w-[150px] md:h-[90px] object-cover rounded-md shadow transition-all duration-200 ${
                    index === selectedIndex
                      ? "border-2 border-[#5E23DC] opacity-100"
                      : "opacity-90 hover:opacity-100"
                  }`}
                />
                <span className="text-[11px] sm:text-xs md:text-sm mt-1 ml-1 font-medium text-black truncate text-left">
                  {p.propertyName}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full">
          <div className="embla w-full" ref={emblaRef}>
            <div className="embla__container">
              {properties?.map((p) => (
                <div className="embla__slide" key={p.propertyid}>
                  <div className="relative w-full bg-gradient-to-b from-[#EBDFFD] to-[#EFBCBE] rounded-xl p-3 sm:p-4 md:p-5 overflow-hidden shadow-md">
                    {/* Top moving line */}
                    <div className="absolute top-0 left-0 w-full h-[3px] md:h-[4px] overflow-hidden">
                      <div className="moving-line" />
                    </div>

                    {/* ---------------- MOBILE LAYOUT ---------------- */}
                    <div className="flex flex-col gap-3 sm:hidden">
                      {/* 1) Title row */}
                      <div className="flex gap-2 items-center justify-between">
                        <img
                          src={getImageURI(projectPartner?.businessLogo)}
                          alt="logo"
                          loading="lazy"
                          className="max-h-10 object-cover rounded-xl"
                        />
                        <div className="flex flex-col leading-tight">
                          <span className="font-semibold text-sm">
                            {p.propertyName}
                          </span>
                        </div>
                      </div>

                      {/* 2) Property image */}
                      <div
                        onClick={() => {
                          setEnquirySource("Landing Page");
                          router.push(`/property-info/${p.seoSlug} `);
                        }}
                        className="w-full h-[200px] md:h-[250px] lg:h-[300px] rounded-xl overflow-hidden shadow-lg"
                      >
                        <img
                          src={(() => {
                            try {
                              const images = JSON.parse(p.frontView || "[]");
                              return images.length > 0
                                ? `${getImageURI(images[0])}`
                                : `/assets/property/propertyPicture.svg`;
                            } catch {
                              return `/assets/property/propertyPicture.svg`;
                            }
                          })()}
                          alt={p.propertyName}
                          loading="lazy"
                          className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover"
                        />
                      </div>

                      {/* 3) Location + Price/BHK side-by-side */}
                      <div className="flex justify-between w-full mt-1">
                        <div className="w-[30%] flex flex-col text-left">
                          <span className="font-medium text-[10px]">
                            {p.location} {", " + p.city}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="font-semibold text-xs">
                            <FormatPrice
                              price={parseFloat(p.totalOfferPrice / 100000)}
                            ></FormatPrice>
                            {" Lac - "}
                            <FormatPrice
                              price={parseFloat(p.totalSalesPrice / 100000)}
                            ></FormatPrice>{" "}
                            {"Lac"}
                          </span>

                          <div className="text-[#000000] font-semibold text-[10px]">
                            {p.propertyType?.map((type, index) => (
                              <span className="mr-1" key={index}>
                                {type.length > 18
                                  ? `${type.slice(0, 17)}...`
                                  : type}
                                {index < p.propertyType.length - 1 && ""}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 4) Contact button */}
                      <button
                        type="button"
                        onClick={() => {
                          setPropertyId(p.propertyid);
                          setShowSiteVisitPopup(true);
                        }}
                        className="mt-1 px-3 py-2.5 bg-[#5E23DC] text-[11px] text-white font-semibold rounded-lg shadow cursor-pointer hover:opacity-95 active:scale-95 transition"
                      >
                        Contact
                      </button>
                    </div>

                    {/* ------------- DESKTOP / TABLET LAYOUT ------------- */}
                    <div className="hidden sm:flex flex-row gap-3 md:gap-4">
                      {/* LEFT CONTENT */}
                      <div className="w-[38%] md:w-[30%] lg:w-[25%] flex flex-col justify-between gap-3 md:gap-4">
                        {/* Logo + title */}
                        <div className="w-full flex gap-2 sm:gap-3 items-center">
                          <img
                            src={getImageURI(projectPartner?.businessLogo)}
                            alt="logo"
                            loading="lazy"
                            className="max-h-12 object-cover rounded-xl"
                          />
                        </div>

                        {/* Stacked info */}
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm md:text-base">
                            {p.propertyName}
                          </span>
                          <span className="text-[#000000] text-[10px] md:text-xs">
                            {p.location} {", " + p.city}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <span className="font-semibold text-sm md:text-base">
                            <FormatPrice
                              price={parseFloat(p.totalOfferPrice / 100000)}
                            ></FormatPrice>
                            {" Lac - "}
                            <FormatPrice
                              price={parseFloat(p.totalSalesPrice / 100000)}
                            ></FormatPrice>{" "}
                            {"Lac"}
                          </span>
                          <span className="text-[#000000] font-medium text-[10px] md:text-xs">
                            {p.propertyType?.map((type, index) => (
                              <span key={index} className="mr-2">
                                {type.length > 18
                                  ? `${type.slice(0, 17)}...`
                                  : type}
                                {index < p.propertyType.length - 1 && ""}
                              </span>
                            ))}
                          </span>
                        </div>

                        {/* Contact button */}
                        <button
                          type="button"
                          onClick={() => {
                            setPropertyId(p.propertyid);
                            setShowSiteVisitPopup(true);
                          }}
                          className="mt-1 md:mt-2 px-3 md:px-4 py-2.5 bg-[#5E23DC] text-[11px] md:text-sm lg:text-base text-white font-semibold rounded-lg shadow cursor-pointer hover:opacity-95 active:scale-95 transition"
                        >
                          Contact
                        </button>
                      </div>

                      {/* RIGHT IMAGE */}
                      <div
                        onClick={() => {
                          setEnquirySource("Landing Page");
                          router.push(`/property-info/${p.seoSlug} `);
                        }}
                        className="w-[62%] md:w-[70%] lg:w-[75%] max-h-[300px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                      >
                        <img
                          src={(() => {
                            try {
                              const images = JSON.parse(p.frontView || "[]");
                              return images.length > 0
                                ? `${getImageURI(images[0])}`
                                : `/assets/property/propertyPicture.svg`;
                            } catch {
                              return `/assets/property/propertyPicture.svg`;
                            }
                          })()}
                          alt={p.propertyName}
                          loading="lazy"
                          className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade-right-overlay" />
          </div>

          {/* Next arrow */}
          <button
            onClick={scrollNext}
            type="button"
            className="absolute hidden sm:flex items-center justify-center top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white p-2 md:p-4 rounded-full shadow cursor-pointer hover:scale-105 transition"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
