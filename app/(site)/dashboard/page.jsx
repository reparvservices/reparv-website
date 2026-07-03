export { dynamic } from "@/lib/ssr";

import Dashboard from "@/views/Dashboard";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Dashboard",
  description: "Manage your Reparv account, listings and activity.",
  path: "/dashboard",
});

export default function Page() {
  return <Dashboard />;
}
