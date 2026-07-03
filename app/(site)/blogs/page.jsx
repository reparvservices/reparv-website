export { dynamic } from "@/lib/ssr";

import Blog from "@/views/Blog";
import { fetchBlogs } from "@/lib/serverApi";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("blog");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/blogs",
  });
}

export default async function Page() {
  const initialBlogs = await fetchBlogs();
  return <Blog initialBlogs={initialBlogs} />;
}
