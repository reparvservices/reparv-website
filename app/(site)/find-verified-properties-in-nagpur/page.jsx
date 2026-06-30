import FindVerifiedProperties from "@/views/FindVerifiedProperties";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Find Verified Properties in Nagpur | Search on Reparv.in",
  description:
    "Looking for verified properties in Nagpur? Reparv offers 500+ genuine listings with zero brokerage & direct builder contact. Start your property search today!",
  path: "/find-verified-properties-in-nagpur",
});

export default function Page() {
  return <FindVerifiedProperties />;
}
