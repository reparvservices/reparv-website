export { dynamic } from "@/lib/ssr";

import Verify712 from "@/views/Verify712";
import { fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("verify-7-12");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/verify-7-12",
  });
}

export default async function Page() {
  const { articles, faqs } = await fetchSeoPageWidgets({
    faqLocation: "Reparv Verify 7-12 Page",
  });

  return <Verify712 initialArticles={articles} initialFaqs={faqs} />;
}
