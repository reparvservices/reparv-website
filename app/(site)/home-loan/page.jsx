import HomeLoan from "@/components/dashboard/HomeLoan";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Home loan",
  description: "Home loan tools and guidance from Reparv.",
  path: "/home-loan",
});

export default function Page() {
  return <HomeLoan />;
}
