import SeoPage1 from "@/views/SeoPage1";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Reparv Seo Page 1",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/seo-page-1",
});

export default function Page() {
  return <SeoPage1 />;
}
