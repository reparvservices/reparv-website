export { dynamic } from "@/lib/ssr";

import HomeLoan from "@/components/dashboard/HomeLoan";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

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
