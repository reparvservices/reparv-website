import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("properties");
  console.log("PROPERTIES SEO:", seo);
  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/properties",
  });
}

export default function Page() {
  return <Properties />;
}
