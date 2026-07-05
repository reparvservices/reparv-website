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

export function formatSqftPrice(value) {
  const price = Number(value);
  if (!price || Number.isNaN(price)) return null;

  if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1).replace(/\.0$/, "")}k/sqft`;
  }

  return `₹${Math.round(price)}/sqft`;
}

export function getFlatTitle(property) {
  const bhkTypes = Array.isArray(property?.propertyType)
    ? property.propertyType.filter((item) => /bhk/i.test(String(item)))
    : [];

  if (bhkTypes.length > 0) {
    return `${bhkTypes[0]} ${formatPropertyCategory(property?.propertyCategory)}`;
  }

  return property?.propertyName || formatPropertyCategory(property?.propertyCategory);
}

export function getProjectImage(project) {
  if (project?.frontView) {
    try {
      const images = JSON.parse(project.frontView);
      if (Array.isArray(images) && images[0]) {
        return getPropertyImage({ frontView: project.frontView });
      }
    } catch {
      // ignore invalid JSON
    }
  }

  return "/assets/property/propertyPicture.svg";
}

const BUDGET_RANGES = {
  "₹20-40L": { min: 2000000, max: 4000000 },
  "₹40-60L": { min: 4000000, max: 6000000 },
  "₹60-80L": { min: 6000000, max: 8000000 },
  "₹80L+": { min: 8000000, max: Number.MAX_SAFE_INTEGER },
};

export function filterFlats(flats = [], filters = {}) {
  return flats.filter((flat) => {
    if (filters.bhk && filters.bhk !== "Any") {
      const bhkTypes = Array.isArray(flat.propertyType) ? flat.propertyType : [];
      const matchesBhk = bhkTypes.some(
        (type) => String(type).toLowerCase() === String(filters.bhk).toLowerCase(),
      );
      if (!matchesBhk) return false;
    }

    const price = Number(flat.totalOfferPrice || flat.totalSalesPrice);
    if (filters.budget && filters.budget !== "Any") {
      const range = BUDGET_RANGES[filters.budget];
      if (range && (!price || price < range.min || price > range.max)) {
        return false;
      }
    }

    if (filters.status && filters.status !== "Any") {
      const status = String(flat.propertyStatusFeature || "").toLowerCase();

      if (filters.status === "Ready to Move" && !status.includes("ready to move")) {
        return false;
      }

      if (
        filters.status === "Under Construction" &&
        !status.includes("under construction")
      ) {
        return false;
      }

      if (
        filters.status === "New Launch" &&
        !(
          flat.propertyCategory === "NewFlat" &&
          status.includes("under construction")
        )
      ) {
        return false;
      }
    }

    if (filters.area && filters.area !== "All Areas") {
      const location = String(flat.location || "").toLowerCase();
      if (!location.includes(String(filters.area).toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

export function buildPropertiesLink({
  city = "Nagpur",
  bhk = "",
  status = "",
  area = "",
} = {}) {
  const params = new URLSearchParams();
  params.set("city", city);
  params.set("propertyCategory", "NewFlat");

  if (bhk && bhk !== "Any" && bhk !== "Select BHK") {
    params.set("propertyType", bhk);
  }

  if (area && area !== "All Areas") {
    params.set("location", area);
  }

  if (status === "Ready to Move") {
    params.set("status", "ready-to-move");
  } else if (status === "Under Construction") {
    params.set("status", "under-construction");
  }

  return `/properties?${params.toString()}`;
}

export function formatFlatStatPrice(price) {
  const value = Number(price);
  if (!value) return "Price on request";
  return formatSqftPrice(value) || "Price on request";
}

export function formatIndianPriceShort(price) {
  const value = Number(price);
  if (!value) return "Price on request";

  const formatted = formatIndianUnit(value);
  return formatted ? `₹${formatted}` : `₹${value.toLocaleString("en-IN")}`;
}

export function chunkAreaLinks(links = [], size = 4) {
  const rows = [];

  for (let index = 0; index < links.length; index += size) {
    rows.push(links.slice(index, index + size));
  }

  return rows;
}
