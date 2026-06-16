import Verify712 from "@/views/Verify712";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("verify-7-12");

  return buildPageMetadata({
    title: seo?.title || "Verify 7/12",
    description:
      seo?.description ||
      "Verify land records and 7/12 extracts.",
    keywords: seo?.keywords || "verify 7/12, land records, 7/12 extract, property verification",
    path: "/verify-7-12",
  });
}

export default function Page() {
  return <Verify712 />;
}