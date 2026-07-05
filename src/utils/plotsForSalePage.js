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

export function getPlotArea(property) {
  const area = Number(
    property?.carpetArea || property?.builtUpArea || property?.sizeAreaFeature,
  );
  return area > 0 ? Math.round(area) : null;
}

export function getPlotTitle(property) {
  return (
    property?.propertyName ||
    formatPropertyCategory(property?.propertyCategory) ||
    "Plot"
  );
}

export function getPlotLocationLine(property) {
  const location = property?.location?.trim() || property?.city || "Nagpur";
  const area = getPlotArea(property);

  if (area) {
    return `${location} • ${area.toLocaleString("en-IN")} sqft`;
  }

  return getPropertyLocationText(property);
}

const PLOT_BUDGET_RANGES = {
  "< ₹20 Lac": { min: 0, max: 2000000 },
  "₹20–40 Lac": { min: 2000000, max: 4000000 },
  "> ₹40 Lac": { min: 4000000, max: Number.MAX_SAFE_INTEGER },
};

const SIZE_RANGES = {
  "< 1000 sqft": { min: 0, max: 1000 },
  "1000–1500 sqft": { min: 1000, max: 1500 },
  "> 1500 sqft": { min: 1500, max: Number.MAX_SAFE_INTEGER },
};

const RESIDENTIAL_CATEGORIES = ["NewPlot", "FarmLand", "FarmHouse"];

export function filterPlots(plots = [], filters = {}) {
  return plots.filter((plot) => {
    if (filters.plotType && filters.plotType !== "Any") {
      const isResidential = RESIDENTIAL_CATEGORIES.includes(plot.propertyCategory);
      const isCommercial = plot.propertyCategory === "CommercialPlot";

      if (filters.plotType === "Residential" && !isResidential) return false;
      if (filters.plotType === "Commercial" && !isCommercial) return false;
    }

    const price = Number(plot.totalOfferPrice || plot.totalSalesPrice);
    if (filters.budget && filters.budget !== "Any") {
      const range = PLOT_BUDGET_RANGES[filters.budget];
      if (range && (!price || price < range.min || price > range.max)) {
        return false;
      }
    }

    const area = getPlotArea(plot);
    if (filters.size && filters.size !== "Any") {
      const range = SIZE_RANGES[filters.size];
      if (range && (!area || area < range.min || area > range.max)) {
        return false;
      }
    }

    if (filters.area && filters.area !== "All Areas") {
      const location = String(plot.location || "").toLowerCase();
      if (!location.includes(String(filters.area).toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

export function buildPropertiesLink({
  city = "Nagpur",
  plotType = "",
  area = "",
} = {}) {
  const params = new URLSearchParams();
  params.set("city", city);

  if (plotType === "Commercial") {
    params.set("propertyCategory", "CommercialPlot");
  } else if (plotType === "Residential") {
    params.set("propertyCategory", "NewPlot");
  } else {
    params.set("propertyCategory", "NewPlot");
  }

  if (area && area !== "All Areas") {
    params.set("location", area);
  }

  return `/properties?${params.toString()}`;
}

export function formatPlotStatPrice(price) {
  const value = Number(price);
  if (!value) return "Price on request";
  return formatSqftPrice(value) || "Price on request";
}

export function chunkAreaLinks(links = [], size = 4) {
  const rows = [];

  for (let index = 0; index < links.length; index += size) {
    rows.push(links.slice(index, index + size));
  }

  return rows;
}

export function formatIndianPriceShort(price) {
  const value = Number(price);
  if (!value) return "Price on request";

  const formatted = formatIndianUnit(value);
  return formatted ? `₹${formatted}` : `₹${value.toLocaleString("en-IN")}`;
}
