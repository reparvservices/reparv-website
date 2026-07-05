export { dynamic } from "@/lib/ssr";

import PlotsForSale from "@/views/PlotsForSale";
import { fetchPlotsForSalePageData, fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchPlotsForSalePageData("Nagpur");
  const count = pageData?.stats?.plotListings || 100;

  return buildPageMetadata({
    title: "Plots for Sale in Nagpur – RERA Verified Listings | Reparv",
    description: `Find RERA-approved residential and commercial plots in Nagpur. Browse ${count}+ verified listings with clear legal titles, NA checks, and zero brokerage.`,
    path: "/plots-for-sale-in-nagpur",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Plots For Sale Page",
      includeArticles: false,
    }),
    fetchPlotsForSalePageData("Nagpur"),
  ]);

  return <PlotsForSale initialPageData={pageData} initialFaqs={faqs} />;
}
