export { dynamic } from "@/lib/ssr";

import Properties from "@/views/Properties";
import { buildListingPageMetadata } from "@/lib/seo";
import { fetchProperties } from "@/lib/serverApi";
import { parsePropertiesRouteParams } from "@/lib/parsePropertySlug";

export function generateMetadata({ params }) {
  const { slug } = params;
  return buildListingPageMetadata({ params, path: `/properties/${slug}` });
}

export default async function Page({ params }) {
  const routeParams = parsePropertiesRouteParams(params);
  const initialProperties = await fetchProperties(routeParams);

  return <Properties initialProperties={initialProperties} />;
}
