import { formatIndianUnit } from "./helper";
import {
  formatPriceLabel,
  formatPropertyCategory,
  formatVerifiedStatValue,
  getPropertyBadge,
  getPropertyImage,
  getPropertyLocationText,
  mapFaqs,
} from "./verifiedPropertiesPage";

export {
  formatPriceLabel,
  formatPropertyCategory,
  formatVerifiedStatValue,
  getPropertyBadge,
  getPropertyImage,
  getPropertyLocationText,
  mapFaqs,
};

const BUDGET_RANGES = {
  "₹20-40L": { min: 2000000, max: 4000000 },
  "₹40-60L": { min: 4000000, max: 6000000 },
  "₹60-80L": { min: 6000000, max: 8000000 },
  "₹80L+": { min: 8000000, max: Number.MAX_SAFE_INTEGER },
};

const TYPE_CATEGORY_MAP = {
  Flat: ["NewFlat", "ResaleFlat", "Resale"],
  "Row House": ["RowHouse"],
  Plot: ["NewPlot", "CommercialPlot", "FarmLand", "FarmHouse"],
  Commercial: ["CommercialFlat"],
};

export function getReadyHomeTitle(property) {
  const bhkTypes = Array.isArray(property?.propertyType)
    ? property.propertyType.filter((item) => /bhk/i.test(String(item)))
    : [];

  if (bhkTypes.length > 0) {
    return `${bhkTypes[0]} ${formatPropertyCategory(property?.propertyCategory)}`;
  }

  return property?.propertyName || formatPropertyCategory(property?.propertyCategory);
}

export function getAreaImage(area) {
  if (area?.sampleFrontView) {
    return getPropertyImage({ frontView: area.sampleFrontView });
  }

  return "/assets/property/propertyPicture.svg";
}

export function filterReadyHomes(properties = [], filters = {}) {
  return properties.filter((property) => {
    if (filters.type && filters.type !== "Any") {
      const allowed = TYPE_CATEGORY_MAP[filters.type] || [];
      if (allowed.length && !allowed.includes(property.propertyCategory)) {
        return false;
      }
    }

    const price = Number(property.totalOfferPrice || property.totalSalesPrice);
    if (filters.budget && filters.budget !== "Any") {
      const range = BUDGET_RANGES[filters.budget];
      if (range && (!price || price < range.min || price > range.max)) {
        return false;
      }
    }

    if (filters.bhk && filters.bhk !== "Any") {
      const bhkTypes = Array.isArray(property.propertyType) ? property.propertyType : [];
      const matchesBhk = bhkTypes.some(
        (type) => String(type).toLowerCase() === String(filters.bhk).toLowerCase(),
      );
      if (!matchesBhk) return false;
    }

    if (filters.area && filters.area !== "All Areas") {
      const location = String(property.location || "").toLowerCase();
      if (!location.includes(String(filters.area).toLowerCase())) {
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
  params.set("status", "ready-to-move");

  if (type === "Flat") {
    params.set("propertyCategory", "NewFlat");
  } else if (type === "Row House") {
    params.set("propertyCategory", "RowHouse");
  } else if (type === "Plot") {
    params.set("propertyCategory", "NewPlot");
  } else if (type === "Commercial") {
    params.set("propertyCategory", "CommercialFlat");
  }

  if (bhk && bhk !== "Any") {
    params.set("propertyType", bhk);
  }

  if (area && area !== "All Areas") {
    params.set("location", area);
  }

  if (budget === "₹20-40L") {
    params.set("minBudget", "2000000");
    params.set("maxBudget", "4000000");
  } else if (budget === "₹40-60L") {
    params.set("minBudget", "4000000");
    params.set("maxBudget", "6000000");
  } else if (budget === "₹60-80L") {
    params.set("minBudget", "6000000");
    params.set("maxBudget", "8000000");
  } else if (budget === "₹80L+") {
    params.set("minBudget", "8000000");
  }

  return `/properties?${params.toString()}`;
}

export function formatIndianPriceShort(price) {
  const value = Number(price);
  if (!value) return "Price on request";

  const formatted = formatIndianUnit(value);
  return formatted ? `₹${formatted}` : `₹${value.toLocaleString("en-IN")}`;
}
