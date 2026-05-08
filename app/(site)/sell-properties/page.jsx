import SellProperty from "@/components/dashboard/SellProperty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sell properties",
  description: "Create and manage property listings.",
  path: "/sell-properties",
});

export default function Page() {
  return <SellProperty />;
}
