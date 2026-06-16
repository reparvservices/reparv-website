import VisitPropertiesOnWeekend from "@/views/VisitPropertiesOnWeekend";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("visit-properties-on-week-ends");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/visit-properties-on-week-ends",
  });
}

export default function Page() {
  return <VisitPropertiesOnWeekend />;
}
