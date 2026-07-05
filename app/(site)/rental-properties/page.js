export { dynamic } from "@/lib/ssr";

import RentalProperties from "@/views/RentalProperties";
import { fetchRentalPropertiesPageData, fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchRentalPropertiesPageData("Nagpur");
  const count = pageData?.stats?.rentalListings || 100;

  return buildPageMetadata({
    title: "Rental Properties in Nagpur – Verified Homes | Reparv.in",
    description: `Search verified rental flats, offices and shops in Nagpur. Browse ${count}+ listings with zero brokerage, owner verification, and fast move-in support.`,
    path: "/rental-properties",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Rental Properties Page",
      includeArticles: false,
    }),
    fetchRentalPropertiesPageData("Nagpur"),
  ]);

  return <RentalProperties initialPageData={pageData} initialFaqs={faqs} />;
}
