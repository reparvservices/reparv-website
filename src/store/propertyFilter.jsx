"use client";

import { createContext, useContext, useState } from "react";

export const PropertyFilterContext = createContext();

const DEFAULT_FILTER = {
  selectedType: "",
  selectedBHKType: "",
  filteredLocations: [],
  filteredAmenities: [],
  minBudget: 5000,
  maxBudget: 50000000,
};

export const PropertyFilterProvider = ({ children }) => {
  const [selectedType, setSelectedType] = useState(DEFAULT_FILTER.selectedType);
  const [selectedBHKType, setSelectedBHKType] = useState(DEFAULT_FILTER.selectedBHKType);
  const [filteredLocations, setFilteredLocations] = useState(DEFAULT_FILTER.filteredLocations);
  const [filteredAmenities, setFilteredAmenities] = useState(DEFAULT_FILTER.filteredAmenities);
  const [minBudget, setMinBudget] = useState(DEFAULT_FILTER.minBudget);
  const [maxBudget, setMaxBudget] = useState(DEFAULT_FILTER.maxBudget);

  // Reset all filters at once
  const resetSidebarFilter = () => {
    setSelectedType(DEFAULT_FILTER.selectedType);
    setSelectedBHKType(DEFAULT_FILTER.selectedBHKType);
    setFilteredLocations(DEFAULT_FILTER.filteredLocations);
    setFilteredAmenities(DEFAULT_FILTER.filteredAmenities);
    setMinBudget(DEFAULT_FILTER.minBudget);
    setMaxBudget(DEFAULT_FILTER.maxBudget);
  };

  return (
    <PropertyFilterContext.Provider
      value={{
        selectedType, setSelectedType,
        selectedBHKType, setSelectedBHKType,
        filteredLocations, setFilteredLocations,
        filteredAmenities, setFilteredAmenities,
        minBudget, setMinBudget,
        maxBudget, setMaxBudget,
        resetSidebarFilter,
      }}
    >
      {children}
    </PropertyFilterContext.Provider>
  );
};

export const usePropertyFilter = () => {
  return useContext(PropertyFilterContext);
};