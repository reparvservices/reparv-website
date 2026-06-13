import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("news");

  return buildPageMetadata({
    title: seo?.metaTitle || "News",
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    path: "/news",
  });
}