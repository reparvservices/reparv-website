import { useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { usePropertyFilter } from "../../store/propertyFilter";
import PropertySearch from "./PropertySearch";
import { useEffect } from "react";

export default function FilterNavbar({
  searchInputRef,
  searchTerm,
  setSearchTerm,
  type = "new",
  properties = [],
}) {
  const navigate = useNavigate();
  const { propertySearch, setPropertySearch, propertyType, setPropertyType } =
    useAuth();

  const {
    selectedType,
    setSelectedType,
    selectedBHKType,
    setSelectedBHKType,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
  } = usePropertyFilter();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeButton, setActiveButton] = useState(type);

  /* ================= PROPERTY TYPE DATA ================= */

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
      category: "IndustrialSpace",
      types: ["Godown", "Cold Storage", "Small Manufacturing Unit"],
    },
  ];

  /* ================= HELPERS ================= */

  const getPropertyTypeList = () => {
    if (type === "rental") return rentalPropertyTypes;
    if (type === "resale") return resalePropertyTypes;
    return propertyTypes;
  };

  const getBHKList = () => {
    if (!selectedType) return [];
    return bhkTypes.find((b) => b.category === selectedType)?.types || [];
  };

  /* ================= RENDER ================= */

  return (
    <div className="w-full py-3 flex flex-wrap items-center gap-4 relative">
      {/* Search Input */}
      {properties.length == 0 && (
        <div className="w-full sm:max-w-[40%] flex flex-1 items-center gap-2 border border-[#D9D9D9] rounded-xl px-4 py-3 bg-white">
          <FiSearch className="text-black text-lg" />
          <input
            type="text"
            value={propertySearch}
            onChange={(e) => setPropertySearch(e.target.value)}
            placeholder="Search by location, property type or Keywords"
            className="w-full outline-none text-sm text-black bg-transparent"
          />
        </div>
      )}
      {properties.length > 0 && (
        <PropertySearch
          searchInputRef={searchInputRef || null}
          properties={properties}
          searchTerm={searchTerm || propertySearch}
          setSearchTerm={setSearchTerm || setPropertySearch}
        />
      )}

      {/* Rent / Buy Toggle */}
      <div className="hidden sm:flex p-[5px] border-1 border-[#D9D9D9] rounded-xl bg-white/20">
        <button
          onClick={() => {setActiveButton("new"); navigate("/properties/type/new");}}
          className={`px-5 py-2 rounded-xl text-sm text-black ${
            activeButton === "new" ? "bg-white font-medium shadow-sm" : ""
          }`}
        >
          New
        </button>

        <button
          onClick={() => {setActiveButton("rental"); navigate("/properties/type/rental");}}
          className={`px-5 py-2 rounded-xl text-sm text-black ${
            activeButton === "rental" ? "bg-white font-medium shadow-sm" : ""
          }`}
        >
          Rent
        </button>

        <button
          onClick={() => {setActiveButton("resale"); navigate("/properties/type/resale");}}
          className={`px-5 py-2 rounded-xl text-sm text-black ${
            activeButton === "resale" ? "bg-white font-medium shadow-sm" : ""
          }`}
        >
          Resale
        </button>
      </div>

      {/* Property Type Dropdown */}
      <div className="relative hidden sm:block">
        <button
          onClick={() =>
            setOpenDropdown(openDropdown === "type" ? null : "type")
          }
          className="flex items-center gap-2 px-4 py-3 border border-[#D9D9D9] rounded-xl text-sm font-semibold bg-white"
        >
          {selectedType || "Property Type"}
          <FiChevronDown />
        </button>

        {openDropdown === "type" && (
          <div className="absolute top-13 left-0 bg-white border rounded-xl shadow-md z-50 w-48 overflow-hidden">
            {getPropertyTypeList().map((t) => (
              <div
                key={t}
                onClick={() => {
                  setSelectedType(t);
                  setSelectedBHKType("");
                  setOpenDropdown(null);
                }}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-[#f6f3fc]"
              >
                {t}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BHK Dropdown */}
      <div className="relative hidden sm:block">
        <button
          onClick={() => setOpenDropdown(openDropdown === "bhk" ? null : "bhk")}
          disabled={
            !selectedType ||
            ![
              "NewFlat",
              "RentalFlat",
              "NewPlot",
              "CommercialFlat",
              "IndustrialSpace",
            ].includes(selectedType)
          }
          className="flex items-center gap-2 px-4 py-3 border border-[#D9D9D9] rounded-xl text-sm font-semibold disabled:opacity-50 bg-white"
        >
          {selectedBHKType || "BHK"}
          <FiChevronDown />
        </button>

        {openDropdown === "bhk" && (
          <div className="absolute top-13 left-0 bg-white border rounded-xl shadow-md z-50 w-52 max-h-60 overflow-y-auto">
            {getBHKList().map((bhk) => (
              <div
                key={bhk}
                onClick={() => {
                  setSelectedBHKType(bhk);
                  setOpenDropdown(null);
                }}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-[#f6f3fc]"
              >
                {bhk}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Budget Dropdown */}
      <div className="relative hidden sm:block">
        <button
          onClick={() =>
            setOpenDropdown(openDropdown === "budget" ? null : "budget")
          }
          className="flex items-center gap-2 px-4 py-3 border border-[#D9D9D9] rounded-xl text-sm font-semibold bg-white"
        >
          Budget
          <FiChevronDown />
        </button>

        {openDropdown === "budget" && (
          <div className="absolute top-13 right-0 bg-white border rounded-xl shadow-md z-50 p-4 w-56 space-y-3">
            <input
              type="number"
              placeholder="Min Budget"
              value={minBudget}
              onChange={(e) => setMinBudget(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-[#8A38F5]"
            />
            <input
              type="number"
              placeholder="Max Budget"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-[#8A38F5]"
            />
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={() => {
          if (selectedType) setPropertyType(selectedType);
          if (selectedBHKType) setSelectedBHKType(selectedBHKType);
          if (minBudget) setMinBudget(minBudget);
          if (maxBudget) setMaxBudget(maxBudget);

          navigate(`/properties`);
        }}
        className="hidden sm:block px-6 py-3 bg-[#8A38F5] text-white font-semibold text-sm rounded-xl active:scale-95"
      >
        Search
      </button>
    </div>
  );
}
