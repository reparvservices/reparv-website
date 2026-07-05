import { getImageURI } from "./helper";

export function formatWeekendStatValue(value) {
  const count = Number(value) || 0;
  if (count >= 100) {
    return `${Math.floor(count / 100) * 100}+`;
  }
  return String(count);
}

export function getPropertyImage(property) {
  try {
    const images = JSON.parse(property?.frontView || "[]");
    if (Array.isArray(images) && images[0]) {
      return getImageURI(images[0]);
    }
  } catch {
    // ignore invalid JSON
  }

  return "/assets/property/propertyPicture.svg";
}

export function getLocalityImage(snapshot) {
  if (snapshot?.sampleFrontView) {
    try {
      const images = JSON.parse(snapshot.sampleFrontView);
      if (Array.isArray(images) && images[0]) {
        return getImageURI(images[0]);
      }
    } catch {
      // ignore invalid JSON
    }
  }

  return "/assets/seopageassets/visitproperties/banner-image.svg";
}

export function formatPropertyCategory(category) {
  return category?.replace(/([a-z])([A-Z])/g, "$1 $2") || "Property";
}

export function getPropertyBadge(property) {
  if (property?.topPicksStatus?.toLowerCase() === "active") {
    return "Top Pick";
  }

  if (property?.hotDeal?.toLowerCase() === "active") {
    return "Hot Deal";
  }

  if (property?.reparvAssured?.trim()) {
    return "Reparv Assured";
  }

  return "Verified";
}

export function getPropertyLocationText(property) {
  const location = property?.location?.trim();
  const distance = property?.distanceFromCityCenter;

  if (location && distance) {
    return `${location} (${distance} KM)`;
  }

  return location || property?.city || "Location unavailable";
}

export function getPartnerName(property) {
  return property?.partnerName?.trim() || "Reparv Partner";
}

export function formatPropertyPrice(property) {
  const price = Number(property?.totalOfferPrice || property?.totalSalesPrice);
  if (!price) return null;
  return price;
}
