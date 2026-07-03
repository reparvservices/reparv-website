export { dynamic } from "@/lib/ssr";

import EditProfile from "@/components/dashboard/EditProfile";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Edit profile",
  description: "Update your Reparv profile details.",
  path: "/profile-edit",
});

export default function Page() {
  return <EditProfile />;
}
