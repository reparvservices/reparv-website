export { dynamic } from "@/lib/ssr";

import BuyResaleProperty from "@/views/BuyResaleProperty";
import { fetchPropertyLandingPageData } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("buy-resale-property");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/buy-resale-property",
  });
}

export default async function Page() {
  const pageData = await fetchPropertyLandingPageData(
    "Reparv Buy Resale Property Page",
  );

  return <BuyResaleProperty {...pageData} />;
}
