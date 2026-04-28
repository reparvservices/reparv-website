import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import React, { useState, useEffect } from "react";

import { FiSearch } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import cityView from "../assets/property/cityView.svg";
import NavCard from "../components/NavCard";
import NewFlatIcon from "../assets/home/propertyType/NewFlat.svg";
import NewPlotIcon from "../assets/home/propertyType/OpenLand.svg";
import NewShopIcon from "../assets/home/propertyType/NewShop.svg";
import RowHouseIcon from "../assets/home/propertyType/RowHouse.svg";
import NewFarmHouseIcon from "../assets/home/propertyType/FarmHouse.svg";
import NewFarmLandIcon from "../assets/home/propertyType/FarmLand.svg";
import NewCommercialFlatIcon from "../assets/home/propertyType/NewFlat.svg";
import NewCommercialPlotIcon from "../assets/home/propertyType/OpenLand.svg";
import IndustrialSpaceIcon from "../assets/home/propertyType/Office.svg";
import SEO from "../components/SEO";
import AdvertisementCard from "../components/AdvertisementCard";

// lazy load heavy components
const PropertySection = lazy(() => import("../components/PropertySection"));
const BlogSection = lazy(() => import("../components/BlogSection"));
const FAQSection = lazy(() => import("../components/FAQSection"));

const propertyTypes = [
  {
    title: "Buy New Flat",
    to: "/properties/type/new",
    type: "NewFlat",
    image: NewFlatIcon,
  },
  {
    title: "Buy New Plot",
    to: "/properties/type/new",
    type: "NewPlot",
    image: NewPlotIcon,
  },
  {
    title: "Buy New Shop",
    to: "/properties/type/new",
    type: "NewShop",
    image: NewShopIcon,
  },
  {
    title: "Buy New Row House",
    to: "/properties/type/new",
    type: "RowHouse",
    image: RowHouseIcon,
  },
  {
    title: "Buy New Farm Land",
    to: "/properties/type/new",
    type: "FarmLand",
    image: NewFarmLandIcon,
  },
  {
    title: "Buy New Farm House",
    to: "/properties/type/new",
    type: "FarmHouse",
    image: NewFarmHouseIcon,
  },
  {
    title: "Buy New Commercial Flat",
    to: "/properties/type/new",
    type: "CommercialFlat",
    image: NewCommercialFlatIcon,
  },
  {
    title: "Buy New Commercial Plot",
    to: "/properties/type/new",
    type: "CommercialPlot",
    image: NewCommercialPlotIcon,
  },
  {
    title: "Buy New Industrial Space",
    to: "/properties/type/new",
    type: "IndustrialSpace",
    image: IndustrialSpaceIcon,
  },
];

const BuyNewProperty = () => {
  const navigate = useNavigate();
  const { URI, propertySearch, setPropertySearch } = useAuth();
  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "buy-new-property";
    try {
      const response = await fetch(`${URI}/frontend/seo-data/${page}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch seo data.");
      const data = await response.json();
      console.log(data);
      setSeoData(data);
    } catch (err) {
      console.error("Error fetching Seo Data:", err);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  return (
    <>
      <SEO
        title={
          seoData?.title ||
          "Buy New Property in India | Flats, Plots, Commercial & Land | Reparv"
        }
        description={
          seoData?.description ||
          "Browse new flats, plots, commercial spaces & land for sale across India. Compare prices, locations & verified projects. Find your ideal new property on Reparv."
        }
      />
      <section className="w-full max-w-[1380px] mx-auto px-4 md:px-8 py-6 lg:py-15 pt-0 md:pt-15">
        {/* Back Navigation Section */}
        <div className="md:hidden w-full h-[40px] sm:h-[50px] flex items-center gap-4 px-4 py-2 my-2 sm:my-4 rounded-lg bg-white">
          <FaArrowLeft
            onClick={() => {
              navigate(-1);
            }}
            className="w-5 h-5"
          />
          <span className="w-full text-base sm:text-lg font-bold text-center">
            Buy New Property
          </span>
        </div>
        {/* Top Section */}
        <div className="hidden md:grid grid-cols-5 items-center md:mb-5 lg:mb-8">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 col-span-3">
            <h1 className="md:text-4xl lg:text-6xl xl:text-7xl font-bold">
              Buy New <span className="text-[#8A38F5]">Property</span>
            </h1>

            <p className="text-base lg:text-[24px] font-normal text-[#868686] w-[85%]">
              Explore a wide range of property types tailored to your needs.
              From residential flats to commercial spaces and agricultural land,
              find your perfect investment today.
            </p>

            {/* Search */}
            <div className="flex items-center gap-3 max-w-[95%]">
              <div className="flex items-center gap-3 px-6 py-[10px] lg:py-4 w-full border border-[#8A38F5] rounded-xl">
                <FiSearch className="text-[#868686] w-6 h-6 lg:w-8 lg:h-8" />
                <input
                  type="text"
                  value={propertySearch}
                  onChange={(e) => {
                    setPropertySearch(e.target.value);
                  }}
                  placeholder="Search property by location"
                  className="w-full outline-none text-sm lg:text-lg"
                />
              </div>
              <button
                disabled={!propertySearch}
                onClick={() => {
                  sessionStorage.setItem("focusPropertySearch", "true");
                  navigate("/properties");
                }}
                className={`px-6 lg:px-12 py-[10px] lg:py-[20px] 
                          text-base lg:text-lg text-white bg-[#8A38F5] rounded-xl font-bold
                          ${!propertySearch && "cursor-not-allowed"}
              `}
              >
                Search
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative col-span-2 flex justify-center lg:justify-end">
            <div className="flex items-center justify-center">
              <img
                src={cityView}
                alt="City Illustration"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Property Types */}
        <div className="w-full mb-5">
          <h3 className="hidden md:block md:text-xl lg:text-2xl font-bold mb-2">
            Choose Your Property Type
          </h3>
          <p className="hidden md:block text-xs xl:text-sm text-[#868686] mb-6">
            Select from our diverse range of property categories
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {propertyTypes.map((item) => (
              <NavCard cardData={item} />
            ))}
          </div>
        </div>

        {/* Other Properties */}
        <Suspense
          fallback={<div className="text-center">Loading properties...</div>}
        >
          <PropertySection category={"New"} />
        </Suspense>

        <Suspense
          fallback={<div className="text-center">Loading steps...</div>}
        >
          <BlogSection />
        </Suspense>

        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>

        <Suspense
          fallback={<div className="text-center">Loading steps...</div>}
        >
          <FAQSection location={"Reparv Buy New Property Page"} />
        </Suspense>
        <div className="max-w-[1380px] mx-auto my-5">
          <AdvertisementCard />
        </div>
      </section>
    </>
  );
};

export default BuyNewProperty;
