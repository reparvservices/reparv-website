export { dynamic } from "@/lib/ssr";

import SellProperty from "@/components/dashboard/SellProperty";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Sell properties",
  description: "Create and manage property listings.",
  path: "/sell-properties",
});

export default function Page() {
  return <SellProperty />;
}
