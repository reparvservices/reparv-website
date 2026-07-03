import { defaultOgImage, resolveOgImageUrl, siteName, siteUrl } from "./metadata";

function getPropertyImage(property) {
  try {
    const images = JSON.parse(property?.frontView || "[]");
    if (images?.length > 0) return images[0];
    return null;
  } catch {
    return null;
  }
}

export function buildFaqPageSchema(faqs = []) {
  if (!faqs?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbListSchema(items = []) {
  if (!items?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? {
            item: `${siteUrl}${
              item.href.startsWith("/") ? item.href : `/${item.href}`
            }`,
          }
        : {}),
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  image,
  path,
  datePublished,
  dateModified,
}) {
  if (!title) return null;

  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: resolveOgImageUrl(image) || defaultOgImage,
    url,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/reparvLogo.ico`,
      },
    },
  };
}

export function buildNewsArticleSchema({
  title,
  description,
  image,
  path,
  datePublished,
  dateModified,
}) {
  const article = buildArticleSchema({
    title,
    description,
    image,
    path,
    datePublished,
    dateModified,
  });

  if (!article) return null;

  return {
    ...article,
    "@type": "NewsArticle",
  };
}

export function buildRealEstateListingSchema(property, path) {
  if (
    !property?.propertyid &&
    !property?.propertyTitle &&
    !property?.projectName
  ) {
    return null;
  }

  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const image = resolveOgImageUrl(getPropertyImage(property));

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name:
      property?.propertyTitle ||
      property?.projectName ||
      property?.seoTittle ||
      "Property Listing",
    description:
      property?.seoDescription ||
      property?.propertyDescription ||
      "Verified property listing on Reparv.",
    url: `${siteUrl}${canonicalPath}`,
    image: image ? [image] : [defaultOgImage],
    address: {
      "@type": "PostalAddress",
      addressLocality: property?.city,
      addressRegion: property?.state,
      streetAddress: property?.location || property?.address,
      addressCountry: "IN",
    },
    ...(property?.totalOfferPrice
      ? {
          offers: {
            "@type": "Offer",
            price: property.totalOfferPrice,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}
