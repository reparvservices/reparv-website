export { dynamic } from "@/lib/ssr";

import TrustedBuilder from "@/views/TrustedBuilder";
import { fetchSeoPageWidgets, fetchTrustedBuildersData } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("trusted-builders");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/trusted-builders",
  });
}

export default async function Page() {
  const [{ articles, faqs }, trustedBuildersData] = await Promise.all([
    fetchSeoPageWidgets({
      faqLocation: "Reparv Trusted Builder Page",
    }),
    fetchTrustedBuildersData("Nagpur"),
  ]);

  return (
    <TrustedBuilder
      initialArticles={articles}
      initialFaqs={faqs}
      initialTrustedBuildersData={trustedBuildersData}
    />
  );
}
