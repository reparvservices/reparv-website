import { buildPageMetadata } from "@/lib/seo";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/views/MapView"), {
  ssr: false,
});

export const metadata = buildPageMetadata({
  title: "Map View",
  description: "Reparv map view — discover properties across India.",
  path: "/map-view",
});

export default function Page() {
  return <MapView />;
}


