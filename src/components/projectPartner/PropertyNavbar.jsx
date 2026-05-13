import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "../../store/auth.jsx";
import { useEffect } from "react";
import { usePropertyFilter } from "../../store/propertyFilter.jsx";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { RiMobileDownloadLine } from "react-icons/ri";
import { WiStars } from "react-icons/wi";
import TypeWriter from "../property/TypeWriter.jsx";
import { useRef } from "react";

export default function PropertyNavbar({ projectPartner }) {
  const { contact } = useParams();
  const scrollRef = useRef(null);
  const router = useRouter();
  const {
    URI,
    selectedCity,
    setSelectedCity,
    propertyType,
    setPropertyType,
    setShowCitySelector,
    propertySearch,
    setPropertySearch,
    setEnquirySource,
  } = useAuth();
  const { selectedType, setSelectedType } = usePropertyFilter();
  const [cities, setCities] = useState([]);
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  // propertyTypes list
  const propertyTypes = [
    { label: "NEW FLAT", type: "NewFlat" },
    { label: "NEW PLOT", type: "NewPlot" },
    { label: "NEW SHOP", type: "NewShop" },
    { label: "RENTAL FLAT", type: "RentalFlat" },
    { label: "RESALE", type: "Resale" },
    { label: "ROW HOUSE", type: "RowHouse" },
    { label: "LEASE", type: "Lease" },
    { label: "FARM HOUSE", type: "FarmHouse" },
    { label: "FARM LAND", type: "FarmLand" },
    { label: "COMMERCIAL FLAT", type: "CommercialFlat" },
    { label: "COMMERCIAL PLOT", type: "CommercialPlot" },
    { label: "RENTAL OFFICE", type: "RentalOffice" },
    { label: "INDUSTRIAL SPACE", type: "IndustrialSpace" },
    { label: "RENTAL SHOP", type: "RentalShop" },
  ];

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/project-partner/cities/${projectPartner?.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok)
        throw new Error("Failed to fetch Project Partner Cities.");

      const data = await response.json();
      console.log(data);
      setCities(data);
    } catch (err) {
      console.error("Error fetching:", err);
      setCities([]);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [projectPartner]);

  useEffect(() => {
    setPropertyType(categories?.[0]);
    setSelectedType(categories?.[0]);
  }, [categories]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/project-partner/all-properties`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyCategory: selectedType,
            projectPartnerId: projectPartner?.id,
            selectedCity: projectPartner?.city,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      console.log(data);
      setProperties(data);

      // Safety: Ensure data is an array
      if (Array.isArray(data) && data.length > 0) {
        const categories = [
          ...new Set(
            data
              .map((item) => item?.propertyCategory)
              .filter((cat) => cat && cat.trim() !== "")
          ),
        ];

        const locationObjects = [
          ...new Map(
            data
              .filter(
                (item) =>
                  item?.location &&
                  item.location.trim() !== "" &&
                  item?.seoSlug &&
                  item.seoSlug.trim() !== ""
              )
              .map((item) => [
                item.location,
                { location: item.location, seoSlug: item.seoSlug },
              ])
          ).values(),
        ];

        setCategories(categories);
        setLocations(locationObjects);
      } else {
        setCategories([]);
        setLocations([]);
      }
    } catch (err) {
      console.error("Error fetching:", err);
      setProperties([]);
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200; // change value if needed
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; // change value if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity, projectPartner]);

  return (
    <div
      style={{
        backgroundImage: `url("/assets/projectPartner/background.svg")`,
        fontFamily: "Rubik, Helvetica, sans-serif",
      }}
      className="relative w-full flex flex-col items-center bg-[#5E23DC] bg-cover bg-center bg-no-repeat text-white md:pt-16 pb-10 md:pb-28 px-4 sm:px-6 rounded-tr-[40px] rounded-tl-[40px] md:rounded-none pt-5 mt-4"
    >
      {/* MOBILE: City */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-5xl flex items-center justify-between md:hidden">
          {/* City Selector */}
          <div className="relative min-w-[120px] max-w-[210px] ml-1">
            {/* Icons & Selected Label */}
            <div className="flex items-center gap-1 text-sm font-medium pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white">
              <CiLocationOn className="w-4 h-4" />
            </div>

            {/* City Select */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-8 py-2 text-sm font-medium cursor-pointer appearance-none outline-none border-none"
            >
              <option value="">Select City</option>
              {cities?.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Dropdown Arrow */}
            <RiArrowDropDownLine className="pointer-events-none w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 text-white" />
          </div>
        </div>
      </div>

      {/* HEADING */}
      <div className="text-center w-full max-w-[850px] mt-2 md:mt-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
          Properties to buy in{" "}
          <span className="">
            <TypeWriter cities={cities} />
          </span>
        </h1>
        <p className="mt-3 text-xs sm:text-sm md:text-xl font-medium">
          {projectPartner?.fullname ? (projectPartner?.fullname +"'s ") : ("")}Verified Properties
        </p>
      </div>

      {/* SEARCH CARD */}
      <div className="w-full max-w-3xl mt-6 md:mt-8">
        <div className="w-full bg-[#30285E] text-white rounded-[32px] md:rounded-[40px] shadow-lg pt-3 md:pt-5 px-3 md:px-6">
          <div className="flex items-center justify-start gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-1 pb-2 md:pb-3">
            {propertyTypes?.map((type, i) => {
              const isSelected = propertyType === type.type;
              const isUnique = categories?.includes(type.type);

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedType(type.type);
                    setPropertyType(type.type);

                    if (!isUnique) {
                      router.push("/properties");
                    }
                  }}
                  className={`cursor-pointer text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap pb-2 border-b-2 ${
                    isSelected
                      ? "border-white"
                      : "border-transparent hover:border-white"
                  } ${isUnique ? "text-[#36C991]" : "text-white"}`}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

          <div className="w-full mt-1 bg-white rounded-full flex items-center gap-3 md:gap-4 px-4 md:px-7 py-2 md:py-2 shadow-md">
            <input
              type="text"
              value={propertySearch}
              onChange={(e) => setPropertySearch(e.target.value)}
              placeholder="Search For Your Favourite Property"
              className="flex-1 text-[#757575] text-sm md:text-base outline-none bg-transparent"
            />

            <button
              onClick={() => {
                document.getElementById("propertiesSearch")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="hidden md:inline-flex items-center justify-center bg-[#36C991] hover:bg-[#00b500d0] transition text-white font-semibold text-sm md:text-base px-8 py-3.5 rounded-full cursor-pointer"
            >
              Search
            </button>

            <button
              onClick={() => {
                document.getElementById("propertiesSearch")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="md:hidden inline-flex items-center justify-center rounded-full p-2.5 cursor-pointer"
            >
              <img
                src="/assets/projectPartner/search-icon.png"
                alt="Search"
                loading="lazy"
                className="w-4 h-4 object-contain"
              />
            </button>
          </div>
        </div>
      </div>

      {/* POPULAR LOCALITIES */}
      <div className="w-full max-w-[850px] mt-8 md:mt-10 mb-16 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 px-1">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap">
          Popular Localities
        </h3>

        {/* Left Scroll Button */}
        <button
          onClick={handleScrollRight}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#30285E] cursor-pointer transition hover:bg-[#423883]"
        >
          <FaAngleLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="w-full flex-1 flex items-center gap-2.5 md:gap-3 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {locations?.map((loc, i) => (
            <button
              key={i}
              onClick={() => {
                setEnquirySource("Landing Page");
                router.push(`/property-info/${loc.seoSlug}`);
              }}
              className="cursor-pointer text-xs md:text-sm flex items-center gap-1 px-4 py-2 rounded-md bg-[#FFFFFF1A] border border-transparent hover:border-white transition whitespace-nowrap"
            >
              {loc.location} <FaAngleRight size={14} />
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={handleScrollLeft}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#30285E] cursor-pointer transition hover:bg-[#423883]"
        >
          <FaAngleRight size={18} />
        </button>
      </div>

      {/* BOTTOM CTA STRIP */}
      <div
        onClick={() => {
          window.open("https://users.reparv.in/", "_blank");
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] sm:max-w-[500px] bg-[#281E66] text-center text-xs md:text-sm text-white py-3.5 md:py-4 rounded-t-3xl font-medium cursor-pointer active:scale-95 transition"
      >
        <WiStars
          size={26}
          className="hidden md:block absolute bottom-[6px] left-5"
        />
        <WiStars
          size={26}
          className="hidden md:block absolute bottom-[6px] right-5"
        />
        Are you a Property Owner?{" "}
        <span className="font-semibold underline">Sell/Rent For FREE</span>
      </div>
    </div>
  );
}
