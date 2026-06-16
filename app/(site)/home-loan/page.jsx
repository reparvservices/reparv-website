import HomeLoan from "@/components/dashboard/HomeLoan";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("home-loan");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/home-loan",
  });
}

export default function Page() {
  return <HomeLoan />;
}
