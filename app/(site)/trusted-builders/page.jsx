import TrustedBuilder from "@/views/TrustedBuilder";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("trusted-builders");

  return buildPageMetadata({
    title: seo?.metaTitle || "Trusted Builders",
    description:
      seo?.metaDescription ||
      "Discover trusted builder partners on Reparv.",
    keywords: seo?.metaKeywords,
    path: "/trusted-builders",
  });
}

export default function Page() {
  return <TrustedBuilder />;
}