export { dynamic } from "@/lib/ssr";

import { buildPageMetadata } from "@/lib/seo";
import FamilyStoriesPage from "@/views/FamilyStoriesPage";
import {
  fetchFamilyDecisionStoriesPageData,
  fetchSeoPageWidgets,
} from "@/lib/serverApi";

export async function generateMetadata() {
  const pageData = await fetchFamilyDecisionStoriesPageData("Nagpur");
  const count = pageData?.stats?.familyHomes || 120;
  const localities = pageData?.stats?.localities || 40;

  return buildPageMetadata({
    title: "How Families Aligned on Home Buying in Nagpur | Reparv.in",
    description: `Read how Nagpur families aligned on budget, location & lifestyle across ${localities}+ localities. ${count}+ family-friendly homes and real decision stories on Reparv.`,
    path: "/family-decision-stories",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Family Decision Stories Page",
      includeArticles: true,
    }),
    fetchFamilyDecisionStoriesPageData("Nagpur"),
  ]);

  return (
    <FamilyStoriesPage initialPageData={pageData} initialFaqs={faqs} />
  );
}
