import BuyNewProperty from "@/views/BuyNewProperty";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("buy-new-property");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/buy-new-property",
  });
}

export default function Page() {
  return <BuyNewProperty />;
}
