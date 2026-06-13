import Blog from "@/views/Blog";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("blog");

  return buildPageMetadata({
    title: seo?.metaTitle || "Blogs",
    description:
      seo?.metaDescription ||
      "Real estate guides and articles from Reparv.",
    keywords: seo?.metaKeywords,
    path: "/blogs",
  });
}

export default function Page() {
  return <Blog />;
}