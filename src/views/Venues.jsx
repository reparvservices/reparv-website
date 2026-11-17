"use client";

import React, { useMemo, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useLayoutScroll } from "../context/LayoutScrollContext";
import VenueCard from "../components/venue/VenueCard";
import PropertyCategories from "../components/PropertyCategories";
import AdvertisementCard from "../components/AdvertisementCard";

const TYPES = ["villa", "hall", "banquet", "farmhouse", "resort", "lawn", "other"];
const PAGE_STEP = 6;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1000000;

function Section({ title, open, onToggle, children }) {
  return (
    <div className="pb-4 border-b border-[#D9D9D9]">
      <div
        onClick={onToggle}
        className="flex justify-between items-center cursor-pointer pb-3"
      >
        <h3 className="font-bold text-base">{title}</h3>
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {open && children}
    </div>
  );
}

function Sidebar({
  cities,
  selectedTypes,
  setSelectedTypes,
  selectedCities,
  setSelectedCities,
  minGuests,
  setMinGuests,
  minBudget,
  setMinBudget,
  maxBudget,
  setMaxBudget,
  onReset,
  onClose,
}) {
  const [showTypes, setShowTypes] = useState(true);
  const [showGuests, setShowGuests] = useState(true);
  const [showBudget, setShowBudget] = useState(true);
  const [showCities, setShowCities] = useState(true);

  const toggle = (value, list, setList) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <div className="w-full max-h-[85vh] overflow-scroll scrollbar-hide p-5 rounded-tl-2xl rounded-tr-2xl bg-[white] space-y-4 sm:rounded-2xl">
      <div className="flex sm:hidden justify-end items-center pb-2">
        <IoMdClose
          onClick={onClose}
          className="w-5 h-5 rounded-sm bg-gray-100 cursor-pointer hover:text-[#8A38F5] active:scale-95"
        />
      </div>

      <div className="flex justify-between items-center pb-2">
        <h3 className="font-bold text-base">Filters</h3>
        <h3 onClick={onReset} className="font-normal text-sm cursor-pointer">
          Reset All
        </h3>
      </div>

      <Section title="Venue Type" open={showTypes} onToggle={() => setShowTypes(!showTypes)}>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => toggle(t, selectedTypes, setSelectedTypes)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                selectedTypes.includes(t)
                  ? "bg-[#8A38F5] text-white"
                  : "bg-[#8a38f51a] text-black"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Guests" open={showGuests} onToggle={() => setShowGuests(!showGuests)}>
        <input
          type="number"
          min={1}
          value={minGuests}
          placeholder="Minimum guests"
          onChange={(e) => setMinGuests(e.target.value)}
          className="w-full border border-[#D9D9D9] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8A38F5]"
        />
      </Section>

      <Section title="Budget Range" open={showBudget} onToggle={() => setShowBudget(!showBudget)}>
        <div className="flex gap-3">
          <div className="w-1/2">
            <p className="text-sm mb-1">Min</p>
            <input
              type="number"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
              className="w-full border border-[#D9D9D9] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8A38F5]"
            />
          </div>
          <div className="w-1/2">
            <p className="text-sm mb-1">Max</p>
            <input
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full border border-[#D9D9D9] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8A38F5]"
            />
          </div>
        </div>
      </Section>

      <Section title="Locations" open={showCities} onToggle={() => setShowCities(!showCities)}>
        <div className="space-y-2">
          {cities.length === 0 && <p className="text-sm text-[#868686]">No locations yet</p>}
          {cities.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm capitalize cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCities.includes(c)}
                onChange={() => toggle(c, selectedCities, setSelectedCities)}
                className="accent-[#8A38F5] w-4 h-4"
              />
              {c}
            </label>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default function Venues({ initialVenues = [] }) {
  const { isIntersecting } = useLayoutScroll();
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [minGuests, setMinGuests] = useState("");
  const [minBudget, setMinBudget] = useState(DEFAULT_MIN);
  const [maxBudget, setMaxBudget] = useState(DEFAULT_MAX);
  const [sortBy, setSortBy] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const cities = useMemo(
    () => [...new Set(initialVenues.map((v) => v.city).filter(Boolean))].sort(),
    [initialVenues],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = initialVenues.filter((v) => {
      if (q && !`${v.title} ${v.city} ${v.address || ""} ${v.type}`.toLowerCase().includes(q)) return false;
      if (selectedTypes.length && !selectedTypes.includes(v.type)) return false;
      if (selectedCities.length && !selectedCities.includes(v.city)) return false;
      if (minGuests && v.capacity < Number(minGuests)) return false;
      if (Number(v.base_price) < Number(minBudget || 0)) return false;
      if (Number(v.base_price) > Number(maxBudget || DEFAULT_MAX)) return false;
      return true;
    });
    const sorters = {
      latest: (a, b) => b.id - a.id,
      price_low: (a, b) => a.base_price - b.base_price,
      price_high: (a, b) => b.base_price - a.base_price,
      guests_high: (a, b) => b.capacity - a.capacity,
    };
    return sorters[sortBy] ? [...list].sort(sorters[sortBy]) : list;
  }, [initialVenues, search, selectedTypes, selectedCities, minGuests, minBudget, maxBudget, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  const reset = () => {
    setSelectedTypes([]);
    setSelectedCities([]);
    setMinGuests("");
    setMinBudget(DEFAULT_MIN);
    setMaxBudget(DEFAULT_MAX);
    setSearch("");
  };

  const sidebarProps = {
    cities,
    selectedTypes,
    setSelectedTypes,
    selectedCities,
    setSelectedCities,
    minGuests,
    setMinGuests,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
    onReset: reset,
  };

  return (
    <>
      <div className="properties w-full max-w-[1400px] flex flex-col p-4 sm:py-4 sm:px-0 mx-auto bg-[#f8f3fb]">
        {/* Search bar */}
        <div className="w-full flex flex-wrap gap-3 justify-between sm:justify-end sm:py-2 sm:px-5">
          <div className="w-full flex gap-2 items-center justify-between sm:justify-end">
            <div className="w-full sm:max-w-[640px] flex items-center gap-3 px-4 py-3 bg-white border border-[#D9D9D9] rounded-xl shadow-sm">
              <FiSearch className="text-[#868686]" size={20} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search villas, halls and venues..."
                className="w-full outline-none text-sm text-black bg-transparent"
              />
            </div>
            <div
              onClick={() => setShowFilterPopup(true)}
              className="cursor-pointer filterIcon p-[12px] bg-white border border-gray-300 rounded-md flex sm:hidden items-center justify-center shadow"
            >
              <IoFilter />
            </div>
          </div>
        </div>

        <div className="relative w-full min-h-[77vh] flex gap-5 py-4 sm:p-4">
          {/* Filter sidebar (desktop) */}
          <div
            className={`${isIntersecting ? "absolute bottom-0 " : "fixed"}
          propertiesFilter overflow-y-scroll overflow-x-visible scrollbar-hide hidden sm:block
          !min-w-[300px] w-[300px] h-[75vh] pb-10 transition-all duration-300 sm:rounded-2xl`}
          >
            <Sidebar {...sidebarProps} />
          </div>

          {/* Grid */}
          <div className="w-full overflow-scroll scrollbar-hide sm:pl-[330px] flex flex-col">
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 items-end justify-between text-base sm:text-xl">
              <div className="flex flex-row gap-1 sm:gap-0 sm:flex-col items-center sm:items-start justify-end">
                <h2 className="text-black font-bold">{filtered.length} Venues Found</h2>
                <h1 className="text-base sm:text-sm lg:text-base text-[#606060] font-semibold mr-3">
                  <span className="text-[#888888] sm:font-normal capitalize">
                    {selectedCities.length ? "in " + selectedCities.join(", ") : "Villas, halls & more"}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 sm:py-3 border border-gray-300 bg-white rounded-lg">
                <label className="text-sm sm:text-base font-medium text-gray-600">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm sm:text-base focus:outline-none pr-2 font-bold"
                >
                  <option value="">Relevance</option>
                  <option value="latest">Latest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="guests_high">Guests: Most first</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-4">
              {filtered.length > 0 ? (
                visible.map((venue, index) => (
                  <React.Fragment key={venue.id}>
                    <VenueCard venue={venue} />
                    {(index + 1) % 6 === 0 && (
                      <div className="col-span-full">
                        <AdvertisementCard variant="seoDisplay" className="mb-0" />
                      </div>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <h1 className="text-2xl font-bold m-4">No Venues Found</h1>
              )}
            </div>

            {filtered.length > visibleCount && (
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_STEP)}
                  className="px-6 py-2 border border-[#8A38F5] font-semibold rounded-full bg-white text-[#8A38F5] hover:bg-purple-50 shadow cursor-pointer"
                >
                  Load More Venues
                </button>
              </div>
            )}
            <div className="w-full hidden md:block h-[1px] mt-5 bg-[#00000033]"></div>
            <PropertyCategories />
            <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 mt-4 pb-4">
              <AdvertisementCard className="mb-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters (mobile) */}
      {showFilterPopup && (
        <div className="fixed inset-0 z-[60] flex items-end bg-black/40 sm:hidden">
          <div className="w-full max-h-[90vh]">
            <Sidebar {...sidebarProps} onClose={() => setShowFilterPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
}
