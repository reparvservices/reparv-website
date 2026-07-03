export { dynamic } from "@/lib/ssr";

import Properties from "@/views/Properties";
import { fetchProperties } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("properties");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/properties",
  });
}

export default async function Page() {
  const initialProperties = await fetchProperties({
    city: "Nagpur",
    propertyCategory: "properties",
  });

  return <Properties initialProperties={initialProperties} />;
}
