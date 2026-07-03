export { dynamic } from "@/lib/ssr";

import { buildPageMetadata } from "@/lib/seo";
import nextDynamic from "next/dynamic";
import { fetchMapViewProperties } from "@/lib/serverApi";

const MapView = nextDynamic(() => import("@/views/MapView"), {
  ssr: false,
});

export const metadata = buildPageMetadata({
  title: "Map View",
  description: "Reparv map view — discover properties across India.",
  path: "/map-view",
});

export default async function Page() {
  const initialProperties = await fetchMapViewProperties("Nagpur");

  return <MapView initialProperties={initialProperties} />;
}
