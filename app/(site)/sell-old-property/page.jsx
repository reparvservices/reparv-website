export { dynamic } from "@/lib/ssr";

// Same Sell / Buy / Rent listing flow as /sell-properties, preselected
import SellProperty from "@/components/dashboard/SellProperty";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("sell-old-property");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/sell-old-property",
  });
}

export default function Page() {
  return <SellProperty initialListingType="Sell" initialCondition="resale" />;
}
