export { dynamic } from "@/lib/ssr";

import FindVerifiedProperties from "@/views/FindVerifiedProperties";
import {
  fetchSeoPageWidgets,
  fetchVerifiedPropertiesPageData,
} from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchVerifiedPropertiesPageData("Nagpur");
  const count = pageData?.stats?.verifiedListings || 500;

  return buildPageMetadata({
    title: "Find Verified Properties in Nagpur | Search on Reparv.in",
    description: `Looking for verified properties in Nagpur? Reparv offers ${count}+ genuine listings with zero brokerage and direct builder contact. Start your property search today!`,
    path: "/find-verified-properties-in-nagpur",
  });
}

export default async function Page() {
  const [{ articles, faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Find Verified Properties Page",
      includeArticles: true,
    }),
    fetchVerifiedPropertiesPageData("Nagpur"),
  ]);

  return (
    <FindVerifiedProperties
      initialPageData={pageData}
      initialArticles={articles}
      initialFaqs={faqs}
    />
  );
}
