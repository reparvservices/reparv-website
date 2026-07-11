import { getS3ImageUrl } from "../env";

export const siteUrl = "https://www.reparv.in";
export const siteName = "Reparv";
export const defaultOgImage = `${siteUrl}/og-image.png`;

function normalizePageTitle(title) {
  if (!title) return undefined;

  return String(title)
    .replace(/\s*\|\s*Reparv\.in\s*$/i, "")
    .replace(/\s*\|\s*Reparv\s*$/i, "")
    .trim();
}

function withBrandSuffix(title) {
  if (!title || title === siteName) return title || siteName;
  if (/\|\s*Reparv/i.test(title) || title.startsWith("Reparv")) return title;
  return `${title} | ${siteName}`;
}

export function resolveOgImageUrl(image) {
  if (!image || typeof image !== "string") return undefined;

  const trimmed = image.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("/assets/")) {
    return `${siteUrl}${trimmed}`;
  }

  const base = getS3ImageUrl().replace(/\/$/, "");
  return `${base}/${trimmed.replace(/^\/+/, "")}`;
}

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords,
  image,
  type = "website",
}) {
  const canonicalPath =
    path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;

  const canonical = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogImage = resolveOgImageUrl(image) || defaultOgImage;
  const pageTitle = normalizePageTitle(title) || siteName;
  const brandedTitle = withBrandSuffix(pageTitle);

  return {
    title: pageTitle,
    description,
    keywords,

    alternates: {
      canonical,
    },

    openGraph: {
      title: brandedTitle,
      description,
      url: canonical,
      siteName,
      locale: "en_IN",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: brandedTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [ogImage],
    },
  };
}

export function buildNoIndexMetadata({
  title,
  description,
  path = "",
  keywords,
  image,
  type = "website",
}) {
  return {
    ...buildPageMetadata({ title, description, path, keywords, image, type }),
    robots: {
      index: false,
      follow: false,
    },
  };
}
