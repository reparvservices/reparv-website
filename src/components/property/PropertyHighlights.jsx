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
  const highlights = [
    {
      icon: <FaBed />,
      title: property?.bedroomView
        ? `Bedrooms`
        : "Bedrooms",
      desc: "Spacious rooms",
    },
    {
      icon: <FaBath />,
      title: property?.bathroomView
        ? `Bathrooms`
        : "Bathrooms",
      desc: "Modern fixtures",
    },
    {
      icon: <FaRulerCombined />,
      title: (property?.carpetArea+" Sq.ft") || "Area",
      desc: property?.carpetArea && "Carpet Area",
    },
    {
      icon: <FaCar />,
      title: property?.parkingAvailability || "Parking",
      desc: "Parking facility",
    },
    {
      icon: <FaCouch />,
      title: property?.furnishing || "Furnishing",
      desc: "Interior status",
    },
    {
      icon: <FaBuilding />,
      title:
        property?.floorNo && property?.totalFloors
          ? `Floor ${property.floorNo}/${property.totalFloors}`
          : "Floor Details",
      desc: "Floor information",
    },
    {
      icon: <FaCheckCircle />,
      title: property?.propertyStatusFeature || "Property Status",
      desc: "Availability",
    },
    {
      icon: <FaCompass />,
      title: property?.propertyFacing || "Facing",
      desc: "Direction",
    },
  ].filter(
    (item) =>
      item.title && item.title !== "Bedrooms" && item.title !== "Bathrooms"
  );

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
