export { dynamic } from "@/lib/ssr";

import BudgetJourneyPage from "@/views/BudgetJourneyPage";
import {
  fetchBudgetToDreamHomePageData,
  fetchSeoPageWidgets,
} from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchBudgetToDreamHomePageData("Nagpur");
  const count = pageData?.stats?.budgetHomes || 80;
  const localities = pageData?.stats?.localities || 40;

  return buildPageMetadata({
    title: "Budget to Dream Home – Smart Property Choices | Reparv.in",
    description: `Discover how Nagpur buyers turned tight budgets into dream homes with smart choices. ${count}+ homes across ${localities}+ localities. Real stories, real savings on Reparv.`,
    path: "/budget-to-dream-home",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Budget To Dream Home Page",
      includeArticles: true,
    }),
    fetchBudgetToDreamHomePageData("Nagpur"),
  ]);

  return (
    <BudgetJourneyPage initialPageData={pageData} initialFaqs={faqs} />
  );
}
