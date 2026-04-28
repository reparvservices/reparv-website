import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAuth } from "../../store/auth";
import PropertyNavbar from "./PropertyNavbarOld.jsx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Navbar from "./Navbar";
import { getImageURI } from "../../utils/helper.js";

export default function ImageSlider() {
  const {
    URI,
    selectedCity,
    setSelectedCity,
    propertySearch,
    setPropertySearch,
    showCitySelector,
    setShowCitySelector
  } = useAuth();
  const navigate = useNavigate();
  const [sliderImages, setSliderImages] = useState([]);
  const [mobileImage, setMobileImage] = useState([]);
  const [cities, setCities] = useState([]);
  const handleFocus = () => {
      // Store a flag to tell the properties page to focus its search bar
      sessionStorage.setItem("focusPropertySearch", "true");
      // Redirect to /properties
      navigate("/properties");
    };

  // *Fetch Data from API*
  const fetchAllCity = async () => {
    try {
      const response = await fetch(URI + "/frontend/properties/cities", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cities.");

      const data = await response.json();
      setCities(data); // Sets the cities array
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // **Fetch Data from API**
  const getSliderImages = async () => {
    try {
      const response = await fetch(URI + "/frontend/slider", {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch slider Images.");
      const data = await response.json();
      setSliderImages(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchAllCity();
    getSliderImages();
  }, []);

  return (
    <div className="relative w-full mx-auto max-w-[1650px] flex flex-col items-center justify-center mb-5">
      <div className="w-full flex items-center justify-between sm:hidden gap-2 px-4 pt-3 pb-2">
        {/* Mobile Search */}
        <div className="relative w-[60%] bg-white rounded-md">
          <span className="absolute inset-y-0 left-2 md:left-6 flex items-center text-gray-400">
            <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5" />
          </span>
          <input
            type="text"
            value={propertySearch}
            onChange={(e) => {
              setPropertySearch(e.target.value);
            }}
            onFocus={handleFocus}
            placeholder="Search Property"
            className="w-full pl-7 md:pl-14 pr-4 py-[10px] text-xs md:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#00000066]"
          />
        </div>

        {/* Mobile City Selector */}
        <div
          onClick={() => {
            setShowCitySelector(true);
            navigate("/properties");
          }}
          className={`selectCity ${
            location.pathname !== "/check-eligibility"
              ? "sm:inline-block"
              : "hidden"
          } inline-block min-w-[100px] max-w-[250px] relative py-2 rounded-lg px-4 cursor-pointer`}
        >
          <div className="flex gap-1 items-center justify-center text-base font-semibold  text-black">
            <CiLocationOn className="w-5 h-5" />
            <span className="block whitespace-nowrap ">
              {selectedCity
                ? selectedCity.length > 12
                  ? `${selectedCity.slice(0, 11)}...`
                  : selectedCity
                : "Select City"}
            </span>
            <RiArrowDropDownLine className="w-6 h-6 text-[#000000B2]" />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        touchEventsTarget="wrapper"
        touchRatio={1}
        simulateTouch={true}
        grabCursor={true}
        className="w-full shadow-lg overflow-scroll scrollbar-hide sm:overflow-hidden"
      >
        {sliderImages?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={getImageURI(img.image)}
              alt={`Slide ${index + 1}`}
              loading="lazy"
              className="hidden sm:block w-full h-auto object-cover"
            />
            <img
              src={getImageURI(img?.mobileimage)}
              alt={`Slide ${index + 1}`}
              loading="lazy"
              className={`block sm:hidden w-full h-auto object-cover`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination hidden sm:flex items-center justify-center gap-1 m-5 absolute bottom-[60px] z-10"></div>
      <div className="hidden lg:block absolute w-full z-10 lg:bottom-0 xl:bottom-[0px]">
        <Navbar />
      </div>
    </div>
  );
}
