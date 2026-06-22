import BudgetJourneyPage from "@/views/BudgetJourneyPage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Budget Journey Page",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/budget-journey",
});

export default function Page() {
  return <BudgetJourneyPage />;
}
