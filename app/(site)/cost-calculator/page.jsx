import CostCalculator from "@/views/CostCalculator";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Cost calculator",
  description: "Estimate property purchase costs.",
  path: "/cost-calculator",
});

export default function Page() {
  return <CostCalculator />;
}
