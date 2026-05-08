"use client";

import { Helmet } from "react-helmet-async";
import { usePathname } from "next/navigation";

const siteUrl = "https://www.reparv.in";

const SEO = ({
  title,
  description,
  keywords = "",
  canonical,
  image,
  type = "website",
}) => {
  const pathname = usePathname();

  const cleanPath =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const defaultCanonical = `${siteUrl}${cleanPath}`;
  const finalCanonical = canonical || defaultCanonical;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      <link rel="canonical" href={finalCanonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Reparv" />

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}

      <meta property="og:url" content={finalCanonical} />

      <meta name="twitter:card" content="summary_large_image" />

      {title && <meta name="twitter:title" content={title} />}
      {description && (
        <meta name="twitter:description" content={description} />
      )}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default SEO;
