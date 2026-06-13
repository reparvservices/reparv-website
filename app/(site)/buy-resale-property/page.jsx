import BuyResaleProperty from "@/views/BuyResaleProperty";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("buy-resale-property");

  return buildPageMetadata({
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    path: "/buy-resale-property",
  });
}

export default function Page() {
  return <BuyResaleProperty />;
}
