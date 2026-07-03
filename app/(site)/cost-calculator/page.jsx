export { dynamic } from "@/lib/ssr";

import CostCalculator from "@/views/CostCalculator";
import { fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("cost-calculator");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/cost-calculator",
  });
}

export default async function Page() {
  const { articles, faqs } = await fetchSeoPageWidgets({
    faqLocation: "Reparv Cost Calculator Page",
  });

  return (
    <CostCalculator initialArticles={articles} initialFaqs={faqs} />
  );
}
