import SellOldProperty from "@/views/SellOldProperty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sell your property",
  description: "List and sell your existing property with Reparv.",
  path: "/sell-old-property",
});

export default function Page() {
  return <SellOldProperty />;
}
