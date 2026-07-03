export { dynamic } from "@/lib/ssr";

import SellOldProperty from "@/views/SellOldProperty";
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
  return <SellOldProperty />;
}
