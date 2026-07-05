import { getImageURI } from "./helper";

const CITY_ICON_MAP = {
  mumbai: "/assets/seopageassets/turstedbuilder/mumbai-icon.svg",
  delhi: "/assets/seopageassets/turstedbuilder/delhi-icon.svg",
  bangalore: "/assets/seopageassets/turstedbuilder/bangalore-icon.svg",
  pune: "/assets/seopageassets/turstedbuilder/pune-icon.svg",
};

export function getCityIcon(cityName) {
  const key = String(cityName || "")
    .trim()
    .toLowerCase();
  return CITY_ICON_MAP[key] || "/assets/seopageassets/turstedbuilder/location.svg";
}

export function formatStatValue(value) {
  const count = Number(value) || 0;
  if (count >= 100) {
    const rounded = Math.floor(count / 100) * 100;
    return `${rounded}+`;
  }
  return String(count);
}

export function formatPresenceLabel(cityCount, cityName) {
  const count = Number(cityCount) || 0;
  if (count > 1) return `${count}+ Cities`;
  if (cityName) return cityName;
  return "Pan-India";
}

export function formatExperienceYears(experience, createdAt) {
  if (experience) {
    const text = String(experience).trim();
    return /year/i.test(text) ? text : `${text}+ Years`;
  }

  if (!createdAt) return null;

  const years =
    new Date().getFullYear() - new Date(createdAt).getFullYear();

  if (years <= 0) return null;
  return `${years}+ Years`;
}

export function getBuilderImage(builder) {
  if (builder?.businessLogo) {
    return getImageURI(builder.businessLogo);
  }

  if (builder?.userimage) {
    return getImageURI(builder.userimage);
  }

  if (builder?.sampleFrontView) {
    try {
      const images = JSON.parse(builder.sampleFrontView);
      if (Array.isArray(images) && images[0]) {
        return getImageURI(images[0]);
      }
    } catch {
      // ignore invalid JSON
    }
  }

  return "/assets/seopageassets/turstedbuilder/building.svg";
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

  return "/assets/seopageassets/turstedbuilder/building.svg";
}

export function getBuilderDisplayName(builder) {
  return builder?.fullname?.trim() || "Verified Builder";
}

export function getProjectBuilderName(property) {
  return (
    property?.builderName?.trim() ||
    property?.partnerName?.trim() ||
    property?.projectBy?.trim() ||
    "Verified Builder"
  );
}

export function getBuilderLocation(builder, city) {
  const location = builder?.primaryLocation?.trim();
  const builderCity = builder?.city?.trim() || city;

  if (location && builderCity) {
    return `${location}, ${builderCity}`;
  }

  return builderCity || location || "India";
}
