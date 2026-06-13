import SellOldProperty from "@/views/SellOldProperty";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("sell-old-property");

  return buildPageMetadata({
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    path: "/sell-old-property",
  });
}

export default function Page() {
  return <SellOldProperty />;
}
