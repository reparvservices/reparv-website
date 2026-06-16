import Blog from "@/views/Blog";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("blog");

  return buildPageMetadata({
    title: seo?.title,
    description:
      seo?.description,
    keywords: seo?.keywords,
    path: "/blogs",
  });
}

export default function Page() {
  return <Blog />;
}