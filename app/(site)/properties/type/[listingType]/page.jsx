import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { listingType } = params;
  return buildPageMetadata({
    title: `Properties — ${listingType}`,
    description: "Browse verified listings filtered by type on Reparv.",
    path: `/properties/type/${listingType}`,
  });
}

export default function Page() {
  return <Properties />;
}
