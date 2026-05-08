import MyListingsMobile from "@/components/dashboard/MyListingsMobile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "My listings",
  description: "Manage your property listings on mobile.",
  path: "/my-listings",
});

export default function Page() {
  return <MyListingsMobile />;
}
