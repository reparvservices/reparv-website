import {
  formatVerifiedStatValue,
  getPropertyImage,
  mapFaqs,
} from "./verifiedPropertiesPage";

export { formatVerifiedStatValue, getPropertyImage, mapFaqs };

export function getStoryImage(story) {
  if (story?.image) {
    return getPropertyImage({ frontView: story.image });
  }

  return "/assets/seoPages/familyDecision/hero.svg";
}

export function getHeroImage(pageData) {
  if (pageData?.heroProperty) {
    return getPropertyImage(pageData.heroProperty);
  }

  if (pageData?.stories?.[0]?.image) {
    return getStoryImage(pageData.stories[0]);
  }

  return "/assets/seoPages/familyDecision/hero.svg";
}

export function buildFamilyPropertiesLink(city = "Nagpur", area = "") {
  const params = new URLSearchParams();
  params.set("city", city);
  params.set("propertyCategory", "NewFlat");

  if (area) {
    params.set("location", area);
  }

  return `/properties?${params.toString()}`;
}

export function formatBudgetRange(min, max) {
  if (min && max) {
    const minLabel = min >= 100000 ? `₹${Math.round(min / 100000)}L` : `₹${min}`;
    const maxLabel = max >= 100000 ? `₹${Math.round(max / 100000)}L` : `₹${max}`;
    return `${minLabel} - ${maxLabel}`;
  }
  return "₹30L - ₹80L";
}
