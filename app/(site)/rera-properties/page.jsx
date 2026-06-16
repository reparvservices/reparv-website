import ReraProperty from "@/views/ReraProperty";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("rera-properties");

  return buildPageMetadata({
    title: seo?.title,
    description:
      seo?.description,
    keywords: seo?.keywords,  
    path: "/rera-properties",
  });
}

export default function Page() {
  return <ReraProperty />;
}