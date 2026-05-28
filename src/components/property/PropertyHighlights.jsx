import React from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCar,
  FaCouch,
  FaBuilding,
  FaCheckCircle,
  FaCompass,
} from "react-icons/fa";

function PropertyHighlights({ property }) {
  const isValid = (value) => {
    return (
      value !== null &&
      value !== "null" &&
      value !== undefined &&
      value !== "" &&
      value !== 0 &&
      value !== "0" &&
      value !== "[]" &&
      !(Array.isArray(value) && value.length === 0)
    );
  };

  const highlights = [
    {
      icon: <FaBed />,
      title: isValid(property?.bedroomView) ? "Bedrooms" : null,
      desc: "Spacious rooms",
    },
    {
      icon: <FaBath />,
      title: isValid(property?.bathroomView) ? "Bathrooms" : null,
      desc: "Modern fixtures",
    },
    {
      icon: <FaRulerCombined />,
      title: isValid(property?.carpetArea)
        ? `${property.carpetArea} Sq.ft`
        : null,
      desc: "Carpet Area",
    },
    {
      icon: <FaCar />,
      title: isValid(property?.parkingAvailability)
        ? property.parkingAvailability
        : null,
      desc: "Parking facility",
    },
    {
      icon: <FaCouch />,
      title: isValid(property?.furnishing) ? property.furnishing : null,
      desc: "Interior status",
    },
    {
      icon: <FaBuilding />,
      title:
        isValid(property?.floorNo) && isValid(property?.totalFloors)
          ? `Floor ${property.floorNo}/${property.totalFloors}`
          : null,
      desc: "Floor information",
    },
    {
      icon: <FaCheckCircle />,
      title: isValid(property?.propertyStatusFeature)
        ? property.propertyStatusFeature
        : null,
      desc: "Availability",
    },
    {
      icon: <FaCompass />,
      title: isValid(property?.propertyFacing) ? property.propertyFacing : null,
      desc: "Direction",
    },
  ].filter((item) => item.title);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6">
      {/* Heading */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-8">
        Property Highlights
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-[#FAF8FF] text-[#8A38F5] flex items-center justify-center text-xl">
              {item.icon}
            </div>

            <div className="flex flex-col gap-1 items-center text-center">
              <p className="text-sm sm:text-base font-semibold">{item.title}</p>
              <p className="text-sm sm:text-base text-[#868686]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyHighlights;
