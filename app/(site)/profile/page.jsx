export { dynamic } from "@/lib/ssr";

import Profile from "@/components/dashboard/Profile";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Profile",
  description: "View and update your profile.",
  path: "/profile",
});

export default function Page() {
  return <Profile />;
}
