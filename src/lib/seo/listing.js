import { parsePropertiesRouteParams } from "../parsePropertySlug";
import { buildPageMetadata } from "./metadata";

function formatSegment(value) {
  if (!value) return "";
  return decodeURIComponent(String(value)).replace(/-/g, " ").trim();
}

export function buildListingPageMetadata({ params = {}, path }) {
  const route = parsePropertiesRouteParams(params);
  const cityName = formatSegment(route.city) || "Nagpur";
  const category =
    route.propertyCategory && route.propertyCategory !== "properties"
      ? formatSegment(route.propertyCategory)
      : "";
  const bhk = route.propertyType ? formatSegment(route.propertyType) : "";
  const listingType = params.listingType
    ? formatSegment(params.listingType)
    : "";

  let title;
  let description;
  let keywords;

  if (bhk && category) {
    title = `${bhk} ${category} in ${cityName} | Verified Properties`;
    description = `Browse verified ${bhk} ${category} listings in ${cityName}. View photos, prices, and locations on Reparv.`;
    keywords = `${bhk}, ${category}, ${cityName}, property, Reparv`;
  } else if (category) {
    title = `${category} in ${cityName} | Verified Properties`;
    description = `Explore verified ${category} properties in ${cityName}. Compare listings with photos, pricing, and locality details on Reparv.`;
    keywords = `${category}, ${cityName}, property listings, Reparv`;
  } else if (listingType) {
    title = `${listingType} Properties in ${cityName}`;
    description = `Find verified ${listingType} properties in ${cityName}. Browse listings with pricing, photos, and location on Reparv.`;
    keywords = `${listingType}, ${cityName}, properties, Reparv`;
  } else {
    title = `Properties in ${cityName} | Verified Listings`;
    description = `Discover verified properties in ${cityName}. Buy, rent, or explore homes, flats, and plots on Reparv.`;
    keywords = `${cityName}, properties, real estate, Reparv`;
  }

  return buildPageMetadata({
    title,
    description,
    keywords,
    path,
  });
}
