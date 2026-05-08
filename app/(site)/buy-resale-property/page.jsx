import BuyResaleProperty from "@/views/BuyResaleProperty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Buy resale property",
  description: "Explore resale flats, plots and homes across cities.",
  path: "/buy-resale-property",
});

export default function Page() {
  return <BuyResaleProperty />;
}
