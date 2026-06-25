import { buildPageMetadata } from "@/lib/seo";
import FamilyStoriesPage from "@/views/FamilyStoriesPage";
//import FamilyDecisionStoriesPage from "@/views/FamilyDecisions";

export const metadata = buildPageMetadata({
  title: "Family Decision Stories",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/family-decision",
});

export default function Page() {
  return <FamilyStoriesPage />;
}
