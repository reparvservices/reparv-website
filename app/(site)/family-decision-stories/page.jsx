export { dynamic } from "@/lib/ssr";

import { buildPageMetadata } from "@/lib/seo";
import FamilyStoriesPage from "@/views/FamilyStoriesPage";
//import FamilyDecisionStoriesPage from "@/views/FamilyDecisions";

export const metadata = buildPageMetadata({
  title: "How Families Aligned on Home Buying in Nagpur | Reparv.in",
  description: "Read how Nagpur families aligned on budget, location & lifestyle before buying a home. Real decisions, real insights. Get inspired & find your perfect property!",
  path: "/family-decision-stories",
});

export default function Page() {
  return <FamilyStoriesPage />;
}
