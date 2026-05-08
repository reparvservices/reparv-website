import EmiCalculator from "@/views/EmiCalculator";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "EMI calculator",
  description: "Calculate home loan EMI instantly.",
  path: "/emi-calculator",
});

export default function Page() {
  return <EmiCalculator />;
}
