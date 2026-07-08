import {
  formatVerifiedStatValue,
  getPropertyImage,
  mapFaqs,
} from "./verifiedPropertiesPage";

export { formatVerifiedStatValue, getPropertyImage, mapFaqs };

const FAMILY_HERO_IMAGE = "/assets/seoPages/familyDecision/hero-family-banner.png";

const FAMILY_STORY_OVERRIDES = {
  "The Family Alignment Journey in Besa": {
    image: "/assets/seoPages/familyDecision/joint-family-besa.png",
    href: "/blog/joint-family-renting-besa-nagpur",
  },
  "Finding Shared Priorities in Manish Nagar": {
    image: "/assets/seoPages/familyDecision/finding-shared-priorities.png",
    href: "/blog/finding-shared-priorities-in-manish-nagar-a-nuclear-familys-home-buying-story",
  },
  "Balancing Safety and Budget in Manewada": {
    image:
      "https://reparv-assets.s3.ap-south-1.amazonaws.com/uploads/1783517126039-1000006845.webp",
    href: "/blog/growing-family-planning-manewada",
  },
};

function normalizeStoryImage(image) {
  if (!image) return "";

  if (typeof image === "string") {
    if (
      image.startsWith("http") ||
      image.startsWith("/") ||
      image.startsWith("data:")
    ) {
      return image;
    }
  }

  return getPropertyImage({ frontView: image });
}

export function getStoryImage(story) {
  const override = FAMILY_STORY_OVERRIDES[story?.title];
  const preferredImage = override?.image || story?.image;
  const imageSrc = normalizeStoryImage(preferredImage);

  if (imageSrc) return imageSrc;

  return "/assets/seoPages/familyDecision/hero.svg";
}

export function getHeroImage(pageData) {
  return FAMILY_HERO_IMAGE || "/assets/seoPages/familyDecision/hero.svg";
}

export function applyFamilyStoryOverrides(stories = []) {
  return stories.map((story) => {
    const override = FAMILY_STORY_OVERRIDES[story?.title];
    if (!override) return story;

    return {
      ...story,
      image: override.image || story.image,
      href: override.href || story.href,
    };
  });
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
