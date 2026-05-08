import EditProfile from "@/components/dashboard/EditProfile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Edit profile",
  description: "Update your account details.",
  path: "/profile-edit",
});

export default function Page() {
  return <EditProfile />;
}
