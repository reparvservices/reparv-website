import React from "react";

const PropertyOverview = ({ propertyInfo }) => {
  const hideExtraDetails = ["NewPlot", "CommercialPlot", "RentalLand"].includes(
    propertyInfo?.propertyCategory,
  );

  const leftColumn = [
    { label: "Property Type", value: propertyInfo.propertyType },

    // Furnishing hidden for plots/land
    !hideExtraDetails && {
      label: "Furnishing",
      value: propertyInfo.furnishing,
    },

    { label: "Facing", value: propertyInfo.propertyFacing },

    // Parking hidden for plots/land
    !hideExtraDetails && {
      label: "Parking",
      value: propertyInfo.parkingAvailability,
    },

    { label: "Water Supply", value: propertyInfo.waterSupply },
    { label: "RERA Registered", value: propertyInfo.reraRegistered },
  ].filter(Boolean);

  const rightColumn = [
    { label: "Carpet Area", value: propertyInfo.carpetArea + " sq.ft" },

    // Floor hidden for plots/land
    !hideExtraDetails && {
      label: "Floor",
      value:
        propertyInfo.floorNo && propertyInfo.totalFloors
          ? `${propertyInfo.floorNo} out of ${propertyInfo.totalFloors}`
          : null,
    },

    // Age of Property hidden for plots/land
    !hideExtraDetails && {
      label: "Age of Property",
      value: propertyInfo.builtYear
        ? `${new Date().getFullYear() - propertyInfo.builtYear} Years`
        : null,
    },

    { label: "Loan Availability", value: propertyInfo.loanAvailability },
    { label: "Power Backup", value: propertyInfo.powerBackup },
  ].filter(Boolean);
  const Row = ({ label, value, isLast }) => (
    <div
      className={`flex justify-between items-center py-4 border-b border-gray-200`}
    >
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-black font-semibold text-sm">{value || "—"}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">
        Property Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        {/* Left Column */}
        <div>
          {leftColumn.map((item, index) => (
            <Row
              key={index}
              label={item.label}
              value={item.value || "_"}
              isLast={index === leftColumn.length - 1}
            />
          ))}
        </div>

        {/* Right Column */}
        <div>
          {rightColumn.map((item, index) => (
            <Row
              key={index}
              label={item.label}
              value={item.value || "_"}
              isLast={index === rightColumn.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;
