export { dynamic } from "@/lib/ssr";

import RentProperty from "@/views/RentProperty";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("rent-property");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/rent-property",
  });
}

export default function Page() {
  return <RentProperty />;
}
