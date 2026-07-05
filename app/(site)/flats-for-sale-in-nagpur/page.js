export { dynamic } from "@/lib/ssr";

import FlatsForSale from "@/views/FlatsForSale";
import { fetchFlatsForSalePageData, fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchFlatsForSalePageData("Nagpur");
  const count = pageData?.stats?.flatListings || 500;

  return buildPageMetadata({
    title: "Flats for Sale in Nagpur – Verified Listings | Reparv.in",
    description: `Explore verified 1BHK, 2BHK & 3BHK flats for sale in Nagpur. Browse ${count}+ listings with trusted builders, transparent pricing, and zero brokerage.`,
    path: "/flats-for-sale-in-nagpur",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Flats For Sale Page",
      includeArticles: false,
    }),
    fetchFlatsForSalePageData("Nagpur"),
  ]);

  return <FlatsForSale initialPageData={pageData} initialFaqs={faqs} />;
}
