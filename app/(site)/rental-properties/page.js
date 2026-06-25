import RentalProperties from "@/views/RentalProperties";
import { buildPageMetadata } from "@/lib/seo";



export const metadata = buildPageMetadata({
  title: "Rental Properties",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/rental-properties",
});

export default function Page() {
  return <RentalProperties />;
}
