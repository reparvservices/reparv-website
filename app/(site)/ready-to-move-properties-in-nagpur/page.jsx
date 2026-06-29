import ReadyToMovePropertiesInNagpur from "@/views/ReadyToMovePropertiesInNagpur";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Ready To Move Properties In Nagpur",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/ready-to-move-properties-in-nagpur",
});

export default function Page() {
  return <ReadyToMovePropertiesInNagpur />;
}
