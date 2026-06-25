import ReduceEmi from "@/views/ReduceEmi";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Reduce EMI",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/reduce-emi",
});

export default function Page() {
  return <ReduceEmi />;
}
