export { dynamic } from "@/lib/ssr";

import NewsSection from "@/views/NewsSection";
import { fetchNews } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("news");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/news",
  });
}

export default async function Page() {
  const initialNews = await fetchNews();
  return <NewsSection initialNews={initialNews} />;
}
