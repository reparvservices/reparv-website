export { dynamic } from "@/lib/ssr";

import MyBookings from "@/components/dashboard/MyBookings";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "My bookings",
  description: "See and manage your venue bookings on Reparv.",
  path: "/my-bookings",
});

export default function Page() {
  return <MyBookings />;
}
