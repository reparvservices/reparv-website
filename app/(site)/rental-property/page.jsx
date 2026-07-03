export { dynamic } from "@/lib/ssr";

import RentalProperty from "@/views/RentalProperty";
import { fetchPropertyLandingPageData } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("rental-property");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/rental-property",
  });
}

export default async function Page() {
  const pageData = await fetchPropertyLandingPageData(
    "Reparv Rental Property Page",
  );

  return <RentalProperty {...pageData} />;
}
