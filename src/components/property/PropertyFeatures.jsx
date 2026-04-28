import React, { useState } from "react";
import {
  MdOutlineLocationOn,
  MdOutlineSecurity,
  MdOutlineFireExtinguisher,
  MdOutlineVerified,
  MdTrendingUp,
  MdEco,
} from "react-icons/md";
import { BiSolidCctv } from "react-icons/bi";
import { FaParking, FaCouch, FaHome, FaMoneyBillWave } from "react-icons/fa";
import { GiGreenhouse, GiSmartphone } from "react-icons/gi";
import { BsLayers } from "react-icons/bs";

const PropertyFeatures = ({ propertyInfo }) => {
  const [activeTab, setActiveTab] = useState("amenities");

  const amenities = [
    { icon: MdOutlineLocationOn, label: "Location Advantage", key: "locationFeature" },
    { icon: FaHome, label: "Area Size", key: "sizeAreaFeature" },
    { icon: FaParking, label: "Parking Facility", key: "parkingFeature" },
    { icon: GiGreenhouse, label: "Terrace / Open Space", key: "terraceFeature" },
    { icon: MdOutlineVerified, label: "Age of Property", key: "ageOfPropertyFeature" },
    { icon: FaCouch, label: "Furnishing", key: "furnishingFeature" },
    { icon: MdOutlineSecurity, label: "Amenities & Security", key: "amenitiesFeature" },
    { icon: MdOutlineFireExtinguisher, label: "Property Status", key: "propertyStatusFeature" },
    { icon: BsLayers, label: "Floor Number", key: "floorNumberFeature" },
    { icon: GiSmartphone, label: "Smart Home Features", key: "smartHomeFeature" },
  ];

  const benefits = [
    { icon: MdOutlineSecurity, label: "Safe & Secure Investment", key: "securityBenefit" },
    { icon: MdOutlineLocationOn, label: "Prime Location Advantage", key: "primeLocationBenefit" },
    { icon: FaMoneyBillWave, label: "Rental Income Potential", key: "rentalIncomeBenefit" },
    { icon: MdOutlineVerified, label: "Construction Quality", key: "qualityBenefit" },
    { icon: MdTrendingUp, label: "Capital Appreciation", key: "capitalAppreciationBenefit" },
    { icon: MdEco, label: "Eco-Friendly Living", key: "ecofriendlyBenefit" },
  ];

  const data = activeTab === "amenities" ? amenities : benefits;

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
        Amenities & Benefits
      </h2>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-b-[#D9D9D9] mb-6">
        {["amenities", "benefits"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-base font-bold relative ${
              activeTab === tab ? "text-[#8A38F5]" : "text-[#868686]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute left-0 bottom-[-1px] h-[2px] w-full bg-[#8A38F5]" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-y-5 gap-x-10">
        {data.map(({ icon: Icon, key, label }) => {
          const value = propertyInfo?.[key];

          // ❌ skip if no value
          if (!value || typeof value !== "string") return null;

          const items = value.split(",").map((v) => v.trim()).filter(Boolean);

          return (
            <div key={key} className="flex gap-3 text-xs sm:text-sm">
              <Icon className="text-[#8A38F5] text-lg sm:text-xl mt-1" />

              <div className="text-black font-semibold space-y-1">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-1">
                    <span>{i + 1})</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyFeatures;