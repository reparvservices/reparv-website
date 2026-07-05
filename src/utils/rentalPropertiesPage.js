import {
  formatPropertyCategory,
  formatVerifiedStatValue,
  getPropertyBadge,
  getPropertyImage,
  getPropertyLocationText,
  mapFaqs,
} from "./verifiedPropertiesPage";

export {
  formatPropertyCategory,
  formatVerifiedStatValue,
  getPropertyBadge,
  getPropertyImage,
  getPropertyLocationText,
  mapFaqs,
};

export function getPlotArea(property) {
  const area = Number(
    property?.carpetArea || property?.builtUpArea || property?.sizeAreaFeature,
  );
  return area > 0 ? Math.round(area) : null;
}

export function getMonthlyRent(property) {
  const rent = Number(property?.totalOfferPrice || property?.totalSalesPrice);
  if (!rent || rent <= 0 || rent > 100000) return null;
  return rent;
}

export function formatRentPrice(property) {
  const rent = getMonthlyRent(property);
  if (!rent) return "Price on request";
  return `₹${rent.toLocaleString("en-IN")}`;
}

export function getRentalTitle(property) {
  const bhkTypes = Array.isArray(property?.propertyType)
    ? property.propertyType.filter((item) => /bhk|room|pg/i.test(String(item)))
    : [];

  if (bhkTypes.length > 0) {
    return `${bhkTypes[0]} in ${property?.location?.trim() || property?.city || "Nagpur"}`;
  }

  return property?.propertyName || formatPropertyCategory(property?.propertyCategory);
}

export function getRentalTag(property) {
  if (property?.hotDeal?.toLowerCase() === "active") {
    return { label: "Hot Deal", color: "text-[#EF4444]" };
  }

  if (property?.topPicksStatus?.toLowerCase() === "active") {
    return { label: "Top Pick", color: "text-[#5E23DC]" };
  }

  if (String(property?.furnishingFeature || property?.furnishing || "")
    .toLowerCase()
    .includes("furnish")) {
    return { label: "Furnished", color: "text-[#5E23DC]" };
  }

  return {
    label: formatPropertyCategory(property?.propertyCategory),
    color: "text-[#5E23DC]",
  };
}

export function getBhkLabel(property) {
  const types = Array.isArray(property?.propertyType) ? property.propertyType : [];
  const bhk = types.find((item) => /bhk|room|pg/i.test(String(item)));
  return bhk || "Rental Home";
}

const BUDGET_RANGES = {
  "₹10k-20k": { min: 10000, max: 20000 },
  "₹20k-35k": { min: 20000, max: 35000 },
  "₹35k+": { min: 35000, max: Number.MAX_SAFE_INTEGER },
};

const TYPE_CATEGORY_MAP = {
  Flat: "RentalFlat",
  House: "RentalFlat",
  Commercial: "RentalOffice",
  PG: "RentalFlat",
};

export function filterRentals(rentals = [], filters = {}) {
  return rentals.filter((rental) => {
    if (filters.type && filters.type !== "Any") {
      if (filters.type === "Commercial") {
        if (
          !["RentalOffice", "RentalShop", "RentalGodown"].includes(
            rental.propertyCategory,
          )
        ) {
          return false;
        }
      } else if (filters.type === "PG") {
        const rent = getMonthlyRent(rental);
        if (!rent || rent > 15000) return false;
      } else {
        const expectedCategory = TYPE_CATEGORY_MAP[filters.type];
        if (expectedCategory && rental.propertyCategory !== expectedCategory) {
          return false;
        }
      }
    }

    const rent = getMonthlyRent(rental);
    if (filters.budget && filters.budget !== "Any") {
      const range = BUDGET_RANGES[filters.budget];
      if (range && (!rent || rent < range.min || rent > range.max)) {
        return false;
      }
    }

    if (filters.bhk && filters.bhk !== "Any") {
      const bhkTypes = Array.isArray(rental.propertyType) ? rental.propertyType : [];
      const matchesBhk = bhkTypes.some(
        (type) => String(type).toLowerCase() === String(filters.bhk).toLowerCase(),
      );
      if (!matchesBhk) return false;
    }

    if (filters.area && filters.area !== "All Areas") {
      const location = String(rental.location || "").toLowerCase();
      if (!location.includes(String(filters.area).toLowerCase())) {
        return false;
      }
    }

    if (filters.locality && filters.locality.trim()) {
      const location = String(rental.location || "").toLowerCase();
      if (!location.includes(filters.locality.trim().toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

export function buildPropertiesLink({
  city = "Nagpur",
  type = "",
  bhk = "",
  area = "",
  budget = "",
} = {}) {
  const params = new URLSearchParams();
  params.set("city", city);

  if (type === "Commercial") {
    params.set("propertyCategory", "RentalOffice");
  } else {
    params.set("propertyCategory", "RentalFlat");
  }

  if (bhk && bhk !== "Any") {
    params.set("propertyType", bhk);
  }

  if (area && area !== "All Areas") {
    params.set("location", area);
  }

  if (budget === "₹10k-20k") {
    params.set("minBudget", "10000");
    params.set("maxBudget", "20000");
  } else if (budget === "₹20k-35k") {
    params.set("minBudget", "20000");
    params.set("maxBudget", "35000");
  } else if (budget === "₹35k+") {
    params.set("minBudget", "35000");
  }

  return `/properties?${params.toString()}`;
}

export function formatRentRange(min, max) {
  if (min && max) {
    return `₹${Number(min).toLocaleString("en-IN")} - ₹${Number(max).toLocaleString("en-IN")}`;
  }
  if (min) {
    return `From ₹${Number(min).toLocaleString("en-IN")}`;
  }
  return "₹10k - ₹45k";
}
