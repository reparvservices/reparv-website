export { dynamic } from "@/lib/ssr";

import SeoPage1 from "@/views/SeoPage1";
import { fetchVerifiedPropertiesPageData } from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchVerifiedPropertiesPageData("Nagpur");
  const city = pageData?.city || "Nagpur";
  const count = pageData?.stats?.verifiedListings || 0;
  const localities = pageData?.stats?.localities || 0;

  return buildPageMetadata({
    title: `Home Buying Stories from Real Families in ${city}`,
    description: count
      ? `Explore authentic home buying journeys from families across ${localities}+ localities in ${city}. ${count}+ verified homes and real decision stories to guide your search on Reparv.`
      : `Explore authentic home buying journeys from families in ${city}. Learn how they navigated budgets, decisions, and dreams with Reparv.`,
    path: "/seo-page-1",
  });
}

export default async function Page() {
  const pageData = await fetchVerifiedPropertiesPageData("Nagpur");

  return <SeoPage1 initialPageData={pageData} />;
}
