import { Helmet } from "react-helmet-async";

export default function LandingPageSEO({
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalUrl,
  ogImage,
  siteName = "Reparv",
  twitterSite = "@reparv",
  twitterDescription,
}) {
  return (
    <Helmet>
      {/* BASIC SEO */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* OPEN GRAPH */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterSite} />
    </Helmet>
  );
}