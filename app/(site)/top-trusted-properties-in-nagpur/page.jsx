export { dynamic } from "@/lib/ssr";

import TrustScorePage from "@/views/TrustScorePage";
import {
  fetchSeoPageWidgets,
  fetchTopTrustedPropertiesPageData,
} from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchTopTrustedPropertiesPageData("Nagpur");
  const count = pageData?.stats?.trustedCount || 120;

  return buildPageMetadata({
    title: "Top Trusted Properties in Nagpur | Reparv Verified List",
    description: `Browse ${count}+ of Nagpur's most trusted & verified property listings on Reparv. Genuine sellers, clear titles & fair pricing. Find your ideal home with full confidence!`,
    path: "/top-trusted-properties-in-nagpur",
  });
}

export default async function Page() {
  const [{ faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Top Trusted Properties Page",
      includeArticles: false,
    }),
    fetchTopTrustedPropertiesPageData("Nagpur"),
  ]);

  return <TrustScorePage initialPageData={pageData} initialFaqs={faqs} />;
}
