import NewsPage from "@/views/NewsSection";
import { getSeoData } from "@/lib/getSeoData";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("news");
  //console.log("SEO DATA:", seo);
  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/news",
  });
}

export default function Page() {
  return <NewsPage />;
}
