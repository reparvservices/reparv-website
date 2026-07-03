export { dynamic } from "@/lib/ssr";

import AboutUs from "@/views/AboutUs";
import { buildPageMetadata, getSeoData } from "@/lib/seo";

export async function generateMetadata() {
  const seo = await getSeoData("about-us");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/about-us",
  });
}

export default function Page() {
  return <AboutUs />;
}
