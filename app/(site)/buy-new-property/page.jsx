export { dynamic } from "@/lib/ssr";

import BuyNewProperty from "@/views/BuyNewProperty";
import { fetchPropertyLandingPageData } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("buy-new-property");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/buy-new-property",
  });
}

export default async function Page() {
  const pageData = await fetchPropertyLandingPageData(
    "Reparv Buy New Property Page",
  );

  return <BuyNewProperty {...pageData} />;
}
