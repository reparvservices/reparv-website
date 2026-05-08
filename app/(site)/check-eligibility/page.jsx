import CheckEligibility from "@/views/CheckEligibility";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Check eligibility",
  description: "Check loan eligibility with Reparv.",
  path: "/check-eligibility",
});

export default function Page() {
  return <CheckEligibility />;
}
