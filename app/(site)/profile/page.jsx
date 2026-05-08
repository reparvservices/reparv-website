import Profile from "@/components/dashboard/Profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Profile",
  description: "View and update your profile.",
  path: "/profile",
});

export default function Page() {
  return <Profile />;
}
