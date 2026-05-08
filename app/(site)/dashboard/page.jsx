import Dashboard from "@/views/Dashboard";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Dashboard",
  description: "Manage your Reparv account, listings and activity.",
  path: "/dashboard",
});

export default function Page() {
  return <Dashboard />;
}
