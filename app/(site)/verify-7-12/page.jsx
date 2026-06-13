import Verify712 from "@/views/Verify712";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("verify-7-12");

  return buildPageMetadata({
    title: seo?.metaTitle || "Verify 7/12",
    description:
      seo?.metaDescription ||
      "Verify land records and 7/12 extracts.",
    keywords: seo?.metaKeywords,
    path: "/verify-7-12",
  });
}

export default function Page() {
  return <Verify712 />;
}