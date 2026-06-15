import NewsPage from "@/views/NewsSection";
import { getSeoData } from "@/lib/getSeoData";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("news");

  return buildPageMetadata({
    title: seo?.metaTitle || "News",
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    path: "/news",
  });
}

export default function Page() {
  return <NewsPage />;
}
