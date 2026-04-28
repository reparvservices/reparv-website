import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Range } from "react-range";
import { useAuth } from "../../store/auth";
import { usePropertyFilter } from "../../store/propertyFilter";
import { IoMdClose } from "react-icons/io";

export default function FilterSidebar({ type }) {
  const {
    URI,
    propertyType,
    setPropertyType,
    selectedCity,
    setSelectedCity,
    setShowFilterPopup,
  } = useAuth();
  const {
    filteredLocations,
    setFilteredLocations,
    filteredAmenities,
    setFilteredAmenities,
    selectedType,
    setSelectedType,
    selectedBHKType,
    setSelectedBHKType,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
    resetSidebarFilter,
  } = usePropertyFilter();

  const propertyTypes = [
    "NewFlat",
    "NewPlot",
    "NewShop",
    "RowHouse",
    "Lease",
    "FarmLand",
    "FarmHouse",
    "CommercialFlat",
    "CommercialPlot",
    "IndustrialSpace",
  ];

  const resalePropertyTypes = [
    "Resale",
    "ResaleFlat",
    "ResaleHouse",
    "ResaleShop",
    "ResaleOffice",
    "ResaleFarmLand",
    "ResaleRowHouse",
    "ResaleGodown",
    "ResaleBunglow",
  ];

  const rentalPropertyTypes = [
    "RentalFlat",
    "RentalShop",
    "RentalHouse",
    "RentalOffice",
  ];

  const bhkTypes = [
    {
      category: "NewFlat",
      types: [
        "1 RK",
        "1 BHK",
        "2 BHK",
        "2.5 BHK",
        "3 BHK",
        "3.5 BHK",
        "4 BHK",
        "5 BHK",
        "Above 5 BHK",
        "Pent House",
        "Builder Floor",
        "Studio Apartment",
        "Duplex Apartment",
        "Serviced Apartment",
      ],
    },
    {
      category: "RentalFlat",
      types: [
        "1 RK",
        "1 BHK",
        "2 BHK",
        "2.5 BHK",
        "3 BHK",
        "3.5 BHK",
        "4 BHK",
        "5 BHK",
        "Above 5 BHK",
        "Pent House",
        "Builder Floor",
        "Studio Apartment",
        "Duplex Apartment",
        "Serviced Apartment",
      ],
    },
    {
      category: "NewPlot",
      types: [
        "Corner Plot",
        "Park Facing Plot",
        "Road Facing Plot",
        "Gated Community Plot",
      ],
    },
    {
      category: "CommercialFlat",
      types: [
        "Office Space",
        "Co-Working Space",
        "Corporate Office",
        "Studio Office",
      ],
    },
    {
      category: "CommercialShop",
      types: ["Shop", "Showroom", "Restaurant / Cafe", "Bank / ATM"],
    },
    {
      category: "IndustrialSpace",
      types: ["Godown", "Cold Storage", "Small Manufacturing Unit"],
    },
    {
      category: "CommercialPlot",
      types: [
        "Office Building Plot",
        "Warehouse Plot",
        "Mixed-Use Development Plot",
        "Highway-Facing Plot",
        "Petrol Pump Plot",
        "School / Hospital Plot",
      ],
    },
  ];

  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [amenities, setAmenities] = useState([
    "Parking",
    "GYM",
    "swimming",
    "Pool Security",
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [budgetRange, setBudgetRange] = useState([minBudget, maxBudget]);

  const [showLocations, setShowLocations] = useState(true);
  const [showTypes, setShowTypes] = useState(true);
  const [showBHKTypes, setShowBHKTypes] = useState(true);
  const [showAmenities, setShowAmenities] = useState(true);
  const [showBudget, setShowBudget] = useState(true);

  const MIN = 5000;
  const MAX = 1000000;
  const STEP = 10000;

  const toggleSelection = (value, setFn, list) => {
    if (list.includes(value)) {
      setFn(list.filter((item) => item !== value));
    } else {
      setFn([...list, value]);
    }
  };

  const fetchLocations = async () => {
    try {
      const queryParams = [];

      if (selectedType && selectedType.trim() !== "") {
        queryParams.push(
          `propertyCategory=${encodeURIComponent(selectedType)}`
        );
      }

      if (selectedBHKType && selectedBHKType.trim() !== "") {
        queryParams.push(`propertyType=${encodeURIComponent(selectedBHKType)}`);
      }

      if (selectedCity && selectedCity.trim() !== "") {
        queryParams.push(`city=${encodeURIComponent(selectedCity)}`);
      }

      const url = `${URI}/frontend/properties/location${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch locations.");

      const data = await response.json();
      setLocations([...data]);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setLocations([]);
    }
  };

  useEffect(() => {
    setSelectedType(propertyType);
  }, []);
  const resetFilters = () => {
    setSelectedLocations([]);
    setSelectedType("");
    setSelectedBHKType("");
    setBudgetRange([MIN, MAX]);
  };

  useEffect(() => {
    fetchLocations();
  }, [selectedType, selectedBHKType, selectedCity]);

  return (
    <div className="w-full max-h-[85vh] overflow-scroll scrollbar-hide p-5 rounded-tl-2xl rounded-tr-2xl bg-[white] space-y-4 sm:rounded-2xl">
      {/* Property Types */}
      <div className="pb-4 border-b border-[#D9D9D9]">
        <div
          className="flex sm:hidden justify-end items-center cursor-pointer pb-4"
          onClick={() => setShowTypes(!showTypes)}
        >
          <IoMdClose
            onClick={() => {
              setShowFilterPopup(false);
            }}
            className="w-5 h-5 sm:w-7 sm:h-7 rounded-sm bg-gray-100 cursor-pointer hover:text-[#8A38F5] active:scale-95"
          />
        </div>

        <div className="hidden sm:flex justify-between items-center pb-4">
          <h3 className="font-bold text-base">Filters</h3>
          <h3
            onClick={() => {
              resetFilters();
              resetSidebarFilter();
            }}
            className="font-normal text-sm cursor-pointer"
          >
            Reset All
          </h3>
        </div>

        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowTypes(!showTypes)}
        >
          <h3 className="font-bold text-base">Property Type</h3>
          {showTypes ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showTypes && (
          <div className="w-full flex flex-wrap gap-2 md:gap-2 mt-4">
            {(() => {
              let typesList = [];

              if (type === "rental") {
                typesList = rentalPropertyTypes;
              } else if (type === "resale") {
                typesList = resalePropertyTypes;
              } else if (type === "new") {
                typesList = propertyTypes;
              } else {
                typesList = propertyTypes;
              }

              return typesList?.length > 0
                ? typesList.map((t, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedType(t)}
                      className={`${
                        selectedType === t
                          ? "bg-[#8A38F5] text-white"
                          : "bg-[#FBF5FF] text-black"
                      } active:scale-95 cursor-pointer
                flex items-center justify-center px-3 py-[6px] text-xs font-medium
                rounded-xl transition`}
                    >
                      {t}
                    </div>
                  ))
                : null;
            })()}
          </div>
        )}
      </div>

      <div className="pb-4 border-b border-[#D9D9D9]">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowBHKTypes(!showBHKTypes)}
        >
          <h3 className="font-bold text-base">BHK Configuration</h3>
          {showBHKTypes ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBHKTypes && bhkTypes.length > 0 && (
          <div className="mt-3">
            {bhkTypes
              .filter((group) => group.category === selectedType)
              .map((group, i) => (
                <div key={i} className="w-full flex flex-wrap gap-2">
                  {group.types.map((type, j) => (
                    <div
                      key={j}
                      onClick={() => setSelectedBHKType(type)}
                      className={`${
                        selectedBHKType === type
                          ? "bg-[#8A38F5] text-white"
                          : "bg-[#FBF5FF] text-black"
                      } active:scale-95 cursor-pointer
                        flex items-center justify-center px-3 py-[6px] text-xs font-medium
                        rounded-lg transition`}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Budget */}
      <div className="w-full pb-4 border-b border-[#D9D9D9]">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowBudget(!showBudget)}
        >
          <h3 className="font-bold text-base">Budget Range</h3>
          {showBudget ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBudget && (
          <div className="mt-2">
            <div className="w-full flex items-center justify-between gap-4 mt-5 text-sm text-gray-700">
              <div className="flex flex-col">
                <span className="ml-1 mb-1 text-black text-xs font-semibold">
                  {" "}
                  Min{" "}
                </span>
                <input
                  type="number"
                  value={budgetRange[0]}
                  onChange={(e) =>
                    setBudgetRange([Number(e.target.value), budgetRange[1]])
                  }
                  className="w-30 sm:w-30 border text-sm sm:text-sm border-gray-300 rounded-lg px-4 py-2 sm:px-[10px] sm:py-[6px] outline-0"
                />
              </div>
              <div className="flex flex-col">
                <span className="ml-1 mb-1 text-black text-xs font-semibold">
                  {" "}
                  Max
                </span>
                <input
                  type="number"
                  value={budgetRange[1]}
                  onChange={(e) =>
                    setBudgetRange([budgetRange[0], Number(e.target.value)])
                  }
                  className="w-30 sm:w-30 border text-sm sm:text-sm border-gray-300 rounded-lg px-4 py-2 sm:px-[10px] sm:py-[6px] outline-0"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Locations */}
      <div className="pb-4 border-b border-[#D9D9D9]">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowLocations(!showLocations)}
        >
          <h3 className="font-bold text-base">Locations</h3>
          {showLocations ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showLocations && (
          <div className="space-y-2 mt-2 max-h-40 sm:max-h-35 overflow-y-auto scrollbar-hide ">
            {locations?.map((loc, i) => (
              <label
                key={i}
                className="flex items-center space-x-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() =>
                    toggleSelection(
                      loc,
                      setSelectedLocations,
                      selectedLocations
                    )
                  }
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 flex items-center justify-center rounded border-2 text-xs ${
                    selectedLocations.includes(loc)
                      ? "bg-[#8A38F5] border-[#8A38F5] text-white"
                      : "border-gray-400"
                  }`}
                >
                  {selectedLocations.includes(loc) && (
                    <FaCheck className="text-white" />
                  )}
                </span>
                <span className="text-sm sm:text-xs">{loc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="pb-4 border-b border-[#D9D9D9]">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowAmenities(!showAmenities)}
        >
          <h3 className="font-bold text-base">Amenities</h3>
          {showAmenities ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showAmenities && (
          <div className="space-y-2 mt-2 max-h-40 sm:max-h-35 overflow-y-auto scrollbar-hide ">
            {amenities?.map((loc, i) => (
              <label
                key={i}
                className="flex items-center space-x-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(loc)}
                  onChange={() =>
                    toggleSelection(
                      loc,
                      setSelectedAmenities,
                      selectedAmenities
                    )
                  }
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 flex items-center justify-center rounded border-2 text-xs ${
                    selectedAmenities.includes(loc)
                      ? "bg-[#8A38F5] border-[#8A38F5] text-white"
                      : "border-gray-400"
                  }`}
                >
                  {selectedAmenities.includes(loc) && (
                    <FaCheck className="text-white" />
                  )}
                </span>
                <span className="text-sm sm:text-xs">{loc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 pt-2 mb-8 sm:mb-2 text-sm">
        <button
          onClick={() => {
            resetFilters();
            resetSidebarFilter();
          }}
          className="flex-1 border-2 border-gray-300 bg-white text-gray-700 py-2 rounded-xl"
        >
          Reset
        </button>
        <button
          onClick={async () => {
            setPropertyType(selectedType);
            setFilteredLocations([...selectedLocations]);
            setMinBudget(budgetRange[0]);
            setMaxBudget(budgetRange[1]);
            setShowFilterPopup(false);
          }}
          className="flex-1 bg-[#8A38F5] text-white py-2 rounded-xl cursor-pointer active:scale-95"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
