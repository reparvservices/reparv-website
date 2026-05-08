import PropertyDetails from "@/views/PropertyDetails";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Property details",
  description: "View detailed property information.",
  path: "/property-details",
});

export default function Page() {
  return <PropertyDetails />;
}
