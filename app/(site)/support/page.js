import Support from "@/views/Support";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Reparv Support",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/support",
});

export default function Page() {
  return <Support />;
}
