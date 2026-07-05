import { formatIndianUnit } from "./helper";
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

export function getProjectImage(project) {
  if (project?.frontView) {
    return getPropertyImage({ frontView: project.frontView });
  }

  if (project?.sampleFrontView) {
    return getPropertyImage({ frontView: project.sampleFrontView });
  }

  return "/assets/property/propertyPicture.svg";
}

export function formatProjectPrice(property) {
  const price = Number(property?.totalOfferPrice || property?.totalSalesPrice);
  if (!price) return "Price on request";

  if (price >= 100000) {
    return `₹${Math.round(price / 100000)} Lakh`;
  }

  const formatted = formatIndianUnit(price);
  return formatted ? `₹${formatted}` : `₹${price.toLocaleString("en-IN")}`;
}

export function getProjectBhk(property) {
  const types = Array.isArray(property?.propertyType) ? property.propertyType : [];
  const bhk = types.find((item) => /bhk/i.test(String(item)));
  return bhk || "New Launch";
}

const BUDGET_RANGES = {
  "₹20-40L": { min: 2000000, max: 4000000 },
  "₹40-60L": { min: 4000000, max: 6000000 },
  "₹60-80L": { min: 6000000, max: 8000000 },
  "₹80L+": { min: 8000000, max: Number.MAX_SAFE_INTEGER },
};

export function filterProjects(projects = [], filters = {}) {
  return projects.filter((project) => {
    if (filters.name && filters.name.trim()) {
      const query = filters.name.trim().toLowerCase();
      const haystack = `${project.propertyName || ""} ${project.location || ""} ${project.partnerName || ""}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    const price = Number(project.totalOfferPrice || project.totalSalesPrice);
    if (filters.budget && filters.budget !== "Any") {
      const range = BUDGET_RANGES[filters.budget];
      if (range && (!price || price < range.min || price > range.max)) {
        return false;
      }
    }

    if (filters.unit && filters.unit !== "Any") {
      const bhkTypes = Array.isArray(project.propertyType) ? project.propertyType : [];
      const matchesUnit = bhkTypes.some(
        (type) => String(type).toLowerCase() === String(filters.unit).toLowerCase(),
      );
      if (!matchesUnit) return false;
    }

    if (filters.area && filters.area !== "All Areas") {
      const location = String(project.location || "").toLowerCase();
      if (!location.includes(String(filters.area).toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

export function buildPropertiesLink({
  city = "Nagpur",
  unit = "",
  area = "",
  budget = "",
} = {}) {
  const params = new URLSearchParams();
  params.set("city", city);
  params.set("propertyCategory", "NewFlat");
  params.set("status", "under-construction");

  if (unit && unit !== "Any") {
    params.set("propertyType", unit);
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

export function mapFeaturedProject(property) {
  if (property?.name) return property;

  const bhk = getProjectBhk(property);
  const status = String(property?.propertyStatusFeature || "").toLowerCase();
  let phase = "New Launch";

  if (property?.hotDeal?.toLowerCase() === "active") {
    phase = "Hot Deal";
  } else if (status.includes("under construction")) {
    phase = "Under Construction";
  }

  return {
    propertyid: property.propertyid,
    seoSlug: property.seoSlug,
    name: property.propertyName,
    location: property.location,
    price: formatProjectPrice(property),
    beds: bhk,
    bhk,
    phase,
    possessionDate: property.possessionDate || null,
    frontView: property.frontView,
    partnerName: property.partnerName,
  };
}

export function formatIndianPriceShort(price) {
  const value = Number(price);
  if (!value) return null;

  const formatted = formatIndianUnit(value);
  return formatted ? `₹${formatted}` : `₹${value.toLocaleString("en-IN")}`;
}
