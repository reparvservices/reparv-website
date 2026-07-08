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
  if (typeof story?.image === "string" && story.image.startsWith("http")) {
    return story.image;
  }

  if (story?.image) {
    return getPropertyImage({ frontView: story.image });
  }

  return "/assets/seoPages/firstTimeBuyer/leftImage.svg";
}

const HERO_IMAGE = "/assets/seoPages/firstTimeBuyer/hero-family.png";

export function getHeroImage() {
  return HERO_IMAGE;
}

export const STORY_BLOG_LINKS = {
  "The Path to Multi-Generational Harmony":
    "/blog/joint-family-besa-from-renting-to-their-own-3bhk-flat-in-nagpur",
  "Overcoming Feature Creep":
    "/blog/nuclear-family-it-sector-manish-nagar-overcoming-feature-creep",
  "Financial Readiness":
    "/blog/single-professional-buys-first-home-in-jaitala-nagpur-reparv-story",
};

export const FIRST_TIME_BUYER_STORIES = {
  featured: {
    tags: ["Joint Family", "Renting"],
    location: "Besa",
    title: "The Path to Multi-Generational Harmony",
    clarityMoment:
      "Area comparison aligned expectations across the family. Feeling aligned mattered more than price.",
    stressPhase:
      "Repeated discussions, delays, and growing self-doubt over six months of searching.",
    priceRange: "₹42 Lakh - ₹54 Lakh",
    image:
      "https://reparv-assets.s3.ap-south-1.amazonaws.com/uploads/1783425905485-From Renting to Their Own 3BHK Flat in Nagpur.webp",
    href: STORY_BLOG_LINKS["The Path to Multi-Generational Harmony"],
  },
  stories: [
    {
      meta: "Nuclear Family · Manish Nagar · IT Sector",
      title: "Overcoming Feature Creep",
      points: [
        'Realized "Must-haves" vs "Nice-to-haves"',
        "Balancing commute with community",
        "Found peace in an established neighbourhood",
      ],
      priceRange: "₹45 Lakh - ₹59 Lakh",
      image:
        "https://reparv-assets.s3.ap-south-1.amazonaws.com/uploads/1783429379895-Nuclear Family  IT Sector  Manish Nagar Overcoming Feature Creep.webp",
      href: STORY_BLOG_LINKS["Overcoming Feature Creep"],
    },
    {
      meta: "Single Professional · Jaitala · First Purchase",
      title: "Financial Readiness",
      points: [
        "Understanding hidden closing costs",
        'The "Safe" budget vs "Bank" budget',
        "Navigating EMI anxiety with a clear plan",
      ],
      priceRange: "₹23 Lakh - ₹56 Lakh",
      image:
        "https://reparv-assets.s3.ap-south-1.amazonaws.com/uploads/1783430467791-Single Professional Buys First Home in Jaitala, Nagpur .webp",
      href: STORY_BLOG_LINKS["Financial Readiness"],
    },
  ],
};

export function getStoryHref(story) {
  return STORY_BLOG_LINKS[story?.title] || story?.href || "/first-time-buyer";
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
