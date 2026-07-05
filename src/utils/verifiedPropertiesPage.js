import { getImageURI, formatIndianUnit } from "./helper";

export function formatVerifiedStatValue(value) {
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

export function formatPropertyCategory(category) {
  return category?.replace(/([a-z])([A-Z])/g, "$1 $2") || "Property";
}

export function getPropertyBadge(property) {
  if (property?.topPicksStatus?.toLowerCase() === "active") {
    return { label: "Top Pick", color: "bg-[#8A38F5]" };
  }

  if (property?.hotDeal?.toLowerCase() === "active") {
    return { label: "Hot Deal", color: "bg-[#EF4444]" };
  }

  if (String(property?.propertyStatusFeature || "")
    .toLowerCase()
    .includes("ready to move")) {
    return { label: "Ready to Move", color: "bg-[#10B981]" };
  }

  if (
    property?.propertyCategory === "NewFlat" &&
    String(property?.propertyStatusFeature || "")
      .toLowerCase()
      .includes("under construction")
  ) {
    return { label: "New Launch", color: "bg-[#8A38F5]" };
  }

  if (property?.reparvAssured?.trim()) {
    return { label: "Reparv Assured", color: "bg-[#8A38F5]" };
  }

  return { label: "Verified", color: "bg-[#8A38F5]" };
}

export function getPropertyLocationText(property) {
  const location = property?.location?.trim();
  const distance = property?.distanceFromCityCenter;

  if (location && distance) {
    return `${location} (${distance} KM)`;
  }

  return location || property?.city || "Nagpur";
}

export function getPartnerName(property) {
  return property?.partnerName?.trim() || "Reparv Partner";
}

export function formatPropertyPrice(property) {
  const price = Number(property?.totalOfferPrice || property?.totalSalesPrice);
  if (!price) return null;
  return price;
}

export function formatPriceLabel(property) {
  const price = formatPropertyPrice(property);
  if (!price) return "Price on request";

  const formatted = formatIndianUnit(price);
  return formatted ? `₹${formatted}` : `₹${price.toLocaleString("en-IN")}`;
}

export function getHeroStatusLabel(property) {
  if (
    String(property?.propertyStatusFeature || "")
      .toLowerCase()
      .includes("under construction")
  ) {
    return "Upcoming Project";
  }

  if (
    String(property?.propertyStatusFeature || "")
      .toLowerCase()
      .includes("ready to move")
  ) {
    return "Ready to Move";
  }

  return "Featured Property";
}

export function getBlogInsightTag(title = "") {
  const text = title.toLowerCase();

  if (text.includes("loan") || text.includes("registry") || text.includes("legal")) {
    return "Legal Corner";
  }

  if (text.includes("guide") || text.includes("how") || text.includes("vs")) {
    return "Buying Guide";
  }

  return "Market Trends";
}

export function mapBlogInsights(articles = [], limit = 3) {
  return articles.slice(0, limit).map((article) => ({
    tag: getBlogInsightTag(article.tittle),
    title: article.tittle,
    desc:
      article.seoDescription ||
      "Expert guidance to help you make smarter property decisions in Nagpur.",
    href: `/blog/${article.seoSlug}`,
    image: article.image ? getImageURI(article.image) : null,
  }));
}

export function mapFaqs(faqs = []) {
  return faqs.map((faq) => ({
    q: faq.question || faq.title,
    a: faq.answer || faq.description,
  }));
}
