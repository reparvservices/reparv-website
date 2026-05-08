import PropertyDetails from "@/views/PropertyDetails";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { id } = params;
  return buildPageMetadata({
    title: "Property details",
    description: "View photos, pricing and location for this listing on Reparv.",
    path: `/property-info/${id}`,
  });
}

export default function Page() {
  return <PropertyDetails />;
}
