import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { slug, propertyCategory, city } = params;
  return buildPageMetadata({
    title: `${slug} ${propertyCategory} in ${city}`,
    description:
      "Browse matching verified property listings on Reparv.",
    path: `/${slug}/${propertyCategory}/in/${city}`,
  });
}

export default function Page() {
  return <Properties />;
}
