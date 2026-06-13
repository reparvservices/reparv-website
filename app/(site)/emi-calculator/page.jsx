import EmiCalculator from "@/views/EmiCalculator";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("emi-calculator");

  return buildPageMetadata({
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    path: "/emi-calculator",
  });
}

export default function Page() {
  return <EmiCalculator />;
}
