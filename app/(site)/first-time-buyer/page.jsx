export { dynamic } from "@/lib/ssr";

import FirstTimeBuyerPage from "@/views/FirstTimeBuyer.jsx";
import {
  fetchFirstTimeBuyerPageData,
  fetchSeoPageWidgets,
} from "@/lib/serverApi";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const pageData = await fetchFirstTimeBuyerPageData("Nagpur");
  const count = pageData?.stats?.affordableHomes || 50;

  return buildPageMetadata({
    title: "First Time Home Buyer Stories in Nagpur | Reparv.in",
    description: `Explore real first-time home buyer journeys from Nagpur. ${count}+ starter homes, practical guides, and honest stories to help you navigate loans, paperwork & property search.`,
    path: "/first-time-buyer",
  });
}

export default async function Page() {
  const [{ articles, faqs }, pageData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv First Time Buyer Page",
      includeArticles: true,
    }),
    fetchFirstTimeBuyerPageData("Nagpur"),
  ]);

  return (
    <FirstTimeBuyerPage
      initialPageData={pageData}
      initialArticles={articles}
      initialFaqs={faqs}
    />
  );
}
