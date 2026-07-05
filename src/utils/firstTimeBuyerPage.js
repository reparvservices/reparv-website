import {
  formatVerifiedStatValue,
  getPropertyImage,
  mapFaqs,
} from "./verifiedPropertiesPage";

export { formatVerifiedStatValue, getPropertyImage, mapFaqs };

const BUYER_GUIDE_KEYWORDS = [
  "first-time",
  "first time",
  "first-time buyer",
  "home buyer",
  "home buying",
  "home loan",
  "bhk",
  "nagpur",
  "ready-to-move",
  "under-construction",
  "mistake",
  "budget",
  "checklist",
];

export function filterBuyerGuides(articles = [], limit = 6) {
  const matched = articles.filter((article) => {
    const text = `${article?.tittle || ""} ${article?.description || ""}`.toLowerCase();
    return BUYER_GUIDE_KEYWORDS.some((keyword) => text.includes(keyword));
  });

  const source = matched.length >= 3 ? matched : articles;

  return source.slice(0, limit).map((article) => ({
    id: article.id,
    title: article.tittle || article.title || "Buyer Guide",
    description: article.description || "",
    seoSlug: article.seoSlug,
    image: article.image,
    href: article.seoSlug ? `/blog/${article.seoSlug}` : "/blog",
  }));
}

export function getStoryImage(story) {
  if (story?.image) {
    return getPropertyImage({ frontView: story.image });
  }

  return "/assets/seoPages/firstTimeBuyer/leftImage.svg";
}

export function getHeroImage(pageData) {
  if (pageData?.heroProperty) {
    return getPropertyImage(pageData.heroProperty);
  }

  if (pageData?.featuredStory?.image) {
    return getStoryImage(pageData.featuredStory);
  }

  return "/assets/seoPages/firstTimeBuyer/hero.svg";
}

export function formatBudgetRange(min, max) {
  if (min && max) {
    const minLabel = min >= 100000 ? `₹${Math.round(min / 100000)}L` : `₹${min}`;
    const maxLabel = max >= 100000 ? `₹${Math.round(max / 100000)}L` : `₹${max}`;
    return `${minLabel} - ${maxLabel}`;
  }
  return "₹25L - ₹60L";
}

export function buildStarterPropertiesLink(city = "Nagpur") {
  return `/properties?city=${encodeURIComponent(city)}&propertyCategory=NewFlat&maxBudget=6000000`;
}
