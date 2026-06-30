import BudgetJourneyPage from "@/views/BudgetJourneyPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Budget to Dream Home – Smart Property Choices | Reparv.in",
  description: "Discover how Nagpur buyers turned tight budgets into dream homes with smart choices. Real stories, real savings. Start your smart home search on Reparv now!",
  path: "/budget-journey-to-dream-home",
});

export default function Page() {
  return <BudgetJourneyPage />;
}
