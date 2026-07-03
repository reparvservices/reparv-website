export { dynamic } from "@/lib/ssr";

import EmiCalculator from "@/views/EmiCalculator";
import { fetchBlogs } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("emi-calculator");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/emi-calculator",
  });
}

export default async function Page() {
  const articles = await fetchBlogs();
  return <EmiCalculator initialArticles={articles} />;
}
