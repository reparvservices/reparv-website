import RentalProperties from "@/views/RentalProperties";
import { buildPageMetadata } from "@/lib/seo";



export const metadata = buildPageMetadata({
  title: "Rental Properties in Nagpur – Verified Homes | Reparv.in",
  description: "Search verified rental flats, houses & PGs in Nagpur. Furnished & unfurnished options with zero brokerage. Find your perfect rental home on Reparv right now!",
  path: "/rental-properties-in-nagpur",
});

export default function Page() {
  return <RentalProperties />;
}
