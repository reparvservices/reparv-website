import RentalProperty from "@/views/RentalProperty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Rental property",
  description: "Find rental flats, homes and commercial spaces.",
  path: "/rental-property",
});

export default function Page() {
  return <RentalProperty />;
}
