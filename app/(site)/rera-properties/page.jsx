import ReraProperty from "@/views/ReraProperty";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("rera-properties");

  return buildPageMetadata({
    title: seo?.metaTitle || "RERA Properties",
    description:
      seo?.metaDescription ||
      "Browse RERA-registered projects and listings.",
    keywords: seo?.metaKeywords,
    path: "/rera-properties",
  });
}

export default function Page() {
  return <ReraProperty />;
}