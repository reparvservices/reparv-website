import PlotsForSale from "@/views/PlotsForSale";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Plots for Sale",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/plots-for-sale",
});

export default function Page() {
  return <PlotsForSale />;
}
