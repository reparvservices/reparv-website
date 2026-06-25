import FindVerifiedProperties from "@/views/FindVerifiedProperties";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Find Verified Properties",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/verified-properties",
});

export default function Page() {
  return <FindVerifiedProperties />;
}
