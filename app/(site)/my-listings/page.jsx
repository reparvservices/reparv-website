export { dynamic } from "@/lib/ssr";

import MyListingsMobile from "@/components/dashboard/MyListingsMobile";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "My listings",
  description: "Manage your property listings on Reparv.",
  path: "/my-listings",
});

export default function Page() {
  return <MyListingsMobile />;
}
