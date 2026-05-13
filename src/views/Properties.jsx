"use client"

import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { IoFilter } from "react-icons/io5";
import { useParams } from "next/navigation";
import { useLayoutScroll } from "../context/LayoutScrollContext";
import { useAuth } from "../store/auth";
import FilterSidebar from "../components/property/FilterSidebar";
import { useInView } from "react-intersection-observer";
import { usePropertyFilter } from "../store/propertyFilter";
import SEO from "../components/SEO";
import PropertyCategories from "../components/PropertyCategories";
import FilterNavbar from "../components/property/FilterNavbar";
import AdComponent from "../components/AdsForFeed";
import AdvertisementCard from "../components/AdvertisementCard";
import PropertySkeleton from "../components/property/PropertySkeleton";

// Lazy import
const PropertyCard = React.lazy(
  () => import("../components/property/PropertyCard"),
);

export default function Properties() {
  const { setVideoInView, isIntersecting } = useLayoutScroll();
  const { ref: videoRef, inView: videoInView } = useInView({ threshold: 0.1 });
  const params = useParams();
  const slug = params.slug;
  const listingTypeParam = params.listingType;
  const propertyCategoryParam = params.propertyCategory;
  const cityParam = params.city;

  const {
    filteredLocations,
    setFilteredLocations,
    selectedType,
    setSelectedType,
    selectedBHKType,
    setSelectedBHKType,
    minBudget,
    maxBudget,
  } = usePropertyFilter();

  const {
    URI,
    propertyType,
    setPropertyType,
    selectedCity,
    setSelectedCity,
    propertySearch,
    setShowFilterPopup,
    setShowCitySelector,
  } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  const sortProperties = (data, sortBy) => {
    const sorted = [...data];

    switch (sortBy) {
      case "latest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

      case "price_low":
        return sorted.sort((a, b) => a.totalOfferPrice - b.totalOfferPrice);

      case "price_high":
        return sorted.sort((a, b) => b.totalOfferPrice - a.totalOfferPrice);

      case "area_low":
        return sorted.sort((a, b) => a.builtUpArea - b.builtUpArea);

      case "area_high":
        return sorted.sort((a, b) => b.builtUpArea - a.builtUpArea);

      default:
        return sorted; // Relevance (no sorting)
    }
  };

  // Split the slug into parts
  // Format expected: {bhkType}-{propertyCategory}-in-{city}
  const regex = /^(\d+-?[A-Za-z]+)-(.*)-in-(.*)$/;
  const slugStr = slug != null ? String(slug) : "";
  const match = slugStr.match(regex);

  let bhkType = "";
  let propertyCategory = "";
  let city = "";

  if (slug && propertyCategoryParam && cityParam) {
    bhkType =
      decodeURIComponent(String(slug)).replace(/-/g, " ") || "";
    propertyCategory =
      decodeURIComponent(String(propertyCategoryParam)) || "";
    city =
      decodeURIComponent(String(cityParam)).replace(/-/g, " ") || "";
  } else if (match) {
    bhkType = match[1].replace("-", " ") || "";
    propertyCategory = match[2] || "";
    city = match[3].replace(/-/g, " ") || "";
  } else if (slugStr) {
    setSelectedCity(slugStr);
  }

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState(propertySearch);

  const filteredData = sortProperties(
    filteredProperties?.filter((item) => {
      const term = searchTerm?.toLowerCase().trim();
      if (!term) return true;

      const safeIncludes = (value) =>
        typeof value === "string" && value.toLowerCase().includes(term);

      return (
        safeIncludes(item?.propertyName) ||
        safeIncludes(item?.propertyCategory) ||
        safeIncludes(item?.city) ||
        safeIncludes(item?.location) ||
        safeIncludes(item?.address) ||
        (Array.isArray(item?.propertyType) &&
          item.propertyType.some((t) => safeIncludes(t))) ||
        (Array.isArray(item?.tags)
          ? item.tags.some((tag) => safeIncludes(tag))
          : safeIncludes(item?.tags))
      );
    }),
    sortBy,
  );

  const [visibleCount, setVisibleCount] = useState(12);
  const visible = filteredData?.slice(0, visibleCount);

  const [seoData, setSeoData] = useState({});

  const fetchSeoData = async () => {
    const page = "properties";
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

  const fetchData = async () => {
    try {
      setLoading(true);

      let url = `${URI}/frontend/properties/get-all-by-slug?`;
      const params = [];

      if (selectedCity && selectedCity.trim() !== "") {
        params.push(`city=${encodeURIComponent(selectedCity)}`);
      }

      if (propertyType && propertyType.trim() !== "") {
        params.push(`propertyCategory=${encodeURIComponent(propertyType)}`);
      }

      if (selectedBHKType && selectedBHKType.trim() !== "") {
        params.push(`propertyType=${encodeURIComponent(selectedBHKType)}`);
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
      setProperties(data);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setVideoInView(videoInView);
  }, [videoInView]);

  useEffect(() => {
    setSelectedCity(city || selectedCity);
    setPropertyType(propertyCategory || propertyType);
    setSelectedType(propertyCategory || selectedType);
    setSelectedBHKType(bhkType || selectedBHKType);
  }, [bhkType, propertyCategory, city]);

  useEffect(() => {
    fetchData();
  }, [propertyType, selectedCity, bhkType, propertyCategory, city]);

  useEffect(() => {
    const filtered = properties.filter((item) => {
      const matchesBHK =
        !selectedBHKType || // if none selected → allow all
        (Array.isArray(item.propertyType)
          ? item.propertyType.includes(selectedBHKType) // when stored as array
          : item.propertyType === selectedBHKType); // when stored as string

      const matchesLocation =
        filteredLocations.length === 0 ||
        filteredLocations.includes(item.location);

      const matchesBudget =
        item.totalOfferPrice >= minBudget && item.totalOfferPrice <= maxBudget;

      return matchesBHK && matchesLocation && matchesBudget;
    });

    setFilteredProperties(filtered);
  }, [
    properties,
    propertyType,
    filteredLocations,
    minBudget,
    maxBudget,
    selectedBHKType,
  ]);

  const searchInputRef = useRef(null);

  // Focus search bar if redirected from homepage
  useEffect(() => {
    const shouldFocus = sessionStorage.getItem("focusPropertySearch");
    if (shouldFocus === "true" && searchInputRef.current) {
      searchInputRef.current.focus();
      sessionStorage.removeItem("focusPropertySearch"); // cleanup
    }
  }, []);

  // Build canonical URL for Properties page
  const canonicalUrl = React.useMemo(() => {
    const base = "https://www.reparv.in";

    if (bhkType && propertyCategory && selectedCity) {
      const bhk = bhkType.toLowerCase().replace(/\s+/g, "-");
      const category = propertyCategory.toLowerCase().replace(/\s+/g, "-");
      const citySlug = selectedCity.toLowerCase().replace(/\s+/g, "-");

      return `${base}/${bhk}/${category}/in/${citySlug}`;
    }

    if (selectedCity) {
      const citySlug = selectedCity.toLowerCase().replace(/\s+/g, "-");
      return `${base}/properties/in/${citySlug}`;
    }

    return `${base}/properties`;
  }, [bhkType, propertyCategory, selectedCity]);

  return (
    <>
      <SEO
        title={
          seoData?.title ||
          "All Types of Properties in India | Verified Listings – Reparv"
        }
        description={
          seoData?.description ||
          "Explore all types of properties in India. Browse flats, plots, villas, and homes with verified listings and genuine property options on Reparv."
        }
        keywords={
          seoData?.keywords ||
          "buy property in India, rent property in India, sell property in India, flats for rent in Nagpur, flats for sale in Nagpur, property in Pune, rental property in Pune, property in Chandrapur, property for rent in Kolkata, property listings in Mumbai, verified real estate listings India, residential and commercial property India"
        }
        canonical={canonicalUrl}
      />

      <div className="properties w-full max-w-[1400px] flex flex-col p-4 sm:py-4 sm:px-0 mx-auto bg-[#f8f3fb]">
        <div className="w-full flex flex-wrap gap-3 justify-between sm:justify-end sm:py-2 sm:px-5">
          {/* Search Bar And Location Filter For MobileScreen  */}
          <div className="w-full flex gap-2 items-center justify-between sm:justify-end ">
            <FilterNavbar
              searchInputRef={searchInputRef}
              properties={properties}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              type={listingTypeParam}
            />
            {/* Filter For MobileScreen  */}
            <div
              onClick={() => {
                setShowFilterPopup(true);
              }}
              className="filterIcon p-[12px] bg-white border border-gray-300 rounded-md flex sm:hidden items-center justify-center shadow"
            >
              <IoFilter />
            </div>
          </div>
        </div>
        <div className=" relative w-full min-h-[77vh] flex gap-5 py-4 sm:p-4">
          {/* Properties Filter */}
          <div
            className={`${isIntersecting ? "absolute bottom-0 " : "fixed"} 
          propertiesFilter overflow-y-scroll overflow-x-visible scrollbar-hide hidden sm:block
          !min-w-[300px] w-[300px] h-[75vh] pb-10 transition-all duration-300 sm:rounded-2xl`}
          >
            <FilterSidebar type={listingTypeParam} />
          </div>

          {/* Properties Grid */}
          <div className="w-full overflow-scroll scrollbar-hide sm:pl-[330px] flex flex-col">
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 items-end justify-between text-base sm:text-xl lg::text-2xl ">
              <div className="flex flex-row gap-1 sm:gap-0 sm:flex-col items-center sm:items-start justify-end">
                <h2 className="text-black font-bold ">
                  {filteredData.length} Properties Found
                </h2>
                <h1 className="text-base sm:text-sm lg:text-base text-[#606060] font-semibold mr-3">
                  <span className="text-[#888888] sm:font-normal">
                    {"in " + selectedCity}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 sm:py-3 border border-gray-300 bg-white rounded-lg">
                <label className="text-sm sm:text-base font-medium text-gray-600">
                  Sort:
                </label>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm sm:text-base focus:outline-none pr-2 font-bold"
                >
                  <option value="">Relevance</option>
                  <option value="latest">Latest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="area_low">Area: Small to Large</option>
                  <option value="area_high">Area: Large to Small</option>
                </select>
              </div>
            </div>

            {/* Used Suspense For Optimization */}
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <PropertySkeleton key={i} />
                  ))}
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
                {loading ? (
                  Array.from({ length: 9 }).map((_, i) => (
                    <PropertySkeleton key={i} />
                  ))
                ) : filteredData.length > 0 ? (
                  visible?.map((property, index) => (
                    <React.Fragment key={property._id || index}>
                      <PropertyCard property={property} />

                      {(index + 1) % 6 === 0 && (
                        <AdComponent key={`property-ad-${index}`} />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <h1 className="text-2xl font-bold m-4">
                    No Properties Found
                  </h1>
                )}
              </div>
              {/* Load more Properties Button */}
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => {
                    setVisibleCount((c) => c + 6);
                  }}
                  className="px-6 py-2 border border-[#8A38F5] font-semibold rounded-full bg-white text-[#8A38F5] hover:bg-purple-50 shadow cursor-pointer"
                >
                  Load More Properties
                </button>
              </div>
              <div className="w-full  hidden md:block h-[1px] mt-5 bg-[#00000033] "></div>
              <div>
                <AdvertisementCard />
                <PropertyCategories />
                <AdvertisementCard />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
