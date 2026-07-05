export { dynamic } from "@/lib/ssr";

import VisitPropertiesOnWeekend from "@/views/VisitPropertiesOnWeekend";
import { fetchSeoPageWidgets, fetchWeekendVisitData } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("visit-properties-on-week-ends");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/visit-properties-on-week-ends",
  });
}

export default async function Page() {
  const [{ articles, faqs }, weekendVisitData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Visit Properties On Weekend Page",
    }),
    fetchWeekendVisitData("Nagpur"),
  ]);

  return (
    <VisitPropertiesOnWeekend
      initialArticles={articles}
      initialFaqs={faqs}
      initialWeekendVisitData={weekendVisitData}
    />
  );
}
