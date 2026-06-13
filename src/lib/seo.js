export const siteUrl = "https://www.reparv.in";
export const siteName = "Reparv";

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

  return {
    title: title || siteName,
    description,
    keywords,

    alternates: {
      canonical,
    },

    openGraph: {
      title: title || siteName,
      description,
      url: canonical,
      siteName,
      locale: "en_IN",
      type,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title || siteName,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: title || siteName,
      description,
      images: image ? [image] : [],
    },
  };
}
