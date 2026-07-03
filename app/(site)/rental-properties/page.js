export { dynamic } from "@/lib/ssr";

import RentalProperties from "@/views/RentalProperties";
import { buildPageMetadata } from "@/lib/seo";



export const metadata = buildPageMetadata({
  title: "Rental Properties in Nagpur – Verified Homes | Reparv.in",
  description: "Search verified rental flats, houses & PGs in Nagpur. Furnished & unfurnished options with zero brokerage. Find your perfect rental home on Reparv right now!",
  path: "/rental-properties",
});

export default function Page() {
  return <RentalProperties />;
}
