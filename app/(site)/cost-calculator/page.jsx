import CostCalculator from "@/views/CostCalculator";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("cost-calculator");

  return buildPageMetadata({
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    path: "/cost-calculator",
  });
}

export default function Page() {
  return <CostCalculator />;
}
