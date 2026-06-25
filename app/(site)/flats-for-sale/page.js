import FlatsForSale from "@/views/FlatsForSale";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Flats for Sale",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/flats-for-sale",
});

export default function Page() {
  return <FlatsForSale />;
}
