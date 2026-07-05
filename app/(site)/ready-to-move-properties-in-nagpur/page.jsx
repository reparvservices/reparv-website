export { dynamic } from "@/lib/ssr";

import ReadyToMovePropertiesInNagpur from "@/views/ReadyToMovePropertiesInNagpur";
import { fetchReadyToMovePageData, fetchSeoPageWidgets } from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchReadyToMovePageData("Nagpur");
  const count = pageData?.stats?.propertyCount || 39;

  return buildPageMetadata({
    title: "Ready to Move Properties in Nagpur | No Wait | Reparv.in",
    description: `Find ${count}+ verified ready-to-move flats, plots & houses in Nagpur. Clear ownership, instant possession, zero brokerage. Compare options & book a free site visit on Reparv!`,
    path: "/ready-to-move-properties-in-nagpur",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Ready To Move Page",
      includeArticles: false,
    }),
    fetchReadyToMovePageData("Nagpur"),
  ]);

  return (
    <ReadyToMovePropertiesInNagpur initialPageData={pageData} initialFaqs={faqs} />
  );
}
