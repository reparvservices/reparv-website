import TrustedBuilder from "@/views/TrustedBuilder";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("trusted-builders");

  return buildPageMetadata({
    title: seo?.title,
    description:
      seo?.description,
    keywords: seo?.keywords,
    path: "/trusted-builders",
  });
}

export default function Page() {
  return <TrustedBuilder />;
}