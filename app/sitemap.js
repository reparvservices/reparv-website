import { siteUrl } from "@/lib/seo";
import {
  generateBlogStaticParams,
  generateNewsStaticParams,
  generatePropertyStaticParams,
} from "@/lib/staticParams";

const STATIC_PAGES = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/properties", priority: 0.9, changeFrequency: "daily" },
  { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
  { path: "/news", priority: 0.8, changeFrequency: "daily" },
  { path: "/about-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.7, changeFrequency: "monthly" },
  { path: "/support", priority: 0.6, changeFrequency: "monthly" },
  { path: "/buy-new-property", priority: 0.8, changeFrequency: "weekly" },
  { path: "/buy-resale-property", priority: 0.8, changeFrequency: "weekly" },
  { path: "/rental-property", priority: 0.8, changeFrequency: "weekly" },
  { path: "/rent-property", priority: 0.8, changeFrequency: "weekly" },
  { path: "/sell-old-property", priority: 0.8, changeFrequency: "weekly" },
  { path: "/emi-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cost-calculator", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/home-loan-prepayment-calculator",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  { path: "/reduce-emi-or-tenure", priority: 0.7, changeFrequency: "monthly" },
  { path: "/check-eligibility", priority: 0.7, changeFrequency: "monthly" },
  { path: "/home-loan", priority: 0.8, changeFrequency: "monthly" },
  { path: "/home-loan-application", priority: 0.7, changeFrequency: "monthly" },
  { path: "/verify-7-12", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rera-properties", priority: 0.8, changeFrequency: "weekly" },
  { path: "/trusted-builders", priority: 0.8, changeFrequency: "weekly" },
  {
    path: "/visit-properties-on-week-ends",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  { path: "/map-view", priority: 0.7, changeFrequency: "weekly" },
  { path: "/first-time-buyer", priority: 0.8, changeFrequency: "monthly" },
  { path: "/family-decision-stories", priority: 0.8, changeFrequency: "monthly" },
  { path: "/budget-to-dream-home", priority: 0.8, changeFrequency: "monthly" },
  { path: "/seo-page-1", priority: 0.7, changeFrequency: "monthly" },
  {
    path: "/find-verified-properties-in-nagpur",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  { path: "/flats-for-sale-in-nagpur", priority: 0.8, changeFrequency: "weekly" },
  { path: "/plots-for-sale-in-nagpur", priority: 0.8, changeFrequency: "weekly" },
  { path: "/rental-properties", priority: 0.8, changeFrequency: "weekly" },
  { path: "/new-projects-in-nagpur", priority: 0.8, changeFrequency: "weekly" },
  {
    path: "/ready-to-move-properties-in-nagpur",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/top-trusted-properties-in-nagpur",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  { path: "/join-our-team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sales-partner", priority: 0.6, changeFrequency: "monthly" },
  { path: "/territory-partner", priority: 0.6, changeFrequency: "monthly" },
  { path: "/terms-and-conditions", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/cancellation-policy", priority: 0.4, changeFrequency: "yearly" },
];

function toSitemapEntry({ path, priority, changeFrequency }, lastModified) {
  return {
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default async function sitemap() {
  const lastModified = new Date();

  const [blogParams, newsParams, propertyParams] = await Promise.all([
    generateBlogStaticParams(),
    generateNewsStaticParams(),
    generatePropertyStaticParams(),
  ]);

  const staticEntries = STATIC_PAGES.map((page) =>
    toSitemapEntry(page, lastModified),
  );

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
