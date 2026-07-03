export { dynamic } from "@/lib/ssr";

import SeoPage1 from "@/views/SeoPage1";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Real Home Buying Stories from Real Families",
  description:
    "Explore authentic home buying journeys from families across India. Learn how they navigated budgets, decisions, and dreams with Reparv.",
  path: "/seo-page-1",
});

export default function Page() {
  return <SeoPage1 />;
}
