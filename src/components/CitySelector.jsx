import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { useAuth } from "../store/auth";
import { usePropertyFilter } from "../store/propertyFilter";
import { AiOutlineAim } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { PiMapPinAreaBold } from "react-icons/pi";

import delhiImage from "../assets/citySelector/delhi.jpeg";
import mumbaiImage from "../assets/citySelector/mumbai.jpeg";
import nagpurImage from "../assets/citySelector/nagpur.jpeg";
import puneImage from "../assets/citySelector/pune.jpeg";
import ahmedabadImage from "../assets/citySelector/ahmedabad.jpeg";
import bangloreImage from "../assets/citySelector/banglore.jpeg";
import kolkataImage from "../assets/citySelector/kolkata.jpeg";
import hyderabadImage from "../assets/citySelector/hyderabad.jpeg";
import chennaiImage from "../assets/citySelector/chennai.jpeg";
import noidaImage from "../assets/citySelector/noida.jpeg";
import lucknowImage from "../assets/citySelector/lucknow.jpeg";
import nashikImage from "../assets/citySelector/nashik.jpeg";
import jodhpurImage from "../assets/citySelector/jodhpur.jpeg";
import jaipurImage from "../assets/citySelector/jaipur.jpeg";
import chandigarhImage from "../assets/citySelector/chandigarh.jpeg";

export const popularCities = [
  { name: "Delhi", image: delhiImage },
  { name: "Mumbai", image: mumbaiImage },
  { name: "Bangalore", image: bangloreImage },
  { name: "Nagpur", image: nagpurImage },
  { name: "Pune", image: puneImage },
  { name: "Lucknow", image: lucknowImage },
  { name: "Hyderabad", image: hyderabadImage },
  { name: "Ahmedabad", image: ahmedabadImage },
  { name: "Noida", image: noidaImage },
  { name: "Chennai", image: chennaiImage },
  { name: "Nashik", image: nashikImage },
  { name: "Jaipur", image: jaipurImage },
  { name: "Jodhpur", image: jodhpurImage },
  { name: "Kolkata", image: kolkataImage },
  { name: "Chandigarh", image: chandigarhImage },
];

export default function CitySelector() {
  const {
    URI,
    showCitySelector,
    setShowCitySelector,
    selectedCity,
    setSelectedCity,
  } = useAuth();

  const { resetSidebarFilter } = usePropertyFilter();
  const [activeCity, setActiveCity] = useState(selectedCity);

  const [search, setSearch] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [cities, setCities] = useState([]);

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

  useEffect(() => {
    fetchAllCity();
  }, []);

  useEffect(() => {
    resetSidebarFilter();
  }, [selectedCity]);

  const filteredCities = cities?.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredCities);
  // Handle user current location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;
          if (cityName) {
            const formattedCity =
              cityName.charAt(0).toUpperCase() + cityName.slice(1);
            setSelectedCity(formattedCity);
            //setShowCitySelector(false);
          } else {
            alert("Could not detect your city");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Failed to get location. Try again.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Permission denied or location unavailable.");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="font-segoe bg-white rounded-tl-xl rounded-tr-xl sm:rounded-4xl shadow-lg w-full max-h-[90vh] flex flex-col gap-3 sm:gap-4 md:max-w-3xl p-4 sm:p-8 pt-8 pb-10 sm:pb-4 relative">
      <div className="flex gap-4 items-center justify-between mb-1">
        <h2 className="text-2xl md:text-3xl font-bold text-[#3F2D62] ">
          Choose your city
        </h2>
        <button
          onClick={() => setShowCitySelector(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiX className="w-5 h-5 text-[#3F2D62] cursor-pointer" />
        </button>
      </div>
      <h2 className="text-xs md:text-base text-[#8D8C8C]">
        Select a city to explore properties
      </h2>

      {/* Search Bar Container */}
      <div className="w-full flex gap-3 flex-col md:flex-row items-center justify-between">
        {/* Search Bar */}
        <div className="w-full md:w-1/2 md:min-w-[300px] lg:min-w-[450px] flex items-center justify-center relative">
          <span className="absolute inset-y-0 left-4 md:left-4 flex items-center text-gray-400">
            <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search For Your City"
            className="w-full pl-10 md:pl-11 pr-4 py-[8px] sm:py-[10px] text-sm md:text-base font-normal rounded-lg border-[1.5px] border-[#8A38F5] focus:outline-none placeholder:text-[#868686]"
          />
        </div>
        {/* Use Current Location */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={loadingLocation}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-[8px] sm:py-[10px] text-sm md:text-base font-semibold text-white bg-[#8A38F5] border-[1.5px] border-[#8A38F5] rounded-lg transition cursor-pointer"
        >
          <AiOutlineAim className="w-4 h-4 sm:w-5 sm:h-5 " />
          {loadingLocation ? "Detecting location..." : "Use current location"}
        </button>
      </div>

      {/* Show Searched Properties */}
      <h2 className="text-base text-[#3F2D62] font-bold">Quick Access</h2>
      <div className="w-full h-[30px] sm:h-[40px] flex gap-2 sm:gap-4 overflow-scroll scrollbar-hide">
        {filteredCities?.length > 0 ? (
          filteredCities.map((city, index) => (
            <div
              key={index}
              onClick={() => {
                //setSelectedCity(city);
                //setShowCitySelector(false);
                setActiveCity(city);
              }}
              className={`${
                activeCity === city
                  ? "bg-[#8A38F5] text-white font-semibold"
                  : ""
              } flex items-center justify-center font-normal border-[1.5px] border-[#8A38F5] px-4 py-2 rounded-4xl text-[#8D8C8C] active:scale-95 whitespace-nowrap cursor-pointer`}
            >
              <span className="whitespace-nowrap text-sm md:text-base">
                {city}
              </span>
            </div>
          ))
        ) : (
          <span className="font-semibold text-red-500">City Not Found</span>
        )}
      </div>

      {/* Popular Cities */}
      <h2 className="text-base text-[#3F2D62] font-bold">Popular Cities</h2>
      <div className="w-full max-h-[30vh] md:max-h-[25vh] grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 p-1 overflow-scroll scrollbar-hide">
        {popularCities.map((city, idx) => (
          <div
            key={idx}
            onClick={() => {
              //setSelectedCity(city.name);
              //setShowCitySelector(false);
              setActiveCity(city.name);
            }}
            className="w-full flex flex-col items-center cursor-pointer hover:scale-101 active:scale-100 transition-transform"
          >
            <div
              className={`relative rounded-[12px] overflow-hidden ${
                activeCity === city.name ? "ring-2 ring-[#8A38F5]" : ""
              }`}
            >
              <img
                src={city.image}
                alt={city.name}
                className={`w-40 sm:w-50 h-[90px] sm:h-[130px] rounded-[12px] object-cover shadow-sm `}
              />
              {/* Done */}
              <div
                className={`${
                  activeCity === city.name ? "block" : "hidden"
                } absolute top-2 right-2 bg-[#8A38F5] rounded-full text-white text-[12px] font-semibold p-[3px] sm:p-[5px] text-center`}
              >
                <MdDone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              {/* Label */}
              <div
                className={`absolute w-full bottom-0 left-0 right-0 flex flex-col ${
                  activeCity === city.name ? "bg-[#8A38F5AA]" : "bg-black/50"
                } text-white text-[10px] sm:text-sm px-[16px] p-1`}
              >
                <span className={`text-sm text-center font-bold`}>
                  {city.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-0 bg-white flex justify-between">
        <div className="w-1/2 flex gap-3 items-center justify-start text-xs text-[#8D8C8C]">
          <div>
            <PiMapPinAreaBold className="w-7 h-7 sm:w-9 sm:h-9 text-[#5E23DC]" />
          </div>
          <div>
            <span>Selected City</span>
            <h2 className={`text-sm sm:text-[15px] font-semibold text-[#5E23DC]`}>
              {activeCity}
            </h2>
          </div>
        </div>
        <div
          onClick={() => {
            setSelectedCity(activeCity);
            setShowCitySelector(false);
          }}
          className="w-1/2 flex items-center justify-center p-[10px] sm:p-[10px] max-w-[250px] bg-[#8A38F5] rounded-lg cursor-pointer"
        >
          <span className="text-white text-sm sm:text-base font-semibold">
            View Properties
          </span>
        </div>
      </div>
    </div>
  );
}
