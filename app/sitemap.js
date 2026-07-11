import { siteUrl } from "@/lib/seo";
import {
  FOOTER_BUYER_GUIDE_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_HOME_LOAN_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_NAGPUR_PROPERTY_LINKS,
  FOOTER_PARTNER_LINKS,
  FOOTER_TOOL_LINKS,
} from "@/config/footerLinks";
import {
  generateBlogStaticParams,
  generateNewsStaticParams,
  generatePropertyStaticParams,
} from "@/lib/staticParams";

function linksToPages(links, { priority, changeFrequency }) {
  const seen = new Set();

  return links
    .filter((link) => link.href?.startsWith("/") && !link.external)
    .map((link) => link.href)
    .filter((path) => {
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    })
    .map((path) => ({ path, priority, changeFrequency }));
}

const STATIC_PAGES = [
  { path: "", priority: 1, changeFrequency: "daily" },
  ...linksToPages(FOOTER_COMPANY_LINKS, {
    priority: 0.8,
    changeFrequency: "daily",
  }).filter((page) => page.path !== ""),
  { path: "/map-view", priority: 0.7, changeFrequency: "weekly" },
  { path: "/rental-property", priority: 0.8, changeFrequency: "weekly" },
  ...linksToPages(FOOTER_HOME_LOAN_LINKS, {
    priority: 0.8,
    changeFrequency: "weekly",
  }),
  ...linksToPages(FOOTER_TOOL_LINKS, {
    priority: 0.8,
    changeFrequency: "monthly",
  }),
  ...linksToPages(FOOTER_PARTNER_LINKS, {
    priority: 0.6,
    changeFrequency: "monthly",
  }),
  ...linksToPages(FOOTER_BUYER_GUIDE_LINKS, {
    priority: 0.8,
    changeFrequency: "monthly",
  }),
  // Nagpur SEO landing pages (footer: "Properties in Nagpur")
  ...linksToPages(FOOTER_NAGPUR_PROPERTY_LINKS, {
    priority: 0.8,
    changeFrequency: "weekly",
  }),
  { path: "/project-partner", priority: 0.7, changeFrequency: "weekly" },
  ...linksToPages(FOOTER_LEGAL_LINKS, {
    priority: 0.4,
    changeFrequency: "yearly",
  }),
];

function toSitemapEntry({ path, priority, changeFrequency }, lastModified) {
  return {
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

async function safeGenerate(generator, label) {
  try {
    return await generator();
  } catch (error) {
    console.error(`Sitemap ${label} generation failed:`, error);
    return [];
  }
}

export default async function sitemap() {
  const lastModified = new Date();

  const staticEntries = STATIC_PAGES.map((page) =>
    toSitemapEntry(page, lastModified),
  );

  const [blogParams, newsParams, propertyParams] = await Promise.all([
    safeGenerate(generateBlogStaticParams, "blog"),
    safeGenerate(generateNewsStaticParams, "news"),
    safeGenerate(generatePropertyStaticParams, "property"),
  ]);

  const blogEntries = blogParams.map(({ blogId }) => ({
    url: `${siteUrl}/blog/${blogId}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const newsEntries = newsParams.map(({ newsId }) => ({
    url: `${siteUrl}/news/${newsId}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const propertyEntries = propertyParams.map(({ id }) => ({
    url: `${siteUrl}/property-info/${id}`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...newsEntries,
    ...propertyEntries,
  ];
}
