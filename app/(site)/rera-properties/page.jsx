export { dynamic } from "@/lib/ssr";

import ReraProperty from "@/views/ReraProperty";
import { fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("rera-properties");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/rera-properties",
  });
}

export default async function Page() {
  const { articles, faqs } = await fetchSeoPageWidgets({
    faqLocation: "Reparv Rera Property Page",
  });

  return <ReraProperty initialArticles={articles} initialFaqs={faqs} />;
}
