import FlatsForSale from "@/views/FlatsForSale";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Flats for Sale in Nagpur – Verified Listings | Reparv.in",
  description:
    "Explore verified 1BHK, 2BHK & 3BHK flats for sale in Nagpur. Trusted builders, transparent pricing, zero brokerage. Browse listings & book a free site visit!",
  path: "/flats-for-sale-in-nagpur",
});

export default function Page() {
  return <FlatsForSale />;
}
