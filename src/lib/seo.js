export const siteUrl = "https://www.reparv.in";
export const siteName = "Reparv";

/** @param {{ title?: string, description?: string, path?: string, keywords?: string }} o */
export function buildPageMetadata({ title, description, path = "", keywords }) {
  const canonicalPath = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const canonical = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;

  return {
    title: title || siteName,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: title || siteName,
      description,
      url: canonical,
      siteName,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteName,
      description,
    },
  };
}
