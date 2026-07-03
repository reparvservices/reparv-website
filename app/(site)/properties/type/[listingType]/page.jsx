export { dynamic } from "@/lib/ssr";

import Properties from "@/views/Properties";
import { buildListingPageMetadata } from "@/lib/seo";
import { fetchProperties } from "@/lib/serverApi";

export function generateMetadata({ params }) {
  const { listingType } = params;
  return buildListingPageMetadata({
    params,
    path: `/properties/type/${listingType}`,
  });
}

export default async function Page({ params }) {
  const initialProperties = await fetchProperties({
    city: "Nagpur",
    propertyCategory: params.listingType,
  });

  return <Properties initialProperties={initialProperties} />;
}
