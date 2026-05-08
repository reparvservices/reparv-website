import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { slug } = params;
  return buildPageMetadata({
    title: "Property listings",
    description: "Explore property listings on Reparv.",
    path: `/${slug}`,
  });
}

export default function Page() {
  return <Properties />;
}
