import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({
  title,
  description,
  keywords = "",
  canonical,
  image,
  type = "website",
}) => {
  const { pathname } = useLocation();

  // Normalize trailing slash
  const cleanPath =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const defaultCanonical = `https://www.reparv.in${cleanPath}`;
  const finalCanonical = canonical || defaultCanonical;

  return (
    <Helmet>
      {/* Basic SEO */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical */}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph (WhatsApp / Facebook / LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Reparv" />

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}

      <meta property="og:url" content={finalCanonical} />

      {/* Twitter Card */}
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