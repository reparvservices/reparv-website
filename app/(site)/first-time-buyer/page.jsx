import FirstTimeBuyerPage from "@/views/FirstTimeBuyer.jsx";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "First Time Buyer Page",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/first-time-buyer",
});

export default function Page() {
  return <FirstTimeBuyerPage />;
}
