import BuyNewProperty from "@/views/BuyNewProperty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Buy new property",
  description: "Browse new launches and under-construction projects.",
  path: "/buy-new-property",
});

export default function Page() {
  return <BuyNewProperty />;
}
