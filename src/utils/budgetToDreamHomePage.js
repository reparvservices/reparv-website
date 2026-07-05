import {
  formatVerifiedStatValue,
  getPropertyImage,
  mapFaqs,
} from "./verifiedPropertiesPage";

export { formatVerifiedStatValue, getPropertyImage, mapFaqs };

export function getHeroImage(pageData) {
  if (pageData?.heroProperty) {
    return getPropertyImage(pageData.heroProperty);
  }

  if (pageData?.journeys?.[0]?.image) {
    return getPropertyImage({ frontView: pageData.journeys[0].image });
  }

  return "/assets/seoPages/budgetJourney/hero.svg";
}

export function getJourneyImage(journey) {
  if (journey?.image) {
    return getPropertyImage({ frontView: journey.image });
  }

  return null;
}

export function formatBudgetRange(min, max) {
  if (min && max) {
    const minLabel = min >= 100000 ? `₹${Math.round(min / 100000)}L` : `₹${min}`;
    const maxLabel = max >= 100000 ? `₹${Math.round(max / 100000)}L` : `₹${max}`;
    return `${minLabel} - ${maxLabel}`;
  }
  return "₹12L - ₹60L";
}

export function buildBudgetPropertiesLink(city = "Nagpur", maxBudget = 6000000) {
  const params = new URLSearchParams();
  params.set("city", city);
  params.set("maxBudget", String(maxBudget));
  return `/properties?${params.toString()}`;
}

export function mapJourneyStories(journeys = []) {
  return journeys.map((journey) => ({
    label: journey.label || "A BUYER JOURNEY REVIEWED",
    name: journey.name,
    text: journey.text,
    quote: journey.quote,
    stars: 5,
    readMore: journey.propertySlug ? "View This Home →" : "Explore Homes →",
    imageRight: journey.imageRight,
    image: getJourneyImage(journey),
    href: journey.href || "/properties?city=Nagpur",
    avatar: journey.avatar || "NB",
    avatarColor: journey.avatarColor || "bg-[#4500B4]",
    location: journey.location,
    priceRange: journey.priceRange,
  }));
}
