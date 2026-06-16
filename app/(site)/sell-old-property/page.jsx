import SellOldProperty from "@/views/SellOldProperty";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

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
  return <SellOldProperty />;
}
